# Interview Notes & Demo Script

## Why Playwright?
Playwright provides built-in auto-waiting, robust assertions, and native API testing capabilities. Its execution speed and support for cross-browser testing make it a top choice for modern web automation.

## Framework Architecture
- **Language**: TypeScript for strict typing and early error catching.
- **Pattern**: Page Object Model (POM) divided by domains (Common, Login, PIM, Admin) to ensure maintainability.
- **Test Data**: Faker is used via a strongly-typed `EmployeeFactory` to ensure unique data per test.

## Key Strategies
- **Auth Strategy**: We use Playwright's `storageState` to bypass the login UI for most tests, saving time.
- **Locator Strategy**: We prioritize semantic locators and resilient CSS selectors over brittle XPath.
- **Cleanup Strategy**: `test.afterEach` hooks are used to clean up data (e.g., deleting created employees).
- **Hybrid Testing**: We utilize both API requests and UI actions within the same test flow for optimal speed and coverage.

## Demo Script (10-15 mins)
1. **Introduction (2 mins)**: Explain the goal (robust E2E framework for OrangeHRM).
2. **Structure (3 mins)**: Walk through `pom/`, `fixtures/`, and `utils/`.
3. **UI Test (3 mins)**: Show `addEmployee.spec.ts`, emphasizing the typed `EmployeeFactory` and cleanup hook.
4. **API/Hybrid (2 mins)**: Show `employee.hybrid.spec.ts` to demonstrate backend/frontend synergy.
5. **CI/CD (2 mins)**: Show `.github/workflows` to highlight quality gates (lint, typecheck) and Docker execution.
6. **Next Steps (1 min)**: Discuss future improvements like visual regression testing or integrating Allure reports.
