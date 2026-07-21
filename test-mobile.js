const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: 'iPhone-SE', width: 375, height: 667 },
    { name: 'iPhone-14', width: 390, height: 844 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 },
  ];

  const pages = [
    { name: 'login', url: '/login' },
    { name: 'dashboard', url: '/dashboard', needsLogin: true },
    { name: 'courses', url: '/courses', needsLogin: true },
    { name: 'lectures', url: '/lectures', needsLogin: true },
    { name: 'instructors', url: '/instructors', needsLogin: true },
    { name: 'assignments', url: '/assignments', needsLogin: true },
    { name: 'exams', url: '/exams', needsLogin: true },
    { name: 'grades', url: '/grades', needsLogin: true },
  ];

  // Test login page on all viewports
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    await page.goto(`${TARGET_URL}/login`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `/tmp/mobile-test-login-${vp.name}.png`, fullPage: true });
    console.log(`✓ Login - ${vp.name} (${vp.width}x${vp.height})`);
    await ctx.close();
  }

  // Login and test dashboard
  const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await ctx.newPage();
  await page.goto(`${TARGET_URL}/login`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.fill('input[type="text"]', '202400123');
  await page.fill('input[type="password"]', 'test123');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard', { timeout: 10000 });
  await page.waitForTimeout(500);

  // Test all pages on mobile
  for (const pg of pages.filter(p => p.needsLogin)) {
    await page.goto(`${TARGET_URL}${pg.url}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `/tmp/mobile-test-${pg.name}-mobile.png`, fullPage: true });
    console.log(`✓ ${pg.name} - Mobile (375x667)`);
  }

  // Test dashboard on desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${TARGET_URL}/dashboard`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/mobile-test-dashboard-desktop.png`, fullPage: true });
  console.log('✓ Dashboard - Desktop (1440x900)');

  // Test tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(`${TARGET_URL}/dashboard`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/mobile-test-dashboard-tablet.png`, fullPage: true });
  console.log('✓ Dashboard - Tablet (768x1024)');

  // Check for horizontal overflow on mobile
  await page.setViewportSize({ width: 375, height: 667 });
  const issues = [];
  for (const pg of pages.filter(p => p.needsLogin)) {
    await page.goto(`${TARGET_URL}${pg.url}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(300);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    if (scrollWidth > clientWidth + 5) {
      issues.push(`${pg.name}: horizontal overflow (${scrollWidth}px > ${clientWidth}px)`);
    }
  }

  if (issues.length > 0) {
    console.log('\n❌ ISSUES FOUND:');
    issues.forEach(i => console.log(`  - ${i}`));
  } else {
    console.log('\n✅ No horizontal overflow issues found');
  }

  await browser.close();
  console.log('\nAll tests completed!');
})();
