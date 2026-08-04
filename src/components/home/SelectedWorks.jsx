import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const defaultProjects = [
  {
    id: 'styleora',
    title: 'Styleora',
    subtitle: 'E-Commerce, UI/UX Design & Development',
    imgSrc: 'assets/workimg-1.jpg',
    liveUrl: 'https://styleorashop.vercel.app/'
  },
  {
    id: 'elve',
    title: 'Elve',
    subtitle: 'Rental, UI/UX Design & Development',
    imgSrc: 'assets/workimg-2.jpg',
    liveUrl: 'https://elve.vercel.app/'
  },
  {
    id: 'greentrack',
    title: 'Green Track',
    subtitle: 'UI/UX Design & Development',
    imgSrc: 'assets/workimg-3.jpg',
    liveUrl: 'https://greentrack-ten.vercel.app/'
  },
  {
    id: 'voyagera',
    title: 'Voyagera',
    subtitle: 'World Expeditions, UI/UX Design & Development',
    imgSrc: 'assets/workimg-4.jpg',
    liveUrl: 'https://voyageratravel.vercel.app/'
  }
];

const SelectedWorks = () => {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        if (res.data && res.data.length > 0) {
          const mapped = res.data.slice(0, 4).map((p) => ({
            id: p.slug || p._id,
            title: p.title,
            subtitle: p.tagline || p.category,
            imgSrc: p.heroImg || 'assets/workimg-1.jpg',
            liveUrl: p.liveUrl || '#'
          }));
          setProjects(mapped);
        }
      } catch (err) {
        console.error('Error fetching selected works:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="demos-section grid-lines-bg" id="selected-work">
      <div className="container">
        {/* Section Header */}
        <div className="demos-header text-center">
          <div className="outlined-stat-num">14+</div>
          <h2 className="demos-main-title">Selected Works</h2>
          <div className="demos-badges-group">
            <span className="demo-badge badge-blue">
              <span className="badge-dot dot-blue"></span>
              UI/UX & Web Dev
            </span>
            <span className="demo-badge badge-yellow">
              <span className="badge-dot dot-yellow"></span>
              Sub-second Speed
            </span>
            <span className="demo-badge badge-green">
              <span className="badge-dot dot-green"></span>
              High Conversion
            </span>
          </div>
        </div>

        {/* Selected Works Dynamic Grid (2x2 Grid) */}
        <div className="row g-4 demos-grid-row">
          {projects.map((work) => (
            <div key={work.id} className="col-md-6 col-sm-12">
              <div className="demo-card-item style-link-card">
                <div className="demo-mockup-frame">
                  <div className="demo-img-wrapper">
                    <img src={work.imgSrc} alt={work.title} className="demo-mockup-img" />
                    <div className="minimal-hover-overlay">
                      <a href={work.liveUrl} target="_blank" rel="noopener noreferrer" className="minimal-btn-hover btn-hover-live">
                        Live Website
                      </a>
                      <Link to={`/case-study?id=${work.id}`} className="minimal-btn-hover btn-hover-case">
                        Case Study
                      </Link>
                    </div>
                  </div>
                </div>
                <Link to={`/case-study?id=${work.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 className="demo-card-caption">{work.title}</h3>
                  <span className="demo-card-subtext">{work.subtitle}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works CTA Button */}
        <div className="d-flex justify-content-center align-items-center text-center mt-5 w-100">
          <Link to="/works" className="btn-discover-outline" style={{ padding: '14px 36px', fontWeight: 700 }}>
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
