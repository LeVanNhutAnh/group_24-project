import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';
import { showError, showSuccess } from '../../utils/toast';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    if (!formData.email || !formData.password) {
      showError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      showSuccess('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      showError(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration__inner">
          <span className="auth-badge">Cổng Group24</span>
          <h2>Đăng nhập để quản lý người dùng toàn doanh nghiệp.</h2>
          <p>
            Cổng đăng nhập Group24 hỗ trợ xác thực đa lớp, khóa phiên bất thường và ghi log phục vụ kiểm toán bảo mật.
          </p>
          <ul className="auth-illustration__list">
            <li>Tự động nhắc đổi mật khẩu định kỳ theo chính sách nội bộ.</li>
            <li>Gửi cảnh báo khi phát hiện đăng nhập ở vị trí lạ.</li>
            <li>Đồng bộ trạng thái tài khoản tới bảng điều khiển quản trị.</li>
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
            <h1>Đăng nhập hệ thống Group24</h1>
            <p>Nhập thông tin tài khoản để truy cập bảng điều khiển, quản trị quyền hạn và theo dõi nhật ký truy cập.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="auth-form__meta">
              <Link to="/forgot-password" className="form-link">Quên mật khẩu?</Link>
            </div>

            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          <div className="auth-card__footer">
            <span>Chưa có tài khoản?</span>
            <Link to="/signup">Tạo tài khoản mới</Link>
          </div>

          <div className="auth-demo">
            <p className="auth-demo__title">Tài khoản mẫu</p>
            <p>Admin: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

