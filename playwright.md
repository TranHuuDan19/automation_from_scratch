# 🎯 Playwright Interview Preparation Guide (With Sample Answers)

---

## 🟢 Beginner Level

### 📌 Cơ bản về Playwright

**Playwright là gì? So sánh với Selenium?**
→ Playwright là framework automation E2E hỗ trợ multiple browsers với auto-waiting và isolation tốt hơn Selenium. Nó nhanh hơn, setup đơn giản hơn, và hỗ trợ modern web tốt hơn.

**Playwright hỗ trợ những browser nào?**
→ Chromium, Firefox, WebKit (Safari engine).

**Cài đặt và setup project Playwright như thế nào?**
→ `npm init playwright@latest` → chọn config → chạy `npx playwright test`.

**Cấu trúc cơ bản của một test case Playwright?**
→ Sử dụng `test()` từ Playwright Test, gồm setup, actions và assertions.

---

### 🔍 Selectors và Locators

**Các loại locator trong Playwright?**
→ `getByRole`, `getByText`, `getByTestId`, `locator()`.
→ Ưu tiên role/testId vì stable hơn CSS/XPath.

**Viết selector cho element có text “Submit”**

```ts id="ex1"
page.getByText('Submit')
```

**Locate element trong shadow DOM?**
→ Playwright hỗ trợ shadow DOM tự động, chỉ cần dùng locator như bình thường.

**page.locator() vs page.$()?**
→ `locator()` có auto-wait và retry → stable hơn.
→ `$()` không có wait → dễ flaky → không recommended.

---

### ⚙️ Basic Actions

**Click, fill, select dropdown?**

```ts id="ex2"
await page.click('#btn');
await page.fill('#input', 'text');
await page.selectOption('#dropdown', 'value');
```

**Chờ element xuất hiện?**
→ Dùng auto-wait của locator hoặc:

```ts id="ex3"
await expect(locator).toBeVisible();
```

**Verify text/attribute?**

```ts id="ex4"
await expect(locator).toHaveText('Hello');
await expect(locator).toHaveAttribute('type', 'text');
```

**Upload file & dialog?**

```ts id="ex5"
await page.setInputFiles('input[type=file]', 'file.png');
page.on('dialog', dialog => dialog.accept());
```

---

## 🟡 Intermediate Level

### 🏗️ Test Organization

**Page Object Model?**
→ Tách logic UI vào class → reusable, maintainable.

**Fixtures và hooks?**
→ Fixtures inject dependencies. Hooks (`beforeEach`) dùng setup/teardown.

**Parallel testing?**
→ Config trong `playwright.config.js` với `workers`.

**Data-driven testing?**
→ Loop data hoặc dùng test.each pattern.

---

### 🧩 Advanced Interactions

**Drag & drop?**

```ts id="ex6"
await source.dragTo(target);
```

**Multiple tabs/windows?**
→ Dùng `context.waitForEvent('page')`.

**iframes?**

```ts id="ex7"
const frame = page.frameLocator('#iframe');
```

**Hover & keyboard?**

```ts id="ex8"
await page.hover('#menu');
await page.keyboard.press('Enter');
```

---

### ⚙️ Configuration & Setup

**playwright.config.js?**
→ Config browser, baseURL, retries, reporters, timeouts.

**Headless vs headed?**
→ Headless chạy nhanh (CI), headed dùng debug.

**Browser context vs page?**
→ Context = session riêng biệt, page = tab.

**Retry & timeout?**
→ retries cho flaky tests, timeout control wait time.

---

### ✅ Assertions & Waits

**Soft vs hard assertions?**
→ Hard fail ngay. Soft continue test.

**Auto-waiting?**
→ Playwright tự wait element ready trước action.

**Custom wait?**

```ts id="ex9"
await page.waitForFunction(() => window.loaded);
```

**Visual testing?**
→ So sánh screenshot:

```ts id="ex10"
await expect(page).toHaveScreenshot();
```

---

## 🔴 Advanced Level

### 🌐 Network & API

**Intercept request?**

```ts id="ex11"
await page.route('**/api', route => route.continue());
```

**Mock API?**
→ `route.fulfill()` với fake data.

**Test API?**
→ Dùng `request` fixture.

**Auth cookies/tokens?**
→ Save storageState và reuse.

---

### 📊 Performance & Monitoring

**Performance testing?**
→ Measure load time, tracing.

**Memory leak?**
→ Monitor browser context, repeated runs.

**Coverage?**
→ Dùng tools như Istanbul.

**Tracing?**

```ts id="ex12"
await context.tracing.start();
```

---

### 🚀 CI/CD Integration

**CI setup?**
→ GitHub Actions chạy `npx playwright test`.

**Docker?**
→ Use official Playwright image.

**Parallel execution?**
→ Scale workers trong CI.

**Reports?**
→ HTML report, attach artifacts.

---

### 🧠 Advanced Patterns

**Custom fixtures?**
→ Extend test với `test.extend()`.

**Test data management?**
→ Use fixtures hoặc external JSON.

**Cross-browser testing?**
→ Config multiple projects.

**Mobile simulation?**
→ Use device config.

---

## 🧠 Expert Level Questions

### 🏛️ Architecture & Design

**Framework scalable?**
→ Modular, POM, reusable fixtures, clear structure.

**Micro-frontends?**
→ Test từng module + integration.

**Component vs E2E?**
→ Component nhanh hơn, E2E cover full flow.

**Maintenance?**
→ Refactor locator, remove flaky tests.

---

### 🛠️ Troubleshooting

**Debug flaky tests?**
→ Check timing, network, selector stability.

**Performance issues?**
→ Analyze slow steps, reduce waits.

**Browser issues?**
→ Cross-browser testing & polyfills.

**Memory optimization?**
→ Close context, limit parallel.

---

## ❓ Real-world Questions (Sample Answers)

**Lazy loading test?**
→ Scroll page + wait for element load.

**Authentication E2E?**
→ Login once → reuse storageState.

**File upload/download?**
→ Use `setInputFiles` & `waitForEvent('download')`.

**Third-party integrations?**
→ Mock external APIs.

**PWA testing?**
→ Test offline mode + service worker.

**Cross-origin iframe?**
→ Use separate context hoặc API mock.

---

## 📌 Tips chuẩn bị

* Nắm chắc async/await
* Ưu tiên locator stable
* Tránh hard wait (`waitForTimeout`)
* Practice real scenarios
* Hiểu rõ Playwright auto-wait

---
