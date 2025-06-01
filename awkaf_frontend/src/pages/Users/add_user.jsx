import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ar } from "../../translations/ar.ts";
import { usersService } from "../../services/api";

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await usersService.createUser(formData);
      if (response.success) {
        navigate('/users');
      } else {
        setError('فشل في إضافة المستخدم');
      }
    } catch (err) {
      setError('حدث خطأ أثناء إضافة المستخدم');
      console.error('Error creating user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar">
      <div className="container">
        <div className="card">
          <div className="card-header">
            إضافة مستخدم جديد
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">اسم المستخدم</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">كلمة المرور</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">الصلاحية</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="user">مستخدم</option>
                    <option value="admin">مشرف</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 text-end">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: '#d4af37',
                    color: 'white',
                    border: 'none',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#c6a24b')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#d4af37')}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      جاري الحفظ...
                    </>
                  ) : (
                    ar.common.save
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => navigate('/users')}
                >
                  {ar.common.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 