import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

async function contrast(locator) {
  const colors = await locator.evaluate(element => {
    let surface = element;
    while (surface.parentElement && getComputedStyle(surface).backgroundColor === 'rgba(0, 0, 0, 0)') surface = surface.parentElement;
    return { foreground: getComputedStyle(element).color, background: getComputedStyle(surface).backgroundColor };
  });
  const luminance = color => color.match(/[\d.]+/g).slice(0, 3).map(Number).map(c => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  const a = luminance(colors.foreground), b = luminance(colors.background);
  return { ...colors, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
}

/** Verify manual theme choice wins over OS preference for tokens and utilities. */
export default async function themeParityQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  reportDir = '/tmp/zoyku-theme-parity',
} = {}) {
  const checks = [];
  await mkdir(reportDir, { recursive: true });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(baseURL + '/en/tools/json-formatter');
  for (const system of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme: system });
    for (const selected of ['light', 'dark']) {
      await page.evaluate(theme => localStorage.setItem('theme', theme), selected);
      await page.reload();
      await page.locator('.site-theme-control button').waitFor();
      const state = await page.getByRole('button', { name: '2 spaces', exact: true }).evaluate(button => {
        const css = getComputedStyle(button);
        const select = document.querySelector('.site-language-control select');
        return {
          dark: document.documentElement.classList.contains('dark'),
          scheme: getComputedStyle(document.documentElement).colorScheme,
          foreground: css.color, background: css.backgroundColor,
          selectBackground: getComputedStyle(select).backgroundColor,
          card: getComputedStyle(document.documentElement).getPropertyValue('--color-card').trim(),
        };
      });
      try {
        assert.equal(state.dark, selected === 'dark');
        assert.equal(state.scheme, selected);
        assert.equal(state.foreground, selected === 'dark' ? 'rgb(29, 29, 31)' : 'rgb(255, 255, 255)');
        assert.equal(state.background, selected === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(29, 29, 31)');
        assert.equal(state.selectBackground, selected === 'dark' ? 'rgb(245, 245, 247)' : 'rgb(29, 29, 31)');
        checks.push({ system, selected, passed: true, state });
      } catch (error) {
        checks.push({ system, selected, passed: false, state, error: error.message });
      }
    }
  }
  await page.locator('.site-theme-control button').click();
  const clicked = await page.evaluate(() => ({ dark: document.documentElement.classList.contains('dark'), stored: localStorage.getItem('theme') }));
  checks.push({ name: 'visible theme control updates and persists the choice', passed: !clicked.dark && clicked.stored === 'light', state: clicked });
  for (const selected of ['light', 'dark']) {
    await page.evaluate(theme => localStorage.setItem('theme', theme), selected);
    await page.goto(baseURL + '/en/tools/json-formatter');
    await page.locator('.site-theme-control button').waitFor();
    const textColors = [];
    try {
      for (const locator of [page.getByRole('button', { name: 'Try an example', exact: true }), page.getByRole('link', { name: 'All Developer tools →', exact: true })]) {
        const state = await contrast(locator); textColors.push(state);
        assert.ok(state.ratio >= 4.5, JSON.stringify(state));
      }
      checks.push({ name: `${selected}: accent text on card and page meets 4.5:1`, passed: true, textColors });
    } catch (error) { checks.push({ name: `${selected}: accent text contrast`, passed: false, textColors, error: error.message }); }
    await page.goto(baseURL + '/en/tools?q=zzzz_no_tool_273489');
    const home = page.locator('main a').filter({ hasText: 'Go to homepage' });
    const buttonColors = [];
    try {
      await home.waitFor();
      buttonColors.push(await contrast(home));
      await home.hover();
      await page.waitForTimeout(250);
      buttonColors.push(await contrast(home));
      assert.ok(buttonColors.every(state => state.ratio >= 4.5), JSON.stringify(buttonColors));
      checks.push({ name: `${selected}: white action label and hover meet 4.5:1`, passed: true, buttonColors });
    } catch (error) { checks.push({ name: `${selected}: action label contrast`, passed: false, buttonColors, error: error.message }); }
  }
  const result = { passed: checks.filter(c => c.passed).length, failed: checks.filter(c => !c.passed).length, checks };
  await writeFile(reportDir + '/theme-parity-checks.json', JSON.stringify(result, null, 2));
  return result;
}
