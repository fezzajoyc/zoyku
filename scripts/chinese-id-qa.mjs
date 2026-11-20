import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const REFERENCE_DATE = '2026-11-20';
const EXPECTED_AUDITS = 6;
const VALIDATOR_NAMES = {
  en: 'Chinese ID Validator', zh: '中国身份证号码校验', ja: '中国身分証番号の検証',
  es: 'Validador de identidad china', pt: 'Validador de identidade chinesa',
  fr: 'Vérificateur d’identité chinoise', de: 'Prüfung chinesischer Ausweisnummern',
  ru: 'Проверка китайских номеров удостоверений', it: 'Verifica identità cinese',
  tr: 'Çin kimlik numarası doğrulayıcı', ko: '중국 신분증 번호 검사기',
  ar: 'فاحص أرقام الهوية الصينية', hi: 'चीनी पहचान संख्या जाँचकर्ता',
  id: 'Validator nomor identitas Tiongkok', vi: 'Kiểm tra số căn cước Trung Quốc',
};
const GENERATOR_NAMES = {
  en: 'Chinese ID Test Sample Generator', zh: '中国身份证测试样本生成器',
  ja: '中国身分証番号のテスト用サンプル生成', es: 'Generador de muestras de identidad china',
  pt: 'Gerador de amostras de identidade chinesa', fr: 'Générateur d’échantillons d’identité chinoise',
  de: 'Testgenerator für chinesische Ausweisnummern', ru: 'Генератор тестовых китайских номеров',
  it: 'Generatore di campioni d’identità cinese', tr: 'Çin kimliği test örneği üretici',
  ko: '중국 신분증 테스트 샘플 생성기', ar: 'مولّد عينات اختبار للهوية الصينية',
  hi: 'चीनी पहचान परीक्षण नमूना जनरेटर', id: 'Pembuat sampel uji identitas Tiongkok',
  vi: 'Tạo mẫu thử số căn cước Trung Quốc',
};

function settings({ baseURL = 'http://127.0.0.1:3480', reportDir = '/tmp/zoyku-chinese-id', axePath } = {}) {
  return { baseURL: baseURL.replace(/\/$/, ''), reportDir, axePath };
}

function collector() {
  const checks = [];
  const issues = [];
  return {
    checks, issues,
    async check(name, run) {
      try { await run(); checks.push({ name, passed: true }); }
      catch (error) { checks.push({ name, passed: false, error: error.message }); }
    },
    result(expectedChecks, finished) {
      const passed = checks.filter(check => check.passed).length;
      const failed = checks.length - passed + issues.length;
      const completed = finished && checks.length === expectedChecks;
      return { ok: completed && failed === 0, completed, expectedChecks, passed, failed, checks, issues };
    },
  };
}

async function visit(page, baseURL, pathname) {
  await page.goto(baseURL + pathname);
  await page.locator('.site-theme-control button').waitFor();
  await page.locator('[data-chinese-id-tool]').getByRole('button').first().waitFor();
  if (await page.evaluate(() => document.documentElement.classList.contains('dark'))) {
    await page.locator('.site-theme-control button').click();
  }
}

async function setDark(page, dark) {
  await page.evaluate(enabled => document.documentElement.classList.toggle('dark', enabled), dark);
  // Wait for color transitions, rather than auditing an intermediate theme.
  await page.waitForFunction(() => {
    const buttons = [...document.querySelectorAll('[data-chinese-id-tool] button')]
      .filter(button => !button.classList.contains('text-white'));
    return buttons.length > 0 && buttons.every(button => getComputedStyle(button).color === getComputedStyle(document.body).color);
  });
}

/**
 * 27 original functional/localization checks. Requires an existing Playwright
 * page; grants clipboard permissions only for baseURL and saves the TXT fixture
 * and JSON report under reportDir. No browser is created or disposed here.
 */
