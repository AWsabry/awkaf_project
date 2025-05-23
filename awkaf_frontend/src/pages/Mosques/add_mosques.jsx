import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ar } from "../../translations/ar.ts";
import { mosquesService } from "../../services/api";

export default function AddMosque() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mosque_name_ar: '',
    directorate: '',
    mosque_address: '',
    closure_date: '',
    closure_reason: '',
    mosque_area: '',
    nearest_mosque: '',
    population_density: '',
    within_urban_boundary: true,
    needs_maintenance: false,
    needs_renovation: false,
    technical_committee_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
        mosque_area: parseFloat(formData.mosque_area)
      };

      await mosquesService.createMosque(processedData);
      navigate('/mosques');
    } catch (err) {
      setError('حدث خطأ أثناء إضافة المسجد. يرجى المحاولة مرة أخرى.');
      console.error('Error creating mosque:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar">
      <div className="container">
        <div className="card">
          <div className="card-header">
            {ar.mosques.addNew}
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
                  <label className="form-label">تاريخ الإغلاق</label>
                  <input
                    type="date"
                    className="form-control"
                    name="closure_date"
                    value={formData.closure_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">سبب الإغلاق</label>
                  <input
                    type="text"
                    className="form-control"
                    name="closure_reason"
                    value={formData.closure_reason}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">مساحة المسجد (متر مربع)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="mosque_area"
                    value={formData.mosque_area}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">أقرب مسجد</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nearest_mosque"
                    value={formData.nearest_mosque}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">كثافة السكان</label>
                  <select
                    className="form-select"
                    name="population_density"
                    value={formData.population_density}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر الكثافة</option>
                    <option value="مرتفعة">مرتفعة</option>
                    <option value="متوسطة">متوسطة</option>
                    <option value="منخفضة">منخفضة</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">ملاحظات اللجنة الفنية</label>
                  <textarea
                    className="form-control"
                    name="technical_committee_notes"
                    value={formData.technical_committee_notes}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <div className="col-md-12">
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="within_urban_boundary"
                      checked={formData.within_urban_boundary}
                      onChange={handleChange}
                      id="within_urban_boundary"
                    />
                    <label className="form-check-label" htmlFor="within_urban_boundary">
                      داخل الحدود الحضرية
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="needs_maintenance"
                      checked={formData.needs_maintenance}
                      onChange={handleChange}
                      id="needs_maintenance"
                    />
                    <label className="form-check-label" htmlFor="needs_maintenance">
                      يحتاج إلى صيانة
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="needs_renovation"
                      checked={formData.needs_renovation}
                      onChange={handleChange}
                      id="needs_renovation"
                    />
                    <label className="form-check-label" htmlFor="needs_renovation">
                      يحتاج إلى تجديد
                    </label>
                  </div>
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
                  onClick={() => navigate('/mosques')}
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
