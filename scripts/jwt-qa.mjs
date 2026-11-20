import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const locales = ['en','zh','ja','es','pt','fr','de','ru','it','tr','ko','ar','hi','id','vi'];
const part = value => Buffer.from(value).toString('base64url');
const token = (payload, header = '{"alg":"HS256","typ":"JWT"}') => `${part(header)}.${part(payload)}.eA`;

/** Caller supplies a browser page and axe bundle; no machine-specific dependencies. */
export default async function jwtBrowserQA(page, {
  baseURL = 'http://127.0.0.1:3480', reportDir = join(tmpdir(), 'zoyku-jwt'), axePath,
} = {}) {
  if (!axePath) throw new Error('jwtBrowserQA requires axePath');
  const axeSource = await readFile(axePath, 'utf8');
  await mkdir(reportDir, { recursive: true });
  const checks = [], audits = [], pageErrors = [];
  const root = () => page.locator('[data-encoder-tool="jwt-decode"]');
  const input = () => root().locator('textarea');
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) { checks.push({ name, passed: false, error: error.stack }); }
  };
  const visit = async (locale = 'en') => {
    const response = await page.goto(`${baseURL}/${locale}/tools/jwt-decoder`);
    assert.equal(response.status(), 200);
    await root().waitFor();
    await page.waitForLoadState('networkidle');
  };
  const error = event => pageErrors.push(event.message);
  page.on('pageerror', error);
  try {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
    await visit();
    for (const payload of ['null','[]','1','"text"']) {
      await check(`non-object payload ${payload} is recoverable`, async () => {
        await input().fill(token(payload));
        await root().getByRole('alert').waitFor();
        assert.equal(await input().getAttribute('aria-invalid'), 'true');
        assert.equal(await root().locator('pre').count(), 0);
        await input().fill(token('{"name":"张三😀"}'));
        await root().locator('pre').nth(1).waitFor();
        assert.equal(await root().getByRole('alert').count(), 0);
      });
    }
    await check('header object and unique top-level keys are required', async () => {
      for (const value of [token('{}','null'),token('{"exp":1,"\\u0065xp":2}'),token('{}','{"alg":"none","alg":"HS256"}')]) {
        await input().fill(value); await root().getByRole('alert').waitFor();
      }
    });
    await check('malformed UTF-8 is rejected without replacement', async () => {
      const invalid = `${part('{}')}.${Buffer.from([123,34,120,34,58,34,255,34,125]).toString('base64url')}.x`;
      await input().fill(invalid); await root().getByRole('alert').waitFor();
    });
    for (const raw of ['1e100','1e309','-1e309','1e-999','1000.00000000000001','8640000000000.0001','"1000"']) {
      await check(`invalid NumericDate ${raw} leaves lossless JSON available`, async () => {
        await input().fill(token(`{"exp":${raw}}`));
        await root().locator('pre').nth(1).waitFor();
        const text = await root().innerText();
        assert.match(text, /Cannot display|must be a JSON number/);
        assert.ok((await root().locator('pre').nth(1).innerText()).includes(raw));
      });
    }
    await check('real clipboard preserves large, overflow and underflow numeric lexemes', async () => {
      await input().fill(token('{"name":"张三😀","id":9007199254740993,"huge":1e309,"small":1e-999}'));
      const expected = await root().locator('pre').nth(1).innerText();
      await root().locator('[data-copy-button]').click();
      await page.waitForFunction(() => document.querySelector('[data-encoder-tool] [data-copy-button]')?.textContent?.includes('Copied'));
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), expected);
      for (const number of ['9007199254740993','1e309','1e-999']) assert.ok(expected.includes(number));
    });
    await check('two parts, empty signature and Clear retain honest state', async () => {
      for (const value of [`${part('{}')}.${part('{}')}`,`${part('{}')}.${part('{}')}.`]) {
        await input().fill(value); await root().locator('pre').nth(1).waitFor();
        assert.match(await root().innerText(), /Signature not supplied/);
      }
      await root().getByRole('button', { name:'Clear',exact:true }).click();
      assert.equal(await input().inputValue(), '');
      assert.equal(await root().locator('pre').count(), 0);
      assert.equal(await root().getByRole('alert').count(), 0);
    });
    await check('exp is expired exactly at the captured device time', async () => {
      await page.evaluate(()=>{ window.__jwtOriginalNow=Date.now; Date.now=()=>1_000_000; });
      try {
        await input().fill(token('{"exp":1000}'));
        assert.ok((await root().innerText()).includes('(expired (at decoding))'));
        await input().fill(token('{"exp":1000.5}'));
        assert.ok((await root().innerText()).includes('(not expired (at decoding))'));
      } finally { await page.evaluate(()=>{ Date.now=window.__jwtOriginalNow; delete window.__jwtOriginalNow; }); }
    });
    await check('input limit rejects without truncating and editing recovers', async () => {
      for (const character of ['a',' ']) {
        const oversized = character.repeat(1_000_001);
        await input().fill(oversized); await root().getByRole('alert').waitFor();
        assert.equal((await input().inputValue()).length, oversized.length);
      }
      await input().fill(token('{}')); await root().locator('pre').nth(1).waitFor();
    });
    await check('horizontal JSON regions support keyboard focus and scrolling', async () => {
      await page.setViewportSize({width:320,height:900});
      await input().fill(token(JSON.stringify({text:'中😀'.repeat(150)})));
      const block = root().locator('pre').nth(1);
      await block.focus(); assert.equal(await block.evaluate(el => el === document.activeElement),true);
      await block.press('ArrowRight');
      await page.waitForFunction(() => [...document.querySelectorAll('[data-encoder-tool] pre')].some(el => el.scrollLeft > 0));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false);
    });
    for (const locale of locales) await check(`${locale} authored notice, expiry, error and recovery`, async () => {
      await visit(locale);
      assert.ok((await page.locator('h1').innerText()).length > 2);
      await input().fill(token('{"exp":4102444800,"name":"张三😀"}'));
      await root().locator('pre').nth(1).waitFor();
      const visible = await root().innerText();
      assert.match(visible,/1,000,000/); assert.match(visible,/4,000,000/);
      if (locale === 'zh') { assert.match(visible,/未过期（解码时）/); assert.ok(!visible.includes('(有效)')); }
      if (locale !== 'en') assert.ok(!visible.includes('Signature, issuer, audience'));
      await input().fill(token('null')); await root().getByRole('alert').waitFor();
      if (locale !== 'en') assert.ok(!(await root().getByRole('alert').innerText()).startsWith('Cannot decode.'));
      await root().locator('button:not([data-copy-button])').last().click();
      assert.equal(await input().inputValue(),''); assert.equal(await root().getByRole('alert').count(),0);
    });
    for (const [locale,dark,width,state] of [
      ['en',false,1280,'empty'],['en',true,1280,'valid'],['zh',false,320,'error'],['zh',true,320,'range'],
      ['ar',false,320,'valid'],['ar',true,320,'error'],['en',false,320,'valid'],['en',true,320,'range'],
    ]) await check(`axe and layout ${locale}/${dark?'dark':'light'}/${width}/${state}`,async()=>{
      await page.setViewportSize({width,height:900}); await visit(locale);
      await page.evaluate(value=>{
        localStorage.setItem('theme',value?'dark':'light');
        document.documentElement.classList.toggle('dark',value);
      },dark);
      // Audit the settled theme, not an intermediate 150 ms color transition.
      await page.waitForFunction(value=>{
        const field=document.querySelector('[data-encoder-tool] textarea');
        if(!field)return false;
        const css=getComputedStyle(field);
        return css.color===(value?'rgb(245, 245, 247)':'rgb(29, 29, 31)') && css.backgroundColor===(value?'rgb(22, 22, 23)':'rgb(255, 255, 255)');
      },dark);
      if (state!=='empty') await input().fill(token(state==='error'?'null':state==='range'?'{"exp":1e100}':'{"text":"中😀","exp":4102444800}'));
      await page.mouse.move(0,0);
      await page.addScriptTag({content:axeSource});
      const audit=await page.evaluate(async()=>{
        const result=await window.axe.run(document.querySelector('[data-encoder-tool="jwt-decode"]'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']}});
        return {version:result.testEngine.version,violations:result.violations,incomplete:result.incomplete};
      });
      audits.push({locale,dark,width,state,...audit});
      assert.deepEqual(audit.violations,[]); assert.deepEqual(audit.incomplete,[]);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      await page.screenshot({path:join(reportDir,`${locale}-${dark?'dark':'light'}-${width}-${state}.png`),fullPage:true});
    });
    await check('URL codec switches announce and update the selected mode',async()=>{
      await page.goto(`${baseURL}/en/tools/url-encoder`); await page.waitForLoadState('networkidle');
      const encoder=page.locator('[data-encoder-tool="url-encode"]');
      const first=encoder.getByRole('button',{name:'encodeURIComponent',exact:true});
      const full=encoder.getByRole('button',{name:'encodeURI',exact:true});
      assert.equal(await first.getAttribute('aria-pressed'),'true');
      await full.click(); assert.equal(await full.getAttribute('aria-pressed'),'true');
      assert.equal(await first.getAttribute('aria-pressed'),'false');
    });
    await check('no uncaught browser errors',async()=>assert.deepEqual(pageErrors,[]));
  } finally {
    page.off('pageerror',error);
    await writeFile(join(reportDir,'jwt-checks.json'),JSON.stringify({passed:checks.filter(c=>c.passed).length,failed:checks.filter(c=>!c.passed).length,checks,audits,pageErrors},null,2));
  }
  return {passed:checks.filter(c=>c.passed).length,failed:checks.filter(c=>!c.passed).length,checks,audits,pageErrors};
}
