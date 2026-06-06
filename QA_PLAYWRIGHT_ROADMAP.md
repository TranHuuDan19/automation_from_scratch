# QA Playwright Roadmap

Roadmap này được thiết kế để bạn commit code theo tuần, bám sát repo hiện tại và mô phỏng cách một automation framework được nâng cấp trong môi trường công ty. Mục tiêu cuối cùng là bạn có một portfolio đủ tốt để chứng minh kỹ năng QA Automation với Playwright, TypeScript, POM, fixtures, API testing, CI/CD, Docker, reporting và test strategy.

## Mục Tiêu Tổng Thể

Sau khi hoàn thành roadmap, repo nên thể hiện được các năng lực sau:

- Viết E2E test có assertion rõ ràng, không chỉ click/fill.
- Thiết kế Page Object Model dễ maintain.
- Dùng locator strategy ổn định theo chuẩn Playwright.
- Quản lý auth state, env, data setup và cleanup.
- Chạy smoke/regression suite qua local, Docker và CI.
- Có API tests và hybrid UI + API workflow.
- Có custom fixtures để giảm duplicate setup.
- Có reporting, artifacts, traces, screenshots và debugging flow.
- Có README và test strategy đủ tốt để trình bày trong interview.

## Cách Commit Theo Tuần

> Trạng thái hiện tại: Weeks 1-4 đã hoàn thành.

Mỗi tuần nên có ít nhất 1 commit chính, tốt nhất là 2-4 commit nhỏ. Format commit gợi ý:

```text
week-01: improve employee assertions
week-02: refactor POM by page domain
week-03: add custom fixtures
week-04: add negative login coverage
```

Nếu bạn muốn mô phỏng workflow công ty hơn, mỗi tuần tạo một branch:

```text
week-01-assertions
week-02-pom-refactor
week-03-fixtures
```

Mỗi branch nên có:

- Code change.
- Test run evidence.
- README hoặc note cập nhật nếu thay đổi behavior.
- Pull request description tự viết ngắn gọn.

## Hướng Dẫn Sử Dụng Roadmap Để Học Hàng Tuần

Để làm cho việc học dễ dàng hơn, mỗi tuần bao gồm:

- **Checklist Hàng Tuần**: Danh sách các bước cụ thể để tick khi hoàn thành.
- **Thời Gian Dự Kiến**: Ước lượng thời gian cần thiết (2-4 giờ/tuần).
- **Công Việc Cụ Thể**: Chi tiết hóa thành các bước nhỏ, có thể thực hiện tuần tự.
- **Gợi Ý Implementation**: Ví dụ code hoặc hướng dẫn cụ thể.
- **Definition Of Done**: Tiêu chí để biết đã hoàn thành tuần.
- **Commit Gợi Ý**: Format commit chuẩn.
- **Interview Story**: Cách kể lại trong phỏng vấn.

**Lưu Ý Quan Trọng**:

- Bắt đầu từ Week 1 và làm tuần tự để xây dựng nền tảng vững chắc.
- Nếu bận rộn, ưu tiên làm 1-2 bước mỗi ngày thay vì làm cả tuần cùng lúc.
- Sau mỗi tuần, chạy `npm run dev:smoke` để đảm bảo không break gì.
- Ghi chú lại khó khăn gặp phải để cải thiện roadmap.

## Week 1: Làm Test Có Ý Nghĩa Bằng Assertions

### Mục Tiêu

Biến test hiện tại từ dạng "automation script" thành "test case thật". Test phải verify kết quả sau action.

### Checklist Hàng Tuần

- [x] Đọc và hiểu test hiện tại trong `addEmployee.spec.ts`
- [x] Thêm assertion cho URL/page title sau khi tạo employee
- [x] Thêm assertion cho search employee trong table
- [x] Thêm method verify vào page object
- [x] Loại bỏ `page.waitForTimeout` nếu có
- [x] Chạy smoke test và kiểm tra HTML report

### Thời Gian Dự Kiến

- 2-3 giờ: Đọc code, thêm assertions, test chạy.

### Công Việc Cụ Thể

1. Mở file `pom/tests/addEmployee.spec.ts` và đọc test hiện tại.
2. Sau dòng tạo employee, thêm assertion kiểm tra URL hoặc page title.
3. Thêm dòng search employee bằng ID.
4. Thêm assertion kiểm tra employee ID xuất hiện trong table.
5. Mở `pom/locators/commonLocator.ts`, thêm locator cho table row.
6. Mở `pom/pages/commonPage.ts`, thêm method `verifyEmployeeExists(employeeId: string)`.
7. Thay thế `page.waitForTimeout` bằng `expect(locator).toBeVisible()`.
8. Chạy `npm run dev:smoke` và mở HTML report kiểm tra.

### Gợi Ý Implementation

- Thêm locator cho table row trong `pom/locators/commonLocator.ts`:
  ```ts
  export const employeeTableRow = (employeeId: string) =>
    page.locator('table').locator('tr').filter({ hasText: employeeId });
  ```
- Thêm method trong `CommonPage`:
  ```ts
  async verifyEmployeeExists(employeeId: string) {
    await expect(this.employeeTableRow(employeeId)).toBeVisible();
  }
  ```
- Test nên có dạng:
  ```ts
  await commonPage.searchEmployeeById(employee.employeeId);
  await commonPage.verifyEmployeeExists(employee.employeeId);
  ```

### Definition Of Done

- Test fail nếu employee không được tạo.
- Test không chỉ pass vì click không lỗi.
- Chạy được `npm run dev:smoke`.
- HTML report có test pass.

### Commit Gợi Ý

```text
week-01: add assertions for employee creation flow
```

### Interview Story

