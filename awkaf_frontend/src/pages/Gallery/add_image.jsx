import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/custom.css";
import { projectsService } from "../../services/api";

const AddImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    image_path: '',
    image_caption: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await projectsService.getProjectDetails(id);
      if (response.success) {
        setProject(response.data);
      } else {
        setError('فشل في جلب بيانات المشروع');
      }
    } catch (err) {
      setError('حدث خطأ أثناء جلب بيانات المشروع');
      console.error('Error fetching project details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('project_id', id);
      formData.append('project_name', project.project_name_en);

      const response = await projectsService.uploadImage(formData);
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          image_path: response.data.image_path
        }));
      } else {
        setError('فشل في رفع الصورة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء رفع الصورة');
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_path) {
      setError('يرجى اختيار صورة أولاً');
      return;
    }

    try {
      setUploading(true);
      const response = await projectsService.addProjectImage({
        project_id: id,
        image_path: formData.image_path,
        image_caption: formData.image_caption
      });

      if (response.success) {
        navigate(`/gallery/${id}`);
      } else {
        setError('فشل في إضافة الصورة للمعرض');
      }
    } catch (err) {
      setError('حدث خطأ أثناء إضافة الصورة');
      console.error('Error adding image:', err);
    } finally {
      setUploading(false);
    }
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
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="alert alert-warning m-3" role="alert">
        لم يتم العثور على بيانات المشروع
      </div>
    );
  }

  return (
    <div dir="rtl" lang="ar">
      <div className="container mt-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="mb-0">إضافة صورة جديدة للمشروع: {project.project_name_ar}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">اختر الصورة</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                {formData.image_path && (
                  <div className="mt-2">
                    <img
                      src={formData.image_path}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">وصف الصورة</label>
                <textarea
                  className="form-control"
                  name="image_caption"
                  value={formData.image_caption}
                  onChange={handleChange}
                  rows="3"
                  placeholder="أدخل وصفاً للصورة (اختياري)"
                />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(`/gallery/${id}`)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  disabled={uploading || !formData.image_path}
                >
                  {uploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      جاري الحفظ...
                    </>
                  ) : (
                    'حفظ الصورة'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImage; 