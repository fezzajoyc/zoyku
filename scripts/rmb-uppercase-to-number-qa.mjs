import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const tool = '[data-rmb-uppercase-to-number-tool]';
const status = `${tool} p[role="status"]`;
const filename = 'rmb-uppercase-to-number.txt';
const official = [
  ['人民币壹仟肆佰零玖元伍角', '1409.50', '人民币壹仟肆佰零玖元伍角整'],
  ['人民币陆仟零柒元壹角肆分', '6007.14'],
  ['人民币壹仟陆佰捌拾元零叁角贰分', '1680.32'],
  ['人民币壹仟陆佰捌拾元叁角贰分', '1680.32', '人民币壹仟陆佰捌拾元零叁角贰分'],
  ['人民币壹拾万柒仟元零伍角叁分', '107000.53'],
  ['人民币壹拾万零柒仟元伍角叁分', '107000.53', '人民币壹拾万柒仟元零伍角叁分'],
  ['人民币壹万陆仟肆佰零玖元零贰分', '16409.02'],
  ['人民币叁佰贰拾伍元零肆分', '325.04'],
];
const names = {
  en: 'RMB Uppercase to Number', zh: '人民币大写转数字', ja: '人民元大字を数字に変換',
  es: 'Mayúsculas RMB a número', pt: 'Maiúsculas RMB para número', fr: 'Majuscules RMB en nombres',
  de: 'RMB-Finanzzeichen in Zahlen', ru: 'Финансовая запись RMB в число', it: 'Maiuscole RMB in numero',
  tr: 'RMB mali yazımından sayıya', ko: '위안 재무 대문자를 숫자로', ar: 'حروف RMB المالية إلى أرقام',
  hi: 'RMB वित्तीय अक्षर से संख्या', id: 'Huruf besar RMB ke angka', vi: 'Chữ số tài chính RMB sang số',
};
const notices = {
  copy: 'Current result copied.', download: 'Current TXT download prepared.',
  downloadFailed: 'The TXT could not be prepared. Copy the displayed result instead.',
  copyFailed: 'Copy failed. Select the result text below and copy it manually, or try again.',
  ready: 'Amount converted.', empty: 'Enter an amount and convert it to see the result.',
};
const HTML_LANG = { zh: 'zh-CN', pt: 'pt-BR' };
const plain = value => JSON.parse(JSON.stringify(value));

