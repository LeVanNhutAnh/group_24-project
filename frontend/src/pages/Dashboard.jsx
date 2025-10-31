import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  const teamMembers = [
    {
      name: 'Quách Thanh Vũ',
      studentId: '221361',
      role: 'Thành viên nhóm'
    },
    {
      name: 'Mai Thành Phát',
      studentId: '222315',
      role: 'Thành viên nhóm'
    },
    {
      name: 'Lê Văn Nhựt Anh',
      studentId: '221222',
      role: 'Thành viên nhóm'
    }
  ];

  const quickShortcuts = [
    {
      to: '/landing-preview',
      title: 'Xem Landing Page',
      description: 'Mở trang giới thiệu Group24 cho khách hàng',
      icon: '🌐'
    },
    {
      to: '/profile',
      title: 'Cập nhật hồ sơ',
      description: 'Cập nhật thông tin cá nhân và thiết bị đăng nhập',
      icon: '👤'
    },
    isAdmin && {
      to: '/admin',
      title: 'Quản trị người dùng',
      description: 'Thêm thành viên mới, gán quyền và khóa tài khoản',
      icon: '🛡️'
    },
    isAdmin && {
      to: '/admin/ui-improvements',
      title: 'Quy trình thay đổi giao diện',
      description: 'Theo dõi yêu cầu điều chỉnh và xác nhận triển khai',
      icon: '✨'
    }
  ].filter(Boolean);

  const dashboardHighlights = [
    {
      tag: 'Bảo mật',
      title: 'Giám sát đăng nhập theo thời gian thực',
      description: 'Theo dõi địa điểm, thiết bị đăng nhập và đặt ngưỡng cảnh báo cho hành vi bất thường.'
    },
    {
      tag: 'Vận hành',
      title: 'Quy trình duyệt thay đổi minh bạch',
      description: 'Mọi chỉnh sửa UI/UX đều được ghi nhận với trạng thái rõ ràng cho đội CNTT và vận hành.'
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-hero">
        <div className="hero-main">
          <span className="hero-chip">Tổng quan tài khoản</span>
          <h1>Xin chào, {user?.name}</h1>
          <p>
            Trang tổng quan hiển thị quyền truy cập hiện tại, các hạng mục cần xử lý và nhật ký gần đây cho tài khoản của bạn
            trên nền tảng Group24.
          </p>
          <div className="hero-actions">
            <Link to="/profile" className="hero-link">
              Cập nhật hồ sơ
            </Link>
            <Link to="/landing-preview" className="hero-link">
              Xem Landing Page
            </Link>
          </div>
        </div>
      </header>

      <section className="dashboard-metrics">
        {teamMembers.map((member) => (
          <article key={member.studentId} className="metric-card">
            <span className="metric-label">{member.name}</span>
            <p className="metric-value">MSSV: {member.studentId}</p>
            <p className="metric-hint">{member.role}</p>
          </article>
        ))}
      </section>

      {quickShortcuts.length > 0 && (
        <section className="panel dashboard-shortcuts">
          <header>
            <span className="panel-eyebrow">Đường tắt đề xuất</span>
            <h2>Tiếp tục công việc chỉ trong vài thao tác</h2>
            <p>Những bước được dùng thường xuyên nhất để bạn xử lý hồ sơ và quản trị nhanh chóng.</p>
          </header>
          <div className="shortcut-grid">
            {quickShortcuts.map((link) => (
              <Link key={link.to} to={link.to} className="shortcut-card">
                <span className="shortcut-icon" aria-hidden>
                  {link.icon}
                </span>
                <div>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                </div>
                <span className="shortcut-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="panel dashboard-highlights">
        <header>
          <span className="panel-eyebrow">Lợi ích cốt lõi</span>
          <h2>Trải nghiệm làm việc với giao diện mới</h2>
        </header>
        <div className="insight-grid">
          {dashboardHighlights.map((item) => (
            <article key={item.title} className="insight-card">
              <span className="insight-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

