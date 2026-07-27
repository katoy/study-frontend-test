import { expect, test } from "@playwright/test";

test.describe("Visual Regression Testing (VRT)", () => {
  test("should match the landing page screenshot", async ({ page }) => {
    // ページへ遷移
    await page.goto("./");

    // 各アセットのロード完了を待機
    await page.waitForLoadState("networkidle");

    // ページ全体のスクリーンショットを基準画像と比較
    await expect(page).toHaveScreenshot("landing-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05, // 許容する最大差分ピクセル比率 (5%)
    });
  });

  test("should match the counter button component screenshot", async ({ page }) => {
    await page.goto("./");
    await page.waitForLoadState("networkidle");

    // 特定のコンポーネント（カウンターボタン）に焦点を当ててスクリーンショットを比較
    const counterButton = page.getByRole("button", { name: "Count is 0" });
    await expect(counterButton).toHaveScreenshot("counter-button.png");
  });
});