export async function chineseIdBrowserQA(page, options = {}) {
  const { baseURL, reportDir } = settings(options);
  await mkdir(reportDir, { recursive: true });
  const context = page.context();
  const { checks, issues, check, result } = collector();
  const pageErrors = [];
  const requests = [];
  const onPageError = error => pageErrors.push(error.message);
  const onRequest = request => requests.push(request);
  const root = () => page.locator('[data-chinese-id-tool]');
  let finished = false;
  page.on('pageerror', onPageError);
  try {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await visit(page, baseURL, '/zh/tools/chinese-id-validator');
    await root().getByLabel('用于年龄与未来日期判断的参考日期').fill(REFERENCE_DATE);
    page.on('request', onRequest);
    await root().getByLabel('身份证号码，每行一个').fill('　１１０１０５１９４９１２３１００２ｘ\n\n110105194912310020\n110105491231002');
    await root().getByRole('button', { name: '校验号码', exact: true }).click();
    await check('validator normalizes Unicode and preserves original line numbers', async () => {
      assert.match(await root().getByRole('status').innerText(), /已校验 3 行；通过 2 行；未通过 1 行/);
      const text = await root().innerText();
      for (const line of [1, 3, 4]) assert.match(text, new RegExp(`行 ${line}`));
    });
    await check('masks numbers and encoded birth dates before explicit reveal', async () => {
      assert.deepEqual(await root().getByTestId('validated-number').allTextContents(), ['110***********002X', '110***********0020', '110***********002X']);
      assert.equal(await root().locator('dd').count(), 0);
      assert.match(await root().innerText(), /15 位号码转换明确假设出生年份为 19xx/);
    });
    await root().getByRole('button', { name: '在本机显示完整结果' }).click();
    await check('reveals canonical conversion and age with localized row error', async () => {
      assert.equal((await root().getByTestId('validated-number').allTextContents())[0], '11010519491231002X');
      const text = await root().innerText();
      assert.match(text, /1949-12-31/); assert.match(text, /76/);
      assert.match(text, /MOD 11-2 校验字符不匹配/);
    });
    await check('editing clears stale output and returns to masked state', async () => {
      await root().getByLabel('身份证号码，每行一个').fill('11010519491231002X');
      assert.equal(await root().getByTestId('validated-number').count(), 0);
      await root().getByRole('button', { name: '校验号码', exact: true }).click();
      assert.equal(await root().getByTestId('validated-number').innerText(), '110***********002X');
    });
    await check('rejects oversized row count with accessible inline alert', async () => {
      await root().getByLabel('身份证号码，每行一个').fill(Array(101).fill('11010519491231002X').join('\n'));
      await root().getByRole('button', { name: '校验号码', exact: true }).click();
      assert.match(await root().getByRole('alert').innerText(), /最多允许 100 个非空行/);
      assert.equal(await root().getByLabel('身份证号码，每行一个').getAttribute('aria-invalid'), 'true');
    });
    await check('validator makes no request containing entered test values', async () => {
      assert.equal(requests.filter(request => (request.url() + ' ' + (request.postData() || '')).includes('11010519491231002')).length, 0);
      assert.equal(page.url(), baseURL + '/zh/tools/chinese-id-validator');
      const storage = await page.evaluate(() => ({ local: Object.entries(localStorage), session: Object.entries(sessionStorage) }));
      assert.equal(JSON.stringify(storage).includes('110105'), false);
    });
    await visit(page, baseURL, '/zh/tools/chinese-id-generator');
    await root().getByLabel('用于年龄与未来日期判断的参考日期').fill(REFERENCE_DATE);
    await root().getByLabel('手动输入六位行政区划码').fill('110105');
    await root().getByLabel('出生日期', { exact: true }).fill('2000-02-29');
    await root().getByLabel('号码编码性别', { exact: true }).selectOption('female');
    await root().getByLabel('起始顺序码（1–999）').fill('1');
    await root().getByLabel('样本数量（1–100）').fill('100');
    await root().getByRole('button', { name: '生成测试样本', exact: true }).click();
    await check('generates 100 masked distinct samples with announced summary', async () => {
      assert.match(await root().getByRole('status').innerText(), /100 个互不重复/);
      const text = await root().getByTestId('generated-numbers').innerText();
      assert.equal(text.split('\n').length, 100); assert.match(text, /\*/);
    });
    await root().getByRole('button', { name: '在本机显示完整结果' }).click();
    const generated = (await root().getByTestId('generated-numbers').innerText()).split('\n');
    await check('all revealed samples have independent checksum and requested parity', async () => {
      assert.equal(new Set(generated).size, 100);
      for (const number of generated) {
        assert.match(number, /^11010520000229\d{3}[\dX]$/);
        assert.equal(Number(number[16]) % 2, 0);
        const sum = [...number.slice(0, 17)].reduce((value, digit, index) => value + Number(digit) * 2 ** (17 - index), 0);
        assert.equal((sum + (number[17] === 'X' ? 10 : Number(number[17]))) % 11, 1);
      }
    });
    await check('clipboard and TXT preserve all 18 characters', async () => {
      await root().getByRole('button', { name: '复制当前显示的 TXT', exact: true }).click();
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), generated.join('\n'));
      const pendingDownload = page.waitForEvent('download');
      await root().getByRole('button', { name: '下载当前显示的 TXT', exact: true }).click();
      const download = await pendingDownload;
      assert.equal(download.suggestedFilename(), 'chinese-id-generator.txt');
      const fixturePath = join(reportDir, 'chinese-id-generated-samples.txt');
      await download.saveAs(fixturePath);
      assert.equal(await readFile(fixturePath, 'utf8'), generated.join('\n') + '\n');
    });
    await check('rejects sequence overflow atomically and connects field error', async () => {
      await root().getByLabel('起始顺序码（1–999）').fill('999');
      await root().getByRole('button', { name: '生成测试样本', exact: true }).click();
      assert.match(await root().getByRole('alert').innerText(), /剩余顺序码不足/);
      assert.equal(await root().getByTestId('generated-numbers').count(), 0);
      const sequence = root().getByLabel('起始顺序码（1–999）');
      assert.equal(await sequence.getAttribute('aria-invalid'), 'true');
      const description = await sequence.getAttribute('aria-describedby');
      assert.ok(await page.locator(`[id="${description}"]`).isVisible());
    });
    await check('all tool inputs and buttons have labels and 44px targets', async () => {
      const bad = await root().locator('button,input,select,textarea').evaluateAll(nodes => nodes
        .filter(node => node.getBoundingClientRect().height < 44 || (!node.labels?.length && !node.getAttribute('aria-label') && !node.textContent.trim()))
        .map(node => node.outerHTML));
      assert.deepEqual(bad, []);
    });
    await page.setViewportSize({ width: 390, height: 844 });
    for (const [locale, h1] of Object.entries(VALIDATOR_NAMES)) {
      await check(`${locale} native title and UI, valid source and no mobile overflow`, async () => {
        await visit(page, baseURL, `/${locale}/tools/chinese-id-validator`);
        assert.equal(await page.locator('h1').innerText(), h1);
        assert.equal((await root().getByRole('link').first().getAttribute('href')).endsWith('.pdf'), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://zoyku.com/${locale}/tools/chinese-id-validator`);
        assert.equal(await root().locator('textarea').count(), 1);
      });
    }
    await visit(page, baseURL, '/en/tools/chinese-id-validator');
    await root().getByLabel('ID numbers, one per line').fill('11010519491231002X');
    await root().getByLabel('Reference date for age and future-date checks').fill(REFERENCE_DATE);
    await root().getByRole('button', { name: 'Validate numbers', exact: true }).click();
    await root().getByRole('button', { name: 'Reveal results locally' }).click();
    await check('international parsed result displays province prefix without untranslated Chinese labels', async () => {
      assert.doesNotMatch(await root().innerText(), /北京市/);
      assert.ok((await root().locator('dd').allTextContents()).includes('11'));
    });
    finished = true;
  } catch (error) { issues.push({ name: 'browser flow setup', error: error.message }); }
  finally {
    page.off('pageerror', onPageError);
    page.off('request', onRequest);
  }
  if (pageErrors.length) issues.push({ name: 'uncaught browser errors', error: pageErrors.join('\n') });
  const report = { ...result(27, finished), pageErrors };
  await writeFile(join(reportDir, 'chinese-id-browser-qa.json'), JSON.stringify(report, null, 2));
  return report;
}

