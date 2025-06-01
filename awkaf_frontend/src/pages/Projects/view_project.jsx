import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/custom.css";
import { projectsService } from "../../services/api";
import { FaUpload, FaTrash } from 'react-icons/fa';

const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

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

  const formatCurrency = (amount) => {
    try {
      if (!amount) return '0.00 جنيه';
      const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numericAmount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return '0.00 جنيه';
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('حجم الصورة يجب أن لا يتجاوز 5 ميجابايت');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('يرجى اختيار ملف صورة صالح');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('project_id', id);
      formData.append('project_name', project.project_name_en);

      console.log('Starting image upload...');
      const response = await projectsService.uploadImage(formData);
      console.log('Upload response:', response);

      if (response.success) {
        // Refresh project details to get updated images
        await fetchProjectDetails();
        setUploadError(null);
      } else {
        setUploadError(response.message || 'فشل في رفع الصورة');
      }
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'حدث خطأ أثناء رفع الصورة';
      setUploadError(errorMessage);
    } finally {
      setUploading(false);
      // Clear the file input
      e.target.value = '';
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      return;
    }

    try {
      const response = await projectsService.deleteProjectImage(imageId);
      if (response.success) {
        // Refresh project details to get updated images
        fetchProjectDetails();
      } else {
        setError('فشل في حذف الصورة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء حذف الصورة');
      console.error('Error deleting image:', err);
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
            <h4 className="mb-0">تفاصيل المشروع</h4>
            <Link to="/projects" className="btn btn-outline-secondary">
              العودة للقائمة
            </Link>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <h5 className="text-gold mb-3">المعلومات الأساسية</h5>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="bg-light">اسم المشروع (عربي)</th>
                        <td>{project.project_name_ar}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">اسم المشروع (إنجليزي)</th>
                        <td>{project.project_name_en}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">قيمة المشروع</th>
                        <td>{formatCurrency(project.project_value)}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">المبلغ المنفق</th>
                        <td>{formatCurrency(project.expended)}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">نسبة التنفيذ الحالية</th>
                        <td>{project.current_implementation_rate}%</td>
                      </tr>
                      <tr>
                        <th className="bg-light">المبلغ المتبقي</th>
                        <td>{formatCurrency(project.remaining_contract_amount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <h5 className="text-gold mb-3">معلومات إضافية</h5>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="bg-light">تاريخ بدء التنفيذ</th>
                        <td>{formatDate(project.execution_start_date)}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">تاريخ الانتهاء المتوقع</th>
                        <td>{formatDate(project.expected_completion_date)}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">مصدر التمويل</th>
                        <td>{project.funding_source === 'government_funded' ? 'تمويل حكومي' : 'تمويل خاص'}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">إحداثيات GPS</th>
                        <td>{project.gps_coordinates}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">تاريخ الإنشاء</th>
                        <td>{formatDate(project.created_at)}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">آخر تحديث</th>
                        <td>{formatDate(project.updated_at)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {project.project_image_path && (
              <div className="row mt-4">
                <div className="col-12">
                  <h5 className="text-gold mb-3">صور المشروع</h5>
                  <img 
                    src={project.project_image_path} 
                    alt={project.project_name_ar}
                    className="img-fluid rounded"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            )}

            {/* Image Upload Section */}
            <div className="row mt-4">
              <div className="col-12">
                <h5 className="text-gold mb-3">صور المشروع</h5>
                <div className="mb-3">
                  <label className="btn btn-outline-gold">
                    <FaUpload className="me-2" />
                    {uploading ? 'جاري الرفع...' : 'رفع صورة جديدة'}
                    <input
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                  {uploadError && (
                    <div className="text-danger mt-2">{uploadError}</div>
                  )}
                </div>

                {/* Display Images Grid */}
                {project.project_images && project.project_images.length > 0 ? (
                  <div className="row g-4">
                    {project.project_images.map((image) => (
                      <div key={image.id} className="col-md-4">
                        <div className="card h-100">
                          <img
                            src={image.image_path}
                            alt={image.image_caption || project.project_name_ar}
                            className="card-img-top"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <div className="card-body">
                            <p className="card-text">{image.image_caption || 'بدون وصف'}</p>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteImage(image.id)}
                            >
                              <FaTrash className="me-1" />
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-5">
                    <p className="text-muted">لا توجد صور للمشروع</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject; 