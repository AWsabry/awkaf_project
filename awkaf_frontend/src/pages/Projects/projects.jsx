import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/App.css";
import { ar } from "../../translations/ar.ts";

export default function Projects() {
  return (
    <div dir="rtl" lang="ar">
      <div className="container">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>{ar.projects.title}</span>
            <Link to="/add-project" className="btn btn-sm btn-gold">
              {ar.projects.addNew}
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-gold">
              <thead>
                <tr>
                  <th>{ar.projects.details}</th>
                  <th>{ar.projects.status}</th>
                  <th>{ar.projects.status}</th>
                  <th>{ar.projects.status}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>مشروع مسجد النور</td>
                  <td>1,200,000 ج.م</td>
                  <td>2024-01-15</td>
                  <td>45%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