"Ban đầu test chỉ automate thao tác. Tôi cải thiện bằng cách thêm assertion ở điểm business-critical: employee được tạo và search ra trong list. Điều này giúp test bắt regression thật thay vì chỉ kiểm tra UI có click được."

## Week 2: Cải Thiện Locator Strategy

### Mục Tiêu

Giảm phụ thuộc vào CSS class động, chuyển dần sang locator ổn định hơn theo best practice Playwright.

### Checklist Hàng Tuần

- [x] Review tất cả locator trong `pom/locators/`
- [x] Thay thế CSS selector bằng `getByPlaceholder` cho input
- [x] Thay thế CSS selector bằng `getByRole` cho button
- [x] Thay thế CSS selector bằng `getByText` hoặc `getByRole` cho menu
- [x] Cập nhật method trong page object nếu cần
- [x] Ghi chú locator strategy trong README
- [x] Chạy smoke test kiểm tra

### Thời Gian Dự Kiến

- 2-3 giờ: Review và thay thế locator.

### Công Việc Cụ Thể

1. Mở folder `pom/locators/` và đọc các file `commonLocator.ts`, `loginLocator.ts`.
2. Tìm các locator dùng CSS class động (ví dụ: `.oxd-button.oxd-button--medium`).
3. Với input có placeholder, thay bằng `page.getByPlaceholder('text')`.
4. Với button, thay bằng `page.getByRole('button', { name: 'Save' })`.
5. Với menu item, ưu tiên `page.getByRole('menuitem', { name: 'PIM' })` hoặc `page.getByText('PIM')`.
6. Chỉ giữ CSS selector nếu không có semantic locator tốt hơn.
7. Cập nhật method trong `commonPage.ts` nếu locator thay đổi.
8. Thêm ghi chú trong README.md về locator strategy đã áp dụng.
9. Chạy `npm run dev:smoke` để đảm bảo test vẫn pass.

### Gợi Ý Implementation

- Ví dụ thay thế:
  - Từ: `page.locator('.oxd-input.oxd-input--active')`
  - Sang: `page.getByPlaceholder('Username')`
- Nếu button có text rõ ràng: `page.getByRole('button', { name: 'Login' })`
- Không cần thay tất cả cùng lúc, bắt đầu từ flow add employee.

### Definition Of Done

- Flow add employee dùng ít CSS class hơn.
- Không còn selector dài kiểu `.oxd-button.oxd-button--medium...` cho button chính.
- Chạy được smoke test.
- Code dễ đọc hơn khi nhìn vào page object.

### Commit Gợi Ý

```text
week-02: improve locator strategy for employee flow
```

### Interview Story

"Tôi ưu tiên semantic locator như role, label, placeholder vì chúng ít bị ảnh hưởng bởi CSS refactor. CSS selector chỉ dùng khi app không expose accessible name hoặc test id."

## Week 3: Tách Page Object Theo Domain

### Mục Tiêu

Refactor `CommonPage` để framework giống project thật hơn. Page object nên đại diện cho page hoặc domain cụ thể, không gom tất cả logic vào một class chung.

### Checklist Hàng Tuần

- [x] Tạo file `dashboardPage.ts`
- [x] Tạo file `pimPage.ts`
- [x] Tạo file `addEmployeePage.ts`
- [x] Tạo file `employeeListPage.ts`
- [x] Di chuyển method từ `CommonPage` sang các page mới
- [x] Cập nhật test spec để import và sử dụng page mới
- [x] Chạy smoke test kiểm tra

### Thời Gian Dự Kiến

- 3-4 giờ: Tạo file, di chuyển code, cập nhật test.

### Công Việc Cụ Thể

1. Tạo file `pom/pages/dashboardPage.ts` với class `DashboardPage`.
2. Tạo file `pom/pages/pimPage.ts` với class `PimPage`.
3. Tạo file `pom/pages/addEmployeePage.ts` với class `AddEmployeePage`.
4. Tạo file `pom/pages/employeeListPage.ts` với class `EmployeeListPage`.
5. Di chuyển method `selectLeftSidebarMenuItem` từ `CommonPage` sang `DashboardPage`.
6. Di chuyển method `selectMainMenuItem('Add Employee')` sang `PimPage`.
7. Di chuyển logic input employee details sang `AddEmployeePage`.
8. Di chuyển logic search và verify employee sang `EmployeeListPage`.
9. Cập nhật `addEmployee.spec.ts` để import các page mới và sử dụng chúng.
10. Chạy `npm run dev:smoke` để đảm bảo test vẫn pass.

### Gợi Ý Test Sau Refactor

Test nên đọc giống business flow:

```ts
await dashboardPage.openPim();
await pimPage.openAddEmployee();
await addEmployeePage.createEmployee(employee);
await pimPage.openEmployeeList();
await employeeListPage.searchByEmployeeId(employee.employeeId);
await employeeListPage.expectEmployeeVisible(employee.employeeId);
```

### Definition Of Done

- `CommonPage` không còn là nơi chứa toàn bộ business action.
- Test spec dễ đọc như test scenario.
- Không làm thay đổi behavior test.
- Chạy smoke pass.

### Commit Gợi Ý

```text
week-03: split page objects by business domain
```

### Interview Story

"Tôi refactor POM theo domain để test đọc giống business scenario và mỗi page object có trách nhiệm rõ ràng. Việc này giúp maintain dễ hơn khi UI của một page thay đổi."

## Week 4: Custom Fixtures Cho Page Objects

### Mục Tiêu

Giảm duplicate setup trong spec và học pattern công ty hay dùng: `test.extend()`.

### Checklist Hàng Tuần

