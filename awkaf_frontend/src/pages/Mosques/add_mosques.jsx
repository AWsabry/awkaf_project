import React from 'react';

export default function AddMosque() {
  return (
     <div dir="rtl" lang="ar">
      {/* Project Form */}
      <div className="container">
        <div className="card">
          <div className="card-header" >
            إضافة مشروع جديد
          </div>
          <div className="card-body">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                <label class="form-label">اسم المسجد</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                <label class="form-label">المنطقة</label>

                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                <label class="form-label">تاريخ الغلق</label>

                  <input type="date" className="form-control" required />
                </div>
                <div className="col-md-6">
                <label class="form-label">سبب الغلق</label>
                  <input type="text" className="form-control" required />
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
                >
                  حفظ
                </button>
                <a href="mosques" className="btn btn-secondary ms-2">
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
