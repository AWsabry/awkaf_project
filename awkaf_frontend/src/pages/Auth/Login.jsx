// pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ar } from "../../translations/ar.ts";
import { authService } from "../../services/api";
import logoAwkaf from '../../assets/logo_awkaf.jpg'; // Import the logo image

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
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header text-center">
                {/* Add the logo here */}
                <img
                  src={logoAwkaf}
                  alt="Awkaf Logo"
                  className="rounded-circle mb-3"
                  style={{
                    width: '100px', // Adjust size as needed
                    height: '100px', // Adjust size as needed
                    objectFit: 'cover',
                    border: '3px solid #d4af37' // Gold border
                  }}
                />
                <h3 className="text-center font-weight-light my-4">{ar.auth.login}</h3>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">{ar.auth.email}</label>
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="email"
                      placeholder={ar.auth.emailPlaceholder}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">{ar.auth.password}</label>
                    <input
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder={ar.auth.passwordPlaceholder}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    {/* <Link className="small" to="#!">Forgot Password?</Link> */}
                    <button
                      className="btn btn-gold w-100"
                      type="submit"
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