- [x] Tạo folder `fixtures/` nếu chưa có
- [x] Tạo file `fixtures/pages.fixture.ts`
- [x] Định nghĩa fixture cho các page objects
- [x] Cập nhật test spec import từ fixture
- [x] Xóa code khởi tạo page object trong test
- [x] Chạy smoke test kiểm tra

### Thời Gian Dự Kiến

- 2-3 giờ: Tạo fixture và cập nhật test.

### Công Việc Cụ Thể

1. Tạo folder `fixtures/` trong root project.
2. Tạo file `fixtures/pages.fixture.ts`.
3. Import `test` từ `@playwright/test`.
4. Sử dụng `test.extend()` để định nghĩa fixture cho `dashboardPage`, `pimPage`, `addEmployeePage`, `employeeListPage`.
5. Trong mỗi fixture, khởi tạo page object với `page`.
6. Cập nhật `addEmployee.spec.ts` để import `test` từ `../../fixtures/pages.fixture` thay vì `@playwright/test`.
7. Xóa dòng `const addEmployeePage = new AddEmployeePage(page);` và sử dụng fixture trực tiếp.
8. Chạy `npm run dev:smoke` để đảm bảo test pass.

### Gợi Ý Structure

```ts
// fixtures/pages.fixture.ts
import { test as base } from '@playwright/test';
import { DashboardPage } from '../pom/pages/dashboardPage';
import { PimPage } from '../pom/pages/pimPage';
// ... other imports

export const test = base.extend<{
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  // ...
}>({
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  // ...
});
```

Test sẽ dùng:

```ts
import { test } from '../../fixtures/pages.fixture';
```

### Definition Of Done

- Spec không cần tự `new AddEmployeePage(page)`.
- Page object được inject qua fixture.
- Smoke test vẫn pass.
- TypeScript type rõ ràng, không dùng `any` cho fixture.

### Commit Gợi Ý

```text
week-04: add page object fixtures
```

### Interview Story

"Tôi dùng custom fixtures để inject page objects, giúp test sạch hơn và chuẩn hóa setup. Pattern này cũng giúp scale khi framework có nhiều page object."

## Week 5: Negative Tests Và Validation Coverage

### Mục Tiêu

Chứng minh tư duy QA bằng cách test cả happy path và unhappy path.

### Checklist Hàng Tuần

- [ ] Tạo file `pom/tests/login.spec.ts`
- [ ] Tạo file `pom/tests/addEmployee.validation.spec.ts`
- [ ] Viết test login sai username/password
- [ ] Viết test login thiếu username/password
- [ ] Viết test add employee thiếu required fields
- [ ] Viết test password không match
- [ ] Thêm assertions cho error messages
- [ ] Chạy regression test kiểm tra

### Thời Gian Dự Kiến

- 3-4 giờ: Viết negative tests và assertions.

### Công Việc Cụ Thể

1. Tạo file `pom/tests/login.spec.ts` cho negative login tests.
2. Viết test case: login với username sai, password sai.
3. Viết test case: login thiếu username.
4. Viết test case: login thiếu password.
5. Thêm assertion kiểm tra error message xuất hiện.
6. Tạo file `pom/tests/addEmployee.validation.spec.ts`.
7. Viết test case: add employee thiếu first name.
8. Viết test case: add employee thiếu last name.
9. Viết test case: password và confirm password không match.
10. Thêm tag `@regression` cho các test này.
11. Chạy `npm run dev:regression` để kiểm tra.

### Gợi Ý

- Login negative không nên dùng storage state, dùng project riêng nếu cần.
- Thêm project `unauthenticated` trong `playwright.config.ts` nếu cần.
- Assertions: `await expect(page.locator('.error-message')).toContainText('Required');`

### Definition Of Done

- Có ít nhất 4 negative tests.
- Assertions verify error message.
- Có tag `@smoke` cho critical negative test nếu hợp lý.
- Có tag `@regression` cho validation tests.

### Commit Gợi Ý

```text
week-05: add negative login and employee validation tests
```

### Interview Story

"Tôi không chỉ automate happy path. Tôi thêm validation coverage để bắt lỗi form, authentication và business rule. Negative tests giúp suite phản ánh rủi ro thật hơn."

## Week 6: Test Data Factory Và Strong Typing

### Mục Tiêu

Cải thiện test data để dễ maintain, tránh `any`, và thể hiện TypeScript tốt hơn.

### Checklist Hàng Tuần

- [ ] Tạo folder `types/` và file `types/employee.ts`
- [ ] Định nghĩa interface `Employee`
- [ ] Cập nhật `utils/faker.ts` trả về `Employee`
- [ ] Tạo `utils/data/employee.factory.ts`
- [ ] Tạo `utils/data/user.factory.ts`
- [ ] Cập nhật test specs loại bỏ `any`
- [ ] Chạy `npx tsc --noEmit` kiểm tra

### Thời Gian Dự Kiến

- 2-3 giờ: Tạo types và factory.

### Công Việc Cụ Thể

1. Tạo folder `types/` trong root.
2. Tạo file `types/employee.ts` với interface `Employee` có các field như firstName, lastName, employeeId, etc.
3. Mở `utils/faker.ts`, cập nhật function để trả về `Employee` thay vì object any.
4. Tạo folder `utils/data/` nếu chưa có.
5. Tạo file `utils/data/employee.factory.ts` với function tạo employee data.
6. Tạo file `utils/data/user.factory.ts` cho user data nếu cần.
7. Cập nhật `addEmployee.spec.ts` để import `Employee` type và loại bỏ `let employee: any`.
8. Chạy `npx tsc --noEmit` để kiểm tra TypeScript compile.
9. Chạy `npm run lint` để đảm bảo không lỗi.

### Definition Of Done

