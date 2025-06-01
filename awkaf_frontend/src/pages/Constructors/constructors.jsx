import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/custom.css";
import { constructorsService } from "../../services/api"; // Corrected service import
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons

export default function Constructors() {
  const [contractors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Added pagination state
  const [itemsPerPage] = useState(3); // Set items per page to 3
  const [deleteLoading, setDeleteLoading] = useState(false); // Added delete loading state

  useEffect(() => {
    fetchConstructors();
  }, []);

  const fetchConstructors = async () => {
    try {
      setLoading(true);
      // Using the corrected service name
      const response = await constructorsService.getConstructors();

      if (response.success && Array.isArray(response.data)) {
        setConstructors(response.data);
        setError(null);
      } else {
        console.error('Invalid response format or success false:', response);
        setConstructors([]);
        setError('Invalid data format or failed to fetch constructors.');
      }
    } catch (err) {
      setConstructors([]);
      setError('حدث خطأ أثناء جلب بيانات المقاولين.');
      console.error('Error fetching constructors:', err);
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

  // Handle contractor deletion
  const handleDelete = async (contractorId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقاول؟')) {
      try {
        setDeleteLoading(true); // Start loading
        const response = await constructorsService.deleteConstructor(contractorId); // Corrected service name
        if(response.success) {
           // Filter out the deleted contractor from the state
          setConstructors(contractors.filter(contractor => contractor.id !== contractorId));
          alert('تم حذف المقاول بنجاح'); // Show success message
        } else {
          alert('فشل في حذف المقاول'); // Show failure message
        }
      } catch (err) {
        console.error('Error deleting contractor:', err);
        alert('حدث خطأ أثناء حذف المقاول'); // Show error message
      } finally {
        setDeleteLoading(false); // Stop loading
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contractors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contractors.length / itemsPerPage);

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

  return (
    <div dir="rtl" lang="ar">
      <div className="container">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>المقاولون</span>
            <Link to="/add-constructor" className="btn btn-sm btn-gold">
              إضافة مقاول جديد
            </Link>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="table-responsive">
              <table className="table table-bordered table-gold">
                <thead>
                  <tr>
                    <th>اسم المقاول</th>
                    <th>الرقم القومي</th>
                    <th>معلومات التواصل</th>
                    <th>تاريخ الإنشاء</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((constructor) => (
                    <tr key={constructor.id}>
                      <td>{constructor.contractor_name}</td>
                      <td>{constructor.national_id}</td>
                      <td>{constructor.contact_info}</td>
                      <td>{formatDate(constructor.created_at)}</td>
                      <td>
                        <div className="btn-group">
                          {/* Placeholder for Edit Button */}
                           <Link
                            to={`/edit-constructor/${constructor.id}`}
                            className="btn btn-sm btn-outline-primary me-1"
                            title="تعديل"
                          >
                             <FaEdit />
                          </Link>
                          {/* Delete Button */}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(constructor.id)}
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
            {totalPages > 1 && ( // Conditionally render pagination
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