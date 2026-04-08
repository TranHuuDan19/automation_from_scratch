import { Page } from '@playwright/test';
import { AddEmployeeLocators, EmployeeListLocators, LeftSidebarMenuLocators, TopMenuBarLocators } from '../locators/commonLocator';
import { waitAndCheck, waitAndClick, waitAndInput, waitAndRadioCheck } from '../../utils/helper';

export class CommonPage {
    page: Page;
    locators: Record<string, string>;
    
    constructor(page: Page) {
        this.page = page;
        this.locators = {
            ...LeftSidebarMenuLocators,
            ...TopMenuBarLocators,
            ...EmployeeListLocators,
            ...AddEmployeeLocators,
        };
    }

    async searchInLeftSidebar(searchTerm: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const sidebarExpanded = await this.page.locator(this.locators.subMenu).first().isVisible();
        if (!sidebarExpanded) {
            await this.page.click(this.locators.expandButton);
            await this.page.waitForSelector(this.locators.search, { state: 'visible', timeout: 30000 });
        }
        await this.page.fill(this.locators.search, searchTerm);
        await waitAndInput(this.page, this.locators.search, searchTerm);
        await this.page.keyboard.press('Enter');
    }

    async selectLeftSidebarMenuItem(itemName: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const subMenuItems = await this.page.locator(this.locators.subMenu).filter({hasText : itemName});
        try {
            await subMenuItems.first().waitFor({ state: 'visible', timeout: 30000 });
            await subMenuItems.first().click();
            await this.page.waitForLoadState('load');
        }
        catch (error) {
            throw new Error(`Failed to click submenu item "${itemName}": ${error}`);
        }
    }

    async selectMainMenuItem(itemName: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const mainMenuItems = await this.page.locator(this.locators.mainMenu).filter({hasText : itemName});
        try {
            await mainMenuItems.first().waitFor({ state: 'visible', timeout: 30000 });
            await mainMenuItems.first().click();
            await this.page.waitForLoadState('load');
        }
        catch (error) {
            throw new Error(`Failed to click main menu item "${itemName}": ${error}`);
        }
    }

    async clickOnActionButton(buttonName: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const buttonLocator = await this.page.locator(this.locators.actionButton).filter({ hasText: buttonName });
        try {
            await buttonLocator.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndClick(this.page,buttonLocator.first(), 30000);
            await this.page.waitForLoadState('load');
        }
        catch (error) {
            throw new Error(`Failed to click on button "${buttonName}": ${error}`);
        }
    }

    async selectDropdownValue(dropdownLabel: string, option: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const dropdownValue = await this.page.locator(this.locators.inputComponent)
        .filter({ hasText: dropdownLabel })
        .locator(this.locators.inputField);
        
        if (await dropdownValue.first().textContent() === option){
            return;
        } 
        try {
            const expandDropdown = await this.page.locator(this.locators.inputComponent)
            .filter({ hasText: dropdownLabel })
            .locator(this.locators.expandDropdown);
            await expandDropdown.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndClick(this.page, expandDropdown.first(), 30000);

            const optionValue = await this.page.locator(this.locators.dropdownOption)
            .filter({ hasText: option });
            await optionValue.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndClick(this.page,optionValue, 30000);
        }
        catch (error) {
            throw new Error(`Failed to select "${option}": ${error}`);
        }
    }

    async inputValueToField(inputLabel: string, value: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const inputFieldLocator = await this.page.locator(this.locators.inputComponent)
        .filter({ hasText: inputLabel })
        .locator('input');
        try {
            await inputFieldLocator.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndInput(this.page,inputFieldLocator.first(), value);
        }
        catch (error) {
            throw new Error(`Failed to input value "${value}": ${error}`);
        }
    }

    async inputValueToFieldWithHints(inputLabel: string, hints: string, value: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const inputFieldLocator = await this.page.locator(this.locators.inputComponent)
        .filter({ hasText: inputLabel })
        .locator('input');
        
        try {
            await inputFieldLocator.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndInput(this.page,inputFieldLocator.first(), hints);

            const autoCompleteOptionLocator = this.page.locator(this.locators.autoCompleteOption).filter({ hasText: value });
            await autoCompleteOptionLocator.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndClick(this.page,autoCompleteOptionLocator, 30000);
        }
        catch (error) {
            throw new Error(`Failed to input value "${value}": ${error}`);
        }
    }

    async inputValueToFieldWithPlaceholder(placeholderLabel: string, value: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const inputFieldLocator = await this.page.locator(this.locators.employeeFullName,{has: this.page.locator(`input[placeholder="${placeholderLabel}"]`)})
        .locator('input');
        try {
            await inputFieldLocator.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndInput(this.page,inputFieldLocator.first(), value);
        }
        catch (error) {
            throw new Error(`Failed to input value "${value}": ${error}`);
        }
    }

    async checkBoxWithLabel(checkboxLabel: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const checkboxFieldLocator = await this.page.locator(this.locators.checkbox, {hasText: checkboxLabel});
        try {
            await checkboxFieldLocator.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndCheck(this.page,checkboxFieldLocator);
        }
        catch (error) {
            throw new Error(`Failed to check": ${error}`);
        }
    }

     async radioCheckWithLabel(radioCheckboxLabel: string, value: string) {
        await this.page.waitForLoadState('domcontentloaded');
        const radioCheckFieldLocator = await this.page.locator(this.locators.inputComponent, { hasText: radioCheckboxLabel })
        .locator('label', { hasText: value });
        try {
            await radioCheckFieldLocator.first().waitFor({ state: 'visible', timeout: 30000 });
            await waitAndRadioCheck(this.page,radioCheckFieldLocator, value);
        }
        catch (error) {
            throw new Error(`Failed to check": ${error}`);
        }
    }
}