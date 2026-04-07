import { Page } from '@playwright/test';
import {  } from '../locators/pimLocator';
import { EmployeeListLocators } from '../locators/commonLocator';

export class CPIMPage {
    page: Page;
    locators: Record<string, string>;
    
    constructor(page: Page) {
        this.page = page;
        this.locators = {
            ...EmployeeListLocators,
        };
    }

    

    

    
}