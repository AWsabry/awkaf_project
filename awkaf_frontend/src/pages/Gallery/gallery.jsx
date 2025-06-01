import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../../styles/custom.css";
import { projectsService } from "../../services/api";
import { FaPlus } from 'react-icons/fa';

const Gallery = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectAndImages();
  }, [id]);

  const fetchProjectAndImages = async () => {
    try {
      setLoading(true);
      const [projectResponse, imagesResponse] = await Promise.all([
        projectsService.getProjectDetails(id),
        projectsService.getProjectImages(id)
      ]);

      if (projectResponse.success) {
        setProject(projectResponse.data);
      } else {
        setError('فشل في جلب بيانات المشروع');
      }

      if (imagesResponse.success) {
        setImages(imagesResponse.data);
      }
    } catch (err) {
      setError('حدث خطأ أثناء جلب البيانات');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
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
            <h4 className="mb-0">معرض صور المشروع: {project.project_name_ar}</h4>
            <div>
              <Link to={`/add-image/${id}`} className="btn btn-gold me-2">
                <FaPlus className="me-1" />
                إضافة صورة جديدة
              </Link>
              <Link to={`/view-project/${id}`} className="btn btn-outline-secondary">
                العودة لتفاصيل المشروع
              </Link>
            </div>
          </div>
          <div className="card-body">
            {images.length === 0 ? (
              <div className="text-center p-5">
                <p className="text-muted">لا توجد صور في المعرض</p>
              </div>
            ) : (
              <div className="row g-4">
                {images.map((image) => (
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 