import React, { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './AppLayout.css';

const baseNavigation = [
  {
    to: '/dashboard',
    label: 'Tổng quan',
    description: 'Theo dõi hoạt động tài khoản và truy cập nhanh',
    glyph: '📊'
  },
  {
    to: '/profile',
    label: 'Hồ sơ cá nhân',
    description: 'Quản lý thông tin cá nhân và thiết bị đăng nhập',
    glyph: '👤'
  }
];

const adminNavItem = {
  to: '/admin',
  label: 'Quản trị viên',
  description: 'Thêm thành viên, gán quyền và khóa tài khoản',
  glyph: '🛡️'
};

const AppLayout = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = useMemo(() => {
    return isAdmin
      ? [...baseNavigation, adminNavItem]
      : baseNavigation;
  }, [isAdmin]);

  const activeRoute = navigation.find((item) => location.pathname.startsWith(item.to));

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setSidebarOpen(false);

  if (!user) {
    return children;
  }

  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="app-sidebar" data-open={sidebarOpen}>
        <div className="sidebar-brand" aria-label="Logo Group24">
          <div className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
              <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="currentColor" fillOpacity="0.7"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-copy">
            <span className="brand-title">Group24</span>
            <span className="brand-subtitle">Quản lý người dùng</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={handleCloseSidebar}
            >
              <span className="sidebar-icon" aria-hidden>{item.glyph}</span>
              <span className="sidebar-text">
                <span className="sidebar-label">{item.label}</span>
                <span className="sidebar-description">{item.description}</span>
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-status surface-card" data-elevated="true">
          <span className="status-eyebrow">Phiên làm việc</span>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <div className="status-badge">
            {user.role === 'admin' ? 'Quản trị viên' : 'Thành viên'} · MongoDB đã kết nối
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="app-sidebar-overlay" onClick={handleCloseSidebar} aria-hidden="true" />}

      <div className="app-main">
        <Navbar
          pageTitle={activeRoute?.label ?? 'Bảng điều khiển'}
          pageSubtitle={activeRoute?.description ?? 'Giám sát và quản lý người dùng'}
          onMenuClick={handleToggleSidebar}
        />

        <main id="main-content" className="app-content" role="main" tabIndex="-1">
          <div className="app-content-inner">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;