async function auditTool(page, mode, state) {
  const audit = await page.evaluate(async () => {
    const result = await window.axe.run(document.querySelector('[data-chinese-id-tool]'), {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    });
    return {
      version: result.testEngine.version,
      violations: result.violations.map(violation => ({
        id: violation.id, impact: violation.impact,
        nodes: violation.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })),
      })),
      incomplete: result.incomplete.map(violation => ({
        id: violation.id, nodes: violation.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })),
      })),
    };
  });
  return { mode, state, ...audit };
}

/**
 * 17 original locale/boundary/offline checks and six required axe states.
 * axePath must point to the caller's local axe-core browser bundle. Missing
 * axe is a failed prerequisite, never a passing or silently skipped audit.
 * A dedicated context is recommended: the suite changes viewport/media,
 * navigates the page, temporarily goes offline and ends online in light mode.
 */
export async function chineseIdAdditionalQA(page, options = {}) {
  const { baseURL, reportDir, axePath } = settings(options);
  await mkdir(reportDir, { recursive: true });
  const { checks, issues, check, result } = collector();
  const audits = [];
  const pageErrors = [];
  const onPageError = error => pageErrors.push(error.message);
  const root = () => page.locator('[data-chinese-id-tool]');
  let finished = false;
  if (!axePath) {
    issues.push({ name: 'accessibility prerequisites', error: 'axePath is required. The six required accessibility audits were not run.' });
  } else {
    const context = page.context();
    page.on('pageerror', onPageError);
    try {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      for (const [locale, h1] of Object.entries(GENERATOR_NAMES)) {
        await check(`${locale} generator native H1, canonical, FAQ schema and mobile width`, async () => {
          await visit(page, baseURL, `/${locale}/tools/chinese-id-generator`);
          assert.equal(await page.locator('h1').innerText(), h1);
          assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://zoyku.com/${locale}/tools/chinese-id-generator`);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
          const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
          assert.ok(schema.some(value => value.includes('FAQPage')));
        });
      }
      for (const mode of ['validator', 'generator']) {
        await visit(page, baseURL, `/en/tools/chinese-id-${mode}`);
        await root().getByLabel('Reference date for age and future-date checks').fill(REFERENCE_DATE);
        await root().getByRole('button', { name: mode === 'validator' ? 'Validate numbers' : 'Generate test samples', exact: true }).click();
        await page.addScriptTag({ path: axePath });
        audits.push(await auditTool(page, mode, 'error'));
        if (mode === 'validator') {
          const body = '11999920000101001';
          const sum = [...body].reduce((value, digit, index) => value + Number(digit) * 2 ** (17 - index), 0);
          const value = Array.from({ length: 11 }, (_, index) => index).find(value => (sum + value) % 11 === 1);
          await root().getByLabel('ID numbers, one per line').fill(body + (value === 10 ? 'X' : value));
          await root().getByRole('button', { name: 'Validate numbers', exact: true }).click();
          await check('unknown county code with recognized province is not labeled fake', async () => {
            assert.match(await root().getByRole('status').innerText(), /pass: 1/);
          });
        } else {
          await root().getByLabel('Manually supplied six-digit area code').fill('110105');
          await root().getByLabel('Date of birth', { exact: true }).fill('2000-02-29');
          await root().getByLabel('Sample count (1–100)').fill('2');
          await check('generation works offline with no input-bearing requests', async () => {
            const requests = [];
            const onRequest = request => requests.push(request.url() + ' ' + (request.postData() || ''));
            page.on('request', onRequest);
            try {
              await context.setOffline(true);
              await root().getByRole('button', { name: 'Generate test samples', exact: true }).click();
              assert.match(await root().getByRole('status').innerText(), /Distinct test samples generated in this batch: 2/);
              assert.equal(requests.filter(value => value.includes('110105') || value.includes('2000-02-29')).length, 0);
            } finally { await context.setOffline(false); page.off('request', onRequest); }
          });
        }
        await root().getByRole('button', { name: 'Reveal results locally' }).click();
        audits.push(await auditTool(page, mode, 'revealed-results'));
        await setDark(page, true);
        audits.push(await auditTool(page, mode, 'dark-revealed-results'));
        await setDark(page, false);
        await root().screenshot({ path: join(reportDir, `chinese-id-${mode}-mobile.png`) });
      }
      finished = true;
    } catch (error) { issues.push({ name: 'additional flow setup', error: error.message }); }
    finally {
      page.off('pageerror', onPageError);
      await context.setOffline(false);
      await page.evaluate(() => document.documentElement.classList.remove('dark')).catch(() => {});
    }
  }
  if (pageErrors.length) issues.push({ name: 'uncaught browser errors', error: pageErrors.join('\n') });
  const audited = audits.length === EXPECTED_AUDITS;
  const violations = audits.reduce((total, audit) => total + audit.violations.length, 0);
  const incomplete = audits.reduce((total, audit) => total + audit.incomplete.length, 0);
  const failedAudits = audits.filter(audit => audit.violations.length || audit.incomplete.length).length;
  const accessibility = {
    status: !audited ? 'not_completed' : violations ? 'failed' : incomplete ? 'needs_review' : 'passed',
    expectedStates: EXPECTED_AUDITS, completedStates: audits.length,
    violations: audited ? violations : null,
    incomplete: audited ? incomplete : null,
  };
  const functional = result(17, finished);
  const report = {
    ...functional,
    ok: functional.ok && accessibility.status === 'passed',
    completed: functional.completed && audited,
    failed: functional.failed + failedAudits,
    pageErrors, audits, accessibilityAuditRun: audited, accessibility,
  };
  await writeFile(join(reportDir, 'chinese-id-additional-qa.json'), JSON.stringify(report, null, 2));
  return report;
}

