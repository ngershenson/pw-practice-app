import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/"); // , { timeout: 120000, waitUntil: 'domcontentloaded'}
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  // by Tag name
  page.locator("input").first();

  // by ID
  page.locator("#inputEmail1");

  // by class value
  page.locator(".shape-rectangle");

  // by attribute
  page.locator('[type="email"]');

  // by Class value (full)
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  // combine different selectors
  page.locator('input[placeholder="Email"]');

  // by XPath (NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail1"]');

  // by partial text match
  await page.locator(':text("Using")').click();

  // by exact text match
  await page.locator(':text-is("Using the Grid")').click();
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText("Using the Grid").click();

  await page.getByTestId("SignIn").click();

  await page.getByTitle("Iot Dashboard").click();
});

test("locating child elements", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();
  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();
  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator(':text-is("Using the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("reusing locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcom123");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.getByRole("button").click();

  await expect(emailField).toHaveValue("test@test.com");
});

test("extracting values", async ({ page }) => {
  // single test value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toEqual("Submit");

  // all test values
  const allRadioButtonLabels = await page.locator("nb-radio").allTextContents();
  expect(allRadioButtonLabels).toContain("Option 1");
  //   expect(allRadioButtonLabels).toContain("Option 12");

  // input values
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@test.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual("test@test.com");

  // get value of attribute
  const placeholderValue = await emailField.getAttribute("placeholder");
  expect(placeholderValue).toEqual("Email");
});

test("assertions", async ({ page }) => {
  // general assertions
  const value = 25;
  expect(value).toEqual(25);

  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");
  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  // locator assertion
  await expect(basicFormButton).toHaveText("Submit");

  // soft assertion
  await expect.soft(basicFormButton).toHaveText("Submit5");
  await basicFormButton.click();
});
