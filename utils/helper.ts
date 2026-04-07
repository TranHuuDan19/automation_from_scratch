import { Page, Locator, expect } from '@playwright/test';

export async function waitAndClick(page: Page, locator: Locator | string, timeout?: number){
    if (typeof locator === "string") {
        await page.locator(locator).scrollIntoViewIfNeeded();
        await page.waitForSelector(locator, { timeout: timeout ?? 10000 });
        await page.click(locator);
    } else {
        await locator.scrollIntoViewIfNeeded();
        await locator.waitFor({ state: "visible", timeout: timeout ?? 10000 });
        await locator.click();
    }
}

export async function waitAndInput(page: Page, locator: Locator | string, value: string, timeout?: number){
    if (typeof locator === "string") {
        await page.locator(locator).scrollIntoViewIfNeeded();
        await page.waitForSelector(locator, { timeout: timeout ?? 10000 });
        await page.fill(locator, value);
    } else {
        await locator.scrollIntoViewIfNeeded();
        await locator.waitFor({ state: "visible", timeout: timeout ?? 10000 });
        await locator.fill(value);
    }
}

export async function waitAndSelect(page: Page, locator: Locator | string, value: string, timeout?: number){
    if (typeof locator === "string") {
        await page.locator(locator).scrollIntoViewIfNeeded();
        await page.waitForSelector(locator, { timeout: timeout ?? 10000 });
        await page.selectOption(locator, value);
    } else {
        await locator.scrollIntoViewIfNeeded();
        await locator.waitFor({ state: "visible", timeout: timeout ?? 10000 });
        await locator.selectOption(value);
    }
}

export async function waitAndCheck(page: Page, locator: Locator, timeout?: number){
    let value = await locator.isChecked();
    console.log('value',value);
    if (!value) {
        await locator.scrollIntoViewIfNeeded();
        await locator.waitFor({ state: "visible", timeout: timeout ?? 10000 });
        await locator.check({ force: true, timeout:timeout});
        await expect(locator).toBeChecked();
    }
}

export async function waitAndRadioCheck(page: Page, locator: Locator,value: string, timeout?: number){
        await locator.scrollIntoViewIfNeeded();
        await locator.waitFor({ state: "visible", timeout: timeout ?? 10000 });
        await locator.first().click();
        await expect(locator).toBeChecked();
        await page.pause();
}