import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onMenuClick, pageTitle, pageSubtitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const initials = useMemo(() => {
    if (!user?.name) {
      return '?';
    }
    const parts = user.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  }, [user?.name]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleToggleSidebar = () => {
    if (typeof onMenuClick === 'function') {
      onMenuClick();
    }
  };

  return (
    <header className="topbar surface-card" data-elevated="true">
      <div className="topbar-left">
        <button
          type="button"
          className="menu-trigger focus-ring"
          onClick={handleToggleSidebar}
          aria-label="Mở bảng điều hướng"
        >
          <span className="menu-trigger-bar" aria-hidden />
          <span className="menu-trigger-bar" aria-hidden />
          <span className="menu-trigger-bar" aria-hidden />
        </button>

        <div className="topbar-heading">
          <span className="topbar-eyebrow">Nền tảng Group24</span>
          <h1 className="topbar-title">{pageTitle}</h1>
          {pageSubtitle && <p className="topbar-subtitle">{pageSubtitle}</p>}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-actions" role="group" aria-label="Liên kết nhanh">
          <button type="button" className="topbar-pill focus-ring">
            Trung tâm trợ giúp
          </button>
          <button type="button" className="topbar-pill focus-ring">
            Liên hệ hỗ trợ
          </button>
        </div>

        <div className="topbar-separator" aria-hidden />

        <div className="user-menu" ref={menuRef}>
          <button
            type="button"
            className="user-chip focus-ring"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            {user?.avatar ? (
              <img
                src={`http://localhost:3000${user.avatar}`}
                alt={user.name}
                className="user-chip-avatar"
              />
            ) : (
              <div className="user-chip-initials" aria-hidden>
                {initials}
              </div>
            )}
            <div className="user-chip-meta">
              <span className="user-chip-name">{user?.name}</span>
              <span className="user-chip-role">
                {user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
              </span>
            </div>
            <span className={`user-menu-caret ${menuOpen ? 'open' : ''}`} aria-hidden>▾</span>
          </button>

          {menuOpen && (
            <div className="user-dropdown" role="menu">
              <div className="user-dropdown-header">
                <span className="user-dropdown-name">{user?.name}</span>
                <span className="user-dropdown-email">{user?.email}</span>
              </div>
              <button
                type="button"
                className="user-dropdown-item"
                onClick={() => {
                  navigate('/dashboard');
                  setMenuOpen(false);
                }}
              >
                <span className="user-dropdown-icon">📊</span>
                Vào Dashboard
              </button>
              <button
                type="button"
                className="user-dropdown-item"
                onClick={() => {
                  navigate('/profile');
                  setMenuOpen(false);
                }}
              >
                <span className="user-dropdown-icon">👤</span>
                Hồ sơ cá nhân
              </button>
              <button
                type="button"
                className="user-dropdown-item danger"
                onClick={handleLogout}
              >
                <span className="user-dropdown-icon">🚪</span>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

