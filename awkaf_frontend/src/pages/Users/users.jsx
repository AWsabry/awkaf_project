import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersService } from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usersService.getUsers();
      if (response.success) {
        setUsers(response.data);
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
    return new Date(dateString).toLocaleDateString('ar-SA');
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
            <span>المستخدمين</span>
            <Link to="/add-user" className="btn btn-sm btn-gold">
              إضافة مستخدم
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
                    <th>الصلاحية</th>
                    <th>تاريخ الإنشاء</th>
                    <th>تاريخ التحديث</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role === 'admin' ? 'مشرف' : 'مستخدم'}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>{formatDate(user.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 