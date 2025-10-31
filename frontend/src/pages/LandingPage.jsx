import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';

const teamMembers = [
  { name: 'Quách Thanh Vũ', studentId: '221361' },
  { name: 'Mai Thành Phát', studentId: '222315' },
  { name: 'Lê Văn Nhựt Anh', studentId: '221222' }
];

const experiencePillars = [
  {
    title: 'Bảo mật & tuân thủ',
    description:
      'Đăng nhập đa lớp, lưu nhật ký truy cập, đáp ứng tiêu chuẩn bảo mật nội bộ của Group24 và các đối tác tài chính.'
  },
  {
    title: 'Quản lý người dùng tập trung',
    description:
      'Phân quyền linh hoạt, đồng bộ hồ sơ nhân viên, quản trị vai trò theo phòng ban và trạng thái hoạt động.'
  },
  {
    title: 'Giám sát vận hành',
    description:
      'Bảng điều khiển realtime, cảnh báo hoạt động bất thường, quy trình duyệt thay đổi giúp đội CNTT kiểm soát chặt chẽ.'
  }
];

const playbookSteps = [
  {
    step: 'Bước 01',
    heading: 'Đăng ký tài khoản quản lý',
    copy: 'Tạo tài khoản quản trị Group24, xác thực email công việc và kích hoạt bảo mật hai lớp mặc định.'
  },
  {
    step: 'Bước 02',
    heading: 'Thêm nhân sự & phân quyền',
    copy: 'Mời thành viên theo nhóm chức năng, áp dụng mẫu phân quyền sẵn có hoặc tùy chỉnh theo vai trò nội bộ.'
  },
  {
    step: 'Bước 03',
    heading: 'Giám sát & báo cáo',
    copy: 'Theo dõi hoạt động đăng nhập, xuất báo cáo truy cập, thiết lập cảnh báo cho các hành động nhạy cảm.'
  }
];

const capabilityMatrix = [
  {
    eyebrow: 'Nhân sự',
    title: 'Cổng tự phục vụ nhân viên',
    description:
      'Nhân viên chủ động cập nhật hồ sơ, quản lý thiết bị đăng nhập và xem lịch sử hoạt động của chính họ.'
  },
  {
    eyebrow: 'Quản trị',
    title: 'Bảng điều khiển quản trị Group24',
    description:
      'Thêm/xóa user, gán vai trò, đặt lại mật khẩu, tạm khóa tài khoản và xuất dữ liệu phục vụ kiểm toán.'
  },
  {
    eyebrow: 'Tuân thủ',
    title: 'Nhật ký & cảnh báo bất thường',
    description:
      'Mọi hành động quan trọng được ghi lại kèm thời gian, IP, thiết bị và có thể đặt ngưỡng cảnh báo ngay lập tức.'
  }
];

