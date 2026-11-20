import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const SOURCE_URL = 'https://www.cncc.cn/zcfg/200903/t20090323_286.html';
const OFFICIAL_CASES = [
  ['1409.50', '人民币壹仟肆佰零玖元伍角整'],
  ['6007.14', '人民币陆仟零柒元壹角肆分'],
  ['1680.32', '人民币壹仟陆佰捌拾元零叁角贰分'],
  ['107000.53', '人民币壹拾万柒仟元零伍角叁分'],
  ['16409.02', '人民币壹万陆仟肆佰零玖元零贰分'],
  ['325.04', '人民币叁佰贰拾伍元零肆分'],
];
const NAMES = {
  en: 'RMB Amount in Chinese Uppercase', zh: '人民币金额大写', ja: '人民元の大字表記',
  es: 'Importe RMB en mayúsculas chinas', pt: 'Valor RMB em maiúsculas chinesas',
  fr: 'Montant RMB en chiffres financiers chinois', de: 'RMB-Betrag in chinesischen Finanzzeichen',
  ru: 'Сумма RMB китайскими финансовыми цифрами', it: 'Importo RMB in numerali finanziari cinesi',
  tr: 'Çince mali rakamlarla RMB tutarı', ko: '위안 금액 중국어 재무 대문자 변환',
  ar: 'مبلغ اليوان بالأرقام المالية الصينية', hi: 'चीनी वित्तीय अंकों में RMB राशि',
  id: 'Nominal RMB dalam angka finansial Tionghoa', vi: 'Số tiền RMB bằng chữ số tài chính Trung Quốc',
};

export const RMB_NOTICE_RACE_CASE_COUNT = 12;

