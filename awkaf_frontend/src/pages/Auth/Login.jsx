// pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ar } from "../../translations/ar.ts";
import { authService } from "../../services/api";
import { expect } from 'chai';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // navigate("/projects");
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.login(credentials);
      
      // Assert response has required properties
      expect(response).to.have.property('status');
      expect(response).to.have.property('message');
      expect(response.status).to.be.a('number');
      expect(response.message).to.be.a('string');
      
      if (response.status === 200 && response.message === "Authentication successful") {
        navigate("/projects");
      } else {
        setError(response.message || "فشل تسجيل الدخول");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || "حدث خطأ في تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header">{ar.auth.login}</div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">{ar.auth.email}</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{ar.auth.password}</label>
                    <input
                      // type="password"
                      className="form-control"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-gold w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري التحميل..." : ar.auth.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
