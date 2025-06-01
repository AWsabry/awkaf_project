import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersService } from "../../services/api";
import { FaTrash, FaEdit, FaFilter } from 'react-icons/fa';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'date', // 'date' or 'name'
    sortOrder: 'desc', // 'asc' or 'desc'
    searchTerm: '',
    role: '' // 'admin' or 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, filters]);

  const applyFilters = () => {
    let filtered = [...users];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'desc'
          ? new Date(b.created_at) - new Date(a.created_at)
          : new Date(a.created_at) - new Date(b.created_at);
      } else {
        return filters.sortOrder === 'desc'
          ? b.username.localeCompare(a.username)
          : a.username.localeCompare(b.username);
      }
    });

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersService.getUsers();
      if (response.success) {
        setUsers(response.data);
        setError(null);
      } else {
        setError('فشل في جلب بيانات المستخدمين');
      }
    } catch (err) {
      setError('حدث خطأ أثناء جلب بيانات المستخدمين');
      console.error('Error fetching users:', err);
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

  const handleDelete = async (userId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        setDeleteLoading(true);
        await usersService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        alert('تم حذف المستخدم بنجاح');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('حدث خطأ أثناء حذف المستخدم');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
                    placeholder="ابحث عن اسم المستخدم أو البريد الإلكتروني..."
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
                    <option value="name">الاسم</option>
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
                  <label className="form-label">الدور</label>
                  <select
                    className="form-select"
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                  >
                    <option value="">الكل</option>
                    <option value="admin">مدير</option>
                    <option value="user">مستخدم</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>المستخدمون</span>
                <Link to="/add-user" className="btn btn-sm btn-gold">
                  إضافة مستخدم جديد
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
                        <th>اسم المستخدم</th>
                        <th>البريد الإلكتروني</th>
                        <th>الدور</th>
                        <th>تاريخ الإنشاء</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((user) => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.role === 'admin' ? 'مدير' : 'مستخدم'}</td>
                          <td>{formatDate(user.createdAt)}</td>
                          <td>
                            <div className="btn-group">
                              <Link
                                to={`/edit-user/${user.id}`}
                                className="btn btn-sm btn-outline-primary me-1"
                                title="تعديل"
                              >
                                <FaEdit />
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(user.id)}
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