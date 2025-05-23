import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ar } from "../../translations/ar.ts";
import { projectsService } from "../../services/api";

export default function AddProjects() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    project_name_ar: '',
    project_name_en: '',
    project_value: '',
    expended: '',
    current_implementation_rate: '',
    remaining_contract_amount: '',
    execution_start_date: '',
    expected_completion_date: '',
    project_image_path: '',
    gps_coordinates: '',
    funding_source: 'self_funded'
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
      // Convert numeric strings to numbers
      const processedData = {
        ...formData,
        project_value: parseFloat(formData.project_value),
        expended: parseFloat(formData.expended),
        current_implementation_rate: parseFloat(formData.current_implementation_rate),
        remaining_contract_amount: parseFloat(formData.remaining_contract_amount)
      };

      await projectsService.createProject(processedData);
      navigate('/projects');
    } catch (err) {
      setError('حدث خطأ أثناء إضافة المشروع. يرجى المحاولة مرة أخرى.');
      console.error('Error creating project:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar">
      {/* Project Form */}
      <div className="container">
        <div className="card">
          <div className="card-header">
            {ar.projects.addNew}
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
                  <label className="form-label">اسم المشروع (عربي)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="project_name_ar"
                    value={formData.project_name_ar}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Project Name (English)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="project_name_en"
                    value={formData.project_name_en}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">قيمة المشروع</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="project_value"
                    value={formData.project_value}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">المبلغ المصروف</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="expended"
                    value={formData.expended}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">نسبة التنفيذ الحالية (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="current_implementation_rate"
                    value={formData.current_implementation_rate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">المبلغ المتبقي</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="remaining_contract_amount"
                    value={formData.remaining_contract_amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">تاريخ بدء التنفيذ</label>
                  <input
                    type="date"
                    className="form-control"
                    name="execution_start_date"
                    value={formData.execution_start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">تاريخ الانتهاء المتوقع</label>
                  <input
                    type="date"
                    className="form-control"
                    name="expected_completion_date"
                    value={formData.expected_completion_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">رابط صورة المشروع</label>
                  <input
                    type="url"
                    className="form-control"
                    name="project_image_path"
                    value={formData.project_image_path}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">إحداثيات الموقع</label>
                  <input
                    type="text"
                    className="form-control"
                    name="gps_coordinates"
                    value={formData.gps_coordinates}
                    onChange={handleChange}
                    placeholder="مثال: 30.0444,31.2357"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">مصدر التمويل</label>
                  <select
                    className="form-select"
                    name="funding_source"
                    value={formData.funding_source}
                    onChange={handleChange}
                    required
                  >
                    <option value="self_funded">تمويل ذاتي</option>
                    <option value="self_funded">تبرعات</option>
                    <option value="self_funded">حكومي</option>
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
                  onClick={() => navigate('/projects')}
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