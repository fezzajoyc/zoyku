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
            assert.match(await root().getByRole('status').innerText(), /1 pass/);
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
              assert.match(await root().getByRole('status').innerText(), /2 distinct test samples/);
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

/** Run both suites. The caller owns Playwright/browser lifetime and asserts ok. */
export default async function chineseIdQA(page, options = {}) {
  const { reportDir } = settings(options);
  const browser = await chineseIdBrowserQA(page, options);
  const additional = await chineseIdAdditionalQA(page, options);
  const report = {
    ok: browser.ok && additional.ok,
    completed: browser.completed && additional.completed,
    passed: browser.passed + additional.passed,
    failed: browser.failed + additional.failed,
    accessibility: additional.accessibility,
    suites: { browser, additional },
  };
  await writeFile(join(reportDir, 'chinese-id-checks.json'), JSON.stringify(report, null, 2));
  return report;
}
