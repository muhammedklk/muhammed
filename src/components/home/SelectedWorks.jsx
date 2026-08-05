import React from 'react';
import { Link } from 'react-router-dom';

const selectedWorksList = [
  {
    id: 'styleora-fashion-e-commerce',
    title: 'Styleora',
    subtitle: 'E-Commerce, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/1-styleora.jpg',
    liveUrl: 'https://styleora.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'elve-creative-agency-portfolio',
    title: 'Elve',
    subtitle: 'Rental, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/2-elve.jpg',
    liveUrl: 'https://elve-studio.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'greentrack-sustainability-dashboard',
    title: 'Green Track',
    subtitle: 'UI/UX Design & Development',
    imgSrc: '/assets/portfolio/3-greentrack.jpg',
    liveUrl: 'https://greentrack.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'voyagera',
    title: 'Voyagera',
    subtitle: 'World Expeditions, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/gyogrea.png',
    liveUrl: 'https://voyageratravel.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  }
];

const SelectedWorks = () => {
  return (
    <section className="demos-section grid-lines-bg" id="selected-work">
      <div className="container">
        {/* Section Header */}
        <div className="demos-header text-center">
          <div className="outlined-stat-num">14+</div>
          <h2 className="demos-main-title">Selected Works</h2>
          <div className="demos-badges-group">
            <span className="demo-badge">
              <span className="badge-dot dot-blue"></span>
              UI/UX &amp; Web Dev
            </span>
            <span className="demo-badge">
              <span className="badge-dot dot-yellow"></span>
              Sub-second Speed
            </span>
            <span className="demo-badge">
              <span className="badge-dot dot-green"></span>
              High Conversion
            </span>
          </div>
        </div>

        {/* Works Grid */}
        <div className="row g-4 justify-content-center">
          {selectedWorksList.map((item) => (
            <div className="col-md-6 col-lg-6" key={item.id}>
              <div className="demo-card-item">
                <div className="demo-mockup-frame">
                  <div className="demo-img-wrapper">
                    <img src={item.imgSrc} alt={item.title} className="demo-mockup-img" />
                    <div className="minimal-hover-overlay">
                      {!item.hideCaseStudy && (
                        <Link to={`/case-study/${item.id}`} className="minimal-btn-hover btn-hover-case">
                          Case Study
                        </Link>
                      )}
                      {!item.hideLiveLink && item.liveUrl && item.liveUrl !== '#' && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="minimal-btn-hover btn-hover-live"
                        >
                          Live Site
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="demo-card-caption">
                  <Link to={`/case-study/${item.id}`}>{item.title}</Link>
                </h3>
                <span className="demo-card-subtext">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works CTA */}
        <div className="d-flex justify-content-center text-center w-100 mt-5">
          <Link to="/works" className="btn-discover-outline" style={{ margin: '0 auto' }}>
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
