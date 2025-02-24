import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/'); // , { timeout: 120000, waitUntil: 'domcontentloaded'}
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async({ page }) => {
    // by Tag name
    await page.locator('input').first().click()

    // by ID
    page.locator('#inputEmail1')

    // by class value
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[type="email"]')

    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    page.locator('input[placeholder="Email"]')

    // by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})