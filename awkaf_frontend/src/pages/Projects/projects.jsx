import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/App.css";
import { ar } from "../../translations/ar.ts";
import { projectsService } from "../../services/api";
import { FaTrash } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsService.getProjects();
      console.log('API Response:', response);
      
      if (Array.isArray(response)) {
        setProjects(response);
        setError(null);
      } else {
        console.error('Invalid response format:', response);
        setProjects([]);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      setProjects([]);
      setError('Failed to fetch projects. Please try again later.');
      console.error('Error fetching projects:', err);
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

  const formatCurrency = (amount) => {
    try {
      if (!amount) return '0.00 ر.س';
      return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      return '0.00 ر.س';
    }
  };

  const formatPercentage = (value) => {
    try {
      if (!value) return '0.00%';
      return `${parseFloat(value).toFixed(2)}%`;
    } catch (error) {
      return '0.00%';
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      try {
        setDeleteLoading(true);
        await projectsService.deleteProject(projectId);
        // Remove the deleted project from the state
        setProjects(projects.filter(project => project.project_id !== projectId));
        // Show success message
        alert('تم حذف المشروع بنجاح');
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('حدث خطأ أثناء حذف المشروع');
      } finally {
        setDeleteLoading(false);
      }
    }
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
            <span>{ar.projects.title}</span>
            <Link to="/add-project" className="btn btn-sm btn-gold">
              {ar.projects.addNew}
            </Link>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-gold">
                <thead>
                  <tr>
                    <th>اسم المشروع</th>
                    <th>قيمة العقد</th>
                    <th>المصروف</th>
                    <th>نسبة التنفيذ</th>
                    <th>المبلغ المتبقي</th>
                    <th>تاريخ البدء</th>
                    <th>تاريخ الانتهاء المتوقع</th>
                    <th>مصدر التمويل</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((project) => (
                    <tr key={project.project_id}>
                      <td>
                        <div className="font-medium">{project.project_name_ar}</div>
                        <div className="text-muted small">{project.project_name_en}</div>
                      </td>
                      <td>{formatCurrency(project.project_value)}</td>
                      <td>{formatCurrency(project.expended)}</td>
                      <td>{formatPercentage(project.current_implementation_rate)}</td>
                      <td>{formatCurrency(project.remaining_contract_amount)}</td>
                      <td>{formatDate(project.execution_start_date)}</td>
                      <td>{formatDate(project.expected_completion_date)}</td>
                      <td>{project.funding_source === 'self_funded' ? 'تمويل ذاتي' : project.funding_source}</td>
                      <td>
                        <div className="btn-group">
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(project.project_id)}
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
};

export default Projects;
