import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

/** Run with an existing Playwright page; optionally inject a locally supplied axe bundle. */
export default async function toolParityQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  axePath,
  reportDir = '/tmp/zoyku-tool-parity',
} = {}) {
  await mkdir(reportDir, { recursive: true });
  const checks = [];
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) { checks.push({ name, passed: false, error: error.message }); }
  };
  const visit = async pathname => {
    await page.goto(baseURL + pathname);
    await page.locator('.site-theme-control button').waitFor();
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit('/en/tools/image-compressor');
  await check('landmark names distinguish main navigation from footer', async () => {
    const labels = await page.getByRole('navigation').evaluateAll(nodes => nodes.map(n => n.getAttribute('aria-label')));
    assert.ok(labels.every(Boolean));
    assert.equal(new Set(labels).size, labels.length);
  });
  await check('reduced motion disables the FAQ entrance animation', async () => {
    assert.equal(await page.locator('.faq-a').first().evaluate(e => getComputedStyle(e).animationName), 'none');
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await check('the embed code can receive keyboard focus and horizontal scrolling', async () => {
    const code = page.locator('code').filter({ hasText: '<iframe' });
    assert.equal(await code.getAttribute('tabindex'), '0');
    await code.focus();
    assert.ok(await code.evaluate(e => e === document.activeElement));
    await code.press('ArrowRight');
    await page.waitForFunction(() => [...document.querySelectorAll('code')].some(e => e.scrollLeft > 0));
  });
  await check('Space opens the file picker without its page-scroll default', async () => {
    const dropzone = page.getByRole('button', { name: 'Drop files here or click to choose' });
    await dropzone.focus();
    await page.evaluate(() => {
      window.__spacePrevented = null;
      document.addEventListener('keydown', event => queueMicrotask(() => { window.__spacePrevented = event.defaultPrevented; }), { once: true });
    });
    const [chooser] = await Promise.all([page.waitForEvent('filechooser'), dropzone.press('Space')]);
    await chooser.setFiles([]);
    assert.equal(await page.evaluate(() => window.__spacePrevented), true);
  });
  await check('image output format exposes and updates its selected state', async () => {
    assert.equal(await page.getByRole('button', { name: 'JPG', exact: true }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'PNG', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'PNG', exact: true }).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.getByRole('button', { name: 'JPG', exact: true }).getAttribute('aria-pressed'), 'false');
    assert.equal(await page.getByRole('slider', { name: 'Quality', exact: true }).count(), 0);
    await page.getByRole('button', { name: 'WebP', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'WebP', exact: true }).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.getByRole('slider', { name: 'Quality', exact: true }).count(), 1);
  });
  await check('image resize unit exposes and updates its selected state', async () => {
    await visit('/en/tools/image-resizer');
    assert.equal(await page.getByRole('button', { name: 'Pixels', exact: true }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'Percent', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Pixels', exact: true }).getAttribute('aria-pressed'), 'false');
    assert.equal(await page.getByRole('button', { name: 'Percent', exact: true }).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.getByRole('spinbutton', { name: 'Width', exact: true }).count(), 0);
  });
  const audits=[];
  if (axePath) {
    for (const pathname of ['/en', '/en/tools/image-compressor', '/en/tools/json-formatter', '/en/tools/regex-tester', '/en/tools/word-counter', '/en/tools/compound-interest-calculator']) {
      await check(`automated accessibility: ${pathname}`, async () => {
        await visit(pathname);
        await page.addScriptTag({ path: axePath });
        const audit = await page.evaluate(async () => {
          const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
          return { version: result.testEngine.version, violations: result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target:n.target, failureSummary:n.failureSummary })) })), incomplete: result.incomplete.map(v => ({ id:v.id, nodes:v.nodes.length })) };
        });
        audits.push({ pathname, ...audit });
        assert.deepEqual(audit.violations, []);
      });
    }
  }
  const result = { passed: checks.filter(c => c.passed).length, failed: checks.filter(c => !c.passed).length, checks, audits, accessibilityAuditRun: Boolean(axePath) };
  await writeFile(reportDir + '/tool-parity-checks.json', JSON.stringify(result, null, 2));
  return result;
}