/** Supply a Playwright Page and a local axe bundle. The caller owns the browser. */
export default async function rmbUppercaseToNumberBrowserQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  reportDir = join(tmpdir(), 'zoyku-rmb-uppercase-to-number'),
  axePath,
} = {}) {
  if (!axePath) throw new Error('RMB reverse QA requires an axePath to a local axe bundle');
  const axeSource = await readFile(axePath, 'utf8');
  await mkdir(reportDir, { recursive: true });
  const checks = [], audits = [], pageErrors = [];
  const originalViewport = page.viewportSize();
  const onError = error => pageErrors.push(error.message);
  const root = () => page.locator(tool);
  const input = () => root().locator('form textarea');
  const submit = () => root().locator('button[type="submit"]');
  const result = () => root().getByTestId('rmb-reverse-decimal');
  const canonicalOutput = () => root().getByTestId('rmb-reverse-canonical');
  const click = name => root().getByRole('button', { name, exact: true }).click();

  async function check(name, test) {
    try { await test(); checks.push({ name, passed: true }); }
    catch (error) { checks.push({ name, passed: false, error: error.message }); }
  }
  async function visit(locale = 'en') {
    const response = await page.goto(`${baseURL.replace(/\/$/, '')}/${locale}/tools/rmb-uppercase-to-number`);
    assert.equal(response?.status(), 200);
    await input().waitFor();
  }
  async function expectStatus(message) {
    await page.waitForFunction(({ status, message }) => document.querySelector(status)?.textContent === message, { status, message });
  }
  async function expectResult(amount, canonical) {
    await result().waitFor();
    assert.equal(await result().textContent(), `￥${amount}`);
    assert.equal(await root().getByTestId('rmb-reverse-fen').textContent(), String(BigInt(amount.replace('.', ''))));
    assert.equal(await canonicalOutput().inputValue(), canonical);
  }
  async function convert(raw, amount, canonical = raw) {
    await input().fill(raw);
    await submit().click();
    await expectResult(amount, canonical);
  }
  async function expectInvalid(raw, message) {
    await input().fill(raw);
    await submit().click();
    const error = root().getByRole('alert');
    await error.waitFor();
    assert.match(await error.textContent(), message);
    assert.equal(await input().getAttribute('aria-invalid'), 'true');
    assert.equal(await result().count(), 0);
    assert.ok(await input().evaluate(el => el === document.activeElement));
  }
  async function download() {
    const pending = page.waitForEvent('download', { timeout: 5000 });
    await click('Download current TXT');
    const file = await pending;
    assert.equal(file.suggestedFilename(), filename);
    return file;
  }
  const exportText = (amount, fen, canonical) => `Normalized Arabic amount: ￥${amount}\nInteger fen: ${fen}\nCanonical financial wording: ${canonical}`;

  page.on('pageerror', onError);
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await visit();
    await check('initial state presents grammar, bounds and official source', async () => {
      await expectStatus(notices.empty);
      assert.equal(await input().inputValue(), '');
      assert.equal(await result().count(), 0);
      assert.equal(await root().getByRole('link', { name: 'Read the official wording rules' }).getAttribute('href'), 'https://www.cncc.cn/zcfg/200903/t20090323_286.html');
      assert.match(await root().innerText(), /128 raw UTF-16 code units/);
    });
    for (const [raw, amount, canonical] of official) {
      await check(`official spelling ${raw}`, () => convert(raw, amount, canonical));
    }
    await check('keyboard submits a second result and Clear restores input focus', async () => {
      await input().fill('壹元整');
      await submit().press('Enter');
      await expectResult('1.00', '人民币壹元整');
      await root().getByRole('button', { name: 'Clear', exact: true }).press('Space');
      await expectStatus(notices.empty);
      assert.equal(await input().inputValue(), '');
      assert.ok(await input().evaluate(el => el === document.activeElement));
      assert.equal(await result().count(), 0);
    });
    for (const [label, raw, expected] of [
      ['empty', '', /Enter an amount/],
      ['extra text', 'abc壹元整', /outside the supported strict financial grammar/],
      ['repeated units', '壹佰佰元整', /outside the supported strict financial grammar/],
      ['internal newline', '壹元\n整', /outside the supported strict financial grammar/],
      ['misplaced suffix', '壹元壹角贰分整', /outside the supported strict financial grammar/],
      ['oversize', ' '.repeat(126) + '壹元整', /at most 128 UTF-16 code units/],
    ]) {
      await check(`${label} input reports the error and permits correction`, async () => {
        await expectInvalid(raw, expected);
        await convert(...official[1]);
        assert.equal(await root().getByRole('alert').count(), 0);
        assert.equal(await input().getAttribute('aria-invalid'), 'false');
      });
    }
    await check('normalizes disclosed outer spaces and traditional forms', async () => {
      await convert('　人民币貳圓正 ', '2.00', '人民币贰元整');
      assert.match(await root().innerText(), /The disclosed normalization was applied/);
    });
    await check('maximum and minimum decimals remain exact', async () => {
      await convert('零元整', '0.00', '人民币零元整');
      const max = '玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分';
      await convert(max, '999999999999.99', `人民币${max}`);
    });
    await check('copy and TXT both contain the three current values', async () => {
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
      try {
        await convert(...official[1]);
        await click('Copy current result');
        await expectStatus(notices.copy);
        assert.equal(await page.evaluate(() => navigator.clipboard.readText()), exportText('6007.14', '600714', official[1][0]));
      } finally { await page.context().clearPermissions(); }
      await convert(...official[7]);
      const file = await download();
      await expectStatus(notices.download);
      const path = join(reportDir, filename);
      await file.saveAs(path);
      assert.equal(await readFile(path, 'utf8'), exportText('325.04', '32504', official[7][0]) + '\n');
    });
    await check('clipboard denial, fallback and retry', async () => {
      await convert(...official[1]);
      await page.evaluate(() => {
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
          writeText: () => Promise.reject(new DOMException('Clipboard denied', 'NotAllowedError')),
        } });
      });
      await click('Copy current result');
      await expectStatus(notices.copyFailed);
      await expectResult(official[1][1], official[1][0]);
      await page.evaluate(() => { navigator.clipboard.writeText = async () => {}; });
      await click('Copy current result');
      await expectStatus(notices.copy);
    });
    await check('blocked download reports recovery and revokes the Blob URL', async () => {
      await visit();
      await convert(...official[1]);
      await page.evaluate(filename => {
        const click = HTMLAnchorElement.prototype.click;
        const create = URL.createObjectURL.bind(URL);
        const revoke = URL.revokeObjectURL.bind(URL);
        window.rmbReverseDownloads = { created: [], revoked: [] };
        URL.createObjectURL = blob => {
          const url = create(blob);
          window.rmbReverseDownloads.created.push(url);
          return url;
        };
        URL.revokeObjectURL = url => {
          window.rmbReverseDownloads.revoked.push(url);
          revoke(url);
        };
        HTMLAnchorElement.prototype.click = function () {
          if (this.download === filename) throw new DOMException('Download blocked', 'NotAllowedError');
          return click.call(this);
        };
      }, filename);
      await click('Download current TXT');
      await expectStatus(notices.downloadFailed);
      await expectResult(official[1][1], official[1][0]);
      await page.waitForFunction(() => window.rmbReverseDownloads.revoked.length === 1);
      const objects = await page.evaluate(() => window.rmbReverseDownloads);
      assert.equal(objects.created.length, 1);
      assert.deepEqual(plain(objects.created), plain(objects.revoked));
    });
    for (const newAction of ['successfully downloading', 'a failed download', 'copying again', 'clearing', 'editing']) {
      await check(`a delayed copy cannot replace the state after ${newAction}`, async () => {
        await visit();
        await convert(...official[1]);
        await page.evaluate(() => {
          window.rmbReversePendingCopies = [];
          Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
            writeText: () => new Promise((resolve, reject) => window.rmbReversePendingCopies.push({ resolve, reject })),
          } });
        });
        const settle = (index, outcome) => page.evaluate(async ({ index, outcome }) => {
          window.rmbReversePendingCopies[index][outcome](new DOMException('Clipboard denied', 'NotAllowedError'));
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        }, { index, outcome });
        await click('Copy current result');
        let expected = notices.empty;
        if (newAction === 'successfully downloading') { await download(); expected = notices.download; }
        if (newAction === 'a failed download') {
          await page.evaluate(() => { URL.createObjectURL = () => { throw new DOMException('Blob blocked', 'NotSupportedError'); }; });
          await click('Download current TXT');
          expected = notices.downloadFailed;
        }
        if (newAction === 'copying again') { await click('Copy current result'); await settle(1, 'reject'); expected = notices.copyFailed; }
        if (newAction === 'clearing') await click('Clear');
        if (newAction === 'editing') await input().fill('壹元整');
        await expectStatus(expected);
        await settle(0, 'resolve');
        assert.equal(await page.locator(status).innerText(), expected);
        if (expected === notices.empty) assert.equal(await result().count(), 0);
      });
    }
    await check('conversion stays in the tab and works offline after loading', async () => {
      await visit();
      const requests = [];
      const track = request => requests.push(request.url() + '\n' + (request.postData() ?? ''));
      page.on('request', track);
      try {
        await page.context().setOffline(true);
        await convert(...official[1]);
        await expectStatus(notices.ready);
        const encoded = encodeURIComponent(official[1][0]);
        assert.ok(!page.url().includes(encoded));
        assert.ok(!requests.some(request => request.includes(encoded) || request.includes(official[1][0])));
      } finally {
        await page.context().setOffline(false);
        page.off('request', track);
      }
    });
    for (const [locale, title] of Object.entries(names)) {
      await check(`localized ${locale} tool converts the Chinese sample`, async () => {
        await visit(locale);
        assert.equal(await page.locator('h1').innerText(), title);
      assert.equal(await page.locator('html').getAttribute('lang'), HTML_LANG[locale] ?? locale);
        const label = await root().locator('form label').innerText();
        assert.ok(label.length > 0);
        if (locale !== 'en') assert.notEqual(label, 'Chinese financial uppercase amount');
        await convert(...official[1]);
      });
    }
    for (const locale of ['zh', 'ar']) {
      await check(`320px ${locale} layout stays within the viewport`, async () => {
        await page.setViewportSize({ width: 320, height: 800 });
        await visit(locale);
        assert.equal(await page.locator('html').getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');
        await convert(...official[1]);
        assert.equal(await input().getAttribute('dir'), 'ltr');
        assert.equal(await canonicalOutput().getAttribute('dir'), 'ltr');
        const layout = await root().evaluate(el => ({
          width: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          controls: [...el.querySelectorAll('button, textarea')].map(control => {
            const { left, right, height } = control.getBoundingClientRect();
            return { left, right, height };
          }),
        }));
        assert.equal(layout.scrollWidth, layout.width);
        assert.ok(layout.controls.every(({ left, right, height }) => left >= 0 && right <= layout.width && height >= 44), JSON.stringify(layout));
        await page.screenshot({ path: join(reportDir, `rmb-reverse-320-${locale}.png`), fullPage: true });
      });
    }
    if (originalViewport) await page.setViewportSize(originalViewport);
    for (const dark of [false, true]) {
      for (const state of ['empty', 'result', 'error']) {
        const theme = dark ? 'dark' : 'light';
        await check(`axe ${theme} ${state}`, async () => {
          await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
          await visit();
          await page.evaluate(theme => {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            document.documentElement.dataset.theme = theme;
          }, theme);
          if (state === 'result') await convert(...official[1]);
          if (state === 'error') await expectInvalid('壹元', /outside the supported strict financial grammar/);
          await page.mouse.move(0, 0);
          await page.addScriptTag({ content: axeSource });
          const results = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
          const describe = item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })) });
          const violations = results.violations.map(describe);
          audits.push({ theme, state, violations, incomplete: results.incomplete.map(describe) });
          assert.deepEqual(plain(violations), []);
          if (state === 'result') await page.screenshot({ path: join(reportDir, `rmb-reverse-${theme}.png`), fullPage: true });
        });
      }
    }
  } finally {
    await page.context().setOffline(false);
    await page.emulateMedia({ colorScheme: null, reducedMotion: null });
    if (originalViewport) await page.setViewportSize(originalViewport);
    page.off('pageerror', onError);
  }
  const failed = checks.filter(check => !check.passed).length + pageErrors.length;
  const completed = audits.length === 6;
  const report = {
    ok: completed && failed === 0, completed, passed: checks.filter(check => check.passed).length, failed,
    checks, pageErrors, audits, scope: 'Browser behavior plus six automated accessibility states. Incomplete axe checks are recorded separately.',
  };
  await writeFile(join(reportDir, 'browser-report.json'), JSON.stringify(report, null, 2));
  return report;
}
