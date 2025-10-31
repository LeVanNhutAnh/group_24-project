import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>Chưa có người dùng nào. Hãy thêm người dùng mới!!</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Danh Sách Người Dùng</h2>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày Tạo</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
              <td>
                <button 
                  className="btn-edit" 
                  onClick={() => onEdit(user)}
                >
                  Sửa
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => onDelete(user._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

