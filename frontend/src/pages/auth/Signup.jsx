import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';
import { showError, showSuccess } from '../../utils/toast';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      showError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.password.length < 6) {
      showError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password);
      showSuccess('Đăng ký thành công!');
      navigate('/');
    } catch (error) {
      showError(error.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration__inner">
          <span className="auth-badge">Tạo tài khoản mới</span>
          <h2>Đăng ký tài khoản quản trị Group24 cho doanh nghiệp của bạn.</h2>
          <p>
            Sau khi đăng ký, bạn có thể thêm nhân sự, cấu hình chính sách mật khẩu và giám sát hoạt động truy cập tập trung.
          </p>
          <ul className="auth-illustration__list">
            <li>Kích hoạt bảo mật hai lớp và email xác thực mặc định.</li>
            <li>Áp dụng nhanh mẫu phân quyền theo phòng ban của Group24.</li>
            <li>Quản lý thiết bị đăng nhập và đặt lịch báo cáo định kỳ.</li>
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
            <h1>Tạo tài khoản mới</h1>
            <p>Nhập thông tin để kích hoạt tài khoản quản trị, mời thành viên và phân quyền truy cập theo nhu cầu thực tế.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name" className="form-label">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email công việc</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="ban@congty.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field-inline">
              <div className="form-field">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ít nhất 6 ký tự"
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="confirmPassword" className="form-label">Xác nhận</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
            </Button>
          </form>

          <div className="auth-card__footer">
            <span>Đã có tài khoản?</span>
            <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

