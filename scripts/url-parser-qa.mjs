import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const FIXTURES = [
  ['bare domain with port', 'example.com:8080/path?x=1#top', { protocol: 'https', host: 'example.com', port: '8080', pathname: '/path', segments: ['path'], query: [{ key: 'x', value: '1' }], hash: 'top' }],
  ['localhost with port', 'localhost:3000/local', { protocol: 'https', host: 'localhost', port: '3000', pathname: '/local' }],
  ['IPv4 with port', '127.0.0.1:8080/ip', { protocol: 'https', host: '127.0.0.1', port: '8080', pathname: '/ip' }],
  ['bracketed IPv6 with port', '[2001:db8::1]:8443/v6', { protocol: 'https', host: '[2001:db8::1]', port: '8443', pathname: '/v6' }],
  ['bare port with query and hash only', 'example.com:8080?x=1#top', { protocol: 'https', host: 'example.com', port: '8080', pathname: '/', segments: [''], hash: 'top' }],
  ['native HTTPS normalization', 'https://EXAMPLE.com:443/中文', { protocol: 'https', host: 'example.com', port: '', pathname: '/%E4%B8%AD%E6%96%87', segments: ['中文'] }],
  ['explicit FTP scheme', 'ftp://example.com:2121/file', { protocol: 'ftp', host: 'example.com', port: '2121', pathname: '/file' }],
  ['explicit mailto scheme', 'mailto:user@example.com?subject=a+b#message', { protocol: 'mailto', host: '', pathname: 'user@example.com', query: [{ key: 'subject', value: 'a b' }], hash: 'message' }],
  ['explicit data scheme', 'data:text/plain,a%2Fb', { protocol: 'data', host: '', pathname: 'text/plain,a%2Fb', segments: ['text', 'plain,a/b'] }],
  ['explicit urn scheme', 'urn:isbn:9780140328721', { protocol: 'urn', host: '', pathname: 'isbn:9780140328721' }],
  ['opaque custom numeric scheme', 'myapp:8080/path', { protocol: 'myapp', host: '', port: '', pathname: '8080/path' }],
  ['opaque dotted custom scheme', 'my.app:payload', { protocol: 'my.app', host: '', pathname: 'payload' }],
  ['numeric dotted ambiguity prefers authority', 'my.app:8080/path', { protocol: 'https', host: 'my.app', port: '8080', pathname: '/path' }],
  ['explicit dotted authority scheme', 'my.app://8080/path', { protocol: 'my.app', host: '8080', port: '', pathname: '/path' }],
  ['explicit single-label HTTPS authority', '//myapp:8080/path', { protocol: 'https', host: 'myapp', port: '8080', pathname: '/path' }],
  ['empty segments and ordered form query', 'https://example.com/a%2Fb//中/?tag=a+b&tag=%2B&empty=&=value&flag#h%20i', {
    pathname: '/a%2Fb//%E4%B8%AD/', segments: ['a/b', '', '中', ''],
    query: [{ key: 'tag', value: 'a b' }, { key: 'tag', value: '+' }, { key: 'empty', value: '' }, { key: '', value: 'value' }, { key: 'flag', value: '' }], hash: 'h%20i',
  }],
  ['malformed percent escapes remain visible', 'https://example.com/%E0%A4%A/%ZZ#h%20i', { pathname: '/%E0%A4%A/%ZZ', segments: ['%E0%A4%A', '%ZZ'], hash: 'h%20i' }],
];
const EXPECTED_CHECKS = FIXTURES.length + 10;
const EXPECTED_AUDITS = 4;
const PRIVACY_MARKER = 'url_parser_private_probe_83c2';

async function readJson(page, root) {
  await page.evaluate(() => navigator.clipboard.writeText('__url_parser_pending__'));
  await root.getByRole('button', { name: 'Copy as JSON', exact: true }).click();
  await page.waitForFunction(() => navigator.clipboard.readText().then(value => value.startsWith('{')));
  return JSON.parse(await page.evaluate(() => navigator.clipboard.readText()));
}

async function setDark(page, enabled) {
  await page.evaluate(dark => document.documentElement.classList.toggle('dark', dark), enabled);
  // The site's button transitions must settle before contrast measurement.
  await page.waitForFunction(() => {
    const button = document.querySelector('[data-url-parser-tool] button');
    return button && getComputedStyle(button).color === getComputedStyle(document.body).color;
  });
}

