// pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { ar } from "../../translations/ar.ts";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div dir="rtl" lang="ar">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header">{ar.auth.login}</div>
              <div className="card-body">
                <form onSubmit={(e) => { e.preventDefault(); navigate("/projects"); }}>
                  <div className="mb-3">
                    <label className="form-label">{ar.auth.username}</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{ar.auth.password}</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <button type="submit" className="btn btn-gold w-100">{ar.auth.submit}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
