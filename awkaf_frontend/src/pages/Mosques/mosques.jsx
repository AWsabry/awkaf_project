import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/custom.css";
import { ar } from "../../translations/ar.ts";
import { mosquesService } from "../../services/api";
import { FaTrash, FaEdit, FaFilter } from 'react-icons/fa';

export default function Mosques() {
  const [mosques, setMosques] = useState([]);
  const [filteredMosques, setFilteredMosques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'date', // 'date' or 'name'
    sortOrder: 'desc', // 'asc' or 'desc'
    searchTerm: '',
    status: '', // 'needs_maintenance', 'needs_renovation', 'good'
    populationDensity: '' // 'مرتفعة', 'متوسطة', 'منخفضة'
  });

  useEffect(() => {
    fetchMosques();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [mosques, filters]);

  const applyFilters = () => {
    let filtered = [...mosques];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(mosque =>
        mosque.mosque_name_ar.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        mosque.directorate.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        mosque.mosque_address.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(mosque => {
        switch (filters.status) {
          case 'needs_maintenance':
            return mosque.needs_maintenance;
          case 'needs_renovation':
            return mosque.needs_renovation;
          case 'good':
            return !mosque.needs_maintenance && !mosque.needs_renovation;
          default:
            return true;
        }
      });
    }

    // Apply population density filter
    if (filters.populationDensity) {
      filtered = filtered.filter(mosque => 
        mosque.population_density === filters.populationDensity
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

    setFilteredMosques(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchMosques = async () => {
    try {
      setLoading(true);
      const response = await mosquesService.getMosques();
      
      if (Array.isArray(response.data)) {
        setMosques(response.data);
        setError(null);
      } else {
        console.error('Invalid response format:', response);
        setMosques([]);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      setMosques([]);
      setError('Failed to fetch mosques. Please try again later.');
      console.error('Error fetching mosques:', err);
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
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatArea = (area) => {
    try {
      if (!area) return '0.00 م²';
      return `${parseFloat(area).toFixed(2)} م²`;
    } catch (error) {
      return '0.00 م²';
    }
  };

  const handleDelete = async (mosqueId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المسجد؟')) {
      try {
        setDeleteLoading(true);
        await mosquesService.deleteMosque(mosqueId);
        setMosques(mosques.filter(mosque => mosque.mosque_id !== mosqueId));
        alert('تم حذف المسجد بنجاح');
      } catch (err) {
        console.error('Error deleting mosque:', err);
        alert('حدث خطأ أثناء حذف المسجد');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMosques.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMosques.length / itemsPerPage);

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
                  <label className="form-label">الحالة</label>
                  <select
                    className="form-select"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">الكل</option>
                    <option value="needs_maintenance">يحتاج صيانة</option>
                    <option value="needs_renovation">يحتاج تجديد</option>
                    <option value="good">جيد</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">كثافة السكان</label>
                  <select
                    className="form-select"
                    name="populationDensity"
                    value={filters.populationDensity}
                    onChange={handleFilterChange}
                  >
                    <option value="">الكل</option>
                    <option value="مرتفعة">مرتفعة</option>
                    <option value="متوسطة">متوسطة</option>
                    <option value="منخفضة">منخفضة</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>{ar.mosques.title}</span>
                <Link to="/add-mosque" className="btn btn-sm btn-gold">
                  {ar.mosques.addNew}
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
                        <th>تاريخ الإغلاق</th>
                        <th>سبب الإغلاق</th>
                        <th>المساحة</th>
                        <th>أقرب مسجد</th>
                        <th>كثافة السكان</th>
                        <th>الحالة</th>
                        <th>تاريخ الإنشاء</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((mosque) => (
                        <tr key={mosque.mosque_id}>
                          <td>
                            <div className="font-medium">{mosque.mosque_name_ar}</div>
                          </td>
                          <td>{mosque.directorate}</td>
                          <td>{mosque.mosque_address}</td>
                          <td>{formatDate(mosque.closure_date)}</td>
                          <td>{mosque.closure_reason}</td>
                          <td>{formatArea(mosque.mosque_area)}</td>
                          <td>{mosque.nearest_mosque}</td>
                          <td>{mosque.population_density}</td>
                          <td>
                            <div className="d-flex flex-column">
                              {mosque.needs_maintenance && (
                                <span className="badge bg-warning mb-1">يحتاج صيانة</span>
                              )}
                              {mosque.needs_renovation && (
                                <span className="badge bg-danger mb-1">يحتاج تجديد</span>
                              )}
                              {!mosque.needs_maintenance && !mosque.needs_renovation && (
                                <span className="badge bg-success">جيد</span>
                              )}
                            </div>
                          </td>
                          <td>{formatDate(mosque.created_at)}</td>
                          <td>
                            <div className="btn-group">
                              <Link
                                to={`/edit-mosque/${mosque.mosque_id}`}
                                className="btn btn-sm btn-outline-primary me-1"
                                title="تعديل"
                              >
                                <FaEdit />
                              </Link>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(mosque.mosque_id)}
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
}
