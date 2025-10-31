# Nhóm 24 - Hệ Thống Quản Lý Người Dùng

## Thành Viên Nhóm

| Họ Tên | Vai Trò |
|--------|----------|
| Lê Văn Nhựt Anh | Backend Developer |
| Quách Thanh Vũ | Database Administrator |
| Mai Thành Phát | Frontend Developer |

## Công Nghệ Sử Dụng

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT

## Tính Năng

- Xác thực người dùng (Đăng ký, Đăng nhập, Đăng xuất)
- Quản lý hồ sơ cá nhân (Xem, Cập nhật, Upload Avatar)
- Dashboard Admin (Quản lý người dùng)
- Đặt lại mật khẩu
- Phân quyền theo vai trò

## Hướng Dẫn Cài Đặt

### Yêu Cầu
- Node.js (v14+)
- npm hoặc yarn

### Cài Đặt Backend

```bash
cd backend
npm install
npm start
```

Backend sẽ chạy tại `http://localhost:3000`

### Cài Đặt Frontend

```bash
cd frontend
npm install
npm start
```

Frontend sẽ chạy tại `http://localhost:3001`

## Biến Môi Trường

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000
PORT=3001
```

## API Endpoints

### Xác Thực
- `POST /api/auth/signup` - Đăng ký người dùng mới
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin người dùng hiện tại
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password/:token` - Đặt lại mật khẩu

### Hồ Sơ
- `GET /api/profile` - Xem hồ sơ
- `PUT /api/profile` - Cập nhật hồ sơ
- `PUT /api/profile/password` - Đổi mật khẩu
- `POST /api/profile/avatar` - Upload avatar
- `DELETE /api/profile` - Xóa tài khoản

### Admin (Chỉ Admin)
- `GET /api/admin/users` - Lấy danh sách người dùng
- `POST /api/admin/users` - Tạo người dùng mới
- `GET /api/admin/users/:id` - Xem chi tiết người dùng
- `PUT /api/admin/users/:id` - Cập nhật người dùng
- `DELETE /api/admin/users/:id` - Xóa người dùng
- `GET /api/admin/stats` - Xem thống kê

## License

MIT
