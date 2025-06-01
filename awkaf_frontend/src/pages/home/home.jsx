import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import '../../styles/custom.css'; // Assuming custom styles are here
import { FaFolderOpen, FaUser, FaBuilding, FaBan, FaHardHat } from 'react-icons/fa'; // Import icons

export default function Home() {
  const blocks = [
    {
      title: 'المشاريع',
      icon: <FaFolderOpen size={50} />,
      link: '/projects',
    },
    {
      title: 'المساجد',
      icon: <FaBuilding size={50} />,
      link: '/mosques',
    },
    {
      title: 'المشاريع المتعثرة',
      icon: <FaBan size={50} />,
      link: '/blocked-projects',
    },
    {
      title: 'المستخدمين',
      icon: <FaUser size={50} />,
      link: '/users',
    },
    {
      title: 'المقاولون',
      icon: <FaHardHat size={50} />,
      link: '/constructors',
    },
  ];

  return (
    <div dir="rtl" lang="ar" className="container mt-5">
      <h2 className="text-center mb-4">الصفحة الرئيسية</h2>
      <div className="row justify-content-center">
        {blocks.map((block, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <Link to={block.link} className="text-decoration-none">
              <div className="card text-center h-100 home-block">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <div className="mb-3 text-gold">
                    {block.icon}
                  </div>
                  <h5 className="card-title">{block.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 