- Không còn `any` cho employee test data.
- Faker utility có type rõ ràng.
- Test compile pass với `npx tsc --noEmit`.
- `npm run lint` không báo lỗi nghiêm trọng.

### Commit Gợi Ý

```text
week-06: add typed test data factories
```

### Interview Story

"Tôi dùng TypeScript type cho test data để tránh lỗi runtime và giúp autocomplete tốt hơn. Khi framework scale, typed factory giúp test data nhất quán giữa nhiều suite."

## Week 7: Cleanup Strategy Và Test Isolation

### Mục Tiêu

Giải quyết vấn đề real case: test tạo data nhưng không dọn, làm bẩn environment và gây flaky khi chạy nhiều lần.

### Checklist Hàng Tuần

- [ ] Kiểm tra xem app có delete employee UI hay không
- [ ] Nếu có, implement delete flow trong page object
- [ ] Nếu không, dùng API cleanup nếu có endpoint
- [ ] Thêm `test.afterEach` để cleanup
- [ ] Đảm bảo data unique bằng faker
- [ ] Chạy test nhiều lần kiểm tra không duplicate
- [ ] Ghi note về cleanup trong README

### Thời Gian Dự Kiến

- 2-3 giờ: Implement cleanup và test isolation.

### Công Việc Cụ Thể

1. Kiểm tra UI xem có chức năng delete employee không.
2. Nếu có, thêm method `deleteEmployee(employeeId)` trong `EmployeeListPage`.
3. Nếu không có UI delete, kiểm tra network trace xem có API endpoint delete không.
4. Nếu có API, tạo helper cleanup dùng `request` fixture.
5. Thêm `test.afterEach(async () => { ... cleanup code ... });` trong spec.
6. Cập nhật faker để tạo unique data (ví dụ: thêm timestamp).
7. Chạy test 3-5 lần liên tiếp để đảm bảo không bị duplicate data.
8. Thêm ghi chú trong README về chiến lược cleanup và limitation nếu có.

### Gợi Ý

Ưu tiên API cleanup nếu app hỗ trợ. UI cleanup thường chậm và dễ flaky hơn.

### Definition Of Done

- Test có chiến lược cleanup rõ ràng.
- Chạy cùng test nhiều lần không bị duplicate data.
- Có note trong README về data isolation.

### Commit Gợi Ý

```text
week-07: add employee cleanup strategy
```

### Interview Story

"Tôi đảm bảo test isolation bằng cách tạo data unique và cleanup sau test. Đây là điểm quan trọng khi chạy parallel hoặc chạy suite hằng ngày trên CI."

## Week 8: API Testing Với Playwright Request Fixture

### Mục Tiêu

Thêm API testing để repo không chỉ là UI automation. Trong real project, QA Automation thường dùng API để test contract, setup data, cleanup data và giảm thời gian chạy UI tests.

### Checklist Hàng Tuần

- [ ] Dùng browser DevTools hoặc Playwright trace để xác định endpoint thật của app.
- [ ] Tạo folder API test/client.
- [ ] Tạo API client wrapper thay vì gọi `request.get()` rải rác trong test.
- [ ] Viết ít nhất 1 API smoke test cho authenticated endpoint.
- [ ] Viết ít nhất 1 negative API test cho unauthorized/invalid request.
- [ ] Thêm script chạy API tests riêng.
- [ ] Document cách tìm endpoint và limitation nếu app demo không có API public.

### Thời Gian Dự Kiến

- 4-6 giờ: quan sát network, tạo client, viết test API và chạy ổn định.

### Công Việc Cụ Thể

1. Chạy test login hoặc add employee ở headed mode để quan sát request:

   ```bash
   npx playwright test pom/tests/addEmployee.spec.ts --headed --trace on
   ```

2. Mở trace hoặc DevTools Network, ghi lại endpoint thật liên quan đến user/employee/search.
3. Tạo structure API:

```text
api/
  tests/
    auth.api.spec.ts
    employee.api.spec.ts
  clients/
    employee.client.ts
```

4. Nếu muốn giữ đơn giản hơn, dùng:

```text
tests/api/
  employee.api.spec.ts
```

5. Tạo `api/clients/base.client.ts` để gom base URL, headers và helper parse JSON.
6. Tạo `api/clients/employee.client.ts` cho các request liên quan employee.
7. Viết API test đầu tiên cho một authenticated endpoint ổn định, ví dụ current user, dashboard summary hoặc employee list nếu app hỗ trợ.
8. Viết negative test: request không auth hoặc payload invalid phải trả status lỗi phù hợp.
9. Thêm script vào `package.json`:

```json
"test:api": "cross-env NODE_ENV=dev npx playwright test tests/api"
```

10. Chạy:

```bash
npm run test:api
```

### Gợi Ý Implementation

- Không hardcode endpoint kiểu `/api/employees` nếu chưa xác nhận từ Network tab.
- Nếu app dùng session cookie từ login UI, API tests có thể load `storage/auth-dev.json`.
- Nếu API cần CSRF token, ghi rõ trong client cách lấy token từ cookie/storage.
- API test nên assert cả status code và body, ví dụ:

```ts
expect(response.status()).toBe(200);
expect(body).toHaveProperty('data');
```

### Test Cases Gợi Ý

- Get current logged-in user.
- Search employee by keyword/id nếu endpoint hỗ trợ.
- Create employee bằng API nếu endpoint ổn định.
- Unauthorized request không có storage state.
- Invalid payload trả validation error.

### Gợi Ý

Nếu app demo không có API document rõ, bạn có thể dùng Playwright trace/network để quan sát request, nhưng không hardcode quá nhiều nếu endpoint không ổn định.

### Definition Of Done

