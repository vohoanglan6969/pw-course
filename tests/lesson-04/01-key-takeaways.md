#  Lesson 04 – Reporting (Playwright)

## Playwright Reporter là gì?

**Playwright Reporter** là cơ chế cho phép **tùy chỉnh (custom)** cách báo cáo kết quả test.  
Các reporter mặc định như `HTML`, `JSON`, `Dot` có thể được **mở rộng hoặc thay thế** bằng **custom reporter** để hiển thị kết quả theo nhu cầu — ví dụ: gửi thông báo đến **Slack**, **Discord**, hoặc **Telegram**.

---

##  Reporter Hooks

**Hooks** là các thời điểm đặc biệt trong quá trình chạy test mà ta có thể can thiệp:

- `onBegin` — chạy khi toàn bộ test bắt đầu  
- `onTestBegin` — chạy khi một test case bắt đầu  
- `onTestEnd` — chạy khi một test case kết thúc  
- `onEnd` — chạy khi toàn bộ test kết thúc  

---

##  Tạo Custom Reporter

Để tạo custom reporter, ta cần:

1. **Implement interface `Reporter`**
2. **Định nghĩa các hooks cần thiết**, ví dụ:
   - `onBegin`
   - `onTestBegin`
   - `onTestEnd`
   - `onEnd`

###  Ví dụ thiết kế kết quả

```
Passed: x/y
Failed: x/y
Skipped: x/y
TimedOut: x/y
```

Hoặc chi tiết hơn:

```
Passed: 3/5
- Test 1: Login with wrong password (10s)
```

---

##  Một số hàm thường dùng

###  Lấy thời gian định dạng sẵn

```ts
const reportingTime = new Date(Date.now()).toLocaleString();
```

###  Gọi API

```ts
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: "str"
});
```

---

##  Tích hợp với Discord

1. Vào **channel** → **Integration** → **Webhook** → **New Webhook**
2. Lấy URL webhook  
3. Gửi message bằng HTTP request

###  Cấu trúc request
- **Method:** `POST`
- **URL:** webhook URL  
- **Body:**
```json
{
  "content": "content muốn gửi"
}
```

---

##  Tích hợp với Slack

1. Tạo app tại: [https://api.slack.com/apps](https://api.slack.com/apps)  
2. Thêm **Incoming Webhooks**  
3. Tạo channel nhận tin nhắn  
4. Lấy webhook URL  

###  Gửi message
- **Method:** `POST`
- **Body:**
```json
{
  "text": "content muốn gửi"
}
```

---

##  Tích hợp với Telegram

1. Tạo bot với `@BotFather`
2. Tạo group chat và **invite bot vào group**
3. Gọi API:
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
   để lấy `chat_id`
4. Gửi tin nhắn:
   ```
   https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<chat_id>&text=<text>
   ```
