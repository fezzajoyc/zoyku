import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createServer } from 'node:http';
import { mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LOCALES = ['en', 'zh', 'ja', 'es', 'pt', 'fr', 'de', 'ru', 'it', 'tr', 'ko', 'ar', 'hi', 'id', 'vi'];
const RECOVERY = {
  en: 'Copy failed. Select the source text and copy it manually, or try again.',
  zh: '复制失败。请选中原文手动复制，或重试。',
  ja: 'コピーできません。元のテキストを選択して手動でコピーするか、再試行してください。',
  es: 'No se pudo copiar. Selecciona el texto original y cópialo manualmente, o reintenta.',
  pt: 'Não foi possível copiar. Selecione o texto original e copie manualmente, ou tente de novo.',
  fr: 'Copie impossible. Sélectionnez le texte source et copiez-le manuellement, ou réessayez.',
  de: 'Kopieren fehlgeschlagen. Markiere den Ausgangstext und kopiere ihn manuell oder versuche es erneut.',
  ru: 'Не удалось скопировать. Выделите исходный текст и скопируйте его вручную или повторите попытку.',
  it: 'Copia non riuscita. Seleziona il testo originale e copialo manualmente, oppure riprova.',
  tr: 'Kopyalanamadı. Kaynak metni seçip elle kopyalayın veya yeniden deneyin.',
  ko: '복사하지 못했습니다. 원문을 선택해 직접 복사하거나 다시 시도하세요.',
  ar: 'تعذر النسخ. حدّد النص الأصلي وانسخه يدوياً، أو أعد المحاولة.',
  hi: 'कॉपी नहीं हुआ। मूल पाठ चुनकर हाथ से कॉपी करें या फिर प्रयास करें।',
  id: 'Gagal menyalin. Pilih teks sumber dan salin secara manual, atau coba lagi.',
  vi: 'Không sao chép được. Hãy chọn văn bản gốc để sao chép thủ công hoặc thử lại.',
};

async function startHarness() {
  const result = await build({
    entryPoints: [fileURLToPath(new URL('./fixtures/copy-button-harness.tsx', import.meta.url))],
    absWorkingDir: fileURLToPath(new URL('../', import.meta.url)),
    bundle: true, write: false, platform: 'browser', format: 'iife', jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"development"', 'process.env.NEXT_PUBLIC_SITE_DOMAIN': 'undefined' },
  });
  const source = result.outputFiles[0].text;
  const server = createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    if (request.url?.startsWith('/harness.js')) {
      response.setHeader('Content-Type', 'text/javascript'); response.end(source);
    } else {
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>CopyButton browser regression</title></head><body><div id="root"></div><script src="/harness.js"></script></body></html>');
    }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())) };
}

/** Caller owns the browser/page. The temporary fixture mounts the actual component,
 * provider and dictionaries, and only browser environment APIs are fault-injected. */
