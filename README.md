# 🎭 Playwright Test Automation Framework

A robust end-to-end test automation framework built with **Playwright** using the **Page Object Model (POM)** design pattern for testing web applications. This framework supports multiple environments, parallel execution, and comprehensive test reporting.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Code Quality & Formatting](#code-quality--formatting)
- [Running Tests](#running-tests)
- [Test Tags](#test-tags)
- [Environment Variables](#environment-variables)
- [Viewing Reports](#viewing-reports)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## 🎯 Project Overview

This is a **Playwright-based test automation** framework designed to:

- ✅ Automate end-to-end testing of web applications
- ✅ Use Page Object Model for maintainable and scalable tests
- ✅ Support multiple browsers (Chromium, Firefox, WebKit)
- ✅ Generate comprehensive HTML reports
- ✅ Execute tests in parallel for faster feedback
- ✅ Support smoke and regression test suites
- ✅ Handle multiple environments (dev, staging, production)

---

## 🛠️ Tech Stack

| Technology     | Version | Purpose                      |
| -------------- | ------- | ---------------------------- |
| **Node.js**    | 18+     | JavaScript runtime           |
| **Playwright** | ^1.58.2 | E2E testing framework        |
| **TypeScript** | Latest  | Type-safe test code          |
| **Faker**      | ^10.4.0 | Generate test data           |
| **dotenv**     | ^17.4.1 | Manage environment variables |
| **cross-env**  | ^10.1.0 | Cross-platform env variables |
| **ESLint**     | ^8.56.0 | Code linting                 |
| **Prettier**   | ^3.0.0  | Code formatting              |

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (for version control)
   - Download from: https://git-scm.com/

3. **Code Editor** (recommended)
   - VS Code: https://code.visualstudio.com/

4. **Playwright Browsers** (will be installed during setup)

---

## 📦 Installation & Setup

Follow these **step-by-step** instructions to set up the project:

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd playwright
```

### Step 2: Verify Node.js Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

### Step 3: Install Project Dependencies

Install all required npm packages:

```bash
npm install
```

This command will:

- Install Playwright testing framework
- Install TypeScript and type definitions
- Install faker for test data generation
- Install dotenv for environment management
- Install cross-env for cross-platform support
- Install ESLint for code linting
- Install Prettier for code formatting

### Step 4: Install Playwright Browsers

Playwright requires browsers to be installed. Run:

```bash
npx playwright install
```

**Optional:** Install only specific browsers (if you don't need all):

```bash
npx playwright install chromium firefox
```

### Step 5: Create Environment Configuration Files

Create `.env` and `.env.local` files in the project root directory:

```bash
touch .env
touch .env.local
```

Add the following variables to `.env`:

```env
# Application Configuration
BASE_URL=https://your-app-url.com
NODE_ENV=dev

# Login Credentials
USERNAME=your_username
PASSWORD=your_password
```

**Note:** For different environments, create environment-specific files:

- `.env.dev` for development
- `.env.staging` for staging
- `.env.prod` for production

### Step 6: Verify Installation

Run a quick test to ensure everything is set up correctly:

```bash
npm run dev
```

---

## 📁 Project Structure

```
playwright/
├── .github/                      # GitHub configuration
│   └── workflows/                # CI/CD workflows
│       ├── regression.yml        # Monthly regression test workflow
│       └── smoke.yml             # Smoke test workflow
│
├── pom/                          # Page Object Model files
│   ├── locators/                 # UI element locators
│   │   ├── commonLocator.ts      # Common UI locators
│   │   └── loginLocator.ts       # Login page locators
│   ├── pages/                    # Page objects
│   │   ├── commonPage.ts         # Common page interactions
│   │   └── loginPage.ts          # Login page interactions
│   └── tests/                    # Test specifications
│       └── addEmployee.spec.ts   # Employee creation tests
│
├── utils/                        # Utility functions
│   ├── faker.ts                  # Test data generation
│   ├── helper.ts                 # Helper functions
│   └── config/
│       ├── env.ts                # Environment configuration
│       ├── auth.setup.ts         # Authentication setup
│       └── auth.teardown.ts      # Authentication cleanup
│
├── storage/                      # Test storage files
│   └── auth-dev.json             # Authentication tokens
│
├── test-results/                 # Test execution artifacts
│   └── artifacts/                # Screenshots, videos, traces
│
├── playwright-report/            # HTML test report
│   └── index.html                # Report dashboard
│
├── .eslintrc.json                # ESLint configuration
├── .eslintignore                 # ESLint ignore rules
├── .prettierrc.json              # Prettier configuration
├── .prettierignore               # Prettier ignore rules
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                      # This file
```

### Key Directories Explained:

- **pom/** - Contains all page objects and tests following Page Object Model pattern
- **utils/config/** - Environment and authentication configuration
- **storage/** - Stores authentication data for tests to reuse sessions
- **test-results/** - Generated test artifacts (screenshots, videos, traces)
- **.github/workflows/** - CI/CD pipeline configurations for automated testing

---

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

The configuration file includes:

```typescript
- Output Directory: Test results and artifacts
- Workers: Number of parallel test workers (2 for local, 100% for CI)
- Retries: Automatic retry on failure (0 for local, 1 for CI)
- Base URL: Application URL from environment variables
- Screenshots: Only on failure
- Videos: Retained on failure
- Traces: Retained on failure for debugging
- Reporters: HTML report generation
```

### Environment Configuration (`utils/config/env.ts`)

Environment variables are loaded from `.env` or `.env.local` files with the following schema:

```typescript
{
  // Application base URL
  username: string; // Login username
  password: string; // Login password
}
```

---

## 💅 Code Quality & Formatting

This project uses **ESLint** for linting and **Prettier** for code formatting to maintain code quality and consistency.

### Prettier Configuration (`.prettierrc.json`)

- **Single quotes** for strings
- **100-character** line width
- **2-space** indentation
- **Trailing commas** (ES5 style)
- **Semicolons** required

### ESLint Configuration (`.eslintrc.json`)

- **TypeScript support** with strict rules
- **Code quality rules** for best practices
- **Naming conventions** enforcement
- **Conflict prevention** with Prettier

### Code Quality Scripts

```bash
# Check code formatting
npm run format:check

# Auto-format all files
npm run format

# Check for linting issues
npm run lint

# Auto-fix linting issues (where possible)
npm run lint:fix
```

### Before Committing Code

Always run these commands to ensure code quality:

```bash
# Format the code
npm run format

# Check for linting issues
npm run lint

# Fix any auto-fixable issues
npm run lint:fix
```

### CI/CD Integration

Code quality checks run automatically on:

- **Pull requests** - ESLint and Prettier validation
- **Commits** - Pre-commit hooks (if configured)

Ensure your code passes these checks before submitting a PR!

---

## 🚀 Running Tests

### Run All Tests

```bash
npm run dev
```

### Run Smoke Tests Only

Smoke tests verify basic functionality:

```bash
npm run dev:smoke
```

### Run Regression Tests Only

Regression tests validate the complete application:

```bash
npm run dev:regression
```

### Run Tests in Headed Mode (with Browser UI)

By default, tests run in headless mode. To see the browser:

```bash
npx playwright test --headed
```

### Run Specific Test File

```bash
npx playwright test pom/tests/addEmployee.spec.ts
```

### Run with Debug Mode

```bash
npx playwright test --debug
```

### Run with UI Mode (Interactive)

```bash
npx playwright test --ui
```

---

## 🏷️ Test Tags

Tests are organized using tags for easy filtering:

- **@smoke** - Quick sanity tests (essential functionality)
- **@regression** - Comprehensive tests (complete functionality)

Tests can have multiple tags:

```typescript
test('add user', { tag: '@smoke @regression' }, async () => {
  // test code
});
```

---

## 🔧 Environment Variables

### Required Environment Variables

Create a `.env` or `.env.local` file with:

```env
BASE_URL=https://app.example.com
NODE_ENV=dev
USERNAME=test_user@example.com
PASSWORD=your_secure_password
```

### Environment-Specific Setup

The framework supports multiple environments:

1. **Development (dev)**

   ```bash
   NODE_ENV=dev npm run dev
   ```

2. **Staging**

   ```bash
   NODE_ENV=staging npm run dev
   ```

3. **Production**
   ```bash
   NODE_ENV=prod npm run dev
   ```

---

## 📊 Viewing Reports

### Generate and View HTML Report

After tests complete, view the interactive HTML report:

````bash
**Solution:** Node.js is not installed. Download from https://nodejs.org/

### Issue: "Playwright browsers not found"
**Solution:** Run `npx playwright install`

### Issue: "Environment variables not loaded"
**Solution:**
- Ensure `.env` file exists in project root
- Check variable names match exactly
- Restart terminal after creating `.env`

### Issue: Tests fail with "Connection timeout"
**Solution:**
- Verify `BASE_URL` in `.env` is correct
- Check internet connection
- Verify the application is running/accessible

### Issue: "Cannot find module '@faker-js/faker'"
**Solution:** Run `npm install` again to reinstall dependencies

### Issue: Tests run very slowly
**Solution:**
- Check `slowMo` setting in `playwright.config.ts`
- Run in headless mode: `NODE_ENV=dev npx playwright test`
- Check system resources (CPU, memory)

### Issue: "sh: prettier: command not found" or "sh: eslint: command not found"
**Solution:**
- Run `npm install` to install all dependencies
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Issue: ESLint or Prettier not working in editor
**Solution:**
- Install VS Code extensions: ESLint and Prettier
- Ensure extensions are enabled in VS Code settings
- Reload VS Code window
export class CommonPage {
  constructor(private page: Page) {}
Code Formatting**
Always format your code before committing:
```bash
npm run format
````

### 2. **Linting**

Check for code quality issues:

```bash
npm run lint
```

### 3. **Test Naming**

Use clear, descriptive test names:

```typescript
✅ test('should add employee with valid details')
❌ test('add employee test')
```

### 4. **Page Object Methods**

Keep page object methods focused and reusable:

```typescript
async fillFirstName(name: string) {
  await this.page.fill('[placeholder="First Name"]', name);
}
```

### 5. **Wait Strategies**

Use Playwright's auto-wait instead of sleep:

```typescript
✅ await expect(locator).toBeVisible();
❌ await page.waitForTimeout(5000);
```

### 6. **Test Data**

Use faker for realistic test data:

```typescript
import { generateEmployeeInfo } from '../utils/faker';
const employee = await generateEmployeeInfo();
```

### 7. **Error Handling**

Add meaningful assertions:

```typescript
await expect(page.getByText('Success')).toBeVisible({ timeout: 5000 });
```

### 8. **Environment Management**

Never hardcode credentials:

```typescript
✅ const password = env.password;
❌ const password = 'hardcoded123';
```

### 9. **Parallel Execution**

Configure workers in `playwright.config.ts` for faster execution:

```typescript
workers: process.env.CI ? '100%' : 2,
```

### 10. **Pre-Commit Checklist**

Before pushing code:

- ✅ Run `npm run format`
- ✅ Run `npm run lint`
- ✅ Run `npm run dev` (all tests pass)
- ✅ Check for console errors
- ✅ No hardcoded credentials or sensitive data✨ Best Practices

### 1. **Test Naming**

Use clear, descriptive test names:

```typescript
✅ test('should add employee with valid details')
❌ test('add employee test')
```

### 2. **Page Object Methods**

Keep page object methods focused and reusable:

```typescript
async fillFirstName(name: string) {
  await this.page.fill('[placeholder="First Name"]', name);
}
```

### 3. **Wait Strategies**

Use Playwright's auto-wait instead of sleep:

```typescript
✅ await expect(locator).toBeVisible();
❌ await page.waitForTimeout(5000);
```

### 4. **Test Data**

Use faker for realistic test data:

```typescript
import { generateEmployeeInfo } from '../utils/faker';
const employee = await generateEmployeeInfo();
```

### 5. **Error Handling**

Add meaningful assertions:

```typescript
await expect(page.getByText('Success')).toBeVisible({ timeout: 5000 });
```

### 6. **Environment Management**

Never hardcode credentials:

```typescript
✅ const password = env.password;
❌ const password = 'hardcoded123';
```

### 7. **Parallel Execution**

Configure workers in `playwright.config.ts` for faster execution:

```typescript
workers: process.env.CI ? '100%' : 2,
```

---

## 📞 Getting Help

- **Playwright Documentation:** https://playwright.dev/
- **Project Issues:** Create an issue in the repository
- **Team Communication:** Reach out to the QA team

---

## 📝 License

ISC

---

## 👥 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Write tests for new functionality
3. Ensure all tests pass: `npm run dev`
4. Submit a pull request for review

---

**Happy Testing! 🎉**
