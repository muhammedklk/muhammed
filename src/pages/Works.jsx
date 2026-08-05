import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const worksData = [
  {
    id: 'voyagera',
    title: 'Voyagera',
    subtitle: 'World Expeditions & Havens, UI/UX Design & Development',
    category: 'uiux frontend',
    imgSrc: 'assets/portfolio/gyogrea.png',
    liveUrl: 'https://voyageratravel.vercel.app/'
  },
  {
    id: 'styleora',
    title: 'Styleora',
    subtitle: 'E-Commerce, UI/UX Design & Development',
    category: 'uiux frontend',
    imgSrc: 'assets/portfolio/1-styleora.jpg',
    liveUrl: 'https://styleorashop.vercel.app'
  },
  {
    id: 'elve',
    title: 'Elve',
    subtitle: 'Rental Platform, UI/UX Design & Development',
    category: 'uiux mobile',
    imgSrc: 'assets/portfolio/2-elve.jpg',
    liveUrl: 'https://elve.vercel.app/'
  },
  {
    id: 'greentrack',
    title: 'Green Track',
    subtitle: 'Sustainability Tracker, UI/UX Design & Development',
    category: 'uiux frontend',
    imgSrc: 'assets/portfolio/3-greentrack.jpg',
    liveUrl: 'https://greentrack-ten.vercel.app/',
    hideLiveLink: true,
    hideCaseStudy: true
  },
  {
    id: 'travelgallery',
    title: 'Travell Gallery',
    subtitle: 'Travel Gallery, UI/UX Design & Development',
    category: 'uiux mobile',
    imgSrc: 'assets/portfolio/4-travellgallery.jpg',
    liveUrl: 'https://voyageratravel.vercel.app/',
    hideLiveLink: true,
    hideCaseStudy: true
  },
  {
    id: 'iconehotel',
    title: 'Icone Hotel Booking',
    subtitle: 'Boutique Hotel Booking, Mobile App UI/UX Design',
    category: 'frontend mobile',
    imgSrc: 'assets/portfolio/5-icone-hotel-booking.jpg',
    liveUrl: 'https://styleorashop.vercel.app/',
    hideLiveLink: true,
    hideCaseStudy: true
  },
  {
    id: 'modernbrand',
    title: 'Modern Brand',
    subtitle: 'Brand Identity & Digital UI Kit',
    category: 'uiux mobile',
    imgSrc: 'assets/portfolio/7-modernbrand.jpg',
    liveUrl: 'https://styleorashop.vercel.app/'
  },
  {
    id: 'chrona',
    title: 'Chrona',
    subtitle: 'Workflow & Time Optimization SaaS',
    category: 'uiux frontend',
    imgSrc: 'assets/portfolio/6-chrona.jpg',
    liveUrl: 'https://greentrack-ten.vercel.app/',
    hideLiveLink: true,
    hideCaseStudy: true
  }
];

const Works = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredWorks = worksData.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category.includes(selectedFilter);
  });

  return (
    <>
      {/* Hero Inner Header */}
      <section className="page-inner-hero minimal-works-hero text-center">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-md-10 col-sm-12 text-center d-flex flex-column align-items-center">
              <span className="page-badge">PORTFOLIO</span>
              <h1 className="page-title text-center">
                Selected <span className="text-highlight">Works</span>
              </h1>
              <p className="page-subtitle text-center mx-auto">
                A curated collection of digital products, web experiences, and UI systems designed and built with focus, clarity, and precision.
              </p>

              <div className="demos-badges-group my-4">
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
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="minimal-projects-section grid-lines-bg py-4">
        <div className="container">
          <div className="row g-4 works-showcase-grid" id="works-grid">
            {filteredWorks.map((work) => (
              <div key={work.id} className="col-md-6 col-sm-12 work-grid-item" data-category={work.category}>
                <div className="demo-card-item style-link-card">
                  <div className="demo-mockup-frame">
                    <div className="demo-img-wrapper">
                      <img src={work.imgSrc} alt={work.title} className="demo-mockup-img" />
                      {(!work.hideLiveLink || !work.hideCaseStudy) && (
                        <div className="minimal-hover-overlay">
                          {!work.hideLiveLink && (
                            <a href={work.liveUrl} target="_blank" rel="noopener noreferrer" className="minimal-btn-hover btn-hover-live">
                              Live Website
                            </a>
                          )}
                          {!work.hideCaseStudy && (
                            <Link to={`/case-study?id=${work.id}`} className="minimal-btn-hover btn-hover-case">
                              Case Study
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="demo-card-caption">{work.title}</h3>
                    <span className="demo-card-subtext">{work.subtitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Minimal Centered CTA Section */}
      <section className="minimal-cta-section">
        <div className="container">
          <div className="minimal-cta-card text-center d-flex flex-column align-items-center justify-content-center">
            <span className="minimal-badge mb-2 text-center">LET'S COLLABORATE</span>
            <h2 className="minimal-cta-title mb-3 text-center">Have a project in mind?</h2>
            <p className="minimal-cta-subtitle mb-4 text-center">
              Let's build something clean, functional, and visually memorable together.
            </p>
            <div className="d-flex justify-content-center align-items-center w-100">
              <Link to="/contact" className="btn-spotlight-primary" style={{ padding: '16px 40px', fontWeight: 700, fontSize: '15px' }}>
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Works;
