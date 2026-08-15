# Test Strategy

## 1. Objective
The goal of this automation framework is to provide fast, reliable, and maintainable end-to-end and API testing for the OrangeHRM application.

## 2. Scope
- **In Scope:**
  - Login authentication flows (Happy and Negative paths)
  - Employee Management (Add, Search, Delete)
  - Validation of mandatory fields
  - API endpoints related to Employee Management
- **Out of Scope:**
  - Performance testing
  - Security testing
  - 3rd party integrations

## 3. Test Suites
- **Smoke Suite (`@smoke`)**: Quick verification of critical business flows (e.g., successful login, adding an employee). Run on every PR.
- **Regression Suite (`@regression`)**: Comprehensive tests including validation errors, negative scenarios, and edge cases. Run periodically (e.g., nightly).

## 4. Automation Approach
- **Page Object Model (POM)**: Separates UI interactions from test logic for maintainability.
- **Test Data**: Faker is used to generate dynamic and unique test data to avoid state conflicts.
- **Data Cleanup**: Tests implement cleanup strategies (`test.afterEach`) to delete created entities (like Employees) ensuring a clean state for subsequent runs.
- **API vs UI Setup**: 
  - API testing is used for backend validation.
  - Hybrid testing uses API for fast data setup/teardown and UI for functional verification.

## 5. Handling Flakiness
- Use Playwright's auto-waiting locators instead of hardcoded `waitForTimeout`.
- Ensure locators are resilient (e.g., semantic locators over long CSS paths).
- Implement explicit assertions for states (e.g., asserting a loader is hidden).

## 6. Known Limitations
- The demo app (OrangeHRM) may periodically reset data, which can occasionally impact long-running tests.
- Some API endpoints are undocumented and inferred from network tracing.
