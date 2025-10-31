import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Badge } from '../components/ui';
import profileService from '../services/profileService';
import { showError, showSuccess } from '../utils/toast';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({ name: user?.name ?? '', email: user?.email ?? '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [avatar, setAvatar] = useState(user?.avatar ?? '');
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name, email: user.email });
      setAvatar(user.avatar);
    }
  }, [user]);

  const profileFacts = [
    {
      label: 'Email đăng nhập',
      value: profileData.email
    },
    {
      label: 'Vai trò',
      value: user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'
    },
    {
      label: 'Nhật ký gần nhất',
      value: 'Cập nhật hồ sơ được lưu trong 90 ngày'
    }
  ];

  const uploadAvatarFile = async (file) => {
    setLoading(true);
    try {
      const response = await profileService.uploadAvatar(file);
      setAvatar(response.avatar);
      if (user) {
        updateUser({ ...user, avatar: response.avatar });
      }
      showSuccess('Cập nhật avatar thành công');
      setAvatarPreview(null);
    } catch (error) {
      setAvatarPreview(null);
      showError(error.response?.data?.message || 'Không thể tải ảnh lên');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await profileService.updateProfile(profileData);
      updateUser(response.user);
      showSuccess('Cập nhật thông tin thành công');
    } catch (error) {
      showError(error.response?.data?.message || 'Không thể cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError('Mật khẩu mới phải có tối thiểu 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      await profileService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      showSuccess('Đổi mật khẩu thành công');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showError(error.response?.data?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError('Ảnh không được vượt quá 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      void uploadAvatarFile(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile">
      <section className="profile-hero">
        <div className="profile-hero__main">
          <div className="profile-avatar" data-placeholder={!avatar && !avatarPreview}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" />
            ) : avatar ? (
              <img src={`http://localhost:3000${avatar}`} alt={user?.name} />
            ) : (
              <span>{user?.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="profile-meta">
            <h2>{user?.name}</h2>
            <div className="profile-meta__tags">
              <Badge variant={user?.role === 'admin' ? 'warning' : 'default'}>
                {user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
              </Badge>
            </div>
            <p className="profile-meta__summary">
              Quản lý hồ sơ Group24 của bạn, xác nhận thông tin liên hệ và kiểm soát thiết bị đăng nhập đang hoạt động.
            </p>
          </div>
        </div>

        <div className="profile-facts">
          {profileFacts.map((fact) => (
            <div key={fact.label} className="profile-fact">
              <span>{fact.label}</span>
              <p>{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="profile-tabs">
        <button type="button" onClick={() => setActiveTab('info')} data-active={activeTab === 'info'}>
          Thông tin chung
        </button>
        <button type="button" onClick={() => setActiveTab('password')} data-active={activeTab === 'password'}>
          Bảo mật
        </button>
        <button type="button" onClick={() => setActiveTab('avatar')} data-active={activeTab === 'avatar'}>
          Ảnh đại diện
        </button>
      </div>

      <section className="profile-panel">
        {activeTab === 'info' && (
          <form className="profile-form" onSubmit={handleProfileUpdate}>
            <div className="profile-form__intro">
              <h3>Cập nhật thông tin cá nhân</h3>
              <p>Điều chỉnh tên hiển thị và email công việc để các thông báo Group24 luôn tới đúng người.</p>
            </div>

            <div className="profile-form__fields">
              <div className="profile-field">
                <label htmlFor="profile-name">Họ và tên</label>
                <input
                  id="profile-name"
                  type="text"
                  value={profileData.name}
                  onChange={(event) => setProfileData({ ...profileData, name: event.target.value })}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div className="profile-field">
                <label htmlFor="profile-email">Email</label>
                <input
                  id="profile-email"
                  type="email"
                  value={profileData.email}
                  onChange={(event) => setProfileData({ ...profileData, email: event.target.value })}
                  placeholder="ban@doanhnghiep.com"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </form>
        )}

        {activeTab === 'password' && (
          <form className="profile-form" onSubmit={handlePasswordChange}>
            <div className="profile-form__intro">
              <h3>Đổi mật khẩu</h3>
              <p>Đặt mật khẩu mới theo chính sách bảo mật của doanh nghiệp để bảo vệ tài khoản.</p>
            </div>

            <div className="profile-form__fields">
              <div className="profile-field">
                <label htmlFor="current-password">Mật khẩu hiện tại</label>
                <input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(event) =>
                    setPasswordData({ ...passwordData, currentPassword: event.target.value })
                  }
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="profile-field">
                <label htmlFor="new-password">Mật khẩu mới</label>
                <input
                  id="new-password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(event) => setPasswordData({ ...passwordData, newPassword: event.target.value })}
                  placeholder="Ít nhất 6 ký tự"
                  required
                />
              </div>
              <div className="profile-field">
                <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(event) =>
                    setPasswordData({ ...passwordData, confirmPassword: event.target.value })
                  }
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Đang đổi...' : 'Cập nhật mật khẩu'}
            </Button>
          </form>
        )}

        {activeTab === 'avatar' && (
          <div className="profile-form">
            <div className="profile-form__intro">
              <h3>Ảnh đại diện</h3>
              <p>Ảnh đại diện xuất hiện trong nhật ký hoạt động và giúp đồng nghiệp nhận diện bạn trong hệ thống.</p>
            </div>

            <div className="profile-avatar-upload">
              <div className="profile-avatar-preview" data-placeholder={!avatar && !avatarPreview}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" />
                ) : avatar ? (
                  <img src={`http://localhost:3000${avatar}`} alt="Avatar hiện tại" />
                ) : (
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>

              <div className="profile-upload-actions" aria-live="polite">
                <input
                  type="file"
                  id="avatar-input"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
                <label htmlFor="avatar-input" className="profile-upload-button" data-loading={loading} aria-busy={loading}>
                  {loading ? 'Đang cập nhật...' : 'Đổi ảnh đại diện'}
                </label>
                <p className="profile-upload-hint">Hỗ trợ JPG, PNG, GIF. Kích thước tối đa 5MB.</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;

