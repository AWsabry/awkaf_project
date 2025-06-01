import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ar } from "../../translations/ar.ts";
import { constructorsService } from "../../services/api"; // Corrected service import

export default function AddConstructor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    constructor_name: '',
    national_id: '',
    contact_info: '',
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
      // Using the corrected service name
      const response = await constructorsService.createConstructor(formData); // Corrected service name
      if (response.success) {
        navigate('/constructors');
      } else {
        setError(response.message || 'فشل في إضافة المقاول');
      }
    } catch (err) {
      setError('حدث خطأ أثناء إضافة المقاول. يرجى المحاولة مرة أخرى.');
      console.error('Error creating constructor:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" lang="ar">
      <div className="container">
        <div className="card">
          <div className="card-header">
            إضافة مقاول جديد
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label">اسم المقاول</label>
                  <input
                    type="text"
                    className="form-control"
                    name="constructor_name"
                    value={formData.constructor_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">الرقم القومي</label>
                  <input
                    type="text"
                    className="form-control"
                    name="national_id"
                    value={formData.national_id}
                    onChange={handleChange}
                    required
                  />
                </div>
                 <div className="col-md-12">
                  <label className="form-label">معلومات التواصل</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact_info"
                    value={formData.contact_info}
                    onChange={handleChange}
                    required
                  />
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
                  onClick={() => navigate('/constructors')}
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