const DOWNLOAD_FAILURES = {
  en: 'The TXT could not be prepared. Copy the displayed result instead.',
  zh: '未能准备 TXT 下载，请改为复制当前显示的结果。',
  ja: 'TXT を準備できませんでした。表示中の結果をコピーしてください。',
  es: 'No se pudo preparar el TXT. Copia el resultado mostrado.',
  pt: 'Não foi possível preparar o TXT. Copie o resultado exibido.',
  fr: 'Le TXT n’a pas pu être préparé. Copiez le résultat affiché.',
  de: 'Die TXT-Datei konnte nicht vorbereitet werden. Kopieren Sie das angezeigte Ergebnis.',
  ru: 'Не удалось подготовить TXT. Скопируйте отображаемый результат.',
  it: 'Impossibile preparare il TXT. Copia il risultato visualizzato.',
  tr: 'TXT hazırlanamadı. Bunun yerine görünen sonucu kopyalayın.',
  ko: 'TXT를 준비하지 못했습니다. 대신 표시된 결과를 복사하세요.',
  ar: 'تعذر تجهيز TXT. انسخ النتيجة المعروضة بدلاً من ذلك.',
  hi: 'TXT तैयार नहीं हो सका। इसके बजाय दिख रहा परिणाम कॉपी करें।',
  id: 'TXT tidak dapat disiapkan. Salin hasil yang ditampilkan sebagai gantinya.',
  vi: 'Không chuẩn bị được TXT. Hãy sao chép kết quả đang hiển thị.',
};

