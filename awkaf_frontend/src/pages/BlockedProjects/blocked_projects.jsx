import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/custom.css";
import { ar } from "../../translations/ar.ts";
import { blockedProjectsService, constructorsService } from "../../services/api";
import { FaTrash, FaEdit, FaFilter } from 'react-icons/fa';

export default function BlockedProjects() {
  const [blockedProjects, setBlockedProjects] = useState([]);
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
    searchTerm: ''
  });

  useEffect(() => {
    fetchBlockedProjects();
    fetchConstructors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [blockedProjects, filters]);

  const applyFilters = () => {
    let filtered = [...blockedProjects];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(project =>
        project.mosque_name_ar.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        project.directorate.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply constructor filter
    if (filters.constructorId) {
      filtered = filtered.filter(project =>
        project.constructor_id === Number(filters.constructorId)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'desc'
          ? new Date(b.created_at) - new Date(a.created_at)
          : new Date(a.created_at) - new Date(b.created_at);
      } else {
        return filters.sortOrder === 'desc'
          ? b.mosque_name_ar.localeCompare(a.mosque_name_ar)
          : a.mosque_name_ar.localeCompare(b.mosque_name_ar);
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

  const fetchBlockedProjects = async () => {
    try {
      setLoading(true);
      const response = await blockedProjectsService.getBlockedProjects();
      if (response.success) {
        // Sort projects by created_at in descending order (newest first)
        const sortedProjects = response.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setBlockedProjects(sortedProjects);
        setError(null);
      } else {
        setError('فشل في جلب بيانات المشاريع المتعثرة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء جلب بيانات المشاريع المتعثرة');
      console.error('Error fetching blocked projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString('ar-EG', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
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
    if (!projectId) {
      alert('خطأ: معرف المشروع غير صالح');
      return;
    }

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading || constructorsLoading) {
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
                    placeholder="ابحث عن اسم المسجد أو المديرية..."
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
                    <option value="name">اسم المسجد</option>
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
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>{ar.blockedProjects.title}</span>
                <Link to="/add-blocked-project" className="btn btn-sm btn-gold">
                  {ar.blockedProjects.addNew}
                </Link>
              </div>
              <div className="card-body">
                {constructorsError && !error && (
                  <div className="alert alert-warning m-3">
                    {constructorsError} عرض المشاريع المتعثرة ممكن بدون أسماء المقاولين.
                  </div>
                )}
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
                        <th>تاريخ الإنشاء</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((project) => {
                        const contractor = constructors.find(con => con.id === project.constructor_id);
                        return (
                          <tr key={`project-${project.delayed_project_id}`}>
                            <td>
                              <div className="font-medium">{project.mosque_name_ar}</div>
                            </td>
                            <td>{project.directorate}</td>
                            <td>{project.mosque_address}</td>
                            <td>{formatDate(project.contract_date)}</td>
                            <td>{project.delay_reasons}</td>
                            <td>{contractor ? contractor.contractor_name : 'غير محدد'}</td>
                            <td>{project.actions_taken}</td>
                            <td>{project.latest_update || 'لا يوجد'}</td>
                            <td>{getStatusBadge(project.resolution_status)}</td>
                            <td>{formatDate(project.created_at)}</td>
                            <td>
                              <div className="btn-group">
                                <Link
                                  to={`/edit-blocked-project/${project.delayed_project_id}`}
                                  className="btn btn-sm btn-outline-primary me-1"
                                  title="تعديل"
                                >
                                  <FaEdit />
                                </Link>
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>

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
}
