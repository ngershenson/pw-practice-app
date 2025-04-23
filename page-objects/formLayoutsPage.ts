import { Page } from "@playwright/test";

export class FormLayoutsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm.getByLabel("Password").fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingTheGridForm.getByRole("button").click();
  }

  /**
   * Submit the inline form with name, email, and remember me option.
   * @param name - should be first and last name
   * @param email - should be email
   * @param rememberMe - should be true or false
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ): Promise<void> {
    const inlineForm = this.page.locator("nb-card", { hasText: "Inline form" });
    await inlineForm.getByPlaceholder("Jane Doe").fill(name);
    await inlineForm.getByPlaceholder("Email").fill(email);
    if (rememberMe) {
      await inlineForm.getByLabel("Remember me").check({ force: true });
    } else {
      await inlineForm.getByLabel("Remember me").uncheck({ force: true });
    }
    await inlineForm.getByRole("button").click();
  }
}
