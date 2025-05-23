import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ar } from "../../translations/ar.ts";
import { blockedProjectsService } from "../../services/api";

export default function AddBlockedProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mosque_name_ar: '',
    directorate: '',
    mosque_address: '',
    contract_date: '',
    delay_reasons: '',
    contractor_name: '',
    actions_taken: '',
    latest_update: '',
    resolution_status: 'in_progress'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await blockedProjectsService.createBlockedProject(formData);
      navigate('/blocked-projects');
    } catch (err) {
      setError('حدث خطأ أثناء إضافة المشروع المتعثر. يرجى المحاولة مرة أخرى.');
      console.error('Error creating blocked project:', err);
      console.log(formData)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar">
      <div className="container">
        <div className="card">
          <div className="card-header">
            {ar.blockedProjects.addNew}
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">اسم المسجد</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mosque_name_ar"
                    value={formData.mosque_name_ar}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">المديرية</label>
                  <input
                    type="text"
                    className="form-control"
                    name="directorate"
                    value={formData.directorate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">عنوان المسجد</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mosque_address"
                    value={formData.mosque_address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">تاريخ العقد</label>
                  <input
                    type="date"
                    className="form-control"
                    name="contract_date"
                    value={formData.contract_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">اسم المقاول</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contractor_name"
                    value={formData.contractor_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">أسباب التأخير</label>
                  <textarea
                    className="form-control"
                    name="delay_reasons"
                    value={formData.delay_reasons}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">الإجراءات المتخذة</label>
                  <textarea
                    className="form-control"
                    name="actions_taken"
                    value={formData.actions_taken}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">آخر تحديث</label>
                  <textarea
                    className="form-control"
                    name="latest_update"
                    value={formData.latest_update}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">حالة الحل</label>
                  <select
                    className="form-select"
                    name="resolution_status"
                    value={formData.resolution_status}
                    onChange={handleChange}
                    required
                  >
                    <option value="in_progress">قيد التنفيذ</option>
                    <option value="resolved">تم الحل</option>
                    <option value="pending">قيد الانتظار</option>
                  </select>
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
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      جاري الحفظ...
                    </>
                  ) : (
                    ar.common.save
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => navigate('/blocked-projects')}
                >
                  {ar.common.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 