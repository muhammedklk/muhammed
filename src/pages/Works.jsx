import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const defaultWorks = [
  {
    id: 'styleora-fashion-e-commerce',
    title: 'StyleOra — Fashion E-Commerce',
    subtitle: 'UI/UX Design & Development',
    category: 'ui-ux-design',
    imgSrc: '/assets/portfolio/1-styleora.jpg',
    liveUrl: 'https://styleora.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'elve-creative-agency-portfolio',
    title: 'Elve — Creative Agency Portfolio',
    subtitle: 'Web Design & Brand Systems',
    category: 'web-design',
    imgSrc: '/assets/portfolio/2-elve.jpg',
    liveUrl: 'https://elve-studio.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'greentrack-sustainability-dashboard',
    title: 'GreenTrack — Sustainability Dashboard',
    subtitle: 'Product Design & UI/UX',
    category: 'dashboard-ui',
    imgSrc: '/assets/portfolio/3-greentrack.jpg',
    liveUrl: 'https://greentrack.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'travelgallery-curated-destinations',
    title: 'TravelGallery — Curated Destinations',
    subtitle: 'UI/UX & Mobile Design',
    category: 'web-design',
    imgSrc: '/assets/portfolio/4-travellgallery.jpg',
    liveUrl: 'https://travelgallery.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'icone-luxury-hotel-booking',
    title: 'Icone — Luxury Hotel Booking',
    subtitle: 'UI/UX & Frontend Development',
    category: 'web-design',
    imgSrc: '/assets/portfolio/5-icone-hotel-booking.jpg',
    liveUrl: 'https://icone-hotel.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'chrona-ai-time-management-app',
    title: 'Chrona — AI Time Management App',
    subtitle: 'Mobile UI/UX & Web App Design',
    category: 'dashboard-ui',
    imgSrc: '/assets/portfolio/6-chrona.jpg',
    liveUrl: 'https://chrona.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'modernbrand-identity-system',
    title: 'ModernBrand — Design System',
    subtitle: 'Branding & Design System',
    category: 'branding',
    imgSrc: '/assets/portfolio/7-modernbrand.jpg',
    liveUrl: 'https://modernbrand.vercel.app',
    hideLiveLink: false,
    hideCaseStudy: false
  }
];

const Works = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredWorks = defaultWorks.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category.includes(selectedFilter);
  });

  return (
    <>
      {/* Hero Inner Header */}
      <section className="page-inner-hero minimal-works-hero text-center">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span className="hero-top-badge">FEATURED PROJECTS</span>
              <h1 className="hero-main-title">
                Crafting <span className="highlight-lime">Digital Experiences</span> That Drive Impact.
              </h1>
              <p className="hero-sub-text text-center mx-auto">
                Explore a collection of UI/UX design, custom web development, and digital product case studies built for modern brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Gallery Grid Section */}
      <section className="works-gallery-section section-padding-bottom">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="filter-pills-wrapper text-center mb-5">
            <button
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Projects
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'ui-ux-design' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('ui-ux-design')}
            >
              UI/UX Design
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'web-design' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('web-design')}
            >
              Web Design
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'dashboard-ui' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('dashboard-ui')}
            >
              Dashboard & SaaS
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'branding' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('branding')}
            >
              Branding
            </button>
          </div>

          {/* Works Grid */}
          <div className="row g-4">
            {filteredWorks.map((item) => (
              <div className="col-md-6 col-lg-4" key={item.id}>
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
        </div>
      </section>
    </>
  );
};

export default Works;
