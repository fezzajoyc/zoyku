import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const EXAMPLE = '91350100M000100Y43';
const MASKED = '913***********0Y43';
const ALPHABET = '0123456789ABCDEFGHJKLMNPQRTUWXY';
const EXPECTED_CHECKS = 31;
const EXPECTED_AUDITS = 34;
const NAMES = {
  en: 'Unified Social Credit Code Validator', zh: '统一社会信用代码校验器', ja: '統一社会信用コード検証',
  es: 'Validador de Crédito Social Unificado', pt: 'Validador de Crédito Social Unificado',
  fr: 'Vérificateur du crédit social unifié', de: 'Prüfung einheitlicher Sozialkreditcodes',
  ru: 'Проверка единого кода социального кредита', it: 'Verifica del credito sociale unificato',
  tr: 'Birleşik Sosyal Kredi Kodu Doğrulayıcı', ko: '통합사회신용코드 검사기',
  ar: 'فاحص رمز الائتمان الاجتماعي الموحّد', hi: 'एकीकृत सामाजिक क्रेडिट कोड जाँचकर्ता',
  id: 'Validator Kode Kredit Sosial Terpadu', vi: 'Kiểm tra mã tín dụng xã hội thống nhất',
};

// Independent exponent/congruence reference, not the production weight table.
function withCheck(body) {
  const sum = [...body].reduce((total, character, index) => total + BigInt(ALPHABET.indexOf(character)) * 3n ** BigInt(index), 0n);
  const value = Array.from({ length: 31 }, (_, n) => n).find(n => (sum + BigInt(n)) % 31n === 0n);
  return body + ALPHABET[value];
}

async function setDark(page, dark) {
  await page.evaluate(enabled => document.documentElement.classList.toggle('dark', enabled), dark);
  await page.waitForFunction(() => {
    const buttons = [...document.querySelectorAll('[data-social-credit-tool] button')].filter(button => !button.classList.contains('text-white'));
    return buttons.length > 0 && buttons.every(button => getComputedStyle(button).color === getComputedStyle(document.body).color);
  });
}

async function audit(page, locale, state, theme) {
  const result = await page.evaluate(async () => {
    const result = await window.axe.run(document.querySelector('[data-social-credit-tool]'), {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    });
    const details = violation => ({ id: violation.id, impact: violation.impact,
      nodes: violation.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })) });
    return { version: result.testEngine.version, violations: result.violations.map(details), incomplete: result.incomplete.map(details) };
  });
  return { locale, state, theme, ...result };
}

/**
 * Caller-owned Playwright page; no browser creation/disposal or private paths.
 * Requires a local axe-core browser bundle through axePath. Missing axe fails
 * explicitly. Uses a dedicated test context if possible: media/viewport/theme
 * and clipboard permissions change, and the suite briefly toggles offline.
 * All reports, screenshots and downloaded TXT fixtures stay in reportDir.
 */
