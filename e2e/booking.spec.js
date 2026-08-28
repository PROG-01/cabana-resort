const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ request }) => {

    const response = await request.post("/api/reset");

    expect(response.ok()).toBeTruthy();

});

test("homepage loads", async ({ page }) => {

    await page.goto("/");

    await expect(page.locator("h1")).toHaveText(
        "Cabana Resort Booking System"
    );

});

test("clicking a cabana opens the booking modal", async ({ page }) => {

    await page.goto("/");

    await page.locator(".water").first().click();

    await expect(page.locator("#bookingModal")).toBeVisible();

});

test("user can successfully book a cabana", async ({ page }) => {

    await page.goto("/");

    await page.locator(".water").first().click();

    await page.fill("#roomInput", "101");

    await page.fill("#guestInput", "Alice Smith");

    await page.click("#bookBtn");

    await expect(page.locator("#notification"))
        .toContainText("Cabana booked successfully!");

});

test("invalid guest shows an error notification", async ({ page }) => {

    await page.goto("/");

    await page.locator(".water").first().click();

    await page.fill("#roomInput", "999");

    await page.fill("#guestInput", "Unknown Guest");

    await page.click("#bookBtn");

    await expect(page.locator("#notification"))
        .toContainText("Invalid room number or guest name");

});

test("booked cabana remains booked after page refresh", async ({ page }) => {

    await page.goto("/");

    const cabana = page.locator(".water").first();

    await cabana.click();

    await page.fill("#roomInput", "101");
    await page.fill("#guestInput", "Alice Smith");
    await page.click("#bookBtn");

    await expect(page.locator("#notification"))
        .toContainText("Cabana booked successfully!");

    await page.reload();

    await expect(page.locator(".water").first())
        .toHaveClass(/booked/);

});