- Có ít nhất 3 API tests.
- Có assertion status code và response body.
- Có API client helper.
- API tests chạy độc lập với UI tests.

### Commit Gợi Ý

```text
week-08: add playwright api tests
```

### Interview Story

"Tôi dùng Playwright `request` fixture cho API tests và API setup. API nhanh hơn UI, phù hợp để verify backend contract hoặc chuẩn bị data cho UI tests."

## Week 9: Hybrid UI + API Flow

### Mục Tiêu

Luyện pattern rất hay dùng thực tế: setup data bằng API, verify behavior bằng UI hoặc ngược lại.

### Checklist Hàng Tuần

- [ ] Chọn 1 flow phù hợp để setup bằng API và verify bằng UI.
- [ ] Tạo helper setup data qua API.
- [ ] Tạo helper cleanup data qua API hoặc ghi rõ limitation.
- [ ] Viết hybrid spec riêng.
- [ ] Đảm bảo test không duplicate với UI-only test.
- [ ] So sánh thời gian chạy hybrid test với UI full flow.
- [ ] Document khi nào nên dùng API setup thay vì UI setup.

### Thời Gian Dự Kiến

- 4-5 giờ: tạo setup helper, viết hybrid spec và xử lý cleanup.

### Công Việc Cụ Thể

1. Tạo test file:

```text
pom/tests/employee.hybrid.spec.ts
```

2. Nếu Week 8 đã có `EmployeeClient`, reuse client đó.
3. Tạo employee bằng API trong `beforeEach` hoặc trong test body.
4. Mở UI, vào PIM > Employee List.
5. Search employee vừa tạo.
6. Assert employee xuất hiện trong table.
7. Cleanup employee bằng API trong `afterEach` nếu app hỗ trợ.
8. Nếu API create/delete không ổn định, đảo chiều: tạo bằng UI, verify bằng API.
9. Thêm tag:

```ts
test('search employee created by api @regression @hybrid', async () => {
  // ...
});
```

### Scenarios

- Create employee bằng API, search bằng UI.
- Create employee bằng UI, verify bằng API nếu endpoint hỗ trợ.
- Cleanup bằng API sau test.

### Gợi Ý Implementation

- Hybrid test nên tập trung vào integration risk, không lặp lại toàn bộ happy path UI.
- API setup phải tạo data unique như Week 6/7.
- Nếu cleanup fail, log employee id để có thể dọn thủ công.
- Nếu app demo không cho create/delete qua API, viết hybrid ở mức read-only: dùng API search để verify data tạo từ UI.

### Definition Of Done

- Có ít nhất 1 hybrid test.
- Test chạy nhanh hơn flow UI full nếu setup bằng API.
- Có cleanup rõ ràng.
- Không duplicate logic từ UI-only test.

### Commit Gợi Ý

```text
week-09: add hybrid api and ui employee coverage
```

### Interview Story

"Tôi dùng API để setup/cleanup data vì nhanh và ổn định hơn UI, còn UI test tập trung verify phần người dùng thật sự tương tác."

## Week 10: CI/CD Hardening

### Mục Tiêu

Nâng GitHub Actions từ "chạy test" thành pipeline giống công ty hơn.

### Checklist Hàng Tuần

- [ ] Thêm script `typecheck` vào `package.json`.
- [ ] Cập nhật workflow smoke để chạy lint, format check, typecheck.
- [ ] Giữ smoke test chạy trên pull request.
- [ ] Cập nhật workflow regression có `workflow_dispatch`.
- [ ] Upload `playwright-report` và `test-results`.
- [ ] Đặt artifact retention hợp lý.
- [ ] Document CI flow trong README.

### Thời Gian Dự Kiến

- 3-5 giờ: cập nhật scripts, workflow và kiểm tra CI run.

### Công Việc Cụ Thể

1. Thêm script vào `package.json`:

```json
"typecheck": "tsc --noEmit"
```

2. Chạy local trước khi sửa CI:

```bash
npm run lint
npm run format:check
npm run typecheck
```

3. Cập nhật `.github/workflows/smoke.yml`:

- Checkout.
- Run lint.
- Run format check.
- Run typecheck.
- Build Docker image.
- Run smoke tests.
- Upload report/artifacts.

4. Cập nhật `.github/workflows/regression.yml`:

- Cho phép manual trigger bằng `workflow_dispatch`.
- Schedule regression.
- Upload artifacts retention lâu hơn smoke.
- Có thể chạy regression trên schedule và manual only, không cần chạy mọi PR.

5. Nếu workflow dùng Docker, đảm bảo Docker image có source code và dependency đầy đủ.
6. Nếu workflow chạy npm trực tiếp, thêm setup Node và cache npm.
7. Commit và kiểm tra GitHub Actions run.

### Gợi Ý

Thêm script vào `package.json`:

```json
"typecheck": "tsc --noEmit"
```

Pipeline nên chạy:

```text
npm run lint
npm run format:check
npm run typecheck
npx playwright test -g "@smoke"
```

### Definition Of Done

- CI fail nếu lint/typecheck fail.
- CI upload HTML report và trace artifacts.
- Regression workflow có manual trigger.
- README có hướng dẫn xem artifacts.

### Commit Gợi Ý

```text
week-10: harden ci quality gates
```

### Interview Story

"Tôi thêm quality gates như lint, format check và typecheck trước khi chạy test. Điều này giúp phát hiện lỗi framework sớm, không chỉ lỗi application."

## Week 11: Reporting Và Debugging Experience

### Mục Tiêu

Làm cho người khác đọc test result dễ hơn và bạn biết debug khi CI fail.

### Checklist Hàng Tuần

