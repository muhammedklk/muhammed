import React from 'react';
import { Link } from 'react-router-dom';

const defaultWorks = [
  {
    id: 'voyagera',
    title: 'Voyagera',
    subtitle: 'World Expeditions, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/gyogrea.png',
    liveUrl: 'https://voyageratravel.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'styleora-fashion-e-commerce',
    title: 'Styleora',
    subtitle: 'E-Commerce, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/1-styleora.jpg',
    liveUrl: 'https://styleorashop.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'elve-creative-agency-portfolio',
    title: 'Elve',
    subtitle: 'Rental, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/2-elve.jpg',
    liveUrl: 'https://elve.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'greentrack-sustainability-dashboard',
    title: 'Green Track',
    subtitle: 'Sustainability, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/3-greentrack.jpg',
    liveUrl: 'https://greentrack-ten.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'travelgallery-curated-destinations',
    title: 'Travel Gallery',
    subtitle: 'Travel Gallery, UI/UX Design & Development',
    imgSrc: '/assets/portfolio/4-travellgallery.jpg',
    liveUrl: 'https://travelgallery.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'icone-luxury-hotel-booking',
    title: 'Icone Hotel Booking',
    subtitle: 'Hotel Booking, UI/UX, Apps Design',
    imgSrc: '/assets/portfolio/5-icone-hotel-booking.jpg',
    liveUrl: 'https://icone-hotel.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'modernbrand-identity-system',
    title: 'Modern Brand',
    subtitle: 'Brand Identity & Apps Design',
    imgSrc: '/assets/portfolio/7-modernbrand.jpg',
    liveUrl: 'https://modernbrand.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  },
  {
    id: 'chrona-ai-time-management-app',
    title: 'Chrona',
    subtitle: 'Interface, 2 Commerce App',
    imgSrc: '/assets/portfolio/6-chrona.jpg',
    liveUrl: 'https://chrona.vercel.app/',
    hideLiveLink: false,
    hideCaseStudy: false
  }
];

const Works = () => {
  return (
    <>
      {/* Inner Page Hero Section */}
      <section className="page-inner-hero minimal-works-hero text-center">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9 col-md-11 col-sm-12 text-center d-flex flex-column align-items-center mx-auto">
              <span className="minimal-badge mb-3">FEATURED PROJECTS</span>
              <h1 className="minimal-hero-title text-center mb-3">
                Crafting <span className="text-highlight">Digital Experiences</span><br className="d-none d-md-block" /> That Drive Impact.
              </h1>
              <p className="minimal-hero-subtitle text-center mx-auto mb-5">
                Explore a collection of UI/UX design, custom web development, and digital product case studies built for modern brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Works Grid Section */}
      <section className="works-gallery-section section-padding-bottom">
        <div className="container">

          {/* Works Grid — 2 Columns */}
          <div className="row g-4">
            {defaultWorks.map((item) => (
              <div className="col-md-6 col-lg-6" key={item.id}>
                <div className="demo-card-item">
                  <div className="demo-mockup-frame">
                    <div className="demo-img-wrapper">
                      <img src={item.imgSrc} alt={item.title} className="demo-mockup-img" />
                      <div className="minimal-hover-overlay">
                        {!item.hideLiveLink && item.liveUrl && item.liveUrl !== '#' && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="minimal-btn-hover btn-hover-live"
                          >
                            Live Website
                          </a>
                        )}
                        {!item.hideCaseStudy && (
                          <Link to={`/case-study/${item.id}`} className="minimal-btn-hover btn-hover-case">
                            Case Study
                          </Link>
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

          {/* Bottom CTA Section */}
          <div className="minimal-cta-section mt-5">
            <div className="minimal-cta-card">
              <span className="minimal-badge">GET IN TOUCH TODAY</span>
              <h2 className="minimal-cta-title">Have a project in mind?</h2>
              <p className="minimal-cta-subtitle">
                Let's build something truly functional and visually innovative together.
              </p>
              <Link to="/contact" className="btn-primary-pill">
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
