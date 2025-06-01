import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/custom.css";
import { ar } from "../../translations/ar.ts";
import { projectsService, constructorsService } from "../../services/api";
import { FaTrash, FaEdit, FaFilter } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [constructors, setConstructors] = useState([]);
  const [constructorsLoading, setConstructorsLoading] = useState(true);
  const [constructorsError, setConstructorsError] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'date', // 'date' or 'name'
    sortOrder: 'desc', // 'asc' or 'desc'
    constructorId: '',
    searchTerm: '',
    fundingSource: '' // 'self_funded', 'donor_funded', 'government_funded'
  });

  useEffect(() => {
    fetchProjects();
    fetchConstructors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [projects, filters]);

  const applyFilters = () => {
    let filtered = [...projects];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(project =>
        project.project_name_ar.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        project.project_name_en.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply constructor filter
    if (filters.constructorId) {
      filtered = filtered.filter(project =>
        project.constructor_id === Number(filters.constructorId)
      );
    }

    // Apply funding source filter
    if (filters.fundingSource) {
      filtered = filtered.filter(project => project.funding_source === filters.fundingSource);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'desc'
          ? new Date(b.created_at) - new Date(a.created_at)
          : new Date(a.created_at) - new Date(b.created_at);
      } else {
        return filters.sortOrder === 'desc'
          ? b.project_name_ar.localeCompare(a.project_name_ar)
          : a.project_name_ar.localeCompare(b.project_name_ar);
      }
    });

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchConstructors = async () => {
    try {
      setConstructorsLoading(true);
      const response = await constructorsService.getConstructors();
      if (response.success && Array.isArray(response.data)) {
        setConstructors(response.data);
        setConstructorsError(null);
      } else {
        setConstructors([]);
        setConstructorsError('Failed to fetch constructors.');
        console.error('Error fetching constructors:', response);
      }
    } catch (err) {
      setConstructors([]);
      setConstructorsError('Failed to fetch constructors.');
      console.error('Error fetching constructors:', err);
    } finally {
      setConstructorsLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsService.getProjects();
      
      if (Array.isArray(response.data)) {
        setProjects(response.data);
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
      return new Date(dateString).toLocaleDateString('ar-EG');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount) => {
    try {
      if (!amount) return '0.00 جنيه';
      // Convert string to number if needed
      const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numericAmount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return '0.00 جنيه';
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
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

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
      <div className="container-fluid">
        <div className="row">
          {/* Filter Sidebar */}
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-header d-flex align-items-center">
                <FaFilter className="me-2" />
                <span>تصفية وترتيب</span>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">بحث</label>
                  <input
                    type="text"
                    className="form-control"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    placeholder="ابحث عن اسم المشروع..."
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ترتيب حسب</label>
                  <select
                    className="form-select"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                  >
                    <option value="date">التاريخ</option>
                    <option value="name">اسم المشروع</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">ترتيب</label>
                  <select
                    className="form-select"
                    name="sortOrder"
                    value={filters.sortOrder}
                    onChange={handleFilterChange}
                  >
                    <option value="desc">تنازلي (الأحدث)</option>
                    <option value="asc">تصاعدي (الأقدم)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">المقاول</label>
                  <select
                    className="form-select"
                    name="constructorId"
                    value={filters.constructorId}
                    onChange={handleFilterChange}
                  >
                    <option value="">الكل</option>
                    {constructors.map(constructor => (
                      <option key={constructor.id} value={constructor.id}>
                        {constructor.contractor_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">مصدر التمويل</label>
                  <select
                    className="form-select"
                    name="fundingSource"
                    value={filters.fundingSource}
                    onChange={handleFilterChange}
                  >
                    <option value="">الكل</option>
                    <option value="self_funded">تمويل ذاتي</option>
                    <option value="donor_funded">تمويل مانح</option>
                    <option value="government_funded">تمويل حكومي</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>{ar.projects.title}</span>
                <Link to="/add-project" className="btn btn-sm btn-gold">
                  {ar.projects.addNew}
                </Link>
              </div>
              <div className="card-body">
                {constructorsError && !error && (
                  <div className="alert alert-warning m-3">
                    {constructorsError} عرض المشاريع ممكن بدون أسماء المقاولين.
                  </div>
                )}
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
                          <td>
                            {project.funding_source === 'self_funded' && 'تمويل ذاتي'}
                            {project.funding_source === 'donor_funded' && 'تمويل مانح'}
                            {project.funding_source === 'government_funded' && 'تمويل حكومي'}
                            {!['self_funded', 'donor_funded', 'government_funded'].includes(project.funding_source) && project.funding_source}
                          </td>
                          <td>
                            <div className="btn-group">
                              <Link
                                to={`/edit-project/${project.project_id}`}
                                className="btn btn-sm btn-outline-primary me-1"
                                title="تعديل"
                              >
                                <FaEdit />
                              </Link>
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
      </div>
    </div>
  );
};

export default Projects;
