import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import { Button, Badge } from '../../components/ui';
import { showError, showSuccess } from '../../utils/toast';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'user' });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', role: 'user' });

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, statsData] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getStats()
      ]);
      setUsers(usersData.users);
      setStats(statsData.stats);
    } catch (error) {
      showError('Không thể tải dữ liệu quản trị.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Xóa người dùng "${name}" khỏi hệ thống?`)) {
      return;
    }
    try {
      await adminService.deleteUser(id);
      showSuccess('Đã xóa người dùng');
      fetchData();
    } catch (error) {
      showError(error.response?.data?.message || 'Không thể xóa người dùng');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      await adminService.updateUser(editingUser.id, editForm);
      showSuccess('Cập nhật người dùng thành công');
      setEditingUser(null);
      fetchData();
    } catch (error) {
      showError(error.response?.data?.message || 'Không thể cập nhật người dùng');
    }
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    // Validation
    if (!createForm.name || !createForm.email || !createForm.password) {
      showError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (createForm.password.length < 6) {
      showError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    try {
      await adminService.createUser(createForm);
      showSuccess('Tạo người dùng thành công');
      setShowCreateModal(false);
      setCreateForm({ name: '', email: '', password: '', role: 'user' });
      fetchData();
    } catch (error) {
      showError(error.response?.data?.message || 'Không thể tạo người dùng');
    }
  };

  return (
    <div className="admin">
      <header className="admin-hero">
        <div className="admin-hero__main">
          <span className="admin-chip">Trung tâm quản trị</span>
          <h1>Quản lý người dùng & quyền tại Group24</h1>
          <p>
            Theo dõi trạng thái tài khoản, phân quyền theo phòng ban và đảm bảo việc sử dụng hệ thống tuân thủ chính sách nội bộ.
            Từ đây bạn có thể reset mật khẩu, khóa tài khoản hoặc cập nhật vai trò ngay lập tức.
          </p>
          <div className="admin-hero__actions">
            <Button type="button" variant="primary" onClick={() => setShowCreateModal(true)}>
              + Thêm người dùng
            </Button>
            <Button type="button" variant="outline" onClick={fetchData}>
              Làm mới dữ liệu
            </Button>
            <Button as="a" href="mailto:support@group24.vn" variant="ghost">
              Liên hệ hỗ trợ kỹ thuật
            </Button>
          </div>
        </div>
        <aside className="admin-hero__aside" aria-label="Checklist kiểm tra nhanh">
          <div className="admin-checklist">
            <h3>Checklist bàn giao</h3>
            <ul>
              <li>Bảo đảm mỗi phòng ban có tối thiểu một quản trị viên.</li>
              <li>Khóa các tài khoản đã nghỉ việc hoặc không hoạt động 30 ngày.</li>
              <li>Xuất báo cáo định kỳ và lưu trữ trên hệ thống nội bộ.</li>
            </ul>
          </div>
        </aside>
      </header>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner" />
          <p>Đang tải dữ liệu người dùng...</p>
        </div>
      ) : (
        <>
          {stats && (
            <section className="admin-metrics">
              <article className="admin-metric">
                <span className="admin-metric__icon">👥</span>
                <h3>{stats.totalUsers}</h3>
                <p>Tổng người dùng</p>
              </article>
              <article className="admin-metric">
                <span className="admin-metric__icon">👑</span>
                <h3>{stats.adminUsers}</h3>
                <p>Quản trị viên</p>
              </article>
              <article className="admin-metric">
                <span className="admin-metric__icon">👤</span>
                <h3>{stats.regularUsers}</h3>
                <p>Thành viên</p>
              </article>
              <article className="admin-metric">
                <span className="admin-metric__icon">✨</span>
                <h3>{stats.newUsersLast30Days}</h3>
                <p>Mới 30 ngày</p>
              </article>
            </section>
          )}

          <section className="admin-table">
            <header>
              <div>
                <span className="admin-table__eyebrow">Danh sách người dùng</span>
                <h2>Kiểm soát quyền và hồ sơ</h2>
                <p>Mọi thay đổi được ghi lại trong nhật ký bảo mật và phản ánh ngay trên dashboard người dùng.</p>
              </div>
            </header>

            <div className="admin-table__wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Ngày tạo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((entry, index) => (
                    <tr key={entry.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="admin-user">
                          {entry.avatar ? (
                            <img src={`http://localhost:3000${entry.avatar}`} alt={entry.name} />
                          ) : (
                            <span>{entry.name.charAt(0).toUpperCase()}</span>
                          )}
                          <div>
                            <p>{entry.name}</p>
                            <small>{entry.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}</small>
                          </div>
                        </div>
                      </td>
                      <td>{entry.email}</td>
                      <td>
                        <Badge variant={entry.role === 'admin' ? 'warning' : 'default'}>
                          {entry.role}
                        </Badge>
                      </td>
                      <td>{new Date(entry.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <div className="admin-actions-inline">
                          <Button type="button" size="sm" variant="outline" onClick={() => handleEdit(entry)}>
                            Chỉnh sửa
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(entry.id, entry.name)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {showCreateModal && (
        <div className="admin-dialog" role="dialog" aria-modal="true" onClick={() => setShowCreateModal(false)}>
          <div className="admin-dialog__content surface-card" onClick={(event) => event.stopPropagation()}>
            <div className="admin-dialog__header">
              <div>
                <p className="admin-eyebrow">Tạo người dùng mới</p>
                <h3>Thêm người dùng vào hệ thống</h3>
              </div>
              <button type="button" className="admin-dialog__close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>

            <form className="admin-dialog__form" onSubmit={handleCreateUser}>
              <label>
                <span>Họ và tên</span>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(event) => setCreateForm({ ...createForm, name: event.target.value })}
                  placeholder="Nhập họ và tên"
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(event) => setCreateForm({ ...createForm, email: event.target.value })}
                  placeholder="Nhập địa chỉ email"
                  required
                />
              </label>
              <label>
                <span>Mật khẩu</span>
                <input
                  type="password"
                  value={createForm.password}
                  onChange={(event) => setCreateForm({ ...createForm, password: event.target.value })}
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                  required
                  minLength={6}
                />
              </label>
              <label>
                <span>Vai trò</span>
                <select value={createForm.role} onChange={(event) => setCreateForm({ ...createForm, role: event.target.value })}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <div className="admin-dialog__actions">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Hủy
                </Button>
                <Button type="submit" variant="primary">
                  Tạo người dùng
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="admin-dialog" role="dialog" aria-modal="true" onClick={() => setEditingUser(null)}>
          <div className="admin-dialog__content surface-card" onClick={(event) => event.stopPropagation()}>
            <div className="admin-dialog__header">
              <div>
                <p className="admin-eyebrow">Cập nhật người dùng</p>
                <h3>{editingUser.name}</h3>
              </div>
              <button type="button" className="admin-dialog__close" onClick={() => setEditingUser(null)}>
                ×
              </button>
            </div>

            <form className="admin-dialog__form" onSubmit={handleUpdateUser}>
              <label>
                <span>Họ và tên</span>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) => setEditForm({ ...editForm, name: event.target.value })}
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(event) => setEditForm({ ...editForm, email: event.target.value })}
                  required
                />
              </label>
              <label>
                <span>Vai trò</span>
                <select value={editForm.role} onChange={(event) => setEditForm({ ...editForm, role: event.target.value })}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <div className="admin-dialog__actions">
                <Button type="button" variant="ghost" onClick={() => setEditingUser(null)}>
                  Hủy
                </Button>
                <Button type="submit" variant="primary">
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

