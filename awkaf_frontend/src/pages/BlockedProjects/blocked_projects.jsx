import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/App.css";
import { ar } from "../../translations/ar.ts";

export default function BlockedProjects() { 
  return (
    <div dir="rtl" lang="ar">
      <div className="container">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>{ar.blockedProjects.title}</span>
            <Link to="/add-blocked-project" className="btn btn-sm btn-gold">
              {ar.blockedProjects.addNew}
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-gold">
              <thead>
                <tr>
                  <th>{ar.blockedProjects.projectName}</th>
                  <th>{ar.blockedProjects.status}</th>
                  <th>{ar.blockedProjects.blockDate}</th>
                  <th>{ar.blockedProjects.blockReason}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>مسجد السلام</td>
                  <td>الإسكندرية</td>
                  <td>2023-10-10</td>
                  <td>تهالك</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
