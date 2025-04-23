import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datePickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

test("parametrized methods", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);
  const onDatepickerPage = new DatepickerPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "test@example.com",
    "password",
    "Option 1"
  );
  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    "John Smith",
    "john.test@test.com",
    true
  );
  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatePickerDateFromToday(15);
  await onDatepickerPage.selectDatepickerWithRangeFromToday(5, 10);
});