const LandingPage = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="landing">
      <header className="landing-hero">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="container">
          <nav className="landing-nav" aria-label="Điều hướng chính">
            <div className="landing-nav__brand" aria-label="Logo Group24">
              <div className="landing-nav__logo-wrapper">
                <svg className="landing-nav__logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
                  <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="currentColor" fillOpacity="0.7"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="landing-nav__logo">Group24</span>
              </div>
              <span className="landing-nav__tag">Quản lý người dùng</span>
            </div>
            <div className="landing-nav__actions" role="group" aria-label="Tác vụ nhanh">
              {!user ? (
                <>
                  <Link to="/login" className="landing-nav__link">Đăng nhập</Link>
                  <Link to="/signup" className="landing-nav__cta" aria-label="Đăng ký tài khoản Group24">
                    Đăng ký
                  </Link>
                </>
              ) : (
                <div className="user-menu" ref={menuRef}>
                  <button
                    type="button"
                    className="user-chip focus-ring"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                  >
                    {user.avatar ? (
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
                      <span className="user-chip-name">{user.name}</span>
                      <span className="user-chip-role">{user.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}</span>
                    </div>
                    <span className={`user-menu-caret ${menuOpen ? 'open' : ''}`} aria-hidden>▾</span>
                  </button>

                  {menuOpen && (
                    <div className="user-dropdown" role="menu">
                      <div className="user-dropdown-header">
                        <span className="user-dropdown-name">{user.name}</span>
                        <span className="user-dropdown-email">{user.email}</span>
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
                      <button type="button" className="user-dropdown-item danger" onClick={handleLogout}>
                        <span className="user-dropdown-icon">🚪</span>
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          <div className="landing-hero__content">
            <div className="hero-copy">
              <p className="hero-eyebrow">Group24 Identity Platform</p>
              <h1>
                Quản lý người dùng nội bộ <span>trên một nền tảng duy nhất.</span>
              </h1>
              <p className="hero-subtitle">
                Group24 giúp doanh nghiệp kiểm soát toàn bộ vòng đời người dùng: đăng ký, xác thực, phân quyền và giám sát
                hoạt động theo thời gian thực, bảo vệ dữ liệu nhạy cảm của tổ chức.
              </p>
              <div className="hero-actions">
                <Link to="/signup" className="hero-button hero-button--primary">
                  Đăng ký tài khoản quản trị
                </Link>
                <Link to="/login" className="hero-button hero-button--ghost">
                  Đăng nhập hệ thống
                </Link>
              </div>
              <div className="hero-metrics" role="list">
                {teamMembers.map((member) => (
                  <div key={member.studentId} className="hero-metric" role="listitem">
                    <span>{member.name}</span>
                    <p>MSSV: {member.studentId}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="landing-checklist" aria-label="Quy trình kích hoạt">
        <div className="container">
          <div className="checklist-card">
            <span className="checklist-label">Hướng dẫn khởi tạo</span>
            <h2>Bắt đầu với Group24 chỉ trong 3 bước</h2>
            <ol className="checklist-steps">
              {playbookSteps.map((step) => (
                <li key={step.heading}>
                  <div className="step-meta">
                    <span>{step.step}</span>
                    <h4>{step.heading}</h4>
                  </div>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="container">
          <header className="section-header">
            <p className="section-eyebrow">Giá trị cốt lõi</p>
            <div className="section-headline">
              <h2>Nền tảng quản lý người dùng bảo mật cho doanh nghiệp.</h2>
              <p>
                Group24 kết nối đội CNTT và nhân sự trên cùng một không gian: cấp quyền nhanh, kiểm soát truy cập chặt chẽ
                và đảm bảo quyền riêng tư cho từng nhân viên.
              </p>
            </div>
          </header>

          <div className="pillar-grid">
            {experiencePillars.map((pillar) => (
              <article key={pillar.title} className="pillar-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-playbook" aria-label="Tính năng nổi bật">
        <div className="container">
          <header className="section-header">
            <p className="section-eyebrow">Năng lực vận hành</p>
            <div className="section-headline">
              <h2>Công cụ cần thiết cho đội CNTT và nhân sự.</h2>
              <p>
                Từ onboarding nhân viên tới rà soát truy cập định kỳ, Group24 mang lại cái nhìn toàn cảnh và hành động nhanh
                chóng khi có sự cố.
              </p>
            </div>
          </header>

          <div className="playbook-grid">
            {capabilityMatrix.map((item) => (
              <article key={item.title} className="playbook-card">
                <span className="card-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-callout">
        <div className="container callout-grid">
          <div className="callout-copy">
            <h2>Chính sách truy cập và nhật ký hoạt động rõ ràng.</h2>
            <p>
              Thiết lập quy định mật khẩu, khóa phiên bất thường, ghi nhận mọi thao tác quan trọng và gửi thông báo cho đội
              vận hành ngay khi có rủi ro.
            </p>
          </div>
          <div className="callout-panel">
            <div className="callout-panel__content">
              <h3>Checklist quản trị thường nhật</h3>
              <ul>
                <li>Rà soát tài khoản mới & xác minh thông tin nhân sự</li>
                <li>Đánh giá phiên đăng nhập theo phòng ban</li>
                <li>Xuất báo cáo truy cập định kỳ gửi Ban Điều hành</li>
              </ul>
              <div className="callout-actions">
                <Link to="/signup" className="hero-button hero-button--primary">Đăng ký tài khoản quản trị</Link>
                <a href="mailto:support@group24.vn" className="hero-button hero-button--ghost">Liên hệ hỗ trợ</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container landing-footer__grid">
          <div>
            <div className="landing-nav__logo-wrapper">
              <svg className="landing-nav__logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
                <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="currentColor" fillOpacity="0.7"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="landing-nav__logo">Group24</span>
            </div>
            <p className="landing-footer__tagline">Giải pháp quản lý người dùng doanh nghiệp.</p>
          </div>
          <div className="landing-footer__meta">
            <span>© {new Date().getFullYear()} Group24</span>
            <span>Dịch vụ hạ tầng bảo mật • Trung tâm dữ liệu tại Việt Nam</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

