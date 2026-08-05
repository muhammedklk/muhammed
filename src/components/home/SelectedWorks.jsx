import React from 'react';
import { Link } from 'react-router-dom';

const selectedWorksList = [
  {
    id: 'styleora-fashion-e-commerce',
    title: 'StyleOra — Fashion E-Commerce',
    subtitle: 'UI/UX Design & Development',
    imgSrc: '/assets/portfolio/1-styleora.jpg',
    liveUrl: 'https://styleora.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'elve-creative-agency-portfolio',
    title: 'Elve — Creative Agency Portfolio',
    subtitle: 'Web Design & Brand Systems',
    imgSrc: '/assets/portfolio/2-elve.jpg',
    liveUrl: 'https://elve-studio.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'greentrack-sustainability-dashboard',
    title: 'GreenTrack — Sustainability Dashboard',
    subtitle: 'Product Design & UI/UX',
    imgSrc: '/assets/portfolio/3-greentrack.jpg',
    liveUrl: 'https://greentrack.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'travelgallery-curated-destinations',
    title: 'TravelGallery — Curated Destinations',
    subtitle: 'UI/UX & Mobile Design',
    imgSrc: '/assets/portfolio/4-travellgallery.jpg',
    liveUrl: 'https://travelgallery.vercel.app',
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
            <span className="demo-badge badge-blue">
              <span className="badge-dot dot-blue"></span>
              UI/UX &amp; Web Dev
            </span>
            <span className="demo-badge badge-lime">
              <span className="badge-dot dot-lime"></span>
              Interactive Prototypes
            </span>
          </div>
        </div>

        {/* Works Grid */}
        <div className="row g-4 justify-content-center">
          {selectedWorksList.map((item) => (
            <div className="col-md-6 col-lg-6" key={item.id}>
              <div className="work-card-minimal">
                <div className="work-img-box">
                  <img src={item.imgSrc} alt={item.title} className="img-fluid work-thumbnail" />
                  <div className="work-overlay-actions">
                    {!item.hideCaseStudy && (
                      <Link to={`/case-study/${item.id}`} className="btn-action btn-case-study">
                        View Case Study
                      </Link>
                    )}
                    {!item.hideLiveLink && item.liveUrl && item.liveUrl !== '#' && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-live-demo"
                      >
                        Live Site ↗
                      </a>
                    )}
                  </div>
                </div>
                <div className="work-card-info mt-3">
                  <span className="work-cat-tag">{item.subtitle}</span>
                  <h3 className="work-item-title">
                    <Link to={`/case-study/${item.id}`}>{item.title}</Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works CTA */}
        <div className="text-center mt-5">
          <Link to="/works" className="btn btn-outline-lime btn-lg rounded-pill px-4">
            View All Projects ({selectedWorksList.length}+) →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