- [ ] Review config screenshot/video/trace hiện tại.
- [ ] Đảm bảo failure artifacts được giữ trong `test-results`.
- [ ] Thêm hướng dẫn debug local vào README.
- [ ] Thêm hướng dẫn mở HTML report.
- [ ] Thêm hướng dẫn mở trace.
- [ ] Optional: thêm Allure nếu muốn làm portfolio đẹp hơn.
- [ ] Optional: thêm GitHub Actions summary.

### Thời Gian Dự Kiến

- 2-4 giờ: chủ yếu document, kiểm tra config và tạo sample failure nếu cần.

### Công Việc Cụ Thể

1. Review `playwright.config.ts`:

```ts
screenshot: 'only-on-failure',
video: 'retain-on-failure',
trace: 'retain-on-failure',
```

2. Chạy một test với trace:

```bash
npx playwright test pom/tests/addEmployee.spec.ts --trace on
```

3. Mở report:

```bash
npm run report
```

4. Tạo README section `Debugging Failed Tests`.
5. Document các command bên dưới.
6. Nếu muốn test artifact thật, cố tình đổi một assertion cho fail, chạy test, xem screenshot/video/trace rồi revert lại.
7. Optional Allure:

```bash
npm install -D allure-playwright
```

Chỉ thêm Allure nếu bạn muốn học reporting nâng cao; Playwright HTML report là đủ cho portfolio đầu tiên.

### Debugging Guide Nên Có

README nên giải thích:

```text
npx playwright show-report
npx playwright test --debug
npx playwright test --headed
npx playwright test path/to/spec.ts --trace on
npx playwright show-trace trace.zip
```

### Definition Of Done

- Người khác clone repo biết cách mở report.
- Có hướng dẫn xem trace.
- Có hướng dẫn reproduce test fail local.
- Artifacts trong CI đủ để debug.

### Commit Gợi Ý

```text
week-11: document reporting and debugging workflow
```

### Interview Story

"Khi test fail trên CI, tôi dùng trace, screenshot, video và HTML report để xác định lỗi do app, test data, locator hay environment. Tôi document workflow này để team debug nhất quán."

## Week 12: Test Strategy Và Portfolio Polish

### Mục Tiêu

Đóng gói repo thành portfolio có thể gửi cho recruiter/interviewer.

### Checklist Hàng Tuần

- [ ] Cập nhật README theo hướng portfolio.
- [ ] Tạo `docs/test-strategy.md`.
- [ ] Tạo `docs/test-coverage-matrix.md`.
- [ ] Ghi rõ test pyramid của repo.
- [ ] Ghi rõ smoke/regression selection rule.
- [ ] Ghi rõ known limitations của app demo.
- [ ] Ghi rõ future improvements.
- [ ] Review lại toàn bộ command trong README có chạy được không.

### Thời Gian Dự Kiến

- 3-5 giờ: viết docs, cleanup README và kiểm tra command.

### Công Việc Cụ Thể

1. Cập nhật `README.md` với các phần:

- Project overview.
- Tech stack.
- Test strategy.
- Folder structure.
- How to run locally.
- How to run with Docker.
- How CI works.
- Tags: smoke/regression.
- Auth strategy.
- Data strategy.
- Debugging guide.
- Known limitations.
- Future improvements.

2. Tạo thêm:

```text
docs/test-strategy.md
docs/test-coverage-matrix.md
```

3. `docs/test-strategy.md` nên trả lời:

- Scope test là gì?
- Out of scope là gì?
- Smoke suite chọn theo tiêu chí nào?
- Regression suite chọn theo tiêu chí nào?
- API tests dùng cho mục đích gì?
- Khi nào dùng UI setup, khi nào dùng API setup?
- Cách xử lý flaky test?
- Cách quản lý test data?

4. `docs/test-coverage-matrix.md` nên có:

| Module   | Scenario                | Type | Priority | Tag         | Status |
| -------- | ----------------------- | ---- | -------- | ----------- | ------ |
| Login    | Valid login             | UI   | P0       | @smoke      | Done   |
| Login    | Invalid password        | UI   | P1       | @regression | Done   |
| PIM      | Add employee            | UI   | P0       | @smoke      | Done   |
| PIM      | Search employee         | UI   | P0       | @smoke      | Done   |
| PIM      | Add employee validation | UI   | P1       | @regression | Done   |
| Employee | Create employee API     | API  | P1       | @regression | Done   |

5. Thêm section `Known Limitations`, ví dụ:

- App demo có thể reset data.
- API endpoint có thể không public/stable.
- Một số selector phụ thuộc UI hiện tại nếu app không có test id.

6. Chạy toàn bộ command trong README để chắc không document sai.

### Definition Of Done

- Repo nhìn như một project thật.
- README không chỉ nói cách install, mà giải thích quyết định kỹ thuật.
- Có docs test strategy và coverage matrix.
- Bạn có thể demo repo trong 10-15 phút.

### Commit Gợi Ý

```text
week-12: polish portfolio documentation
```

### Interview Story

"Tôi không chỉ viết test mà còn document test strategy, coverage và CI workflow. Điều này giúp framework dễ onboard cho QA khác và dễ review bởi team."

## Week 13: Flaky Test Analysis Và Stability

### Mục Tiêu

Học cách xử lý một trong những vấn đề lớn nhất của automation: flaky tests.

### Checklist Hàng Tuần

- [ ] Chạy smoke suite lặp lại nhiều lần.
- [ ] Review toàn bộ `waitForLoadState`.
- [ ] Review helper `waitAndClick`, `waitAndInput`.
- [ ] Loại bỏ wait dư thừa.
- [ ] Thay wait chung chung bằng assertion cụ thể.
- [ ] Document anti-flaky rules.
- [ ] Ghi lại lỗi flaky nếu phát hiện.

