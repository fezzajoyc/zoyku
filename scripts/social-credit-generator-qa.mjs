import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const TOOL = '[data-social-credit-generator]';
const STATUS = `${TOOL} [role="status"]`;
const ROWS = `${TOOL} [data-testid="social-credit-generated-code"]`;
const FILENAME = 'social-credit-test-samples.txt';
const EXAMPLE = '91350100M000100Y43';
const MASKED = '913***********0Y43';
const ALPHABET = '0123456789ABCDEFGHJKLMNPQRTUWXY';
const FIELDS = ['department', 'category', 'addressCode', 'startBody', 'count'];
const FIXTURE = { department: '9', category: '1', addressCode: '350100', startBody: 'M000100Y', count: '1' };
const NAMES = {
  en: 'Unified Social Credit Code Generator', zh: '统一社会信用代码生成器', ja: '統一社会信用コード生成ツール',
  es: 'Generador de códigos de crédito social unificado', pt: 'Gerador de códigos de crédito social unificado',
  fr: 'Générateur de codes de crédit social unifié', de: 'Generator für einheitliche Sozialkreditcodes',
  ru: 'Генератор единого кода социального кредита', it: 'Generatore di codici di credito sociale unificato',
  tr: 'Birleşik Sosyal Kredi Kodu Oluşturucu', ko: '통합사회신용코드 생성기', ar: 'مولّد رموز الائتمان الاجتماعي الموحّد',
  hi: 'एकीकृत सामाजिक क्रेडिट कोड जनरेटर', id: 'Pembuat Kode Kredit Sosial Terpadu', vi: 'Tạo mã tín dụng xã hội thống nhất',
};
const NOTICES = {
  empty: 'Enter values and run the tool to see results.',
  generated: count => `Distinct test samples generated in this batch: ${count}.`,
  copied: 'Displayed text copied.', copyFailed: 'Copy failed. Select the displayed text and copy it manually.',
  downloaded: 'TXT download prepared.',
  downloadFailed: 'The TXT could not be prepared. Copy the displayed text instead, or try again.',
};
const EXPECTED_AUDITS = 8;
const HTML_LANG = { zh: 'zh-CN', pt: 'pt-BR' };
const plain = value => JSON.parse(JSON.stringify(value));

// Congruences verify both checks without importing the implementation or its outer weights.
function verifyCode(code) {
  assert.match(code, /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/);
  const innerWeights = [3n, 7n, 9n, 10n, 5n, 8n, 4n, 2n];
  const inner = [...code.slice(8, 16)].reduce((sum, char, index) => sum + BigInt(parseInt(char, 36)) * innerWeights[index], 0n);
  assert.equal((inner + (code[16] === 'X' ? 10n : BigInt(code[16]))) % 11n, 0n);
  const outer = [...code.slice(0, 17)].reduce((sum, char, index) => sum + BigInt(ALPHABET.indexOf(char)) * 3n ** BigInt(index), 0n);
  assert.equal((outer + BigInt(ALPHABET.indexOf(code[17]))) % 31n, 0n);
}

/**
 * Caller-owned Playwright Page; no browser creation, disposal or private paths.
 * Run in a dedicated context: viewport, media, clipboard permissions and offline
 * state change. Missing page/axe prerequisites produce an incomplete report.
 * Report, screenshots and exact downloaded fixtures are written to reportDir.
 */
export async function socialCreditGeneratorBrowserQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  reportDir = join(tmpdir(), 'zoyku-social-credit-generator'),
  axePath,
} = {}) {
  await mkdir(reportDir, { recursive: true });
  baseURL = baseURL.replace(/\/$/, '');
  const checks = [], issues = [], audits = [], pageErrors = [], scenarios = [];
  const add = (name, run) => scenarios.push({ name, run });
  const onPageError = error => pageErrors.push(error.message);
  let axeSource, finished = false;
  if (!page || typeof page.context !== 'function') issues.push({ name: 'browser prerequisite', error: 'Supply a caller-owned Playwright page.' });
  if (!axePath) issues.push({ name: 'accessibility prerequisite', error: `axePath is required; ${EXPECTED_AUDITS} required scoped light/dark audits were not run.` });
  else {
    try { axeSource = await readFile(axePath, 'utf8'); }
    catch (error) { issues.push({ name: 'accessibility prerequisite', error: `Could not read axePath: ${error.message}` }); }
  }
  const root = () => page.locator(TOOL);
  const input = field => root().getByTestId(`social-credit-generator-${field}`);
  const submit = () => root().locator('button[type="submit"]');
  const reveal = () => root().locator('button[aria-pressed]');
  const status = () => root().getByRole('status');
  const rows = () => root().getByTestId('social-credit-generated-code');
  const copy = () => root().getByRole('button', { name: 'Copy displayed TXT', exact: true });
  const download = () => root().getByRole('button', { name: 'Download displayed TXT', exact: true });
  const clear = () => root().getByRole('button', { name: 'Clear', exact: true });
  const paint = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const expectStatus = message => page.waitForFunction(({ selector, message }) => document.querySelector(selector)?.textContent === message,
    { selector: STATUS, message }, { timeout: 5000 });
  async function visit(locale = 'en') {
    const response = await page.goto(`${baseURL}/${locale}/tools/social-credit-generator`);
    assert.equal(response?.status(), 200);
    await page.locator('.site-theme-control button').waitFor();
    await submit().waitFor();
  }
  async function fill(values = {}) {
    for (const field of FIELDS) await input(field).fill(String(({ ...FIXTURE, ...values })[field]));
  }
  async function expectRows(expected) {
    await page.waitForFunction(({ selector, expected }) => JSON.stringify([...document.querySelectorAll(selector)].map(node => node.textContent)) === JSON.stringify(expected),
      { selector: ROWS, expected }, { timeout: 5000 });
    assert.deepEqual(plain(await rows().allTextContents()), expected);
  }
  async function generate(values = {}, expected = [MASKED]) {
    await fill(values); await submit().click();
    if (expected) await expectRows(expected);
  }
  async function prepare(values = {}, expected = [MASKED]) {
    await visit(); await generate(values, expected);
  }
  async function expectInvalid(field, raw, message, values = {}) {
    await fill({ ...values, [field]: raw }); await submit().click();
    await root().getByRole('alert').waitFor({ state: 'attached' });
    assert.match(await root().getByRole('alert').textContent(), message);
    assert.equal(await input(field).getAttribute('aria-invalid'), 'true');
    await page.waitForFunction(testid => document.activeElement?.getAttribute('data-testid') === testid, `social-credit-generator-${field}`);
    const descriptions = await input(field).evaluate(el => (el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean)
      .map(id => ({ exists: Boolean(document.getElementById(id)), text: document.getElementById(id)?.textContent })));
    assert.ok(descriptions.length > 0 && descriptions.every(description => description.exists));
    assert.ok(descriptions.some(description => message.test(description.text ?? '')), JSON.stringify(descriptions));
    assert.equal(await rows().count(), 0);
    await expectStatus(NOTICES.empty);
  }
  async function downloadText(label) {
    const pending = page.waitForEvent('download', { timeout: 5000 });
    await download().click();
    const file = await pending;
    assert.equal(file.suggestedFilename(), FILENAME);
    const path = join(reportDir, `${label}.txt`);
    await file.saveAs(path);
    return readFile(path, 'utf8');
  }
  async function restoreInjected() {
    await page.evaluate(() => {
      const state = window.__socialCreditGeneratorQA;
      if (state) {
        for (const pending of state.pending ?? []) pending.resolve();
        for (const restore of (state.restore ?? []).reverse()) restore();
        delete window.__socialCreditGeneratorQA;
      }
    });
    await paint();
  }
  async function installClipboard(mode = 'deferred') {
    await page.evaluate(mode => {
      const state = window.__socialCreditGeneratorQA ??= { pending: [], restore: [], downloads: { created: [], revoked: [] } };
      const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
      state.restore.push(() => { if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor); else delete navigator.clipboard; });
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: mode === 'missing' ? undefined : {
        writeText: text => {
          state.lastCopied = text;
          if (mode === 'denied') return Promise.reject(new DOMException('Injected clipboard denial', 'NotAllowedError'));
          if (mode === 'success') return Promise.resolve();
          return new Promise((resolve, reject) => state.pending.push({ resolve, reject, text }));
        },
      } });
    }, mode);
  }
  async function installDownload(mode) {
    await page.evaluate(({ mode, filename }) => {
      const state = window.__socialCreditGeneratorQA ??= { pending: [], restore: [], downloads: { created: [], revoked: [] } };
      const originalClick = HTMLAnchorElement.prototype.click;
      const originalCreate = URL.createObjectURL;
      const originalRevoke = URL.revokeObjectURL;
      state.restore.push(() => { HTMLAnchorElement.prototype.click = originalClick; URL.createObjectURL = originalCreate; URL.revokeObjectURL = originalRevoke; });
      URL.createObjectURL = function (blob) {
        if (mode === 'create-failure') throw new DOMException('Injected Blob URL failure', 'NotSupportedError');
        const url = originalCreate.call(URL, blob); state.downloads.created.push(url); return url;
      };
      URL.revokeObjectURL = function (url) { state.downloads.revoked.push(url); return originalRevoke.call(URL, url); };
      HTMLAnchorElement.prototype.click = function () {
        if (this.download !== filename) return originalClick.call(this);
        if (mode === 'click-failure') throw new DOMException('Injected download denial', 'NotAllowedError');
        // Successful notice races do not need another browser download fixture.
        if (mode === 'suppress-success') return;
        return originalClick.call(this);
      };
    }, { mode, filename: FILENAME });
  }
  async function settle(index, failed) {
    await page.evaluate(({ index, failed }) => {
      const pending = window.__socialCreditGeneratorQA.pending[index];
      if (failed) pending.reject(new DOMException('Injected clipboard denial', 'NotAllowedError'));
      else pending.resolve();
    }, { index, failed });
    await paint();
  }
  async function setDark(dark) {
    await page.emulateMedia({ colorScheme: dark ? 'dark' : 'light', reducedMotion: 'reduce' });
    await page.evaluate(dark => document.documentElement.classList.toggle('dark', dark), dark);
    await page.mouse.move(0, 0);
    await page.waitForFunction(selector => {
      const controls = [...document.querySelectorAll(`${selector} button`)].filter(node => !node.classList.contains('text-white'));
      return controls.length > 0 && controls.every(node => getComputedStyle(node).color === getComputedStyle(document.body).color);
    }, TOOL);
  }

  add('initial state exposes source, deterministic policy, raw bounds and labeled fields', async () => {
    await visit(); await expectStatus(NOTICES.empty);
    assert.equal(await rows().count(), 0);
    for (const field of FIELDS) assert.equal(await input(field).inputValue(), field === 'count' ? '10' : '');
    const text = await root().innerText();
    for (const wording of [/64 UTF-16/, /same inputs give the same batch/, /PDY00001–PDY99999/, /can coincide with assigned codes/, /not check department/]) assert.match(text, wording);
    assert.equal(await root().getByRole('link', { name: 'GB 11714-1997 (PDF)', exact: true }).getAttribute('href'), 'https://irss.cods.org.cn/cods/2020-10/29/12582hi/2026052817544819074.pdf');
    assert.match(await root().getByRole('link', { name: 'GB 32100-2015 (PDF)', exact: true }).getAttribute('href'), /^https:\/\/www\.shandan\.gov\.cn\/.+\.pdf$/);
    assert.ok((await root().locator('form label').allTextContents()).every(text => text.trim()));
  });
  add('full-width ASCII, lowercase and outer whitespace produce the official sample', async () => {
    await visit(); await generate({ department: '　９ ', category: '１', addressCode: '３５０１００', startBody: ' ｍ０００１００ｙ　', count: '０１' });
    await expectStatus(NOTICES.generated(1));
    await reveal().click(); await expectRows([EXAMPLE]); verifyCode(EXAMPLE);
  });
  add('keyboard submission works and Clear restores every default plus department focus', async () => {
    await visit(); await fill(); await input('count').press('Enter'); await expectRows([MASKED]);
    await clear().press('Space'); await expectStatus(NOTICES.empty);
    for (const field of FIELDS) assert.equal(await input(field).inputValue(), field === 'count' ? '10' : '');
    assert.ok(await input('department').evaluate(el => el === document.activeElement));
    assert.equal(await rows().count(), 0); assert.equal(await reveal().count(), 0);
  });
  add('100 distinct consecutive bodies carry independently verified inner and outer checks', async () => {
    await prepare({ startBody: '00000001', count: '100' }, null);
    await page.waitForFunction(selector => document.querySelectorAll(selector).length === 100, ROWS);
    await expectStatus(NOTICES.generated(100));
    assert.ok((await rows().allTextContents()).every(text => text.includes('*')));
    await reveal().click();
    const actual = await rows().allTextContents();
    assert.equal(actual.length, 100); assert.equal(new Set(actual).size, 100);
    let previous = null;
    for (const code of actual) {
      verifyCode(code);
      const rank = [...code.slice(8, 16)].reduce((rank, char) => rank * 31n + BigInt(ALPHABET.indexOf(char)), 0n);
      if (previous !== null) assert.equal(rank, previous + 1n); else assert.equal(rank, 1n);
      previous = rank;
    }
  });
  add('the last body is usable once and overflow returns no partial rows', async () => {
    await prepare({ startBody: 'YYYYYYYY' }, null); assert.equal(await rows().count(), 1);
    await expectInvalid('count', '2', /past the last body/, { startBody: 'YYYYYYYY' });
  });
  add('a batch entering the excluded PDY prefix is rejected atomically', async () => {
    await visit(); await expectInvalid('count', '2', /excluded PDY prefix/, { startBody: 'PDXYYYYY' });
    await generate({ startBody: 'PDXYYYYY' }, null); assert.equal(await rows().count(), 1);
  });
  add('empty submission associates field errors and focuses the first field', async () => {
    await visit(); await submit().click();
    await root().getByRole('alert').waitFor({ state: 'attached' });
    await page.waitForFunction(() => document.activeElement?.getAttribute('data-testid') === 'social-credit-generator-department');
    for (const field of FIELDS.filter(field => field !== 'count')) assert.equal(await input(field).getAttribute('aria-invalid'), 'true');
    assert.equal(await rows().count(), 0);
  });
  for (const [field, raw, expected] of [
    ['department', 'I', /exactly one character/], ['category', 'O', /exactly one character/],
    ['addressCode', '12 345', /exactly six decimal digits/], ['startBody', '中0000000', /exactly eight characters/],
    ['count', '0', /whole number from 1 to 100/],
  ]) add(`${field} reports an accessible field error and recovers on correction`, async () => {
    await visit(); await expectInvalid(field, raw, expected); await generate();
    assert.equal(await root().getByRole('alert').count(), 0);
    assert.equal(await input(field).getAttribute('aria-invalid'), 'false');
  });
  for (const raw of ['101', '1.5', '1e2']) add(`sample count ${raw} is rejected without a partial batch`, async () => {
    await visit(); await expectInvalid('count', raw, /whole number from 1 to 100/);
  });
  for (const field of FIELDS) add(`${field} enforces its raw 64-unit limit before normalization`, async () => {
    await visit(); await expectInvalid(field, ' '.repeat(65), /at most 64 UTF-16 code units/);
  });
  add('a 64-unit raw field is accepted after disclosed whitespace normalization', async () => {
    await prepare({ department: ' '.repeat(63) + '9' }); await reveal().click(); await expectRows([EXAMPLE]);
  });
  add('editing any input clears stale revealed output and the next batch starts masked', async () => {
    await prepare(); await reveal().click(); await expectRows([EXAMPLE]);
    await input('category').fill('2'); await expectStatus(NOTICES.empty);
    assert.equal(await rows().count(), 0);
    await generate(); assert.equal(await reveal().getAttribute('aria-pressed'), 'false');
  });
  for (const revealed of [false, true]) add(`${revealed ? 'revealed' : 'masked'} clipboard and TXT equal exactly the currently displayed rows`, async () => {
    await prepare();
    if (revealed) await reveal().click();
    const displayed = (await rows().allTextContents()).join('\n');
    assert.equal(displayed, revealed ? EXAMPLE : MASKED);
    await copy().click(); await expectStatus(NOTICES.copied);
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), displayed);
    assert.equal(await downloadText(revealed ? 'revealed-samples' : 'masked-samples'), displayed + '\n');
    await expectStatus(NOTICES.downloaded);
  });
  add('clipboard denial retains the sample, gives manual fallback and supports retry', async () => {
    await prepare(); await installClipboard('denied');
    await copy().click(); await expectStatus(NOTICES.copyFailed); await expectRows([MASKED]);
    await restoreInjected(); await installClipboard('success');
    await copy().click(); await expectStatus(NOTICES.copied);
    assert.equal(await page.evaluate(() => window.__socialCreditGeneratorQA.lastCopied), MASKED);
  });
  add('an unavailable clipboard API reports recovery without an uncaught error', async () => {
    await prepare(); await installClipboard('missing'); await copy().click();
    await expectStatus(NOTICES.copyFailed); await expectRows([MASKED]);
  });
  for (const mode of ['create-failure', 'click-failure']) add(`download ${mode} retains results and reports recovery${mode === 'click-failure' ? ' with Blob cleanup' : ''}`, async () => {
    await prepare(); await installDownload(mode); await download().click();
    await expectStatus(NOTICES.downloadFailed); await expectRows([MASKED]);
    if (mode === 'click-failure') {
      await page.waitForFunction(() => window.__socialCreditGeneratorQA.downloads.revoked.length === 1);
      const objects = await page.evaluate(() => window.__socialCreditGeneratorQA.downloads);
      assert.equal(objects.created.length, 1); assert.deepEqual(plain(objects.created), plain(objects.revoked));
    } else assert.equal(await page.evaluate(() => window.__socialCreditGeneratorQA.downloads.created.length), 0);
  });
  for (const action of ['editing', 'clearing', 'regenerating', 'revealing', 'masking']) for (const oldFails of [false, true]) {
    add(`older Copy ${oldFails ? 'rejection' : 'resolution'} cannot overwrite ${action}`, async () => {
      await prepare();
      if (action === 'masking') await reveal().click();
      await installClipboard(); await copy().click();
      assert.equal(await page.evaluate(() => window.__socialCreditGeneratorQA.pending.length), 1);
      let expected = NOTICES.generated(1);
      if (action === 'editing') { await input('category').fill('2'); expected = NOTICES.empty; }
      if (action === 'clearing') { await clear().click(); expected = NOTICES.empty; }
      if (action === 'regenerating') await submit().click();
      if (action === 'revealing' || action === 'masking') await reveal().click();
      await expectStatus(expected); await settle(0, oldFails);
      assert.equal(await status().innerText(), expected);
      if (action === 'editing' || action === 'clearing') assert.equal(await rows().count(), 0);
      else await expectRows(action === 'revealing' ? [EXAMPLE] : [MASKED]);
    });
  }
  for (const newerFails of [false, true]) for (const olderFails of [false, true]) add(`newer Copy ${newerFails ? 'failure' : 'success'} survives older Copy ${olderFails ? 'rejection' : 'resolution'}`, async () => {
    await prepare(); await installClipboard(); await copy().click(); await copy().click();
    assert.equal(await page.evaluate(() => window.__socialCreditGeneratorQA.pending.length), 2);
    await settle(1, newerFails);
    const expected = newerFails ? NOTICES.copyFailed : NOTICES.copied;
    await expectStatus(expected); await settle(0, olderFails); assert.equal(await status().innerText(), expected);
  });
  for (const newerFails of [false, true]) for (const olderFails of [false, true]) add(`newer Download ${newerFails ? 'failure' : 'success'} survives older Copy ${olderFails ? 'rejection' : 'resolution'}`, async () => {
    await prepare(); await installClipboard(); await installDownload(newerFails ? 'create-failure' : 'suppress-success');
    await copy().click(); await download().click();
    const expected = newerFails ? NOTICES.downloadFailed : NOTICES.downloaded;
    await expectStatus(expected); await settle(0, olderFails); assert.equal(await status().innerText(), expected);
  });
  for (const previousFails of [false, true]) add(`a pending Copy clears the previous ${previousFails ? 'failure' : 'success'} notice`, async () => {
    await prepare(); await installClipboard(); await copy().click(); await settle(0, previousFails);
    await expectStatus(previousFails ? NOTICES.copyFailed : NOTICES.copied);
    await copy().click(); await expectStatus(NOTICES.generated(1));
    await settle(1, false); await expectStatus(NOTICES.copied);
  });
  add('generation works offline without persisting or sending the entered body or full result', async () => {
    await visit();
    const requests = [], track = request => requests.push(request.url() + '\n' + (request.postData() ?? ''));
    page.on('request', track);
    try {
      await page.context().setOffline(true); await generate(); await reveal().click(); await expectRows([EXAMPLE]);
      const stored = await page.evaluate(() => JSON.stringify({ local: Object.entries(localStorage), session: Object.entries(sessionStorage) }));
      for (const value of [FIXTURE.startBody, EXAMPLE]) {
        assert.ok(!stored.includes(value)); assert.ok(!page.url().includes(value) && !page.url().includes(encodeURIComponent(value)));
        assert.ok(!requests.some(request => request.includes(value) || request.includes(encodeURIComponent(value))), JSON.stringify(requests));
      }
      await clear().click(); assert.equal(await rows().count(), 0);
    } finally { await page.context().setOffline(false); page.off('request', track); }
  });
  for (const [locale, title] of Object.entries(NAMES)) add(`${locale} has a native title, labeled fields, localized errors and a working masked sample`, async () => {
    await visit(locale); assert.equal(await page.locator('h1').innerText(), title);
    assert.equal(await page.locator('html').getAttribute('lang'), HTML_LANG[locale] ?? locale);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://zoyku.com/${locale}/tools/social-credit-generator`);
    const labels = await root().locator('form label').allTextContents();
    assert.equal(labels.length, 5); assert.ok(labels.every(label => label.trim()));
    if (locale !== 'en') assert.notEqual(labels[3], 'Starting organization body (8 characters)');
    await fill({ category: 'O' }); await submit().click();
    await root().getByRole('alert').waitFor({ state: 'attached' });
    const error = await root().getByRole('alert').textContent();
    assert.ok(error.trim()); if (locale !== 'en') assert.notEqual(error, 'Enter exactly one character from the alphabet below.');
    await generate(); assert.equal(await reveal().getAttribute('aria-pressed'), 'false');
    await reveal().click(); await expectRows([EXAMPLE]);
  });
  for (const locale of ['zh', 'ar']) add(`320px ${locale} layout contains 44px controls and LTR codes without horizontal overflow`, async () => {
    await page.setViewportSize({ width: 320, height: 800 }); await visit(locale); await generate(); await reveal().click();
    assert.equal(await page.locator('html').getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');
    for (const field of FIELDS) assert.equal(await input(field).getAttribute('dir'), 'ltr');
    assert.equal(await rows().getAttribute('dir'), 'ltr');
    const layout = await root().evaluate(el => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
      controls: [...el.querySelectorAll('input,button')].map(node => { const { left, right, height } = node.getBoundingClientRect(); return { left, right, height }; }) }));
    assert.equal(layout.scrollWidth, layout.width);
    assert.ok(layout.controls.every(({ left, right, height }) => left >= 0 && right <= layout.width && height >= 44), JSON.stringify(layout));
    await page.screenshot({ path: join(reportDir, `social-credit-generator-320-${locale}.png`), fullPage: true });
  });
  add('all inputs and buttons have labels, existing descriptions and 44px targets', async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await prepare();
    const problems = await root().locator('input,button').evaluateAll(nodes => nodes.flatMap(node => {
      const problems = [];
      if (node.getBoundingClientRect().height < 44) problems.push('short target');
      if (!node.labels?.length && !node.getAttribute('aria-label') && !node.textContent.trim()) problems.push('missing label');
      for (const id of (node.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean)) if (!document.getElementById(id)) problems.push(`missing description ${id}`);
      return problems.map(problem => ({ problem, html: node.outerHTML }));
    }));
    assert.deepEqual(plain(problems), []);
  });
  for (const dark of [false, true]) for (const state of ['empty', 'masked', 'revealed', 'error']) add(`scoped axe ${dark ? 'dark' : 'light'} ${state}`, async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await visit(); await setDark(dark);
    if (state === 'masked' || state === 'revealed') await generate();
    if (state === 'revealed') await reveal().click();
    if (state === 'error') await expectInvalid('startBody', 'I0000000', /exactly eight characters/);
    await page.addScriptTag({ content: axeSource });
    const audit = await page.evaluate(async selector => {
      const result = await window.axe.run(document.querySelector(selector), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
      const describe = item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })) });
      return { version: result.testEngine.version, violations: result.violations.map(describe), incomplete: result.incomplete.map(describe) };
    }, TOOL);
    audits.push({ locale: 'en', state, theme: dark ? 'dark' : 'light', ...audit });
    assert.deepEqual(plain(audit.violations), []);
    if (state === 'revealed') await page.screenshot({ path: join(reportDir, `social-credit-generator-${dark ? 'dark' : 'light'}.png`), fullPage: true });
  });

  if (issues.length === 0) {
    const context = page.context(), originalViewport = page.viewportSize();
    page.on('pageerror', onPageError);
    try {
      await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      for (const scenario of scenarios) {
        try { await scenario.run(); checks.push({ name: scenario.name, passed: true }); }
        catch (error) { checks.push({ name: scenario.name, passed: false, error: error.message }); }
        finally { await restoreInjected().catch(error => issues.push({ name: 'injected API cleanup', error: error.message })); }
      }
      finished = true;
    } catch (error) { issues.push({ name: 'browser flow setup', error: error.message }); }
    finally {
      await context.setOffline(false).catch(() => {});
      await context.clearPermissions().catch(() => {});
      await page.emulateMedia({ colorScheme: null, reducedMotion: null }).catch(() => {});
      if (originalViewport) await page.setViewportSize(originalViewport).catch(() => {});
      page.off('pageerror', onPageError);
    }
  }
  if (pageErrors.length) issues.push({ name: 'uncaught browser errors', error: pageErrors.join('\n') });
  const passed = checks.filter(check => check.passed).length, failed = checks.length - passed + issues.length;
  const completed = finished && checks.length === scenarios.length && audits.length === EXPECTED_AUDITS;
  const accessibility = { expectedStates: EXPECTED_AUDITS, completedStates: audits.length,
    status: audits.length === EXPECTED_AUDITS ? 'completed' : 'not_completed',
    violations: audits.length ? audits.reduce((sum, audit) => sum + audit.violations.length, 0) : null,
    incomplete: audits.length ? audits.reduce((sum, audit) => sum + audit.incomplete.length, 0) : null };
  const report = { ok: completed && failed === 0, completed, expectedChecks: scenarios.length, passed, failed, checks, issues, pageErrors,
    accessibilityAuditRun: audits.length > 0, accessibility,
    scope: 'Generator browser behavior, 15 locales, two 320px layouts and eight scoped light/dark axe states. Incomplete axe checks are recorded separately; this is not a full-site accessibility certification.' };
  await writeFile(join(reportDir, 'social-credit-generator-axe.json'), JSON.stringify(audits, null, 2));
  await writeFile(join(reportDir, 'social-credit-generator-checks.json'), JSON.stringify(report, null, 2));
  return report;
}

export default socialCreditGeneratorBrowserQA;
