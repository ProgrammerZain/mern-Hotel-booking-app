import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173";
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("am@gmail.com");
  await page.locator("[name=password]").fill("111111");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});
test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);
  await page.locator("[name=name]").fill("Test 111111");
  await page.locator("[name=city]").fill("Test 111111");
  await page.locator("[name=country]").fill("Test 111111");
  await page.locator("[name=description]").fill("Test 111111");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Parking").check();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("4");
  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});
test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  // await expect(page.getByText("Dublin Gateways")).toBeVisible();
  // await expect(page.getByText("Lorem ipsum, dolor ")).toBeVisible();
  // await expect(page.getByText("Dublin,Ireland")).toBeVisible();
  // await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("q").first()).toBeVisible();
  await expect(page.getByText("qqqq").first()).toBeVisible();
  await expect(page.getByText("q,q").first()).toBeVisible();
  await expect(page.getByText("Budget").first()).toBeVisible();

  await expect(page.getByText("$120 per Night").first()).toBeVisible();
  await expect(page.getByText("3 adults, 3 children").first()).toBeVisible();
  await expect(page.getByText("3 Star Rating").first()).toBeVisible();
  // await page.locator("[name=city]").fill("Test 111111");

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Add Hotel" }).first()
  ).toBeVisible();
});
test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Qwerty");
  await page.locator('[name="name"]').fill("Q");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
  await page.reload();
  await expect(page.locator('[name="name"]')).toHaveValue("Q");

  await page.locator('[name="name"]').fill("Qwerty");
  await page.getByRole("button", { name: "Save" }).click();
});
