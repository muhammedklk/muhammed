import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import CtaSection from '../components/common/CtaSection';

const defaultWorks = [
  {
    id: 'voyagera',
    slug: 'voyagera',
    title: 'Voyagera',
    subtitle: 'World Expeditions, UI/UX Design & Development',
    heroImg: '/assets/portfolio/gyogrea.png',
    liveUrl: 'https://voyageratravel.vercel.app/',
  },
  {
    id: 'styleora-fashion-e-commerce',
    slug: 'styleora-fashion-e-commerce',
    title: 'Styleora',
    subtitle: 'E-Commerce, UI/UX Design & Development',
    heroImg: '/assets/portfolio/1-styleora.jpg',
    liveUrl: 'https://styleorashop.vercel.app/',
  },
  {
    id: 'elve-creative-agency-portfolio',
    slug: 'elve-creative-agency-portfolio',
    title: 'Elve',
    subtitle: 'Rental, UI/UX Design & Development',
    heroImg: '/assets/portfolio/2-elve.jpg',
    liveUrl: 'https://elve.vercel.app/',
  },
  {
    id: 'greentrack-sustainability-dashboard',
    slug: 'greentrack-sustainability-dashboard',
    title: 'Green Track',
    subtitle: 'Sustainability, UI/UX Design & Development',
    heroImg: '/assets/portfolio/3-greentrack.jpg',
    liveUrl: 'https://greentrack-ten.vercel.app/',
  },
  {
    id: 'travelgallery-curated-destinations',
    slug: 'travelgallery-curated-destinations',
    title: 'Travel Gallery',
    subtitle: 'Travel Gallery, UI/UX Design & Development',
    heroImg: '/assets/portfolio/4-travellgallery.jpg',
    liveUrl: '',
  },
  {
    id: 'icone-luxury-hotel-booking',
    slug: 'icone-luxury-hotel-booking',
    title: 'Icone Hotel Booking',
    subtitle: 'Hotel Booking, UI/UX, Apps Design',
    heroImg: '/assets/portfolio/5-icone-hotel-booking.jpg',
    liveUrl: '',
  },
  {
    id: 'modernbrand-identity-system',
    slug: 'modernbrand-identity-system',
    title: 'Modern Brand',
    subtitle: 'Brand Identity & Apps Design',
    heroImg: '/assets/portfolio/7-modernbrand.jpg',
    liveUrl: '',
  },
  {
    id: 'chrona-ai-time-management-app',
    slug: 'chrona-ai-time-management-app',
    title: 'Chrona',
    subtitle: 'Interface, 2 Commerce App',
    heroImg: '/assets/portfolio/6-chrona.jpg',
    liveUrl: '',
  }
];

const Works = () => {
  const { projects } = usePortfolio();

  // Always display ALL 8 core works, merged with dynamic CMS updates from MongoDB
  const displayWorks = defaultWorks.map((defaultItem) => {
    const apiMatch = (projects || []).find(
      (p) =>
        (p.slug && String(p.slug).toLowerCase() === String(defaultItem.slug).toLowerCase()) ||
        (p.id && String(p.id).toLowerCase() === String(defaultItem.id).toLowerCase()) ||
        (p.title && String(p.title).toLowerCase() === String(defaultItem.title).toLowerCase())
    );
    if (!apiMatch) return defaultItem;

    return {
      ...defaultItem,
      ...apiMatch,
      heroImg: apiMatch.heroImg || apiMatch.image || defaultItem.heroImg,
      subtitle: apiMatch.category || apiMatch.subtitle || defaultItem.subtitle,
      title: apiMatch.title || defaultItem.title,
      liveUrl: apiMatch.liveUrl || defaultItem.liveUrl
    };
  });

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
          {/* Works Grid — All 8 Projects */}
          <div className="row g-4">
            {displayWorks.map((item) => {
              const projectKey = item.slug || item._id || item.id;
              const projectImg = item.heroImg || item.image || item.imgSrc || '/assets/portfolio/gyogrea.png';
              const projectCat = item.category || item.subtitle || 'UI/UX Design & Development';

              return (
                <div className="col-md-6 col-lg-6" key={projectKey}>
                  <div className="demo-card-item">
                    <div className="demo-mockup-frame">
                      <div className="demo-img-wrapper">
                        <img src={projectImg} alt={item.title} className="demo-mockup-img" />
                        <div className="minimal-hover-overlay">
                          <Link to={`/case-study/${projectKey}`} className="minimal-btn-hover btn-hover-case">
                            Case Study
                          </Link>
                          {item.liveUrl && item.liveUrl !== '#' && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="minimal-btn-hover btn-hover-live"
                            >
                              Live Preview ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="demo-card-footer" style={{ textAlign: 'center', padding: '16px 4px 0 4px', width: '100%' }}>
                      <div className="demo-title-group" style={{ textAlign: 'center' }}>
                        <h3 className="demo-item-title" style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', textAlign: 'center', lineHeight: 1.3 }}>
                          <Link to={`/case-study/${projectKey}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.title}</Link>
                        </h3>
                        <p className="demo-item-category" style={{ fontSize: '13.5px', color: '#64748b', margin: 0, textAlign: 'center', fontWeight: '500' }}>{projectCat}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Light Theme CTA Section with Spacing */}
      <CtaSection />
    </>
  );
};

export default Works;
