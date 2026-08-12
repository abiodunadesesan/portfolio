import { expect, test } from "@playwright/test";

test.describe("home mobile smoke", () => {
  test("shows hero and work section without horizontal overflow", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const jumpToWork = page.locator('a[href="#work"]').first();
    await expect(jumpToWork).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });

    expect(hasHorizontalOverflow).toBeFalsy();

    await jumpToWork.click();
    await expect(page.locator("#projects-heading")).toBeVisible();
  });
});
