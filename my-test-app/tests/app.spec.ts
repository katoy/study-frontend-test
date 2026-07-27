import { expect, test } from "@playwright/test";

test.describe("App E2E Test", () => {
  test("should display initial elements and support counter functionality", async ({ page }) => {
    // baseURL にアクセス
    await page.goto("./");

    // "Get started" の見出しを確認
    const heading = page.getByRole("heading", { name: "Get started" });
    await expect(heading).toBeVisible();

    // カウンターボタンの初期表示を確認
    const counterButton = page.getByRole("button", { name: "Count is 0" });
    await expect(counterButton).toBeVisible();

    // ボタンをクリック
    await counterButton.click();

    // カウンターの値が増加することを確認
    const updatedCounterButton = page.getByRole("button", { name: "Count is 1" });
    await expect(updatedCounterButton).toBeVisible();
  });
});
