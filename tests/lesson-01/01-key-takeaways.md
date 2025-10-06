
##  Phần 1 – Overview Kiến Thức Cơ Bản

### Cài Đặt Thư Viện

```bash
npm install -D <tên-thư-viện>
```

- `-D` hoặc `--save-dev`: thêm thư viện vào `devDependencies`
- Chỉ cần cho giai đoạn develop/test, không cần khi deploy production

---

##  Phần 2 – Environment (Môi Trường)

### Môi Trường Là Gì?

Tập hợp các cấu hình và điều kiện mà ứng dụng chạy trên đó.

**Các loại phổ biến:**
- **Dev:** phát triển, test, debug  
- **Staging:** mô phỏng gần giống production  
- **Production:** môi trường thực tế cho người dùng

---

### Biến Môi Trường (Environment Variables)

Biến môi trường giúp:
- **Bảo mật:** che giấu thông tin nhạy cảm (password, API key)  
- **Linh hoạt:** dễ thay đổi cấu hình mà không cần sửa code  
- **Tái sử dụng:** chạy trên nhiều môi trường khác nhau

**Ví dụ:**

```typescript
import dotenv from 'dotenv';
dotenv.config();
```

File `.env`:

```env
BASE_URL="https://dev.myapp.com"
ADMIN_USER="admin"
ADMIN_PASS="123456"
```

---

## Phần 3 – Test Management (Annotations & Tags)

### Annotation & Tag

- **Annotation:** đánh dấu đặc biệt trong code để mô tả hoặc điều khiển hành vi test  
- **Tag:** dùng để nhóm test theo loại, chức năng, hoặc độ ưu tiên

---

### Built-in Annotation: `test.skip()`

Bỏ qua một test case.

```typescript
test.skip("Assert number of product", async ({ page }) => {
  // test content
});
```

**Conditional skip:**

```typescript
test("Assert number of product", async ({ page, browserName }) => {
  test.skip(browserName === 'chromium', "Chưa hỗ trợ chạy trên chromium");
});
```

---

### Built-in Annotation: `test.fixme()`

Đánh dấu test bị lỗi nhưng chưa fix, giúp test không bị fail.

```typescript
test.fixme("Assert number of product", async ({ page }) => {
  // test content
});
```

---

### Annotation Custom – Thêm Thông Tin Cho Test

```typescript
test("01 - annotation", {
  annotation: {
    type: 'lesson',
    description: 'lesson-01'
  }
}, async ({ page }, testInfo) => {
  // test content
});
```

Annotation sẽ hiển thị trong báo cáo (report).

---

## Phần 4 – Emulation

Giả lập hành vi người dùng thực tế.

**Ví dụ:**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        locale: 'en-GB',
        timezoneId: 'Europe/Paris',
        permissions: ['notifications'],
      },
    },
  ],
});
```

---

## Phần 5 – Clock API

Điều khiển thời gian trong test, tránh phải “chờ thật”.

| Hàm | Mô tả | Ứng dụng |
|------|-------|-----------|
| `setFixedTime()` | Đặt thời gian cố định | Giả lập ngày giờ cụ thể |
| `install()` | Bắt đầu kiểm soát toàn bộ đồng hồ | Test timeout hoặc countdown |
| `fastForward()` | Tua nhanh thời gian | Giảm thời gian chờ |
| `pauseAt()` | Dừng tại thời điểm | Kiểm tra trạng thái tại thời gian xác định |
| `runFor()` | Tick thủ công | Kiểm soát từng bước thời gian |

---

## Phần 6 – Accessibility Testing

Dùng thư viện `@axe-core/playwright` để phát hiện các lỗi truy cập (WCAG).

```bash
npm install -D @axe-core/playwright
```

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => {
  test('should not have accessibility issues', async ({ page }, testInfo) => {
    await page.goto('https://www.visionaustralia.org/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

---

# Phần Bổ Sung – Kiến Thức Đọc Thêm

## 1. `test.slow()` – Đánh Dấu Test Chậm

Annotation `test.slow()` giúp đánh dấu test case là **chậm**, khiến Playwright **tự động nhân 3 lần thời gian timeout**.

```typescript
test('03 - mark as slow', async ({ browser }, testInfo) => {
  test.slow();
});
```

Dùng khi test cần nhiều thời gian xử lý như upload file lớn, thực hiện nhiều bước hoặc chạy integration test.

---

## 2. Khai Báo Annotation Dạng Mảng (Array)

Khai báo nhiều annotation cùng lúc trong test thông qua mảng:

```typescript
test('04 - Thêm annotation array thông qua khai báo test', {
  annotation: [
    { type: 'lesson', description: 'lesson-01' },
    { type: 'class', description: 'Playwright Advanced' }
  ]
}, async ({}) => {
  // Test content
});
```

Dùng để nhóm test theo nhiều tiêu chí hoặc gắn thêm metadata cho báo cáo.

---

## 3. Khai Báo Annotation Động (Dynamic)

Thêm annotation trong quá trình test chạy (runtime):

```typescript
test('05 - Thêm annotation dynamic trong khi chạy', async ({ }, testInfo) => {
  test.info().annotations.push({
    type: 'class',
    description: 'Playwright Advanced',
  });

  testInfo.annotations.push({
    type: 'lesson',
    description: 'lesson-01',
  });
});
```

Hữu ích khi annotation phụ thuộc vào dữ liệu runtime hoặc môi trường.
