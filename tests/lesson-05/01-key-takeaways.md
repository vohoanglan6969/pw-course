# Lesson 05: WebSocket & Database Testing with Playwright

## WebSocket Testing

### WebSocket là gì?
WebSocket là giao thức truyền thông hai chiều (bidirectional) cho phép client và server trao đổi dữ liệu real-time thông qua một kết nối TCP duy nhất.  
Khác với HTTP truyền thống (request–response), WebSocket cho phép:

- Giao tiếp hai chiều: Cả client và server đều có thể chủ động gửi dữ liệu bất cứ lúc nào.  
- Kết nối liên tục: Sau khi handshake, kết nối được duy trì cho đến khi một bên đóng.  
- Hiệu suất cao: Giảm overhead so với HTTP polling do không cần tạo request/response liên tục.  
- Real-time: Phù hợp cho ứng dụng cần cập nhật dữ liệu tức thời như chat, live notification, gaming,...

### Test WebSocket trong Playwright
Playwright cung cấp API mạnh mẽ để test WebSocket thông qua các sự kiện của `page`.

Ví dụ:
```ts
page.on('websocket', ws => {
  console.log('Connected:', ws.url());
  ws.on('framereceived', data => console.log('Received:', data.payload));
  ws.on('framesent', data => console.log('Sent:', data.payload));
});
```

---

## Database Integration

### Mục tiêu
- Xác minh dữ liệu sau khi gọi API (ví dụ: product, order).  
- Phát hiện lỗi backend (dữ liệu không khớp giữa API và DB).  
- Kết hợp test tự động để đảm bảo flow UI → API → DB hoạt động trơn tru.

### Cài đặt môi trường
Cài đặt các package cần thiết:
```bash
npm install --save-dev @playwright/test
npm install typeorm mysql2 reflect-metadata dotenv
npm install --save-dev @types/node typescript ts-node
```

### Cấu hình `.env`
Đưa thông tin Database vào file `.env` để bảo mật:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=secret
DB_DATABASE=my_database
```

### Ví dụ
Xem ví dụ chi tiết tại:  
[https://github.com/better-bytes-academy/pwa101-framework/blob/feat/lesson-11/src/tests/lesson-11/05-database-integration.spec.ts](https://github.com/better-bytes-academy/pwa101-framework/blob/feat/lesson-11/src/tests/lesson-11/05-database-integration.spec.ts)

---

## Parallelism & Sharding

### Parallel Testing
Parallel testing là kỹ thuật chạy nhiều test cases đồng thời thay vì tuần tự.  
Giúp giảm đáng kể thời gian chạy test suite.

Ví dụ:  
100 tests chạy tuần tự = 10 phút  
Khi chạy song song với 4 workers → chỉ còn khoảng 2.5–3 phút.

Cấu hình trong Playwright:
```bash
npx playwright test --workers=4
```

### Sharding
Sharding là kỹ thuật chia nhỏ test suite thành nhiều phần (shards) để chạy trên các máy hoặc process khác nhau.  
Mỗi shard chứa một tập con của toàn bộ tests.

Ví dụ:  
Có 1000 tests, chia thành 4 shards:
- Shard 1: Tests 1–250  
- Shard 2: Tests 251–500  
- Shard 3: Tests 501–750  
- Shard 4: Tests 751–1000  

Chạy Playwright theo shard:
```bash
npx playwright test --shard=1/4
```