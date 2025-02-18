import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/', { timeout: 120000, waitUntil: 'domcontentloaded'});
});

test.describe('tables & data', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Tables & Data').click();
    });

    test('get tree grid', async ({ page }) => {
        await page.getByText('Tree Grid').click();
    });
})

test.describe('forms', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
    });

    test('get to form layout', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    });

    test('navigate to datepicker', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
})