# 💵 Ứng dụng Chia Tiền (Web Version)

Ứng dụng web để tính toán và chia đều chi phí trong nhóm bạn bè.

## 📁 Cấu trúc Thư mục

```
money/
├── index.html      # Giao diện chính
├── style.css       # Styling
├── script.js       # Logic JavaScript
└── README.md       # Hướng dẫn này
```

## 🚀 Cách Sử Dụng Cục Bộ

### 1. Chạy trực tiếp trên máy

**Cách 1: Mở file trực tiếp**
- Mở file `index.html` bằng trình duyệt web (Chrome, Firefox, Edge, Safari)
- Hoặc kéo thả file vào cửa sổ trình duyệt

**Cách 2: Chạy server Python (tùy chọn)**
```bash
cd d:\work\python_projects\money
python -m http.server 8000
```
Sau đó mở trình duyệt và truy cập: `http://localhost:8000`

## 📝 Hướng Dẫn Sử Dụng

### 1. Thêm Người
- Nhập tên người vào ô "Tên người"
- Nhấn nút "➕ Thêm người" hoặc bấm Enter
- Người sẽ xuất hiện trong danh sách

### 2. Thêm Khoản Chi
- Nhập tên người trả tiền vào ô "Ai trả"
- Nhập số tiền vào ô "Số tiền (VND)"
- Nhấn nút "➕ Thêm khoản chi" hoặc bấm Enter
- Khoản chi sẽ xuất hiện trong danh sách

### 3. Xóa Thông Tin
- **Xóa người**: Chọn người trong danh sách rồi nhấn nút "❌ Xóa người"
  - Các khoản chi liên quan cũng sẽ xóa theo
- **Xóa khoản chi**: Chọn khoản chi rồi nhấn nút "❌ Xóa khoản chi"

### 4. Tính Toán
- Nhấn nút "🧮 Tính toán"
- Kết quả sẽ hiển thị:
  - 💰 Tổng cộng: Tổng tiền của tất cả khoản chi
  - 👥 Mỗi người: Số tiền mỗi người nên trả
  - 📊 Chi tiết thanh toán: Ai trả tiền cho ai và bao nhiêu

## 💻 Công Nghệ

- **HTML5**: Cấu trúc giao diện
- **CSS3**: Styling và responsive design
- **Vanilla JavaScript**: Tất cả logic (không dùng framework)

## 🌐 Deployment (Deploy lên Internet)

### Tùy Chọn 1: GitHub Pages (Miễn phí, dễ nhất)
1. Tạo tài khoản GitHub (nếu chưa có)
2. Tạo repository tên `money-sharing` (public)
3. Upload 3 file: `index.html`, `style.css`, `script.js`
4. Vào Settings → Pages → chọn "Deploy from a branch" → main branch → save
5. Truy cập: `https://[username].github.io/money-sharing`

### Tùy Chọn 2: Netlify (Miễn phí, nhanh)
1. Truy cập [netlify.com](https://www.netlify.com)
2. Kéo thả thư mục chứa 3 file vào trang
3. Netlify sẽ tự động deploy
4. Bạn sẽ nhận được link share

### Tùy Chọn 3: Vercel (Miễn phí)
1. Truy cập [vercel.com](https://vercel.com)
2. Import project từ Git hoặc kéo thả folder
3. Deploy tự động
4. Chia sẻ link

### Tùy Chọn 4: AWS Amplify (Miễn phí)
1. Connect GitHub/GitLab account
2. Select repository
3. Tự động deploy mỗi khi push code

## ⚙️ Tính Năng

✅ Thêm/xóa người và khoản chi  
✅ Tính toán chia đều chi phí  
✅ Hiển thị giao dịch thanh toán chi tiết  
✅ Giao diện đẹp, responsive (mobile friendly)  
✅ Không cần server, chạy pure client-side  
✅ Dữ liệu lưu trong memory (reset khi refresh)  

## 🔧 Tùy Chỉnh

### Thay đổi màu sắc
Mở file `style.css`, tìm phần `:root` và sửa các giá trị:
```css
:root {
    --color-header: #1f77b4;      /* Màu header */
    --color-accent: #27ae60;      /* Màu nút Thêm */
    --color-danger: #e74c3c;      /* Màu nút Xóa */
}
```

### Thêm lưu trữ dữ liệu (LocalStorage)
Để dữ liệu không bị xóa khi refresh, thêm vào `script.js`:
```javascript
// Lưu khi thay đổi
function saveToDisk() {
    localStorage.setItem('people', JSON.stringify(people));
    localStorage.setItem('payments', JSON.stringify(payments));
}

// Load khi mở lại
function loadFromDisk() {
    people = JSON.parse(localStorage.getItem('people')) || [];
    payments = JSON.parse(localStorage.getItem('payments')) || [];
}
```

## 📞 Hỗ Trợ

Nếu có lỗi hoặc muốn thêm tính năng:
- Kiểm tra Console (F12 → Console tab)
- Xem error message để debug
- Liên hệ: **0867.106.284**

## 📄 License & Copyright

**© 2026 DucSunIT. All Rights Reserved.**

---

**Tạo bởi**: DucSunIT  
**Liên hệ**: 0867.106.284  
**Ngày**: 2026