export default async function socialCreditQA(page, {
  baseURL = 'http://127.0.0.1:3480', reportDir = '/tmp/zoyku-social-credit', axePath,
} = {}) {
  await mkdir(reportDir, { recursive: true });
  baseURL = baseURL.replace(/\/$/, '');
  const checks = [], issues = [], audits = [], pageErrors = [];
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) { checks.push({ name, passed: false, error: error.message }); }
  };
  const root = () => page.locator('[data-social-credit-tool]');
  const textarea = () => root().locator('textarea');
  const submit = () => root().locator('button[type="submit"]');
  const reveal = () => root().locator('button[aria-pressed]');
  const onPageError = error => pageErrors.push(error.message);
  const visit = async locale => {
    await page.goto(`${baseURL}/${locale}/tools/social-credit-validator`);
    await page.locator('.site-theme-control button').waitFor();
    await submit().waitFor();
    if (await page.evaluate(() => document.documentElement.classList.contains('dark'))) {
      await page.locator('.site-theme-control button').click();
    }
  };
  const run = async input => { await textarea().fill(input); await submit().click(); };
  let finished = false;
  if (!axePath) issues.push({ name: 'accessibility prerequisite', error: 'axePath is required; 34 required light/dark accessibility states were not run.' });
  else {
    const context = page.context();
    page.on('pageerror', onPageError);
    try {
      await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      assert.equal(withCheck(EXAMPLE.slice(0, 17)), EXAMPLE);
      for (const [locale, h1] of Object.entries(NAMES)) {
        await check(`${locale}: native result, keyboard submit, masking, raw segments and mobile layout`, async () => {
          await visit(locale);
          assert.equal(await page.locator('h1').innerText(), h1);
          assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://zoyku.com/${locale}/tools/social-credit-validator`);
          const links = await root().getByRole('link').evaluateAll(nodes => nodes.map(node => node.href));
          assert.ok(links.some(url => url.startsWith('https://www.shandan.gov.cn/') && url.endsWith('.pdf')));
          assert.ok(links.some(url => url.startsWith('https://openstd.samr.gov.cn/')));
          await textarea().fill('　９１３５０１００ｍ０００１００ｙ４３ ');
          await submit().focus(); await page.keyboard.press('Space');
          assert.equal(await root().getByTestId('social-credit-number').innerText(), MASKED);
          assert.equal(await root().locator('dd').count(), 0);
          assert.equal(await reveal().getAttribute('aria-pressed'), 'false');
          const status = await root().getByRole('status').innerText();
          assert.ok(status.trim());
          const readout = await root().locator('ol > li > p').first().innerText();
          assert.match(readout, /MOD 31/);
          if (locale !== 'en') {
            assert.doesNotMatch(status, /rows checked/);
            assert.doesNotMatch(readout, /Structure and outer MOD 31 pass/);
          }
          await reveal().click();
          assert.equal(await root().getByTestId('social-credit-number').innerText(), EXAMPLE);
          assert.deepEqual(await root().locator('dd').allTextContents(), ['9', '1', '350100', 'M000100Y4', '3']);
          assert.equal(await root().getByTestId('social-credit-number').getAttribute('dir'), 'ltr');
          assert.match(await root().innerText(), /GB11714/);
          const badTargets = await root().locator('button,textarea,a').evaluateAll(nodes => nodes
            .filter(node => node.getBoundingClientRect().height < 44 || (node.tagName === 'TEXTAREA' ? !node.labels?.length : !node.textContent.trim()))
            .map(node => node.outerHTML));
          assert.deepEqual(badTargets, []);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        });
        await page.addScriptTag({ path: axePath });
        audits.push(await audit(page, locale, 'revealed-results', 'light'));
        if (locale === 'en' || locale === 'ar') await root().screenshot({ path: join(reportDir, `social-credit-${locale}-light.png`) });
        await setDark(page, true);
        audits.push(await audit(page, locale, 'revealed-results', 'dark'));
        if (locale === 'en' || locale === 'ar') await root().screenshot({ path: join(reportDir, `social-credit-${locale}-dark.png`) });
        await setDark(page, false);
      }
      await visit('en');
      await check('mixed batches retain original line numbers and explain outer checksum failure', async () => {
        await run(`${EXAMPLE}\n\n${EXAMPLE.slice(0, 17)}0\r\n${EXAMPLE.toLowerCase()}`);
        assert.match(await root().getByRole('status').innerText(), /3 rows checked; 2 pass; 1 fail/);
        const rows = await root().locator('ol > li > p:first-child').allTextContents();
        assert.match(rows[0], /Line 1/); assert.match(rows[1], /Line 3/); assert.match(rows[2], /Line 4/);
        assert.match(await root().innerText(), /outer MOD 31 check character does not match/);
      });
      await check('100 nonblank rows are accepted without truncation', async () => {
        await run(Array(100).fill(EXAMPLE).join('\n'));
        assert.equal(await root().getByTestId('social-credit-number').count(), 100);
        assert.match(await root().getByRole('status').innerText(), /100 rows checked; 100 pass; 0 fail/);
      });
      await check('101 rows fail atomically with an associated accessible error', async () => {
        await run(Array(101).fill(EXAMPLE).join('\n'));
        assert.match(await root().getByRole('alert').innerText(), /no more than 100 nonblank lines/);
        assert.equal(await root().getByTestId('social-credit-number').count(), 0);
        assert.equal(await textarea().getAttribute('aria-invalid'), 'true');
        const described = (await textarea().getAttribute('aria-describedby')).split(' ');
        assert.ok(await page.locator(`[id="${described.at(-1)}"]`).isVisible());
      });
      await page.addScriptTag({ path: axePath });
      audits.push(await audit(page, 'en', 'batch-error', 'light'));
      await setDark(page, true); audits.push(await audit(page, 'en', 'batch-error', 'dark')); await setDark(page, false);
      await check('raw batches over 20000 UTF-16 units are rejected', async () => {
        await run('A'.repeat(20_001));
        assert.match(await root().getByRole('alert').innerText(), /20,000 UTF-16/);
        assert.equal(await root().getByTestId('social-credit-number').count(), 0);
      });
      await check('oversized raw lines fail and editing recovers cleanly', async () => {
        await run('A'.repeat(257));
        assert.match(await root().innerText(), /raw line is limited to 256 UTF-16/);
        assert.equal(await root().getByTestId('social-credit-number').innerText(), '—');
        await textarea().fill(EXAMPLE);
        assert.equal(await root().getByTestId('social-credit-number').count(), 0);
        await submit().click();
        assert.equal(await root().getByTestId('social-credit-number').innerText(), MASKED);
      });
      await check('unknown code tables and internal GB11714 validity are not inferred', async () => {
        await run(withCheck('AA999999AAAAAAAAA'));
        assert.match(await root().getByRole('status').innerText(), /1 pass; 0 fail/);
        assert.match(await root().innerText(), /Internal GB11714 organization-code rules are not checked/);
        assert.match(await root().innerText(), /passing is not proof of a genuine or active entity/);
      });
      await run(EXAMPLE);
      audits.push(await audit(page, 'en', 'masked-results', 'light'));
      await setDark(page, true); audits.push(await audit(page, 'en', 'masked-results', 'dark')); await setDark(page, false);
      const copyAndDownload = async visible => {
        await root().getByRole('button', { name: 'Copy displayed TXT', exact: true }).click();
        const copied = await page.evaluate(() => navigator.clipboard.readText());
        assert.ok(copied.includes(visible));
        if (visible === MASKED) assert.ok(!copied.includes(EXAMPLE));
        const pending = page.waitForEvent('download');
        await root().getByRole('button', { name: 'Download displayed TXT', exact: true }).click();
        const download = await pending;
        assert.equal(download.suggestedFilename(), 'social-credit-validation.txt');
        const file = join(reportDir, `social-credit-${visible === MASKED ? 'masked' : 'revealed'}.txt`);
        await download.saveAs(file);
        assert.equal(await readFile(file, 'utf8'), copied + '\n');
      };
      await check('masked clipboard and TXT contain only currently visible text', async () => { await copyAndDownload(MASKED); });
      await reveal().click();
      await check('revealed clipboard and TXT preserve the complete 18-character code', async () => { await copyAndDownload(EXAMPLE); });
      await check('editing removes old output and the next run masks again', async () => {
        await textarea().fill(EXAMPLE.toLowerCase());
        assert.equal(await root().getByTestId('social-credit-number').count(), 0);
        await submit().click();
        assert.equal(await root().getByTestId('social-credit-number').innerText(), MASKED);
        assert.equal(await root().locator('dd').count(), 0);
      });
      await check('clear removes inputs, results and recoverable errors', async () => {
        await root().getByRole('button', { name: 'Clear', exact: true }).click();
        assert.equal(await textarea().inputValue(), '');
        assert.equal(await root().getByTestId('social-credit-number').count(), 0);
        await submit().click(); assert.match(await root().getByRole('alert').innerText(), /Enter at least one code/);
        await root().getByRole('button', { name: 'Clear', exact: true }).click();
        assert.equal(await root().getByRole('alert').count(), 0);
      });
      const delayedCopy = async (action, outcome) => {
        await run(EXAMPLE);
        if (action === 'hide') await reveal().click();
        await page.evaluate(() => {
          const clipboard = navigator.clipboard;
          const descriptor = Object.getOwnPropertyDescriptor(clipboard, 'writeText');
          Object.defineProperty(clipboard, 'writeText', { configurable: true, value: () => new Promise((resolve, reject) => {
            window.__socialCreditCopyPending = { resolve, reject };
          }) });
          window.__socialCreditRestoreClipboard = () => {
            if (descriptor) Object.defineProperty(clipboard, 'writeText', descriptor);
            else delete clipboard.writeText;
            delete window.__socialCreditCopyPending;
            delete window.__socialCreditRestoreClipboard;
          };
        });
        try {
          await root().getByRole('button', { name: 'Copy displayed TXT', exact: true }).click();
          assert.ok(await page.evaluate(() => Boolean(window.__socialCreditCopyPending)));
          if (action === 'edit') await textarea().fill(EXAMPLE.toLowerCase());
          else if (action === 'clear') await root().getByRole('button', { name: 'Clear', exact: true }).click();
          else if (action === 'rerun') await submit().click();
          else await reveal().click();
          const expected = await root().getByRole('status').innerText();
          await page.evaluate(fail => {
            const pending = window.__socialCreditCopyPending;
            if (fail) pending.reject(new Error('Injected delayed clipboard failure'));
            else pending.resolve();
          }, outcome === 'reject');
          // Let promise continuations and React's visible commit cross a paint.
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          assert.equal(await root().getByRole('status').innerText(), expected, `${action}/${outcome}: an obsolete clipboard result must not replace the current status`);
        } finally { await page.evaluate(() => window.__socialCreditRestoreClipboard?.()); }
      };
      const delayedCopyCases = async actions => {
        const failures = [];
        for (const action of actions) for (const outcome of ['resolve', 'reject']) {
          try { await delayedCopy(action, outcome); }
          catch (error) { failures.push(error.message); }
        }
        assert.deepEqual(failures, []);
      };
      await check('delayed clipboard success or failure cannot overwrite edited or cleared states', async () => { await delayedCopyCases(['edit', 'clear']); });
      await check('delayed clipboard success or failure cannot overwrite a rerun', async () => { await delayedCopyCases(['rerun']); });
      await check('delayed clipboard success or failure cannot overwrite reveal or mask changes', async () => { await delayedCopyCases(['reveal', 'hide']); });
      await check('unavailable blob URLs announce download failure with a working copy fallback', async () => {
        await visit('en'); await run(EXAMPLE);
        await page.evaluate(() => {
          const descriptor = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
          Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: () => { throw new DOMException('Injected unavailable blob URL', 'NotSupportedError'); } });
          window.__socialCreditRestoreBlobURL = () => { Object.defineProperty(URL, 'createObjectURL', descriptor); delete window.__socialCreditRestoreBlobURL; };
        });
        try {
          await root().getByRole('button', { name: 'Download displayed TXT', exact: true }).click();
          assert.equal(await root().getByRole('status').innerText(), 'The TXT could not be prepared. Copy the displayed result instead.');
        } finally { await page.evaluate(() => window.__socialCreditRestoreBlobURL?.()); }
        await root().getByRole('button', { name: 'Copy displayed TXT', exact: true }).click();
        await root().getByRole('status').filter({ hasText: 'Displayed text copied.' }).waitFor();
        assert.equal(await root().getByRole('status').innerText(), 'Displayed text copied.');
        assert.ok((await page.evaluate(() => navigator.clipboard.readText())).includes(MASKED));
      });
      await check('failed anchor clicks still revoke the created blob URL and announce recovery', async () => {
        await visit('en'); await run(EXAMPLE);
        await page.evaluate(() => {
          const create = URL.createObjectURL, revoke = URL.revokeObjectURL, click = HTMLAnchorElement.prototype.click;
          const state = { created: [], revoked: [] };
          window.__socialCreditBlobState = state;
          URL.createObjectURL = value => { const url = create.call(URL, value); state.created.push(url); return url; };
          URL.revokeObjectURL = url => { state.revoked.push(url); return revoke.call(URL, url); };
          HTMLAnchorElement.prototype.click = () => { throw new DOMException('Injected unavailable anchor download', 'NotSupportedError'); };
          window.__socialCreditRestoreAnchor = () => {
            URL.createObjectURL = create; URL.revokeObjectURL = revoke; HTMLAnchorElement.prototype.click = click;
            for (const url of state.created) if (!state.revoked.includes(url)) revoke.call(URL, url);
            delete window.__socialCreditBlobState; delete window.__socialCreditRestoreAnchor;
          };
        });
        try {
          await root().getByRole('button', { name: 'Download displayed TXT', exact: true }).click();
          const failures = [];
          if (await root().getByRole('status').innerText() !== 'The TXT could not be prepared. Copy the displayed result instead.') failures.push('download failure was not announced');
          try {
            await page.waitForFunction(() => window.__socialCreditBlobState.created.length === 1 && window.__socialCreditBlobState.revoked.includes(window.__socialCreditBlobState.created[0]), undefined, { timeout: 3000 });
          } catch { failures.push('created blob URL was not revoked after anchor click failed'); }
          assert.deepEqual(failures, []);
        } finally { await page.evaluate(() => window.__socialCreditRestoreAnchor?.()); }
      });
      await check('offline checks do not put inputs in requests, storage, URL or console', async () => {
        const requests = [], messages = [];
        const onRequest = request => requests.push(request.url() + ' ' + (request.postData() || ''));
        const onConsole = message => messages.push(message.text());
        page.on('request', onRequest); page.on('console', onConsole);
        try {
          await context.setOffline(true);
          await run(EXAMPLE);
          assert.match(await root().getByRole('status').innerText(), /1 pass; 0 fail/);
          assert.equal(requests.filter(value => value.includes(EXAMPLE)).length, 0);
          assert.equal(messages.filter(value => value.includes(EXAMPLE)).length, 0);
          assert.equal(page.url(), baseURL + '/en/tools/social-credit-validator');
          const storage = await page.evaluate(() => JSON.stringify({ local: Object.entries(localStorage), session: Object.entries(sessionStorage) }));
          assert.ok(!storage.includes(EXAMPLE));
        } finally { await context.setOffline(false); page.off('request', onRequest); page.off('console', onConsole); }
      });
      finished = true;
    } catch (error) { issues.push({ name: 'browser flow', error: error.message }); }
    finally {
      page.off('pageerror', onPageError);
      await context.setOffline(false);
      await page.evaluate(() => document.documentElement.classList.remove('dark')).catch(() => {});
    }
  }
  if (pageErrors.length) issues.push({ name: 'uncaught browser errors', error: pageErrors.join('\n') });
  const audited = audits.length === EXPECTED_AUDITS;
  const violations = audits.reduce((sum, item) => sum + item.violations.length, 0);
  const incomplete = audits.reduce((sum, item) => sum + item.incomplete.length, 0);
  const failedAudits = audits.filter(item => item.violations.length || item.incomplete.length).length;
  const accessibility = {
    status: !audited ? 'not_completed' : violations ? 'failed' : incomplete ? 'needs_review' : 'passed',
    expectedStates: EXPECTED_AUDITS, completedStates: audits.length,
    violations: audited ? violations : null, incomplete: audited ? incomplete : null,
  };
  const passed = checks.filter(item => item.passed).length;
  const failed = checks.length - passed + issues.length + failedAudits;
  const completed = finished && checks.length === EXPECTED_CHECKS && audited;
  const report = {
    ok: completed && failed === 0, completed, expectedChecks: EXPECTED_CHECKS, passed, failed,
    checks, issues, pageErrors, accessibilityAuditRun: audited, accessibility, audits,
  };
  await writeFile(join(reportDir, 'social-credit-checks.json'), JSON.stringify(report, null, 2));
  return report;
}
