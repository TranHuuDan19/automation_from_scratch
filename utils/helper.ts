import { Page, Locator, expect } from '@playwright/test';

export async function waitAndClick(page: Page, locator: Locator | string, timeout?: number){
    await page.waitForLoadState('domcontentloaded');
    if (typeof locator === "string") {
        await page.waitForSelector(locator, { timeout: timeout ?? 30000 });
        await page.locator(locator).scrollIntoViewIfNeeded();
        await page.click(locator);
    } else {
        await locator.waitFor({ state: "visible", timeout: timeout ?? 30000 });
        await locator.scrollIntoViewIfNeeded();
        await locator.click();
    }
}

export async function waitAndInput(page: Page, locator: Locator | string, value: string, timeout?: number){
    await page.waitForLoadState('domcontentloaded');
    if (typeof locator === "string") {
        await page.waitForSelector(locator, { timeout: timeout ?? 30000 });
        await page.locator(locator).scrollIntoViewIfNeeded();
        await page.fill(locator, value);
    } else {
        await locator.waitFor({ state: "visible", timeout: timeout ?? 30000 });
        await locator.scrollIntoViewIfNeeded();
        await locator.fill(value);
    }
}

export async function waitAndSelect(page: Page, locator: Locator | string, value: string, timeout?: number){
    await page.waitForLoadState('domcontentloaded');
    if (typeof locator === "string") {
        await page.waitForSelector(locator, { timeout: timeout ?? 30000 });
        await page.locator(locator).scrollIntoViewIfNeeded();
        await page.selectOption(locator, value);
    } else {
        await locator.waitFor({ state: "visible", timeout: timeout ?? 30000 });
        await locator.scrollIntoViewIfNeeded();
        await locator.selectOption(value);
    }
}

export async function waitAndCheck(page: Page, locator: Locator, timeout?: number){
    await page.waitForLoadState('domcontentloaded');
    const toggle = locator.locator('label');
    const checkbox = locator.locator('input[type="checkbox"]');
    if (!(await checkbox.isChecked())) {
        await checkbox.waitFor({ state: "visible", timeout: timeout ?? 30000 });
        await checkbox.scrollIntoViewIfNeeded();
        await toggle.click();
        await expect(checkbox).toBeChecked();
    }
}

export async function waitAndRadioCheck(page: Page, locator: Locator,value: string, timeout?: number){
    await page.waitForLoadState('domcontentloaded');
    await locator.waitFor({ state: "visible", timeout: timeout ?? 30000 });
    await locator.scrollIntoViewIfNeeded();
    await locator.first().click();
    await expect(locator).toBeChecked();
}