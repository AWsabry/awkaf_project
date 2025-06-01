// pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ar } from "../../translations/ar.ts";
import { authService } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      
      const response = await authService.login(formData);
      console.log(response);
      
      // Check if login was successful and user is admin
      if (response.success && response.role === 'admin') {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          role: response.role,
          // Add any other user data you want to store
        }));
        
        // Navigate to projects
        navigate('/projects');
      } else {
        setError('عذراً، هذا النظام متاح فقط للمشرفين');
      }
    } catch (err) {
      
      setError('فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar" className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-header text-center">
                <h4>{ar.auth.login}</h4>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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
                  <div className="mb-3">
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
                  <div className="d-grid">
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
                          جاري تسجيل الدخول...
                        </>
                      ) : (
                        ar.auth.login
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