export async function copyButtonBrowserQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  reportDir = join(tmpdir(), 'zoyku-copy-button'),
} = {}) {
  const harness = await startHarness();
  const checks = [], issues = [], pageErrors = [];
  const expectedChecks = 36;
  const subject = () => page.locator('[data-copy-subject]');
  const button = () => subject().getByRole('button');
  const source = () => page.getByTestId('source');
  const callbacks = () => page.evaluate(() => window.__copyHarness.callbacks);
  const onError = error => pageErrors.push(error.message);
  page.on('pageerror', onError);
  const check = async (name, run) => {
    const errorsBefore = pageErrors.length;
    try {
      await run();
      assert.deepEqual(pageErrors.slice(errorsBefore), [], 'the scenario must not emit pageerrors');
      checks.push({ name, passed: true });
    } catch (error) {
      const diagnostic = await page.evaluate(() => ({
        url: location.href,
        subject: document.querySelector('[data-copy-subject]')?.textContent ?? null,
        source: document.querySelector('[data-testid="source"]')?.value ?? null,
        harness: window.__copyHarness ?? null,
        calls: window.__copyCalls ?? null,
        temporaryTextareas: document.querySelectorAll('body > textarea').length,
      })).catch(() => null);
      checks.push({ name, passed: false, error: error.message, pageErrors: pageErrors.slice(errorsBefore), diagnostic });
    }
  };
  const visit = async (mode = 'success', locale = 'en') => {
    await page.goto(`${harness.url}/?locale=${locale}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__copyHarness?.ready);
    await page.evaluate(mode => {
      window.__copyCalls = { writes: [], fallbacks: [], pending: [], timers: [], cleared: [] };
      const schedule = window.setTimeout.bind(window), cancel = window.clearTimeout.bind(window);
      window.setTimeout = (callback, delay, ...args) => {
        const timer = schedule(callback, delay, ...args);
        if (delay === 1600) window.__copyCalls.timers.push(timer);
        return timer;
      };
      window.clearTimeout = timer => { window.__copyCalls.cleared.push(timer); cancel(timer); };
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: mode === 'unavailable' ? undefined : { writeText: text => {
        window.__copyCalls.writes.push(text);
        if (mode === 'pending') return new Promise((resolve, reject) => window.__copyCalls.pending.push({ resolve, reject }));
        if (mode === 'success') return Promise.resolve();
        return Promise.reject(new DOMException('Clipboard denied', 'NotAllowedError'));
      } } });
      document.execCommand = () => {
        window.__copyCalls.fallbacks.push(document.activeElement?.value ?? '');
        if (mode === 'throw') throw new Error('Fallback blocked');
        return mode === 'fallback' || mode === 'unavailable';
      };
    }, mode);
  };
  const success = async () => {
    await page.waitForFunction(() => document.querySelector('[data-copy-subject] button')?.textContent?.trim() === 'Copied');
  };
  const failure = async locale => {
    await page.waitForFunction(text => document.querySelector('[data-copy-subject] button')?.title === text, RECOVERY[locale], { timeout: 3000 });
    assert.equal(await button().getAttribute('title'), RECOVERY[locale]);
    const description = await button().getAttribute('aria-describedby');
    assert.ok(description, 'failed copy must expose its manual recovery description');
    assert.equal(await page.evaluate(id => document.getElementById(id)?.textContent, description), RECOVERY[locale]);
    assert.notEqual(await button().innerText(), 'Copied');
    assert.notEqual(await button().innerText(), 'Copy');
  };
  const settle = async (index = 0, reject = false) => {
    await page.evaluate(({ index, reject }) => {
      const pending = window.__copyCalls.pending[index];
      if (reject) pending.reject(new DOMException('Clipboard denied', 'NotAllowedError'));
      else pending.resolve();
    }, { index, reject });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => resolve())));
  };
  try {
    await mkdir(reportDir, { recursive: true });
    await check('clipboard success writes exact Unicode content and calls back once', async () => {
      await visit(); await source().fill('  中文 😀\nExact text  '); await button().click(); await success();
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.writes), ['  中文 😀\nExact text  ']);
      assert.deepEqual(await callbacks(), [0]);
      assert.equal(await button().getAttribute('aria-describedby'), null);
    });
    for (const mode of ['unavailable', 'fallback']) await check(`${mode} clipboard uses successful fallback with focus and textarea cleanup`, async () => {
      await visit(mode); await button().focus(); await button().click(); await success();
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.fallbacks), ['Alpha 中文 😀']);
      assert.deepEqual(await callbacks(), [0]);
      assert.equal(await page.locator('body > textarea').count(), 0);
      assert.equal(await button().evaluate(element => document.activeElement === element), true);
    });
    for (const mode of ['false', 'throw']) await check(`${mode} fallback exposes recovery without success, callback, leaked textarea or pageerror`, async () => {
      await visit(mode); await button().click(); await failure('en');
      assert.notEqual(await button().innerText(), 'Copied'); assert.deepEqual(await callbacks(), []);
      assert.equal(await page.locator('body > textarea').count(), 0);
      assert.equal(await button().evaluate(element => document.activeElement === element), true);
    });
    await check('empty input does not write, fall back, report success or call back', async () => {
      await visit(); await source().fill(''); await button().click();
      assert.equal(await button().innerText(), 'Copy'); assert.deepEqual(await callbacks(), []);
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.writes), []);
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.fallbacks), []);
    });
    await check('value function is never evaluated in render and once per click', async () => {
      await visit(); await page.getByTestId('getter').check(); await page.getByTestId('rerender').click();
      assert.equal(await page.evaluate(() => window.__copyHarness.getterCalls), 0);
      await button().click(); await success();
      assert.equal(await page.evaluate(() => window.__copyHarness.getterCalls), 1);
      await page.getByTestId('rerender').click();
      assert.equal(await page.evaluate(() => window.__copyHarness.getterCalls), 1);
      assert.equal(await button().innerText(), 'Copied');
    });
    await check('throwing value function reports recovery without clipboard access or pageerror', async () => {
      await visit(); await page.getByTestId('getter').check(); await page.getByTestId('getter-throws').check();
      await button().click(); await failure('en');
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.writes), []); assert.deepEqual(await callbacks(), []);
    });
    await check('empty value function remains idle and is called only by the click', async () => {
      await visit(); await source().fill(''); await page.getByTestId('getter').check(); await button().click();
      assert.equal(await page.evaluate(() => window.__copyHarness.getterCalls), 1);
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.writes), []); assert.deepEqual(await callbacks(), []);
      assert.equal(await button().innerText(), 'Copy');
    });
    await check('two pending copies ignore the older success until newest finishes', async () => {
      await visit('pending'); await button().click(); await button().click(); await settle(0);
      assert.equal(await button().innerText(), 'Copy'); assert.deepEqual(await callbacks(), []);
      await settle(1); await success(); assert.deepEqual(await callbacks(), [0]);
    });
    await check('older rejection cannot fall back over a newer completed copy', async () => {
      await visit('pending'); await button().click(); await button().click(); await settle(1); await success(); await settle(0, true);
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.fallbacks), []); assert.deepEqual(await callbacks(), [0]);
      assert.equal(await button().innerText(), 'Copied');
    });
    for (const reject of [false, true]) await check(`changed input cancels pending ${reject ? 'rejection and fallback' : 'success and callback'}`, async () => {
      await visit('pending'); await button().click(); await source().fill('New input'); await settle(0, reject);
      assert.equal(await button().innerText(), 'Copy'); assert.deepEqual(await callbacks(), []);
      assert.deepEqual(await page.evaluate(() => window.__copyCalls.fallbacks), []);
      assert.equal(await button().getAttribute('aria-describedby'), null);
    });
    await check('changed callback cancels an operation captured by the previous callback', async () => {
      await visit('pending'); await button().click(); await page.getByTestId('callback-version').click(); await settle();
      assert.equal(await button().innerText(), 'Copy'); assert.deepEqual(await callbacks(), []);
    });
    await check('changing input clears old success and its timer', async () => {
      await visit(); await button().click(); await success();
      const oldTimer = await page.evaluate(() => window.__copyCalls.timers[0]);
      await source().fill('New input'); assert.equal(await button().innerText(), 'Copy');
      assert.ok(await page.evaluate(timer => window.__copyCalls.cleared.includes(timer), oldTimer));
    });
    await check('unmount cancels pending work before callback or timer creation', async () => {
      await visit('pending'); await button().click(); await page.getByTestId('toggle').click(); await settle();
      assert.deepEqual(await callbacks(), []); assert.deepEqual(await page.evaluate(() => window.__copyCalls.timers), []);
      await page.getByTestId('toggle').click(); assert.equal(await button().innerText(), 'Copy');
    });
    await check('unmount clears a scheduled success timer', async () => {
      await visit(); await button().click(); await success();
      const timer = await page.evaluate(() => window.__copyCalls.timers[0]);
      await page.getByTestId('toggle').click();
      assert.ok(await page.evaluate(value => window.__copyCalls.cleared.includes(value), timer));
    });
    await check('success feedback returns to idle when its current timer expires', async () => {
      await visit(); await button().click(); await success();
      await page.waitForFunction(() => document.querySelector('[data-copy-subject] button')?.textContent?.trim() === 'Copy', undefined, { timeout: 3000 });
      assert.deepEqual(await callbacks(), [0]);
    });
    await check('retry after failure can succeed and removes the recovery message', async () => {
      await visit('false'); await button().click(); await failure('en');
      await page.evaluate(() => { navigator.clipboard.writeText = text => { window.__copyCalls.writes.push(text); return Promise.resolve(); }; });
      await button().click(); await success();
      assert.equal(await button().getAttribute('aria-describedby'), null); assert.deepEqual(await callbacks(), [0]);
    });
    for (const locale of LOCALES) await check(`failure label and manual recovery description are authored in ${locale}`, async () => {
      await visit('false', locale); await button().click(); await failure(locale); assert.deepEqual(await callbacks(), []);
    });
    await check('real case converter clipboard success copies the displayed result', async () => {
      await page.goto(`${baseURL.replace(/\/$/, '')}/en/tools/case-converter`, { waitUntil: 'networkidle' });
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
      const fields = page.locator('main textarea'); await fields.first().fill('real browser copy');
      const copy = await page.getByRole('button', { name: 'Copy', exact: true }).first().elementHandle();
      await copy.click();
      await page.waitForFunction(() => navigator.clipboard.readText().then(text => text === 'Real Browser Copy'));
      assert.equal(await copy.innerText(), 'Copied');
    });
    await check('real case converter input change cannot show pending old success', async () => {
      await page.goto(`${baseURL.replace(/\/$/, '')}/en/tools/case-converter`, { waitUntil: 'networkidle' });
      const fields = page.locator('main textarea'); await fields.first().fill('first value');
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => new Promise(resolve => { window.__resolveRealCopy = resolve; }) } }));
      const copy = await page.getByRole('button', { name: 'Copy', exact: true }).first().elementHandle();
      await copy.click(); await fields.first().fill('second value'); await page.evaluate(() => window.__resolveRealCopy());
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => resolve())));
      assert.equal(await copy.innerText(), 'Copy'); assert.equal(await fields.nth(1).inputValue(), 'Second Value');
    });
  } catch (error) { issues.push(error.message); }
  finally { page.off('pageerror', onError); await harness.close(); }
  const failed = checks.filter(check => !check.passed).length + issues.length;
  const completed = checks.length === expectedChecks;
  const report = { ok: completed && failed === 0, completed, expectedChecks, passed: checks.filter(check => check.passed).length, failed, checks, issues, pageErrors, scope: 'Actual CopyButton component lifecycle/API fault-injection and two real case-converter integrations; not a full-site accessibility audit.' };
  await mkdir(reportDir, { recursive: true });
  await writeFile(join(reportDir, 'browser-report.json'), JSON.stringify(report, null, 2));
  return report;
}

export default copyButtonBrowserQA;
