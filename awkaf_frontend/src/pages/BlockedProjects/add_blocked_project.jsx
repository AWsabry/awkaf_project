import React from 'react';
import { ar } from "../../translations/ar.ts";

export default function AddBlockedProject() {
  return (
    <div dir="rtl" lang="ar">
      {/* Project Form */}
      <div className="container">
        <div className="card">
          <div className="card-header">
            {ar.blockedProjects.addNew}
          </div>
          <div className="card-body">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">{ar.blockedProjects.projectName}</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">{ar.blockedProjects.status}</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">{ar.blockedProjects.blockDate}</label>
                  <input type="date" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">{ar.blockedProjects.blockReason}</label>
                  <input type="text" className="form-control" required />
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
                >
                  {ar.common.save}
                </button>
                <a href="blocked-projects" className="btn btn-secondary ms-2">
                  {ar.common.cancel}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
