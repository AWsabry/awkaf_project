import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/App.css";
import { ar } from "../../translations/ar.ts";
import { blockedProjectsService } from "../../services/api";
import { FaTrash } from 'react-icons/fa';

export default function BlockedProjects() {
  const [blockedProjects, setBlockedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchBlockedProjects();
  }, []);

  const fetchBlockedProjects = async () => {
    try {
      setLoading(true);
      const response = await blockedProjectsService.getBlockedProjects();
      console.log('API Response:', response);
      
      if (Array.isArray(response)) {
        setBlockedProjects(response);
        setError(null);
      } else {
        console.error('Invalid response format:', response);
        setBlockedProjects([]);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      setBlockedProjects([]);
      setError('Failed to fetch blocked projects. Please try again later.');
      console.error('Error fetching blocked projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('ar-SA');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_progress':
        return <span className="badge bg-warning">قيد التنفيذ</span>;
      case 'resolved':
        return <span className="badge bg-success">تم الحل</span>;
      case 'pending':
        return <span className="badge bg-danger">قيد الانتظار</span>;
      default:
        return <span className="badge bg-secondary">غير محدد</span>;
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع المتعثر؟')) {
      try {
        setDeleteLoading(true);
        await blockedProjectsService.deleteBlockedProject(projectId);
        setBlockedProjects(blockedProjects.filter(project => project.delayed_project_id !== projectId));
        alert('تم حذف المشروع المتعثر بنجاح');
      } catch (err) {
        console.error('Error deleting blocked project:', err);
        alert('حدث خطأ أثناء حذف المشروع المتعثر');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blockedProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blockedProjects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-gold" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3">
        {error}
      </div>
    );
  }

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
            <div className="table-responsive">
              <table className="table table-bordered table-gold">
                <thead>
                  <tr>
                    <th>اسم المسجد</th>
                    <th>المديرية</th>
                    <th>العنوان</th>
                    <th>تاريخ العقد</th>
                    <th>أسباب التأخير</th>
                    <th>اسم المقاول</th>
                    <th>الإجراءات المتخذة</th>
                    <th>آخر تحديث</th>
                    <th>حالة الحل</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((project) => (
                    <tr key={project.delayed_project_id}>
                      <td>{project.mosque_name_ar}</td>
                      <td>{project.directorate}</td>
                      <td>{project.mosque_address}</td>
                      <td>{formatDate(project.contract_date)}</td>
                      <td>{project.delay_reasons}</td>
                      <td>{project.contractor_name || 'غير محدد'}</td>
                      <td>{project.actions_taken}</td>
                      <td>{project.latest_update}</td>
                      <td>{getStatusBadge(project.resolution_status)}</td>
                      <td>
                        <div className="btn-group">
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(project.delayed_project_id)}
                            disabled={deleteLoading}
                          >
                            {deleteLoading ? (
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                              <FaTrash />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Page navigation" className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      السابق
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      التالي
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