async function audit(page, state) {
  return page.evaluate(async name => {
    const root = document.querySelector('[data-url-parser-tool]');
    const result = await window.axe.run(root);
    const concise = items => items.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }));
    return { state: name, violations: concise(result.violations), incomplete: concise(result.incomplete) };
  }, state);
}

/**
 * Real clipboard, recovery, privacy, narrow RTL and axe checks. The caller owns
 * its Playwright page/browser and supplies an axe bundle through axePath.
 */
export async function urlParserQA(page, { baseURL = 'http://127.0.0.1:3480', reportDir = '/tmp/zoyku-url-parser', axePath } = {}) {
  baseURL = baseURL.replace(/\/$/, '');
  await mkdir(reportDir, { recursive: true });
  const checks = [], issues = [], audits = [], fixtures = [], requests = [], messages = [], pageErrors = [];
  let finished = false;
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) { checks.push({ name, passed: false, error: error.message }); }
  };
  const onRequest = request => requests.push(request.url() + ' ' + (request.postData() || ''));
  const onConsole = message => messages.push(message.text());
  const onPageError = error => pageErrors.push(error.message);
  let axeSource;
  try {
    if (!axePath) throw new Error('axePath is required; accessibility audits were not run.');
    axeSource = await readFile(axePath, 'utf8');
  } catch (error) { issues.push({ name: 'accessibility setup', error: error.message }); }
  if (axeSource && page) {
    const context = page.context();
    const root = () => page.locator('[data-url-parser-tool]');
    const input = () => root().locator('input[type="url"]');
    const visit = async locale => {
      await page.goto(`${baseURL}/${locale}/tools/url-parser`);
      await page.locator('.site-theme-control button').waitFor();
      await input().waitFor();
      await setDark(page, false);
    };
    page.on('request', onRequest); page.on('console', onConsole); page.on('pageerror', onPageError);
    try {
      await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
      await page.setViewportSize({ width: 1280, height: 1000 });
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      await visit('en');
      for (const [name, value, expected] of FIXTURES) {
        await check(`real copied JSON: ${name}`, async () => {
          await input().fill(value);
          const actual = await readJson(page, root());
          for (const [key, result] of Object.entries(expected)) assert.deepEqual(actual[key], result, key);
          assert.deepEqual(Object.keys(actual), ['protocol', 'host', 'port', 'pathname', 'segments', 'query', 'hash']);
          fixtures.push({ name, input: value, actual });
        });
      }
      await check('internal and trailing empty path segments have readable labels', async () => {
        await input().fill('https://example.com/a//b/');
        assert.deepEqual(await root().getByTestId('url-path-segment').allTextContents(), ['a', '(empty)', 'b', '(empty)']);
      });
      await check('policy note is associated with the input', async () => {
        const id = await input().getAttribute('aria-describedby');
        assert.ok(id);
        const text = await page.locator(`[id="${id}"]`).innerText();
        for (const marker of ['localhost', 'https://', 'scheme://', 'empty path segments']) assert.ok(text.includes(marker), marker);
      });
      await check('invalid input removes copy and exposes an alert', async () => {
        await input().fill('https://');
        assert.ok(await root().getByRole('alert').isVisible());
        assert.equal(await root().getByRole('button', { name: 'Copy as JSON', exact: true }).count(), 0);
        assert.equal(await root().getByTestId('url-path-segment').count(), 0);
      });
      await check('valid input recovers from invalid input with correct copied JSON', async () => {
        await input().fill('example.com:9090/recovered');
        assert.equal(await root().getByRole('alert').count(), 0);
        assert.equal((await readJson(page, root())).pathname, '/recovered');
      });
      await check('Clear returns to an empty editable state without stale output', async () => {
        await root().getByRole('button', { name: 'Clear', exact: true }).click();
        assert.equal(await input().inputValue(), '');
        assert.equal(await root().getByRole('alert').count(), 0);
        assert.equal(await root().getByTestId('url-path-segment').count(), 0);
        assert.equal(await root().getByRole('button', { name: 'Copy as JSON', exact: true }).count(), 0);
        assert.equal(await root().getByRole('button').count(), 2);
      });
      await check('sample recovers from empty state and retains original query order', async () => {
        await root().getByRole('button').last().click();
        const actual = await readJson(page, root());
        assert.equal(actual.host, 'example.com');
        assert.equal(actual.pathname, '/shop/shoes');
        assert.deepEqual(actual.query.map(param => param.key), ['color', 'size', 'utm_source']);
      });
      await check('entered values stay off requests, storage, address bar and console', async () => {
        await input().fill(`https://example.com/${PRIVACY_MARKER}?private=${PRIVACY_MARKER}#${PRIVACY_MARKER}`);
        assert.equal((await readJson(page, root())).segments[0], PRIVACY_MARKER);
        assert.equal(page.url(), `${baseURL}/en/tools/url-parser`);
        const storage = await page.evaluate(() => JSON.stringify({ local: Object.entries(localStorage), session: Object.entries(sessionStorage) }));
        assert.equal(storage.includes(PRIVACY_MARKER), false);
      });
      await page.addScriptTag({ content: axeSource });
      audits.push(await audit(page, 'desktop-valid-light'));
      await setDark(page, true); audits.push(await audit(page, 'desktop-valid-dark'));
      await page.setViewportSize({ width: 320, height: 800 });
      await visit('ar');
      const arabicValue = 'example.com:8080/مسار//طويل/?' + 'مفتاح'.repeat(20) + '=' + 'قيمة'.repeat(30) + '&tag=a+b&tag=%2B#قسم';
      await input().fill(arabicValue);
      await check('320px Arabic RTL still copies exact structured values', async () => {
        assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
        const actual = await readJson(page, root());
        assert.equal(actual.host, 'example.com'); assert.equal(actual.port, '8080');
        assert.deepEqual(actual.segments, ['مسار', '', 'طويل', '']);
        assert.deepEqual(actual.query.slice(-2), [{ key: 'tag', value: 'a b' }, { key: 'tag', value: '+' }]);
        fixtures.push({ name: '320px Arabic RTL', input: arabicValue, actual });
      });
      await check('320px Arabic RTL tool has no horizontal clipping or overflow', async () => {
        const bad = await root().evaluate(node => {
          const outer = node.getBoundingClientRect();
          return [...node.querySelectorAll('*')].filter(child => {
            const rect = child.getBoundingClientRect();
            return rect.width && (rect.left < outer.left - 1 || rect.right > outer.right + 1 || (child !== node.querySelector('input') && child.scrollWidth > child.clientWidth + 1));
          }).map(child => ({ tag: child.tagName, class: child.className, text: child.textContent.slice(0, 60) }));
        });
        assert.deepEqual(bad, []);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      });
      await page.addScriptTag({ content: axeSource });
      audits.push(await audit(page, '320px-rtl-valid-light'));
      await root().screenshot({ path: join(reportDir, 'url-parser-320-rtl-light.png') });
      await setDark(page, true); audits.push(await audit(page, '320px-rtl-valid-dark'));
      await root().screenshot({ path: join(reportDir, 'url-parser-320-rtl-dark.png') });
      await check('no unhandled browser errors or leaked fixture values', async () => {
        assert.deepEqual(pageErrors, []);
        assert.equal(requests.some(value => value.includes(PRIVACY_MARKER)), false);
        assert.equal(messages.some(value => value.includes(PRIVACY_MARKER)), false);
      });
      finished = true;
    } catch (error) { issues.push({ name: 'browser setup', error: error.message }); }
    finally {
      page.off('request', onRequest); page.off('console', onConsole); page.off('pageerror', onPageError);
      await page.evaluate(() => document.documentElement.classList.remove('dark')).catch(() => {});
    }
  } else if (axeSource) issues.push({ name: 'browser setup', error: 'A caller-owned page is required.' });
  const audited = audits.length === EXPECTED_AUDITS;
  const accessibility = {
    status: !audited ? 'not_completed' : audits.some(result => result.violations.length) ? 'failed' : audits.some(result => result.incomplete.length) ? 'needs_review' : 'passed',
    expectedStates: EXPECTED_AUDITS, completedStates: audits.length,
    violations: audited ? audits.reduce((sum, result) => sum + result.violations.length, 0) : null,
    incomplete: audited ? audits.reduce((sum, result) => sum + result.incomplete.length, 0) : null,
  };
  const completed = finished && checks.length === EXPECTED_CHECKS && audited;
  const passed = checks.filter(check => check.passed).length;
  const failed = checks.length - passed + issues.length + audits.filter(result => result.violations.length || result.incomplete.length).length;
  const report = { ok: completed && failed === 0, completed, expectedChecks: EXPECTED_CHECKS, passed, failed, checks, issues, pageErrors, accessibilityAuditRun: audited, accessibility, audits };
  await writeFile(join(reportDir, 'url-parser-fixtures.json'), JSON.stringify(fixtures, null, 2));
  await writeFile(join(reportDir, 'url-parser-qa.json'), JSON.stringify(report, null, 2));
  return report;
}

export default urlParserQA;