/** Focused, one-navigation regression matrix; mocks only environment APIs. */
export async function rmbUppercaseNoticeRaceQA(page, { baseURL = 'http://127.0.0.1:3480', reportDir } = {}) {
  const checks = [], pageErrors = [];
  const root = () => page.locator('[data-rmb-uppercase-tool]');
  const status = () => root().locator('p[role="status"]');
  const copy = () => root().getByRole('button', { name: 'Copy current result', exact: true }).click();
  const notice = {
    copied: 'Current result copied.', copyFailed: 'Copy failed. Select the result text below and copy it manually, or try again.',
    downloaded: 'Current TXT download prepared.', downloadFailed: 'The TXT could not be prepared. Copy the displayed result instead.',
    ready: 'Amount converted. Check both displayed amounts.',
  };
  const onError = error => pageErrors.push(error.message);
  const expectNotice = async expected => {
    await page.waitForFunction(text => document.querySelector('[data-rmb-uppercase-tool] p[role="status"]')?.textContent === text, expected);
    assert.equal(await status().innerText(), expected);
  };
  const prepare = async () => {
    await root().getByRole('button', { name: 'Clear', exact: true }).click();
    await root().locator('input[type="text"]').fill('6007.14');
    await root().locator('button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector('[data-testid="rmb-uppercase-output"]')?.value === '人民币陆仟零柒元壹角肆分');
  };
  const pendingClipboard = () => page.evaluate(() => {
    window.__rmbNoticeCalls = [];
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: text => new Promise((resolve, reject) => window.__rmbNoticeCalls.push({ text, resolve, reject, settled: false })),
    } });
  });
  const settle = (index, outcome) => page.evaluate(async ({ index, outcome }) => {
    const call = window.__rmbNoticeCalls[index];
    if (!call) throw new Error(`Missing clipboard call ${index}`);
    call.settled = true;
    if (outcome === 'resolve') call.resolve();
    else call.reject(new DOMException('Expected clipboard denial', 'NotAllowedError'));
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }, { index, outcome });
  const download = async outcome => {
    if (outcome === 'success') {
      const pending = page.waitForEvent('download');
      await root().getByRole('button', { name: 'Download current TXT', exact: true }).click();
      assert.equal((await pending).suggestedFilename(), 'rmb-uppercase.txt');
      await expectNotice(notice.downloaded);
    } else {
      await page.evaluate(() => { URL.createObjectURL = () => { throw new DOMException('Expected Blob URL failure', 'NotSupportedError'); }; });
      try {
        await root().getByRole('button', { name: 'Download current TXT', exact: true }).click();
        await expectNotice(notice.downloadFailed);
      } finally { await page.evaluate(() => { URL.createObjectURL = window.__rmbNoticeOriginal.create; }); }
    }
  };
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) {
      checks.push({ name, passed: false, error: error.message, diagnostic: await page.evaluate(() => ({
        status: document.querySelector('[data-rmb-uppercase-tool] p[role="status"]')?.textContent,
        output: document.querySelector('[data-testid="rmb-uppercase-output"]')?.value,
        clipboardCalls: window.__rmbNoticeCalls?.map(call => ({ text: call.text, settled: call.settled })),
      })).catch(() => null) });
    } finally {
      await page.evaluate(async () => {
        for (const call of window.__rmbNoticeCalls ?? []) if (!call.settled) { call.settled = true; call.resolve(); }
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
    }
  };

  await page.goto(`${baseURL.replace(/\/$/, '')}/en/tools/rmb-uppercase`);
  await root().waitFor(); await page.waitForLoadState('networkidle');
  await page.evaluate(() => {
    window.__rmbNoticeOriginal = { clipboard: Object.getOwnPropertyDescriptor(navigator, 'clipboard'), create: URL.createObjectURL };
  });
  page.on('pageerror', onError);
  try {
    for (const latest of ['resolve', 'reject']) for (const late of ['resolve', 'reject']) {
      await check(`copy B ${latest} remains after earlier copy A ${late}`, async () => {
        await prepare(); await pendingClipboard(); await copy(); await copy();
        await settle(1, latest); const expected = latest === 'resolve' ? notice.copied : notice.copyFailed;
        await expectNotice(expected); await settle(0, late);
        assert.equal(await status().innerText(), expected, 'earlier clipboard completion replaced the later copy notice');
      });
    }
    for (const outcome of ['success', 'failure']) for (const late of ['resolve', 'reject']) {
      await check(`download ${outcome} remains after earlier copy ${late}`, async () => {
        await prepare(); await pendingClipboard(); await copy(); await download(outcome);
        await settle(0, late);
        assert.equal(await status().innerText(), outcome === 'success' ? notice.downloaded : notice.downloadFailed, 'earlier clipboard completion replaced the later download notice');
      });
    }
    for (const previous of ['copied', 'copyFailed', 'downloaded', 'downloadFailed']) {
      await check(`starting a pending copy clears previous ${previous} notice`, async () => {
        await prepare();
        if (previous === 'downloaded' || previous === 'downloadFailed') await download(previous === 'downloaded' ? 'success' : 'failure');
        else {
          await page.evaluate(fail => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { if (fail) throw new DOMException('Expected denied', 'NotAllowedError'); } } }), previous === 'copyFailed');
          await copy(); await expectNotice(notice[previous]);
        }
        await pendingClipboard(); await copy();
        assert.equal(await status().innerText(), notice.ready, 'previous completed notice remained visible during a new pending copy');
      });
    }
  } finally {
    await page.evaluate(() => {
      const original = window.__rmbNoticeOriginal;
      if (original.clipboard) Object.defineProperty(navigator, 'clipboard', original.clipboard);
      else delete navigator.clipboard;
      URL.createObjectURL = original.create;
      delete window.__rmbNoticeOriginal; delete window.__rmbNoticeCalls;
    });
    page.off('pageerror', onError);
  }
  const report = { ok: checks.length === RMB_NOTICE_RACE_CASE_COUNT && checks.every(check => check.passed) && pageErrors.length === 0,
    completed: checks.length === RMB_NOTICE_RACE_CASE_COUNT, expectedChecks: RMB_NOTICE_RACE_CASE_COUNT, checks, pageErrors };
  if (reportDir) { await mkdir(reportDir, { recursive: true }); await writeFile(join(reportDir, 'rmb-notice-races.json'), JSON.stringify(report, null, 2)); }
  return report;
}

/**
 * Real browser QA with a caller-owned page/context. No browser or machine path
 * is embedded here. Pass an installed axe.min.js path explicitly; a missing
 * dependency is an error, never a silently skipped accessibility audit.
 */
export async function rmbUppercaseBrowserQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  reportDir = join(tmpdir(), 'zoyku-rmb-uppercase'),
  axePath,
} = {}) {
  if (!axePath) throw new Error('rmbUppercaseBrowserQA requires an axePath option.');
  const axeSource = await readFile(axePath, 'utf8');
  const origin = new URL(baseURL).origin;
  baseURL = baseURL.replace(/\/$/, '');
  const checks = [], issues = [], audits = [], pageErrors = [];
  const expectedChecks = 47 + RMB_NOTICE_RACE_CASE_COUNT;
  const root = () => page.locator('[data-rmb-uppercase-tool]');
  const input = () => root().locator('input[type="text"]');
  const output = () => root().getByTestId('rmb-uppercase-output');
  const status = () => root().locator('p[role="status"]');
  const onPageError = error => pageErrors.push(error.message);
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) {
      const diagnostic = await page.evaluate(() => {
        const tool = document.querySelector('[data-rmb-uppercase-tool]');
        return {
          url: location.href,
          readyState: document.readyState,
          input: tool?.querySelector('input')?.value ?? null,
          status: tool?.querySelector('p[role="status"]')?.textContent ?? null,
          alert: tool?.querySelector('[role="alert"]')?.textContent ?? null,
          output: tool?.querySelector('[data-testid="rmb-uppercase-output"]')?.value ?? null,
        };
      }).catch(() => null);
      checks.push({ name, passed: false, error: error.message, diagnostic });
    }
  };
  const visit = async (locale = 'en') => {
    await page.goto(`${baseURL}/${locale}/tools/rmb-uppercase`);
    await root().waitFor();
    await input().waitFor();
    await page.waitForLoadState('networkidle');
  };
  const convert = async (value, expected) => {
    await input().fill(value);
    await root().locator('button[type="submit"]').click();
    await output().waitFor();
    await page.waitForFunction(text => document.querySelector('[data-testid="rmb-uppercase-output"]')?.value === text, expected);
    assert.equal(await output().inputValue(), expected);
  };
  const setTheme = async dark => {
    await page.mouse.move(0, 0);
    await page.evaluate(enabled => {
      localStorage.setItem('theme', enabled ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', enabled);
    }, dark);
    await page.waitForFunction(color => {
      const button = document.querySelector('[data-rmb-uppercase-tool] button[type="submit"]');
      return button && getComputedStyle(button).backgroundColor === color;
    }, dark ? 'rgb(0, 102, 204)' : 'rgb(87, 80, 230)');
  };

  let finished = false;
  page.on('pageerror', onPageError);
  try {
    await mkdir(reportDir, { recursive: true });
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const [value, expected] of OFFICIAL_CASES) {
      await check(`official example ${value}`, async () => {
        await visit();
        await convert(value, expected);
        assert.equal(await root().getByTestId('rmb-normalized-output').innerText(), '￥' + value);
        assert.equal(await root().locator('a').getAttribute('href'), SOURCE_URL);
      });
    }
    for (const [value, normalized, expected] of [
      ['0', '0.00', '人民币零元整'],
      ['999999999999.99', '999999999999.99', '人民币玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分'],
      ['　０００１２３．４５ ', '123.45', '人民币壹佰贰拾叁元肆角伍分'],
    ]) {
      await check(`boundary and normalization ${value}`, async () => {
        await visit(); await convert(value, expected);
        assert.equal(await root().getByTestId('rmb-normalized-output').innerText(), '￥' + normalized);
      });
    }
    for (const [value, message] of [
      ['-1', /digits and a decimal point/], ['+1', /digits and a decimal point/],
      ['1e3', /digits and a decimal point/], ['￥1', /digits and a decimal point/],
      ['1,000', /digits and a decimal point/], ['1.234', /two decimal places/],
      ['1000000000000', /maximum amount/], ['0'.repeat(129), /128 UTF-16/],
    ]) {
      await check(`explicit rejection ${value.length > 25 ? '129 characters' : value}`, async () => {
        await visit(); await convert('1', '人民币壹元整');
        await input().fill(value);
        assert.equal(await output().count(), 0, 'editing must remove the old result immediately');
        await root().locator('button[type="submit"]').click();
        assert.match(await root().getByRole('alert').innerText(), message);
        assert.equal(await input().getAttribute('aria-invalid'), 'true');
        assert.equal(await output().count(), 0);
      });
    }
    for (const [locale, name] of Object.entries(NAMES)) {
      await check(`authored ${locale} page, conversion, error and clear`, async () => {
        await visit(locale);
        assert.equal(await page.getByRole('heading', { level: 1 }).innerText(), name);
        await convert('１２３．４５', '人民币壹佰贰拾叁元肆角伍分');
        await input().fill('1.234');
        await root().locator('button[type="submit"]').click();
        const error = await root().getByRole('alert').innerText();
        assert.ok(error.length > 5);
        if (locale !== 'en') assert.notEqual(error, 'Use at most two decimal places. Nothing has been rounded.');
        await root().locator('form button[type="button"]').click();
        assert.equal(await input().inputValue(), '');
        assert.equal(await root().getByRole('alert').count(), 0);
        assert.equal(await output().count(), 0);
      });
    }
    await check('editing and Clear remove result, errors and notices', async () => {
      await visit(); await convert('6007.14', OFFICIAL_CASES[1][1]);
      await input().fill('325.04'); assert.equal(await output().count(), 0);
      await root().locator('button[type="submit"]').click();
      await output().waitFor();
      await root().getByRole('button', { name: 'Clear', exact: true }).click();
      assert.equal(await input().inputValue(), ''); assert.equal(await output().count(), 0);
      assert.match(await status().innerText(), /Enter an amount/);
    });
    await check('keyboard conversion, button order and Clear focus', async () => {
      await visit(); await input().focus(); await input().fill('0.01');
      await input().press('Enter'); await output().waitFor();
      assert.equal(await output().inputValue(), '人民币零元零壹分');
      await input().focus(); await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').innerText(), 'Convert amount');
      await page.keyboard.press('Tab'); assert.equal(await page.locator(':focus').innerText(), 'Clear');
      await page.keyboard.press('Enter'); assert.equal(await output().count(), 0);
      assert.equal(await input().evaluate(element => element === document.activeElement), true);
    });
    await check('real clipboard receives exactly the current displayed result', async () => {
      await visit(); await convert('6007.14', OFFICIAL_CASES[1][1]);
      await root().getByRole('button', { name: 'Copy current result', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('[data-rmb-uppercase-tool] [role="status"]')?.textContent === 'Current result copied.');
      const text = await page.evaluate(() => navigator.clipboard.readText());
      assert.equal(text, `Normalized Arabic amount: ￥6007.14\nChinese financial amount: ${OFFICIAL_CASES[1][1]}`);
    });
    await check('copy failure exposes selectable text and a recovery message', async () => {
      await visit(); await convert('325.04', OFFICIAL_CASES[5][1]);
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new DOMException('Denied', 'NotAllowedError'); } } }));
      await root().getByRole('button', { name: 'Copy current result', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('[data-rmb-uppercase-tool] [role="status"]')?.textContent?.startsWith('Copy failed.'));
      assert.match(await status().innerText(), /copy it manually/);
      await output().focus(); await output().press('ControlOrMeta+A');
      assert.equal(await output().evaluate(element => element.selectionEnd - element.selectionStart), OFFICIAL_CASES[5][1].length);
    });
    await check('pending copy cannot restore a stale notice after input changes', async () => {
      await visit(); await convert('1', '人民币壹元整');
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => new Promise(resolve => { window.__rmbResolveCopy = resolve; }) } }));
      await root().getByRole('button', { name: 'Copy current result', exact: true }).click();
      await input().fill('2'); await page.evaluate(() => window.__rmbResolveCopy());
      assert.equal(await output().count(), 0);
      assert.match(await status().innerText(), /Enter an amount/);
    });
    const noticeRaces = await rmbUppercaseNoticeRaceQA(page, { baseURL, reportDir });
    checks.push(...noticeRaces.checks);
    if (!noticeRaces.completed) issues.push('RMB notice race matrix did not complete');
    await check('TXT contains only the current displayed normalized and uppercase result', async () => {
      await visit(); await convert('16409.02', OFFICIAL_CASES[4][1]);
      const pending = page.waitForEvent('download');
      await root().getByRole('button', { name: 'Download current TXT', exact: true }).click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'rmb-uppercase.txt');
      const file = join(reportDir, 'rmb-uppercase.txt'); await download.saveAs(file);
      assert.equal(await readFile(file, 'utf8'), `Normalized Arabic amount: ￥16409.02\nChinese financial amount: ${OFFICIAL_CASES[4][1]}\n`);
    });
    await check('failed TXT click reports recovery and revokes its created Blob URL', async () => {
      await visit(); await convert('325.04', OFFICIAL_CASES[5][1]);
      const errorsBefore = pageErrors.length;
      await page.evaluate(() => {
        const create = URL.createObjectURL.bind(URL);
        const revoke = URL.revokeObjectURL.bind(URL);
        const click = HTMLAnchorElement.prototype.click;
        window.__rmbUrlLifecycle = { created: [], revoked: [] };
        URL.createObjectURL = blob => {
          const url = create(blob);
          window.__rmbUrlLifecycle.created.push(url);
          return url;
        };
        URL.revokeObjectURL = url => {
          window.__rmbUrlLifecycle.revoked.push(url);
          revoke(url);
        };
        HTMLAnchorElement.prototype.click = function () {
          if (this.download === 'rmb-uppercase.txt') throw new DOMException('Download blocked', 'NotAllowedError');
          return click.call(this);
        };
      });
      await root().getByRole('button', { name: 'Download current TXT', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('[data-rmb-uppercase-tool] p[role="status"]')?.textContent === 'The TXT could not be prepared. Copy the displayed result instead.');
      assert.equal(await output().inputValue(), OFFICIAL_CASES[5][1]);
      await page.waitForFunction(() => window.__rmbUrlLifecycle.revoked.length > 0, undefined, { timeout: 3000 }).catch(async error => {
        const lifecycle = await page.evaluate(() => window.__rmbUrlLifecycle);
        throw new Error(`Failed TXT download must revoke its Blob URL: ${JSON.stringify(lifecycle)}. ${error.message}`);
      });
      const lifecycle = await page.evaluate(() => window.__rmbUrlLifecycle);
      assert.equal(lifecycle.created.length, 1);
      assert.deepEqual(lifecycle.revoked, lifecycle.created, 'the created Blob URL must be revoked exactly once');
      assert.equal(pageErrors.length, errorsBefore, 'download failure must not emit a pageerror');
    });
    await check('conversion works offline after the page has loaded', async () => {
      await visit(); await page.context().setOffline(true);
      try { await convert('1409.50', OFFICIAL_CASES[0][1]); }
      finally { await page.context().setOffline(false); }
    });
    await check('amount is absent from requests and the page URL', async () => {
      await visit();
      const requests = [];
      const onRequest = request => requests.push(request.url() + '\n' + (request.postData() ?? ''));
      page.on('request', onRequest);
      try {
        await input().fill('987654321.09'); await root().locator('button[type="submit"]').click(); await output().waitFor();
        assert.ok(!page.url().includes('987654321'));
        assert.ok(!requests.some(request => request.includes('987654321')));
      } finally { page.off('request', onRequest); }
    });
    for (const dark of [false, true]) {
      for (const state of ['empty', 'result', 'error']) {
        await check(`axe ${dark ? 'dark' : 'light'} ${state}`, async () => {
          await visit(); await setTheme(dark);
          if (state === 'result') await convert('107000.53', OFFICIAL_CASES[3][1]);
          if (state === 'error') { await input().fill('1.234'); await root().locator('button[type="submit"]').click(); await root().getByRole('alert').waitFor(); }
          await page.mouse.move(0, 0);
          await page.addScriptTag({ content: axeSource });
          const results = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
          audits.push({ theme: dark ? 'dark' : 'light', state, violations: results.violations, incomplete: results.incomplete.map(item => ({ id: item.id, impact: item.impact, nodeCount: item.nodes.length, nodes: item.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })) })) });
          assert.equal(results.violations.length, 0, JSON.stringify(results.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })) }))));
          if (state === 'result') await page.screenshot({ path: join(reportDir, `rmb-${dark ? 'dark' : 'light'}.png`), fullPage: true });
        });
      }
    }
    finished = true;
  } catch (error) { issues.push(error.message); }
  finally {
    await page.context().setOffline(false);
    page.off('pageerror', onPageError);
    if (pageErrors.length) issues.push(...pageErrors.map(error => 'pageerror: ' + error));
    await mkdir(reportDir, { recursive: true });
  }
  const failed = checks.filter(check => !check.passed).length + issues.length;
  const completed = finished && checks.length === expectedChecks && audits.length === 6;
  const report = { ok: completed && failed === 0, completed, expectedChecks, passed: checks.filter(check => check.passed).length, failed, checks, issues, audits, sourceEvidence: { url: SOURCE_URL, officialCases: OFFICIAL_CASES, note: '角 without 分 consistently includes permitted 整; this does not check voucher validity or bank acceptance.' }, scope: 'Functional/localization/keyboard/offline checks and six automated axe states; not a full-site or manual WCAG conformance audit.' };
  await writeFile(join(reportDir, 'browser-report.json'), JSON.stringify(report, null, 2));
  return report;
}

export default rmbUppercaseBrowserQA;