/** Both modes: 36 delayed clipboard scenarios, download faults and 15 locales. */
export async function chineseIdRecoveryQA(page, options = {}) {
  const { baseURL, reportDir, axePath } = settings(options);
  await mkdir(reportDir, { recursive: true });
  const { issues, check, result } = collector();
  const pageErrors = [], audits = [], traffic = [], messages = [];
  const root = () => page.locator('[data-chinese-id-tool]');
  const submit = () => root().locator('button[type="submit"]');
  const clear = () => root().locator('form button[type="button"]');
  const reveal = () => root().locator('button[aria-pressed]');
  const copy = () => root().locator('section button').nth(1);
  const download = () => root().locator('section button').nth(2);
  const onPageError = error => pageErrors.push(error.message);
  const onRequest = request => traffic.push(request.url() + ' ' + (request.postData() || ''));
  const onConsole = message => messages.push(message.text());
  const prepare = async mode => {
    await root().locator('input[id$="-reference"]').fill(REFERENCE_DATE);
    if (mode === 'validator') await root().locator('textarea').fill('11010519491231002X');
    else {
      await root().locator('input[id$="-area"]').fill('110105');
      await root().locator('input[id$="-birth"]').fill('2000-02-29');
      await root().locator('input[id$="-sequence"]').fill('1');
      await root().locator('input[id$="-count"]').fill('1');
    }
    await submit().click();
    try { assert.equal(await reveal().getAttribute('aria-pressed'), 'false'); }
    catch (error) {
      const state = await page.evaluate(() => {
        const tool = document.querySelector('[data-chinese-id-tool]');
        return {
          url: location.href,
          locale: document.documentElement.lang,
          navigation: performance.getEntriesByType('navigation').at(-1)?.type,
          mode: tool?.getAttribute('data-chinese-id-tool'),
          fields: [...(tool?.querySelectorAll('input,textarea,select') ?? [])].map(field => ({
            key: field.id.split('-').at(-1), type: field.type,
            // Record lengths rather than identity-number or area-code fixtures.
            value: field.tagName === 'TEXTAREA' || field.id.endsWith('-area') ? { length: field.value.length } : field.value,
          })),
          status: tool?.querySelector('[role="status"]')?.textContent,
          alerts: [...(tool?.querySelectorAll('[role="alert"]') ?? [])].map(node => node.textContent),
          resultSections: tool?.querySelectorAll('section').length,
        };
      });
      const developmentMessages = messages.filter(message => /fast refresh|hmr|reload|rebuild|compil|hydration/i.test(message)).slice(-8);
      throw new Error(`${error.message}\nPreparation diagnostics: ${JSON.stringify({ state, developmentMessages })}`);
    }
  };
  let finished = false;
  if (!axePath) issues.push({ name: 'accessibility prerequisite', error: 'axePath is required; four recovery light/dark audits were not run.' });
  else {
    const context = page.context();
    page.on('pageerror', onPageError); page.on('request', onRequest); page.on('console', onConsole);
    try {
      await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      for (const mode of ['validator', 'generator']) {
        await visit(page, baseURL, `/en/tools/chinese-id-${mode}`);
        const delayedCopy = async (action, outcome) => {
          await prepare(mode);
          if (action === 'hide') await reveal().click();
          await page.evaluate(() => {
            const clipboard = navigator.clipboard;
            const descriptor = Object.getOwnPropertyDescriptor(clipboard, 'writeText');
            Object.defineProperty(clipboard, 'writeText', { configurable: true, value: () => new Promise((resolve, reject) => {
              window.__chineseIdCopyPending = { resolve, reject };
            }) });
            window.__chineseIdRestoreClipboard = () => {
              if (descriptor) Object.defineProperty(clipboard, 'writeText', descriptor);
              else delete clipboard.writeText;
              delete window.__chineseIdCopyPending; delete window.__chineseIdRestoreClipboard;
            };
          });
          try {
            await copy().click();
            assert.ok(await page.evaluate(() => Boolean(window.__chineseIdCopyPending)));
            if (action === 'edit') {
              if (mode === 'validator') await root().locator('textarea').fill('11010519491231002x');
              else await root().locator('input[id$="-count"]').fill('2');
            } else if (action === 'clear') await clear().click();
            else if (action === 'rerun') await submit().click();
            else await reveal().click();
            const expected = await root().getByRole('status').innerText();
            await page.evaluate(fail => {
              const pending = window.__chineseIdCopyPending;
              if (fail) pending.reject(new Error('Injected delayed clipboard failure'));
              else pending.resolve();
            }, outcome === 'reject');
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            assert.equal(await root().getByRole('status').innerText(), expected, `${action}/${outcome}: obsolete clipboard notice`);
          } finally { await page.evaluate(() => window.__chineseIdRestoreClipboard?.()); }
        };
        const delayedCases = async actions => {
          const failures = [];
          for (const action of actions) for (const outcome of ['resolve', 'reject']) {
            try { await delayedCopy(action, outcome); }
            catch (error) { failures.push(error.message); }
          }
          assert.deepEqual(failures, []);
        };
        await check(`${mode}: delayed copy cannot overwrite edited or cleared states`, async () => { await delayedCases(['edit', 'clear']); });
        await check(`${mode}: delayed copy cannot overwrite reruns`, async () => { await delayedCases(['rerun']); });
        await check(`${mode}: delayed copy cannot overwrite reveal or mask changes`, async () => { await delayedCases(['reveal', 'hide']); });
        const overlappingAction = async (action, outcome, newerFails) => {
          await prepare(mode);
          await page.evaluate(failDownload => {
            const clipboard = navigator.clipboard;
            const descriptor = Object.getOwnPropertyDescriptor(clipboard, 'writeText');
            const click = HTMLAnchorElement.prototype.click;
            const pending = []; window.__chineseIdOverlappingCopies = pending;
            Object.defineProperty(clipboard, 'writeText', { configurable: true, value: () => new Promise((resolve, reject) => pending.push({ resolve, reject })) });
            HTMLAnchorElement.prototype.click = () => {
              if (failDownload) throw new DOMException('Injected newer download failure', 'NotSupportedError');
            };
            window.__chineseIdRestoreOverlap = () => {
              if (descriptor) Object.defineProperty(clipboard, 'writeText', descriptor); else delete clipboard.writeText;
              HTMLAnchorElement.prototype.click = click;
              delete window.__chineseIdOverlappingCopies; delete window.__chineseIdRestoreOverlap;
            };
          }, newerFails);
          try {
            await copy().click();
            assert.equal(await page.evaluate(() => window.__chineseIdOverlappingCopies.length), 1);
            const expected = action === 'copy'
              ? newerFails ? 'Copy failed. Select the displayed text and copy it manually.' : 'Displayed text copied.'
              : newerFails ? DOWNLOAD_FAILURES.en : 'TXT download prepared.';
            if (action === 'copy') {
              await copy().click();
              assert.equal(await page.evaluate(() => window.__chineseIdOverlappingCopies.length), 2);
              await page.evaluate(failed => {
                const latest = window.__chineseIdOverlappingCopies[1];
                if (failed) latest.reject(new Error('Injected newer clipboard failure')); else latest.resolve();
              }, newerFails);
            } else await download().click();
            await page.waitForFunction(value => document.querySelector('[data-chinese-id-tool] [role="status"]')?.textContent === value, expected);
            await page.evaluate(failed => {
              const older = window.__chineseIdOverlappingCopies[0];
              if (failed) older.reject(new Error('Injected older clipboard failure')); else older.resolve();
            }, outcome === 'reject');
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            assert.equal(await root().getByRole('status').innerText(), expected, `${action}/${newerFails ? 'failure' : 'success'}/${outcome}: older copy replaced the latest action notice`);
          } finally { await page.evaluate(() => window.__chineseIdRestoreOverlap?.()); }
        };
        await check(`${mode}: newer Copy success or failure supersedes older pending Copy`, async () => {
          const failures = [];
          for (const outcome of ['resolve', 'reject']) {
            try { await overlappingAction('copy', outcome, outcome === 'resolve'); }
            catch (error) { failures.push(error.message); }
          }
          for (const previousFails of [false, true]) {
            try {
              await prepare(mode);
              const summary = await root().getByRole('status').innerText();
              await page.evaluate(() => {
                const clipboard = navigator.clipboard, descriptor = Object.getOwnPropertyDescriptor(clipboard, 'writeText');
                const pending = []; window.__chineseIdPendingNotices = pending;
                Object.defineProperty(clipboard, 'writeText', { configurable: true, value: () => new Promise((resolve, reject) => pending.push({ resolve, reject })) });
                window.__chineseIdRestorePendingNotices = () => {
                  pending[1]?.resolve();
                  if (descriptor) Object.defineProperty(clipboard, 'writeText', descriptor); else delete clipboard.writeText;
                  delete window.__chineseIdPendingNotices; delete window.__chineseIdRestorePendingNotices;
                };
              });
              try {
                await copy().click();
                await page.evaluate(failed => {
                  const first = window.__chineseIdPendingNotices[0];
                  if (failed) first.reject(new Error('Injected previous clipboard failure')); else first.resolve();
                }, previousFails);
                const previous = previousFails ? 'Copy failed. Select the displayed text and copy it manually.' : 'Displayed text copied.';
                await page.waitForFunction(value => document.querySelector('[data-chinese-id-tool] [role="status"]')?.textContent === value, previous);
                await copy().click();
                assert.equal(await page.evaluate(() => window.__chineseIdPendingNotices.length), 2);
                assert.equal(await root().getByRole('status').innerText(), summary, 'new pending Copy retained an obsolete success or failure notice');
              } finally {
                await page.evaluate(() => window.__chineseIdRestorePendingNotices?.());
                await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
              }
            } catch (error) { failures.push(error.message); }
          }
          assert.deepEqual(failures, []);
        });
        await check(`${mode}: newer Download success or failure supersedes older pending Copy`, async () => {
          const failures = [];
          for (const newerFails of [false, true]) for (const outcome of ['resolve', 'reject']) {
            try { await overlappingAction('download', outcome, newerFails); }
            catch (error) { failures.push(error.message); }
          }
          assert.deepEqual(failures, []);
        });
        await check(`${mode}: unavailable blob URL announces download failure`, async () => {
          await prepare(mode);
          await page.evaluate(() => {
            const descriptor = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
            Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: () => { throw new DOMException('Injected unavailable blob URL', 'NotSupportedError'); } });
            window.__chineseIdRestoreBlob = () => { Object.defineProperty(URL, 'createObjectURL', descriptor); delete window.__chineseIdRestoreBlob; };
          });
          try {
            await download().click();
            assert.equal(await root().getByRole('status').innerText(), DOWNLOAD_FAILURES.en);
          } finally { await page.evaluate(() => window.__chineseIdRestoreBlob?.()); }
        });
        await check(`${mode}: failed anchor click still revokes its blob URL`, async () => {
          await visit(page, baseURL, `/en/tools/chinese-id-${mode}`); await prepare(mode);
          await page.evaluate(() => {
            const create = URL.createObjectURL, revoke = URL.revokeObjectURL, click = HTMLAnchorElement.prototype.click;
            const state = { created: [], revoked: [] }; window.__chineseIdBlobState = state;
            URL.createObjectURL = value => { const url = create.call(URL, value); state.created.push(url); return url; };
            URL.revokeObjectURL = url => { state.revoked.push(url); return revoke.call(URL, url); };
            HTMLAnchorElement.prototype.click = () => { throw new DOMException('Injected unavailable anchor download', 'NotSupportedError'); };
            window.__chineseIdRestoreAnchor = () => {
              URL.createObjectURL = create; URL.revokeObjectURL = revoke; HTMLAnchorElement.prototype.click = click;
              for (const url of state.created) if (!state.revoked.includes(url)) revoke.call(URL, url);
              delete window.__chineseIdBlobState; delete window.__chineseIdRestoreAnchor;
            };
          });
          try {
            await download().click();
            const failures = [];
            if (await root().getByRole('status').innerText() !== DOWNLOAD_FAILURES.en) failures.push('download failure was not announced');
            try {
              await page.waitForFunction(() => window.__chineseIdBlobState.created.length === 1 && window.__chineseIdBlobState.revoked.length === 1 && window.__chineseIdBlobState.revoked[0] === window.__chineseIdBlobState.created[0], undefined, { timeout: 3000 });
            } catch { failures.push('blob URL was not revoked exactly once after failed click'); }
            assert.deepEqual(failures, []);
          } finally { await page.evaluate(() => window.__chineseIdRestoreAnchor?.()); }
        });
        for (const [locale, failureText] of Object.entries(DOWNLOAD_FAILURES)) {
          await check(`${mode}/${locale}: localized failure notices and manual-copy recovery`, async () => {
            await visit(page, baseURL, `/${locale}/tools/chinese-id-${mode}`); await prepare(mode);
            const summary = await root().getByRole('status').innerText();
            await page.evaluate(() => {
              const descriptor = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
              Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: () => { throw new DOMException('Injected localized download failure', 'NotSupportedError'); } });
              window.__chineseIdRestoreBlob = () => { Object.defineProperty(URL, 'createObjectURL', descriptor); delete window.__chineseIdRestoreBlob; };
            });
            try { await download().click(); assert.equal(await root().getByRole('status').innerText(), failureText); }
            finally { await page.evaluate(() => window.__chineseIdRestoreBlob?.()); }
            if (locale === 'en') {
              await page.addScriptTag({ path: axePath });
              audits.push(await auditTool(page, mode, 'download-failure-light'));
              await setDark(page, true); audits.push(await auditTool(page, mode, 'download-failure-dark')); await setDark(page, false);
              await root().screenshot({ path: join(reportDir, `chinese-id-${mode}-recovery.png`) });
            }
            await page.evaluate(() => {
              const clipboard = navigator.clipboard, descriptor = Object.getOwnPropertyDescriptor(clipboard, 'writeText');
              Object.defineProperty(clipboard, 'writeText', { configurable: true, value: () => Promise.reject(new Error('Injected localized copy failure')) });
              window.__chineseIdRestoreClipboard = () => {
                if (descriptor) Object.defineProperty(clipboard, 'writeText', descriptor); else delete clipboard.writeText;
                delete window.__chineseIdRestoreClipboard;
              };
            });
            let copyFailure;
            try {
              await copy().click();
              await page.waitForFunction(({ previous, summary }) => {
                const text = document.querySelector('[data-chinese-id-tool] [role="status"]')?.textContent;
                return text && text !== previous && text !== summary;
              }, { previous: failureText, summary });
              copyFailure = await root().getByRole('status').innerText();
              assert.ok(copyFailure.trim()); assert.notEqual(copyFailure, summary);
              if (locale === 'en') assert.equal(copyFailure, 'Copy failed. Select the displayed text and copy it manually.');
              else assert.notEqual(copyFailure, 'Copy failed. Select the displayed text and copy it manually.');
            } finally { await page.evaluate(() => window.__chineseIdRestoreClipboard?.()); }
            const visible = await root().getByTestId(mode === 'validator' ? 'validated-number' : 'generated-numbers').innerText();
            await copy().click();
            await page.waitForFunction(({ previous, summary }) => {
              const text = document.querySelector('[data-chinese-id-tool] [role="status"]')?.textContent;
              return text && text !== previous && text !== summary;
            }, { previous: copyFailure, summary });
            const copied = await page.evaluate(() => navigator.clipboard.readText());
            assert.ok(copied.includes(visible)); assert.ok(visible.includes('*'));
            assert.ok(!copied.includes('11010519491231002X') && !copied.includes('11010520000229'));
            await clear().click();
            assert.equal(await root().locator('input[id$="-reference"]').inputValue(), '');
            assert.equal(await root().locator('section').count(), 0);
            assert.equal(page.url(), `${baseURL}/${locale}/tools/chinese-id-${mode}`);
          });
        }
      }
      const storage = await page.evaluate(() => JSON.stringify({ local: Object.entries(localStorage), session: Object.entries(sessionStorage) }));
      if (storage.includes('11010519491231002') || storage.includes('11010520000229')) issues.push({ name: 'input persistence', error: 'Fixture input appeared in storage.' });
      finished = true;
    } catch (error) { issues.push({ name: 'recovery setup', error: error.message }); }
    finally {
      page.off('pageerror', onPageError); page.off('request', onRequest); page.off('console', onConsole);
      await context.setOffline(false);
      await page.evaluate(() => document.documentElement.classList.remove('dark')).catch(() => {});
    }
  }
  if (pageErrors.length) issues.push({ name: 'uncaught browser errors', error: pageErrors.join('\n') });
  const carriesInput = value => value.includes('11010519491231002') || value.includes('11010520000229');
  if (traffic.some(carriesInput) || messages.some(carriesInput)) issues.push({ name: 'input privacy', error: 'Fixture input appeared in a request or console message.' });
  const audited = audits.length === 4;
  const accessibility = {
    status: !audited ? 'not_completed' : audits.some(item => item.violations.length) ? 'failed' : audits.some(item => item.incomplete.length) ? 'needs_review' : 'passed',
    expectedStates: 4, completedStates: audits.length,
    violations: audited ? audits.reduce((sum, item) => sum + item.violations.length, 0) : null,
    incomplete: audited ? audits.reduce((sum, item) => sum + item.incomplete.length, 0) : null,
  };
  const functional = result(44, finished);
  const report = { ...functional, ok: functional.ok && accessibility.status === 'passed', completed: functional.completed && audited,
    failed: functional.failed + audits.filter(item => item.violations.length || item.incomplete.length).length,
    pageErrors, audits, accessibilityAuditRun: audited, accessibility };
  await writeFile(join(reportDir, 'chinese-id-recovery-qa.json'), JSON.stringify(report, null, 2));
  return report;
}