### Thời Gian Dự Kiến

- 3-5 giờ: repeat tests, đọc trace và chỉnh wait/locator.

### Công Việc Cụ Thể

1. Chạy smoke suite 5 lần:

```bash
npx playwright test -g "@smoke" --repeat-each=5
```

2. Nếu fail, mở trace để xác định nguyên nhân:

```bash
npx playwright show-report
```

3. Review các pattern dễ flaky:

- `waitForLoadState('load')` sau mọi action dù UI không reload thật.
- CSS selector quá rộng.
- Click xong không assert state mới.
- Search data nhưng data chưa index xong.
- Test phụ thuộc data cũ trong environment.

4. Chỉnh test theo hướng:

- Sau action, assert element/result cụ thể.
- Dùng locator semantic.
- Dùng unique test data.
- Dùng API cleanup nếu có.
- Chỉ tăng timeout cho operation thật sự chậm, không tăng global timeout vô tội vạ.

5. Tạo `docs/flaky-test-notes.md` hoặc thêm vào `docs/test-strategy.md`.

### Gợi Ý Implementation

- Nếu search employee đôi khi chậm, assert loading biến mất hoặc result row xuất hiện thay vì chờ load state.
- Nếu button click bị miss, assert button enabled trước khi click:

```ts
await expect(saveButton).toBeEnabled();
await saveButton.click();
```

### Definition Of Done

- Test pass ổn định khi repeat.
- Không có wait cứng.
- Có note trong README hoặc docs về anti-flaky practices.

### Commit Gợi Ý

```text
week-13: improve test stability and remove redundant waits
```

### Interview Story

"Tôi phân tích flaky bằng repeat runs, trace và locator assertions. Tôi tránh wait cứng và ưu tiên auto-waiting của Playwright để test ổn định hơn."

## Week 14: Cross-Browser Và Parallel Execution

### Mục Tiêu

Chứng minh framework có thể chạy nhiều browser và parallel an toàn.

### Checklist Hàng Tuần

- [ ] Thiết kế lại Playwright projects rõ ràng.
- [ ] Thêm Chromium authenticated project.
- [ ] Thêm Firefox authenticated project.
- [ ] Cân nhắc WebKit nếu app chạy ổn.
- [ ] Đảm bảo storage state không conflict theo browser/env.
- [ ] Chạy smoke trên ít nhất 2 browser.
- [ ] Document browser strategy.

### Thời Gian Dự Kiến

- 3-5 giờ: chỉnh config, chạy browser khác và xử lý khác biệt UI nếu có.

### Công Việc Cụ Thể

1. Cập nhật `playwright.config.ts` để có projects rõ ràng:

- `chromium`
- `firefox`
- `webkit` nếu app hỗ trợ

2. Với repo hiện tại có auth setup, cấu trúc nên cân nhắc:

- `setup`
- `chromium-authenticated`
- `firefox-authenticated`
- `unauthenticated`

3. Nếu dùng chung `storage/auth-dev.json`, đảm bảo auth state dùng được cho mọi browser.
4. Nếu phát sinh lỗi, tách storage theo browser:

```text
storage/auth-dev-chromium.json
storage/auth-dev-firefox.json
```

5. Chạy Chromium smoke:

```bash
npx playwright test -g "@smoke" --project=chromium-authenticated
```

6. Chạy Firefox smoke:

```bash
npx playwright test -g "@smoke" --project=firefox-authenticated
```

7. Kiểm tra parallel:

```bash
npx playwright test -g "@smoke" --workers=2
```

8. Document strategy:

- PR smoke: Chromium only để nhanh.
- Scheduled regression: Chromium + Firefox.
- WebKit optional nếu app support tốt.

### Definition Of Done

- Chạy được ít nhất Chromium + Firefox.
- Test data unique nên không conflict.
- CI có thể chỉ chạy Chromium smoke để tiết kiệm, regression có thể chạy multi-browser.

### Commit Gợi Ý

```text
week-14: add cross browser test projects
```

### Interview Story

"Tôi cấu hình multi-browser project trong Playwright và đảm bảo test data không conflict khi chạy parallel. Trong CI, tôi cân bằng tốc độ và coverage bằng smoke trên Chromium, regression đa browser khi cần."

## Week 15: Role-Based Or Multi-User Testing

### Mục Tiêu

Luyện case thực tế: nhiều user role, nhiều storage state, nhiều permission. Tuần này là advanced/optional nếu app demo có nhiều account role ổn định.

### Checklist Hàng Tuần

- [ ] Kiểm tra app có account role khác nhau không.
- [ ] Thêm env variables cho từng role nếu có.
- [ ] Tạo auth setup theo role.
- [ ] Tạo storage state theo role.
- [ ] Viết ít nhất 1 permission test.
- [ ] Document limitation nếu app demo không hỗ trợ role rõ ràng.
- [ ] Nếu không có role, thay bằng multi-user/session isolation test.

### Thời Gian Dự Kiến

- 3-5 giờ nếu có credential role; 2-3 giờ nếu chỉ document limitation và làm session isolation.

### Công Việc Cụ Thể

1. Thêm env cho role khác nếu app có:

```text
ADMIN_USERNAME
ADMIN_PASSWORD
ESS_USERNAME
ESS_PASSWORD
```

2. Cập nhật `utils/config/env.ts` để đọc role credentials.
3. Tạo auth setup cho nhiều role:

```text
storage/admin-dev.json
storage/ess-dev.json
```

4. Có thể tạo:

```text
utils/config/admin.auth.setup.ts
utils/config/ess.auth.setup.ts
```

5. Thêm projects:

```text
admin-authenticated
ess-authenticated
```

