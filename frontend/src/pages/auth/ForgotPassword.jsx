import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import { Button } from '../../components/ui';
import { showSuccess, showError, showInfo } from '../../utils/toast';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetInfo, setResetInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showError('Vui lòng nhập email');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      setResetInfo(response);
      showSuccess('Đã gửi link reset password!');
      showInfo('Kiểm tra console để lấy link reset (demo mode)');
      console.log('Reset Password Link:', response.resetUrl);
      console.log('Reset Token:', response.resetToken);
    } catch (error) {
      showError(error.response?.data?.message || 'Gửi email thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration__inner">
          <span className="auth-badge">Khôi phục truy cập</span>
          <h2>Gửi liên kết đặt lại mật khẩu cho thành viên Group24.</h2>
          <p>
            Group24 đảm bảo các yêu cầu đặt lại mật khẩu đều được xác minh, ghi log và kích hoạt lại tài khoản một cách an toàn.
          </p>
          <ul className="auth-illustration__list">
            <li>Vô hiệu mọi phiên đăng nhập khi mật khẩu mới được xác nhận.</li>
            <li>Thông báo cho quản trị viên nếu có nhiều yêu cầu trong thời gian ngắn.</li>
            <li>Ghi nhận địa chỉ IP và thiết bị để phục vụ kiểm tra bảo mật.</li>
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
            <h1>Quên mật khẩu</h1>
            <p>Nhập email công việc để nhận liên kết đặt lại mật khẩu và khôi phục quyền truy cập.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email" className="form-label">Email của bạn</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nhanvien@doanhnghiep.vn"
                required
              />
            </div>

            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? 'Đang gửi...' : 'Gửi liên kết reset'}
            </Button>
          </form>

          {resetInfo && (
            <div className="auth-alert">
              <div className="auth-alert__tag">Demo mode</div>
              <p>Email reset đã được mô phỏng. Bạn có thể sử dụng liên kết ngay lập tức.</p>
              <Button as={Link} to={`/reset-password/${resetInfo.resetToken}`} variant="primary">
                Mở trang đặt lại mật khẩu
              </Button>
            </div>
          )}

          <div className="auth-card__footer">
            <span>Nhớ mật khẩu rồi?</span>
            <Link to="/login">Quay lại đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

