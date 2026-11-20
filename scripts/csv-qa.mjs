import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const LOCALES = ['en', 'zh', 'ja', 'es', 'pt', 'fr', 'de', 'ru', 'it', 'tr', 'ko', 'ar', 'hi', 'id', 'vi'];
const DELIMITERS = [',', ';', '\t'];
const EXPECTED_CHECKS = 46;

/**
 * Caller-owned Playwright page and installed axe bundle; no private runtime or
 * browser path. Captures actual clipboard CSV/TSV bytes as portable fixtures.
 * Reports are scoped to these tools and do not claim full WCAG conformance.
 */
export default async function csvQA(page, { baseURL = 'http://127.0.0.1:3480', reportDir = join(tmpdir(), 'zoyku-csv-qa'), axePath } = {}) {
  if (!axePath) throw new Error('csvQA requires an axePath browser bundle.');
  const axeSource = await readFile(axePath, 'utf8');
  await mkdir(reportDir, { recursive: true });
  baseURL = baseURL.replace(/\/$/, '');
  const checks = [], audits = [], issues = [], pageErrors = [];
  const root = () => page.locator('[data-csv-tool]');
  const input = () => root().locator('textarea:not([readonly])');
  const output = () => root().locator('textarea[readonly]');
  const alert = () => root().getByRole('alert');
  const settleControls = () => page.waitForFunction(() => {
    const button = document.querySelector('[data-csv-tool] [data-csv-delimiter][aria-pressed="true"]');
    if (!button) return false;
    const dark = document.documentElement.classList.contains('dark');
    const css = getComputedStyle(button);
    return css.color === (dark ? 'rgb(29, 29, 31)' : 'rgb(255, 255, 255)') && css.backgroundColor === (dark ? 'rgb(255, 255, 255)' : 'rgb(29, 29, 31)');
  });
  const onError = error => pageErrors.push(error.message);
  const check = async (name, action) => {
    try { await action(); checks.push({ name, passed: true }); }
    catch (error) {
      const diagnostic = await page.evaluate(() => ({ url: location.href,
        input: document.querySelector('[data-csv-tool] textarea:not([readonly])')?.value ?? null,
        output: document.querySelector('[data-csv-tool] textarea[readonly]')?.value ?? null,
        error: document.querySelector('[data-csv-tool] [role=alert]')?.textContent ?? null,
      })).catch(() => null);
      checks.push({ name, passed: false, error: error.message, diagnostic });
    }
  };
  const visit = async (direction, locale = 'en') => {
    const response = await page.goto(`${baseURL}/${locale}/tools/${direction === 'json2csv' ? 'json-to-csv' : 'csv-to-json'}`);
    assert.equal(response.status(), 200, `CSV document navigation returned HTTP ${response.status()}`);
    await root().waitFor(); await input().waitFor();
  };
  const delimiter = async value => {
    await root().locator(`[data-csv-delimiter="${value === '\t' ? 'tab' : value}"]`).click();
    assert.equal(await root().locator(`[data-csv-delimiter="${value === '\t' ? 'tab' : value}"]`).getAttribute('aria-pressed'), 'true');
  };
  const fill = async (text, expected) => {
    await input().fill(text);
    // HTML textareas normalize their DOM value to LF. Clipboard JSON→CSV
    // fixtures below separately assert the actual CRLF in the result state.
    const visible = expected.replace(/\r\n?/g, '\n');
    await page.waitForFunction(expected => document.querySelector('[data-csv-tool] textarea[readonly]')?.value === expected, visible);
    assert.equal(await output().inputValue(), visible);
    assert.equal(await alert().count(), 0);
  };
  const bad = async text => {
    await input().fill(text); await alert().waitFor();
    assert.equal(await output().inputValue(), '');
    assert.equal(await input().getAttribute('aria-invalid'), 'true');
  };
  const copy = async () => {
    const button = root().locator('button:not([data-csv-delimiter])');
    // The first non-delimiter button is the shared CopyButton, independent of locale.
    await button.first().click();
    return page.evaluate(() => navigator.clipboard.readText());
  };
  const encoded = (rows, d) => {
    const cell = value => { const text = String(value); return text.includes(d) || /["\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; };
    return rows.map(row => row.map(cell).join(d)).join('\n');
  };

  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  page.on('pageerror', onError);
  let finished = false;
  try {
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const d of DELIMITERS) {
      await check(`JSON to CSV selected ${JSON.stringify(d)} delimiter, real clipboard fixture`, async () => {
        await visit('json2csv'); await delimiter(d);
        const key = `名${d}字`, value = `张三😀${d}he said "hi"\r\nnext`;
        const expected = encoded([[key, 'id'], [value, '007'] ], d);
        await fill(JSON.stringify([{ [key]: value, id: '007' }]), expected);
        const actual = await copy(); assert.equal(actual, expected);
        const file = join(reportDir, d === '\t' ? 'tab-output.tsv' : d === ';' ? 'semicolon-output.csv' : 'comma-output.csv');
        await writeFile(file, actual, 'utf8'); assert.equal(await readFile(file, 'utf8'), expected);
      });
      await check(`CSV to JSON selected ${JSON.stringify(d)} delimiter and escaped records`, async () => {
        await visit('csv2json'); await delimiter(d);
        const text = encoded([['name', 'note'], ['张三😀', `x${d}y\r\n"quoted"`]], d);
        // Pasting into a browser textarea normalizes source CRLF to LF.
        await fill(text, JSON.stringify([{ name: '张三😀', note: `x${d}y\n"quoted"` }], null, 2));
      });
    }
    await check('JSON literals retain large integers, overflow, underflow, decimals and -0', async () => {
      await visit('json2csv');
      await fill('[{"a":9007199254740993,"b":1e309,"c":1e-400,"d":0.1234567890123456789,"e":-0}]', 'a,b,c,d,e\n9007199254740993,1e309,1e-400,0.1234567890123456789,-0');
    });
    await check('CSV unsafe and lossy numeric inference retains original text', async () => {
      await visit('csv2json');
      await fill('a,b,c,d,e\n9007199254740993,1e309,1e-400,0.1234567890123456789,-0', JSON.stringify([{ a: '9007199254740993', b: '1e309', c: '1e-400', d: '0.1234567890123456789', e: '-0' }], null, 2));
    });
    await check('JSON duplicate/syntax errors recover and Clear removes the current result', async () => {
      await visit('json2csv');
      for (const text of ['[{"a":1,"\\u0061":2}]', '[{"nested":{"a":1,"a":2}}]', '[{"a":1,}]', '[1]']) await bad(text);
      await fill('[{"ok":true}]', 'ok\ntrue');
      await root().locator('button').filter({ hasText: /^Clear$/ }).click();
      assert.equal(await input().inputValue(), ''); assert.equal(await output().inputValue(), ''); assert.equal(await alert().count(), 0);
    });
    await check('CSV duplicate headers, malformed quotes and width mismatch recover', async () => {
      await visit('csv2json');
      for (const text of ['a,a\n1,2', ',column1\n1,2', 'a,b\n"open', 'a,b\n1,2,3', 'a,b\n1']) await bad(text);
      await fill('a\n""\n"  "\n', JSON.stringify([{ a: '' }, { a: '  ' }], null, 2));
    });
    await check('ordinary numbers, booleans, null, leading-zero IDs and BOM keep the contract', async () => {
      await visit('csv2json');
      await fill('\uFEFFid,n,active,none,space\r\n007,1.25,true,null, 1 ', JSON.stringify([{ id: '007', n: 1.25, active: true, none: null, space: ' 1 ' }], null, 2));
    });
    await check('single-column empty, null and missing records survive the actual CSV copy', async () => {
      await visit('json2csv'); await fill('[{"a":""},{"a":null},{}]', 'a\n""\n""\n""');
      const actual = await copy(); assert.equal(actual, 'a\n""\n""\n""');
      await visit('csv2json'); await fill(actual, JSON.stringify([{ a: '' }, { a: '' }, { a: '' }], null, 2));
    });
    await check('a BOM before a quoted first header is accepted', async () => {
      await visit('csv2json'); await fill('\uFEFF"a","b"\r\n"1","2"', JSON.stringify([{ a: 1, b: 2 }], null, 2));
    });
    await check('current JSON clipboard output matches the visible output', async () => {
      await visit('csv2json'); const expected = JSON.stringify([{ name: '张三😀', id: '9007199254740993' }], null, 2);
      await fill('name,id\n张三😀,9007199254740993', expected); assert.equal(await copy(), expected);
    });
    await check('resource error is explicit and recovers without partial output', async () => {
      await visit('json2csv'); await bad(' '.repeat(1_000_001)); await fill('[{"ok":1}]', 'ok\n1');
    });
    for (const direction of ['json2csv', 'csv2json']) {
      await check(`${direction} works offline after the page loads`, async () => {
        await visit(direction); await page.context().setOffline(true);
        try { await fill(direction === 'json2csv' ? '[{"name":"离线😀"}]' : 'name\n离线😀', direction === 'json2csv' ? 'name\n离线😀' : JSON.stringify([{ name: '离线😀' }], null, 2)); }
        finally { await page.context().setOffline(false); }
      });
      await check(`${direction} keeps input out of URLs and requests`, async () => {
        await visit(direction); const marker = 'CSV_PRIVATE_TEST_2026', requests = [];
        const onRequest = request => requests.push(request.url() + '\n' + (request.postData() ?? '')); page.on('request', onRequest);
        try {
          await fill(direction === 'json2csv' ? JSON.stringify([{ private: marker }]) : 'private\n' + marker, direction === 'json2csv' ? 'private\n' + marker : JSON.stringify([{ private: marker }], null, 2));
          assert.ok(!page.url().includes(marker)); assert.ok(!requests.some(request => request.includes(marker)));
        } finally { page.off('request', onRequest); }
      });
    }
    for (const locale of LOCALES) {
      await check(`${locale} both directions, localized rules/errors, mobile width`, async () => {
        await page.setViewportSize({ width: 390, height: 844 });
        for (const direction of ['json2csv', 'csv2json']) {
          await visit(direction, locale); assert.equal(await root().locator('button[data-csv-delimiter]').count(), 3);
          assert.equal(await input().getAttribute('dir'), 'ltr'); assert.equal(await output().getAttribute('dir'), 'ltr');
          assert.ok((await root().innerText()).includes('9007199254740991') === (direction === 'csv2json'));
          await delimiter(';');
          await fill(direction === 'json2csv' ? '[{"name":"张三;😀"}]' : 'name\n"张三;😀"', direction === 'json2csv' ? 'name\n"张三;😀"' : JSON.stringify([{ name: '张三;😀' }], null, 2));
          await bad(direction === 'json2csv' ? '[{"x":1,"x":2}]' : 'x;x\n1;2');
          const message = await alert().innerText(); assert.ok(message.length > 5);
          if (locale !== 'en') assert.notEqual(message, 'Duplicate decoded JSON keys or CSV header names would lose data. Rename or remove the duplicate.');
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
          if (['en', 'zh', 'ar'].includes(locale)) {
            await settleControls();
            await page.screenshot({ path: join(reportDir, `mobile-${locale}-${direction}.png`), fullPage: true });
          }
        }
      });
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const direction of ['json2csv', 'csv2json']) for (const dark of [false, true]) for (const state of ['empty', 'result', 'error']) {
      await check(`axe ${direction} ${dark ? 'dark' : 'light'} ${state}`, async () => {
        await visit(direction); await page.evaluate(dark => document.documentElement.classList.toggle('dark', dark), dark);
        if (state === 'result') await fill(direction === 'json2csv' ? '[{"name":"张三😀"}]' : 'name\n张三😀', direction === 'json2csv' ? 'name\n张三😀' : JSON.stringify([{ name: '张三😀' }], null, 2));
        if (state === 'error') await bad(direction === 'json2csv' ? '[1]' : 'a,a\n1,2');
        await page.mouse.move(0, 0); await settleControls(); await page.addScriptTag({ content: axeSource });
        const audit = await page.evaluate(async () => {
          const result = await window.axe.run(document.querySelector('[data-csv-tool]'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
          const detail = item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })) });
          return { version: result.testEngine.version, violations: result.violations.map(detail), incomplete: result.incomplete.map(detail) };
        });
        audits.push({ direction, theme: dark ? 'dark' : 'light', state, ...audit });
        assert.deepEqual(audit.violations, [], JSON.stringify(audit.violations));
        if (state === 'result') await page.screenshot({ path: join(reportDir, `${direction}-${dark ? 'dark' : 'light'}.png`), fullPage: true });
      });
    }
    finished = true;
  } catch (error) { issues.push(error.message); }
  finally { await page.context().setOffline(false); page.off('pageerror', onError); }
  const completed = finished && checks.length === EXPECTED_CHECKS && audits.length === 12;
  const report = { ok: completed && checks.every(check => check.passed) && issues.length === 0 && pageErrors.length === 0, completed, expectedChecks: EXPECTED_CHECKS, checks, audits, issues, pageErrors,
    scope: 'Both CSV directions; local functional, authored locale, privacy, offline and tool-scoped automated axe checks. No claim of universal spreadsheet type preservation or complete WCAG conformance.' };
  await writeFile(join(reportDir, 'csv-report.json'), JSON.stringify(report, null, 2));
  return report;
}
