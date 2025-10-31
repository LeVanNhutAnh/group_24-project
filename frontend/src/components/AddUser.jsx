import React, { useState, useEffect } from 'react';

function AddUser({ editingUser, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Load data when editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
    setErrors({});
  }, [editingUser]);

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email không được để trống!!!';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData = { name: name.trim(), email: email.trim() };
    await onSave(userData);
    
    // Reset form
    setName('');
    setEmail('');
    setErrors({});
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setErrors({});
    onCancel();
  };

  return (
    <div className="add-user">
      <h2>{editingUser ? 'Sửa Người Dùng' : 'Thêm Người Dùng Mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {editingUser ? 'Cập Nhật' : 'Thêm'}
          </button>
          {editingUser && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddUser;