6. Tạo test permission đơn giản:

- Admin thấy PIM.
- Non-admin không thấy admin-only menu nếu app hỗ trợ.
- User thường không truy cập được URL admin-only nếu nhập trực tiếp.

7. Nếu app demo không có role ổn định, làm multi-session test:

- Tạo 2 browser contexts.
- Context A login user A.
- Context B login user B.
- Assert session/context không ảnh hưởng nhau.

8. Ghi rõ trong docs: role-based testing phụ thuộc credential và permission model của app under test.

### Definition Of Done

- Có ít nhất 2 storage states nếu app hỗ trợ.
- Có role-based test hoặc multi-session isolation test.
- Config không hardcode credential trong code.
- README/docs ghi rõ limitation nếu không có role thật.

### Commit Gợi Ý

```text
week-15: add role based authentication states
```

### Interview Story

"Tôi quản lý auth state theo role để test permission và workflow khác nhau. Credentials được inject qua environment variables, không hardcode trong source code."

## Week 16: Final Review Và Mock Interview Prep

### Mục Tiêu

Chốt repo, kiểm tra chất lượng và chuẩn bị cách trình bày.

### Checklist Hàng Tuần

- [ ] Chạy full local quality gate.
- [ ] Chạy smoke và regression.
- [ ] Chạy API tests nếu đã thêm script.
- [ ] Mở HTML report.
- [ ] Review README từ góc nhìn người mới clone repo.
- [ ] Review docs strategy/coverage.
- [ ] Tạo `docs/interview-notes.md`.
- [ ] Chuẩn bị demo script 10-15 phút.
- [ ] Review commit history theo từng tuần.

### Thời Gian Dự Kiến

- 4-6 giờ: chạy full check, sửa docs cuối, chuẩn bị demo/interview notes.

### Công Việc Cụ Thể

1. Đảm bảo script `typecheck` đã được thêm từ Week 10.
2. Chạy full local:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run dev:smoke
npm run dev:regression
```

3. Nếu đã có API script:

```bash
npm run test:api
```

4. Mở Playwright report:

```bash
npm run report
```

5. Review README bằng câu hỏi:

- Người mới clone repo có chạy được không?
- Env variables có rõ không?
- Test strategy có giải thích vì sao chọn smoke/regression không?
- Debugging guide có đủ command không?
- Known limitations có thật thà không?

6. Review commit history:

```bash
git log --oneline --decorate
```

7. Viết một file ngắn:

```text
docs/interview-notes.md
```

Nội dung nên có:

- Vì sao chọn Playwright.
- Framework architecture.
- Locator strategy.
- Auth strategy.
- Data and cleanup strategy.
- CI/CD flow.
- Flaky handling.
- What you would improve next.

8. Chuẩn bị demo script 10-15 phút:

- 2 phút: giới thiệu goal và tech stack.
- 3 phút: đi qua folder structure.
- 3 phút: mở một UI test và page object.
- 2 phút: mở API/hybrid test nếu có.
- 2 phút: mở CI workflow và report.
- 2 phút: nói về limitation và next steps.

### Definition Of Done

- Repo chạy được từ clean install.
- Docs đủ rõ để người khác dùng.
- Bạn demo được flow trong 10-15 phút.
- Bạn trả lời được câu hỏi "Why did you design it this way?"

### Commit Gợi Ý

```text
week-16: finalize qa automation portfolio
```

## Checklist Kỹ Năng Theo Công Ty Thường Yêu Cầu

### Must Have

- Playwright basic actions and assertions.
- Locator best practices.
- Page Object Model.
- TypeScript basic typing.
- Smoke/regression tagging.
- Git and GitHub workflow.
- CI test execution.
- Debug failed tests.

### Should Have

- Fixtures.
- API testing.
- Test data factory.
- Cleanup strategy.
- Docker.
- Parallel execution.
- HTML report and artifacts.

### Nice To Have

- Allure report.
- Multi-role auth.
- Cross-browser regression.
- GitHub Action summary.
- Visual testing.
- Accessibility testing.
- Performance smoke checks.

## Definition Of Done Cho Toàn Bộ Roadmap

Repo được xem là đạt mục tiêu portfolio khi có:

- Ít nhất 8-12 UI tests có assertion tốt.
- Ít nhất 3-5 API tests.
- Ít nhất 1 hybrid UI + API test.
- POM tách theo domain.
- Custom fixtures.
- Typed test data factory.
- Cleanup hoặc data isolation rõ ràng.
- CI chạy lint, typecheck, smoke test và upload artifacts.
- README có test strategy và debugging guide.
- Có coverage matrix.

## Lịch Thực Tế Nếu Bạn Bận

Nếu mỗi tuần bạn chỉ có 3-5 giờ:

- Week 1-4 là bắt buộc.
- Week 5-8 là phần giúp bạn vượt mức junior.
- Week 9-12 làm repo giống real project.
- Week 13-16 là phần polish để đi phỏng vấn.

Nếu cần rút gọn còn 8 tuần:

- Gộp Week 1 + 2.
- Gộp Week 3 + 4.
- Gộp Week 5 + 6.
- Gộp Week 7 + 8.
- Gộp Week 10 + 11.
- Giữ Week 12 làm tuần polish cuối.

## Thứ Tự Ưu Tiên Khi Không Đủ Thời Gian

Làm theo thứ tự này:

1. Assertions.
2. Locator strategy.
3. POM refactor.
4. Fixtures.
5. Negative tests.
6. Test data typing.
7. Cleanup.
8. API tests.
9. CI hardening.
10. README and docs.

Đây là thứ tự có lợi nhất cho interview vì nó thể hiện tư duy QA, automation engineering và khả năng maintain framework.
