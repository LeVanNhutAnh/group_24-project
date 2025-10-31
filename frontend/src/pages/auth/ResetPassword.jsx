import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/authService';
import { Button } from '../../components/ui';
import { showSuccess, showError } from '../../utils/toast';
import './Auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      showError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, formData.password);
      showSuccess('Reset mật khẩu thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      showError(error.response?.data?.message || 'Reset mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration__inner">
          <span className="auth-badge">Thiết lập bảo mật</span>
          <h2>Đặt lại mật khẩu cho tài khoản Group24.</h2>
          <p>
            Mật khẩu mới sẽ kích hoạt ngay, đồng thời Group24 hủy phiên cũ, gửi thông báo và lưu vết phục vụ kiểm toán.
          </p>
          <ul className="auth-illustration__list">
            <li>Đánh giá độ mạnh theo chính sách mật khẩu của doanh nghiệp.</li>
            <li>Cho phép quản trị viên theo dõi lần đổi mật khẩu gần nhất.</li>
            <li>Không ảnh hưởng tới cấu hình hay dữ liệu cá nhân của người dùng.</li>
          </ul>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-card__brand">
            <span>Group24</span>
            <span>Identity Platform</span>
          </div>
          <div className="auth-card__header">
            <h1>Đặt lại mật khẩu</h1>
            <p>Nhập mật khẩu mới và xác nhận để hoàn tất.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="password" className="form-label">Mật khẩu mới</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Ít nhất 6 ký tự"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Nhập lại mật khẩu"
                autoComplete="new-password"
                required
              />
            </div>

            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? 'Đang thiết lập...' : 'Lưu mật khẩu mới'}
            </Button>
          </form>

          <div className="auth-card__footer">
            <span>Quay lại</span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