/** Run all suites. The caller owns Playwright/browser lifetime and asserts ok. */
export default async function chineseIdQA(page, options = {}) {
  const { reportDir } = settings(options);
  const browser = await chineseIdBrowserQA(page, options);
  const additional = await chineseIdAdditionalQA(page, options);
  const recovery = await chineseIdRecoveryQA(page, options);
  const audited = additional.accessibilityAuditRun && recovery.accessibilityAuditRun;
  const violations = audited ? additional.accessibility.violations + recovery.accessibility.violations : null;
  const incomplete = audited ? additional.accessibility.incomplete + recovery.accessibility.incomplete : null;
  const report = {
    ok: browser.ok && additional.ok && recovery.ok,
    completed: browser.completed && additional.completed && recovery.completed,
    passed: browser.passed + additional.passed + recovery.passed,
    failed: browser.failed + additional.failed + recovery.failed,
    accessibility: { status: !audited ? 'not_completed' : violations ? 'failed' : incomplete ? 'needs_review' : 'passed',
      expectedStates: 10, completedStates: additional.accessibility.completedStates + recovery.accessibility.completedStates, violations, incomplete },
    suites: { browser, additional, recovery },
  };
  await writeFile(join(reportDir, 'chinese-id-checks.json'), JSON.stringify(report, null, 2));
  return report;
}
