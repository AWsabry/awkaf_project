import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/App.css";
import { ar } from "../../translations/ar.ts";
import { mosquesService } from "../../services/api";
import { FaTrash } from 'react-icons/fa';

export default function Mosques() {
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchMosques();
  }, []);

  const fetchMosques = async () => {
    try {
      setLoading(true);
      const response = await mosquesService.getMosques();
      console.log('API Response:', response);
      
      if (Array.isArray(response)) {
        setMosques(response);
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
      return new Date(dateString).toLocaleDateString('ar-SA');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatArea = (area) => {
    try {
      if (!area) return '0.00';
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
  const currentItems = mosques.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mosques.length / itemsPerPage);

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
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((mosque) => (
                    <tr key={mosque.mosque_id}>
                      <td>{mosque.mosque_name_ar}</td>
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
                      <td>
                        <div className="btn-group">
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
  );
}
