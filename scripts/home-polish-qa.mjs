/* Invoke with an existing Playwright page; no separate browser dependency needed. */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

export default async function homePolishQA(page, {
  baseURL = 'http://127.0.0.1:3480',
  reportDir = '/tmp/zoyku-home-polish',
  allLocales = false,
  production = false,
} = {}) {
  await fs.mkdir(reportDir, { recursive: true });
  const checks = [];
  const check = async (name, run) => {
    try { await run(); checks.push({ name, passed: true }); }
    catch (error) { checks.push({ name, passed: false, error: error.message }); }
  };
  const visit = async (locale, width = 390) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${baseURL}/${locale}`);
    await page.locator('.site-theme-control button').waitFor();
  };
  await visit('en');
  await page.evaluate(() => { localStorage.setItem('theme', 'light'); });
  const locales = allLocales
    ? ['en', 'zh', 'ja', 'es', 'pt', 'fr', 'de', 'ru', 'it', 'tr', 'ko', 'ar', 'hi', 'id', 'vi']
    : ['de', 'ar'];
  for (const locale of locales) {
    await check(`${locale}: 320px layout and privacy CTA stay inside the viewport`, async () => {
      await visit(locale, 320);
      const bounds = await page.evaluate(() => {
        const cta = document.querySelector('.home-privacy > a');
        const card = document.querySelector('.home-privacy');
        return {
          width: innerWidth, scroll: document.documentElement.scrollWidth,
          link: cta.getBoundingClientRect().toJSON(), card: card.getBoundingClientRect().toJSON(),
          textFits: cta.scrollWidth <= cta.clientWidth + 1,
        };
      });
      assert.equal(bounds.scroll, bounds.width, 'page has horizontal overflow');
      assert.ok(bounds.link.left >= bounds.card.left && bounds.link.right <= bounds.card.right, 'privacy link is clipped');
      assert.ok(bounds.textFits, 'privacy text is clipped');
    });
  }
  await check('mobile primary controls have 44px touch height', async () => {
    await visit('en');
    const targets = await page.locator('header button,header select,.home-suggestions a,.home-favorites-toggle,.home-section-heading > a').evaluateAll(elements =>
      elements.filter(e => e.getBoundingClientRect().width > 0).map(e => ({ name: e.textContent || e.getAttribute('aria-label'), height: e.getBoundingClientRect().height })));
    assert.ok(targets.length >= 10);
    assert.deepEqual(targets.filter(t => t.height < 43.9), []);
    assert.equal(await page.locator('.home-search kbd').isVisible(), false, 'desktop shortcut should not crowd the phone search');
  });
  await check('last mobile category fills its row', async () => {
    const widths = await page.evaluate(() => ({ grid: document.querySelector('.home-category-grid').clientWidth, last: document.querySelector('.home-category-card:last-child').getBoundingClientRect().width }));
    assert.ok(Math.abs(widths.grid - widths.last) <= 1);
  });
  await check('RTL result content and favorites never overlap', async () => {
    await visit('ar');
    await page.locator('.home-search input').fill('pdf');
    const overlaps = await page.locator('.home-result-card').evaluateAll(elements => elements.map(e => {
      const text = e.querySelector('strong').getBoundingClientRect();
      const button = e.querySelector('button').getBoundingClientRect();
      return Math.min(text.right, button.right) - Math.max(text.left, button.left);
    }));
    assert.ok(overlaps.length > 0);
    assert.ok(overlaps.every(overlap => overlap <= 0), JSON.stringify(overlaps));
  });
  await check('desktop category menu dismisses on outside click and focus', async () => {
    await visit('en', 1440);
    const menu = page.locator('.site-category-menu');
    const summary = menu.locator('summary');
    await summary.click();
    await page.mouse.click(5, 800);
    assert.equal(await menu.getAttribute('open'), null, 'outside click leaves menu open');
    await summary.click();
    await page.locator('.home-search input').focus();
    assert.equal(await menu.getAttribute('open'), null, 'outside focus leaves menu open');
  });
  await check('IME confirmation does not navigate; confirmed Enter does', async () => {
    await visit('zh', 1440);
    await page.locator('.site-nav-actions > button').first().click();
    const input = page.getByRole('dialog').getByRole('combobox');
    await input.fill('json');
    const originalActive = await input.getAttribute('aria-activedescendant');
    await input.evaluate(e => {
      e.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, isComposing: true }));
      e.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, isComposing: true }));
    });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await page.getByRole('dialog').count(), 1, 'IME confirmation closed the search');
    assert.equal(new URL(page.url()).pathname, '/zh');
    assert.equal(await input.getAttribute('aria-activedescendant'), originalActive, 'IME arrow key moved the search selection');
    await input.evaluate(e => e.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 229, bubbles: true })));
    assert.equal(await page.getByRole('dialog').count(), 1, 'WebKit IME confirmation closed the search');
    const active = await input.getAttribute('aria-activedescendant');
    const name = await page.locator(`[id="${active}"] button`).innerText();
    assert.ok(name.toLowerCase().includes('json'));
    await input.press('Enter');
    await page.waitForURL(/\/zh\/tools\//);
  });
  await check('mobile disclosure closes outside and does not return after a resize', async () => {
    await visit('en');
    const toggle = page.locator('.site-mobile-menu-toggle');
    await toggle.click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
    await page.mouse.click(5, 800);
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click();
    await page.setViewportSize({ width: 1000, height: 844 });
    await page.waitForFunction(() => document.querySelector('.site-mobile-menu-toggle').getAttribute('aria-expanded') === 'false');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click();
    await page.locator('.site-theme-control button').focus();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false', 'focus left the disclosure but it stayed open');
  });
  await check('home search preserves composing text and submits only confirmed input', async () => {
    await visit('zh');
    const input = page.locator('.home-search input');
    await input.fill('pdf');
    await input.evaluate(e => {
      e.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
      e.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, isComposing: true }));
      e.form.requestSubmit();
    });
    assert.equal(await input.inputValue(), 'pdf');
    assert.equal(new URL(page.url()).pathname, '/zh');
    await input.evaluate(e => e.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true })));
    // WebKit may end composition before delivering its keyCode 229 Enter.
    await input.evaluate(e => e.addEventListener('keydown', event => {
      if (event.key === 'Enter') Object.defineProperty(event, 'keyCode', { get: () => 229 });
    }, { capture: true, once: true }));
    await input.press('Enter');
    assert.equal(new URL(page.url()).pathname, '/zh', 'IME confirmation triggered native form submission');
    await input.press('Enter');
    await page.waitForURL(/\/zh\/tools\?q=pdf/);
  });
  await check('favorites persist, unpin cleanly, and restore search focus', async () => {
    await visit('en');
    await page.locator('.home-search input').fill('pdf');
    const favorite = page.locator('.home-result-card button').first();
    await favorite.click();
    assert.equal(await favorite.getAttribute('aria-pressed'), 'true');
    await page.reload();
    await page.locator('.site-theme-control button').waitFor();
    await page.locator('.home-favorites-toggle').click();
    assert.equal(await page.locator('.home-result-card').count(), 1);
    await page.locator('.home-result-card button').click();
    assert.equal(await page.locator('.home-result-card').count(), 0);
    assert.ok(await page.locator('.home-search-empty button').evaluate(e => e.getBoundingClientRect().height >= 44));
    await page.locator('.home-search-empty button').click();
    assert.ok(await page.locator('.home-search input').evaluate(e => e === document.activeElement));
  });
  await check('saved light and dark themes restore without hydration errors', async () => {
    const errors = [];
    const capture = message => { if (message.type() === 'error' && /hydrat|server rendered|#418/i.test(message.text())) errors.push(message.text().slice(0, 240)); };
    page.on('console', capture);
    try {
      for (const theme of ['dark', 'light']) {
        await page.evaluate(theme => localStorage.setItem('theme', theme), theme);
        await page.reload();
        await page.locator('.site-theme-control button').waitFor();
        assert.equal(await page.locator('html').evaluate(e => e.classList.contains('dark')), theme === 'dark');
      }
      assert.deepEqual(errors, []);
    } finally { page.off('console', capture); }
  });
  await check('A to B reverses and reduced motion retains static A', async () => {
    await visit('en', 1440);
    const material = async () => page.locator('[data-home-material]').evaluate(e => Number(e.style.getPropertyValue('--home-progress')));
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
    await page.waitForFunction(() => Number(document.querySelector('[data-home-material]').style.getPropertyValue('--home-progress')) === 1);
    assert.equal(await material(), 1);
    assert.ok(await page.locator('.home-material-ambient .ribbon-bg').evaluate(e => getComputedStyle(e).maskImage.startsWith('linear-gradient(90deg, rgba(0, 0, 0, 0) 0%')), 'the source edge must stay feathered in B');
    assert.match(await page.locator('.home-tool-card').first().evaluate(e => getComputedStyle(e).backdropFilter), /blur\(16px\)/);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.match(await page.locator('.home-tool-card').first().evaluate(e => getComputedStyle(e).backdropFilter), /blur\(10px\)/);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => Number(document.querySelector('[data-home-material]').style.getPropertyValue('--home-progress')) === 0);
    assert.equal(await page.locator('.home-tool-card').first().evaluate(e => getComputedStyle(e).backdropFilter), 'none');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForFunction(() => Number(document.querySelector('[data-home-material]').style.getPropertyValue('--home-progress')) === 0);
  });
  if (production) {
    await check('directory browsing does not speculatively fetch every tool or return 429', async () => {
      const urls = new Set(); const errors = [];
      const capture = req => { if (/\/tools\/[^/?]+\?_rsc=/.test(req.url())) urls.add(req.url().split('?')[0]); };
      const response = res => { if (res.status() === 429) errors.push(res.url()); };
      page.on('request', capture); page.on('response', response);
      try {
        await page.goto(`${baseURL}/en/tools`);
        await page.locator('input[type="search"]').waitFor();
        for (const y of [500, 1300, 2500, 4000]) { await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(180); }
        await page.waitForTimeout(600);
        assert.ok(urls.size < 8, `${urls.size} different tool pages were prefetched`);
        assert.deepEqual(errors, []);
      } finally { page.off('request', capture); page.off('response', response); }
    });
  }
  await visit('en', 1440);
  await page.screenshot({ path: path.join(reportDir, 'desktop-a.png'), fullPage: true });
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(reportDir, 'desktop-b.png') });
  await visit('en');
  await page.screenshot({ path: path.join(reportDir, 'mobile.png'), fullPage: true });
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(reportDir, 'mobile-b.png') });
  await page.locator('.site-theme-control button').click();
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(reportDir, 'mobile-dark-b.png') });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: path.join(reportDir, 'mobile-dark.png'), fullPage: true });
  await fs.writeFile(path.join(reportDir, 'checks.json'), JSON.stringify(checks, null, 2));
  return { passed: checks.filter(c => c.passed).length, failed: checks.filter(c => !c.passed).length, checks, reportDir };
};
