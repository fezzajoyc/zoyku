import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

/** Exercise the actual compiled Blob Worker and visible preview in a browser. */
export default async function regexParityQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  reportDir = '/tmp/zoyku-regex-parity',
} = {}) {
  await mkdir(reportDir, { recursive: true });
  const checks = [];
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) { checks.push({ name, passed: false, error: error.message }); }
  };
  const visit = async () => {
    await page.goto(baseURL + '/en/tools/regex-tester');
    await page.locator('.site-theme-control button').waitFor();
  };
  const pattern = page.getByRole('textbox', { name: 'Pattern', exact: true });
  const text = page.getByRole('textbox', { name: 'Test string', exact: true });
  const preview = page.locator('.whitespace-pre-wrap.break-words').first();
  await check('without g the actual Worker returns only the first match', async () => {
    await visit();
    await pattern.fill('a');
    await text.fill('aba');
    await page.getByRole('button', { name: 'g', exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll('li.mono').length === 1);
    assert.match((await page.locator('li.mono').allTextContents())[0], /index 0.*a/);
    assert.equal(await preview.innerText(), 'aba');
  });
  await check('Unicode zero-width matches preserve emoji and UTF-16 indices', async () => {
    await visit();
    await pattern.fill('(?:)');
    await text.fill('😀中😀');
    await page.getByRole('button', { name: 'u', exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll('li.mono').length === 4);
    const matches = await page.locator('li.mono').allTextContents();
    assert.deepEqual(matches.map(value => Number(value.match(/index (\d+)/)[1])), [0, 2, 3, 5]);
    assert.equal(await preview.innerText(), '😀中😀');
  });
  await check('500 matches are complete and 501 explicitly reports truncation', async () => {
    await visit();
    await pattern.fill('a');
    await text.fill('a'.repeat(500));
    await page.waitForFunction(() => document.querySelectorAll('li.mono').length === 500);
    assert.equal((await page.locator('main').innerText()).includes('showing the first'), false);
    await text.fill('a'.repeat(501));
    await page.getByText('500 match(es) · showing the first 500', { exact: true }).waitFor();
    assert.equal(await preview.innerText(), 'a'.repeat(501));
  });
  await check('catastrophic backtracking times out and editing recovers', async () => {
    await visit();
    await pattern.fill('(a+)+$');
    await text.fill('a'.repeat(40) + '!');
    await page.getByText(/Match timed out/).waitFor({ timeout: 7000 });
    await pattern.fill('x');
    await text.fill('xyz');
    await page.waitForFunction(() => document.querySelectorAll('li.mono').length === 1);
    assert.equal(await preview.innerText(), 'xyz');
  });
  const result = { passed: checks.filter(c => c.passed).length, failed: checks.filter(c => !c.passed).length, checks };
  await writeFile(reportDir + '/regex-parity-checks.json', JSON.stringify(result, null, 2));
  return result;
}
