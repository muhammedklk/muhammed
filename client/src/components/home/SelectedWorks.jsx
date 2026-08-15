import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

const defaultFeatured = [
  {
    id: 'styleora-fashion-e-commerce',
    slug: 'styleora-fashion-e-commerce',
    title: 'Styleora',
    category: 'E-Commerce, UI/UX Design & Development',
    heroImg: '/assets/portfolio/1-styleora.jpg',
    liveUrl: 'https://styleora.vercel.app'
  },
  {
    id: 'elve-creative-agency-portfolio',
    slug: 'elve-creative-agency-portfolio',
    title: 'Elve',
    category: 'Rental, UI/UX Design & Development',
    heroImg: '/assets/portfolio/2-elve.jpg',
    liveUrl: 'https://elve-studio.vercel.app'
  },
  {
    id: 'greentrack-sustainability-dashboard',
    slug: 'greentrack-sustainability-dashboard',
    title: 'Green Track',
    category: 'UI/UX Design & Development',
    heroImg: '/assets/portfolio/3-greentrack.jpg',
    liveUrl: 'https://greentrack.vercel.app'
  },
  {
    id: 'voyagera',
    slug: 'voyagera',
    title: 'Voyagera',
    category: 'World Expeditions, UI/UX Design & Development',
    heroImg: '/assets/portfolio/gyogrea.png',
    liveUrl: 'https://voyageratravel.vercel.app/'
  }
];

const SelectedWorks = () => {
  const { projects } = usePortfolio();

  // Selected works for Home page:
  // Sort projects by order rank, take top 4 dynamic projects.
  // Use home-specific fields (homeMockupImg, homeTitle, homeCategory, homeLiveUrl) first!
  const sortedProjects = Array.isArray(projects) 
    ? [...projects].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    : [];

  const safeProjects = [0, 1, 2, 3].map((index) => {
    const defaultItem = defaultFeatured[index] || {};
    
    // Positional match first from sorted projects (HOME SLOT #1 to #4 in Admin)
    const dynamicProj = sortedProjects[index] || (projects || []).find(
      (p) =>
        (p.slug && String(p.slug).toLowerCase() === String(defaultItem.slug).toLowerCase()) ||
        (p.id && String(p.id).toLowerCase() === String(defaultItem.id).toLowerCase()) ||
        (p.title && String(p.title).toLowerCase() === String(defaultItem.title).toLowerCase())
    );

    if (!dynamicProj) return defaultItem;

    const heroImg = dynamicProj.homeMockupImg || dynamicProj.heroImg || dynamicProj.image || defaultItem.heroImg;
    const categoryVal = dynamicProj.homeCategory || dynamicProj.category || dynamicProj.subtitle || dynamicProj.shortDescription || defaultItem.category;
    const titleVal = dynamicProj.homeTitle || dynamicProj.title || defaultItem.title;
    const liveUrlVal = (dynamicProj.homeLiveUrl !== undefined && dynamicProj.homeLiveUrl !== '') 
      ? dynamicProj.homeLiveUrl 
      : (dynamicProj.liveUrl !== undefined ? dynamicProj.liveUrl : defaultItem.liveUrl);

    return {
      ...defaultItem,
      ...dynamicProj,
      heroImg,
      subtitle: categoryVal,
      category: categoryVal,
      title: titleVal,
      liveUrl: liveUrlVal,
      showCaseStudyBtn: dynamicProj.showCaseStudyBtn !== undefined ? dynamicProj.showCaseStudyBtn : defaultItem.showCaseStudyBtn,
      showLiveUrlBtn: dynamicProj.showLiveUrlBtn !== undefined ? dynamicProj.showLiveUrlBtn : defaultItem.showLiveUrlBtn
    };
  });

  return (
    <section className="demos-section grid-lines-bg" id="selected-work">
      <div className="container">
        {/* Section Header */}
        <div className="demos-header text-center">
          <div className="outlined-stat-num">8+</div>
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

        {/* Works Grid (4 Featured Items Only) */}
        <div className="row g-4 justify-content-center">
          {safeProjects.slice(0, 4).map((item) => {
            const projectKey = item.slug || item._id || item.id;
            const projectImg = item.heroImg || item.image || '/assets/portfolio/gyogrea.png';

            const hasCaseStudyBtn = item.showCaseStudyBtn !== false;
            const hasLiveUrlBtn = item.showLiveUrlBtn !== false && Boolean(item.liveUrl && item.liveUrl !== '#');
            const hasAnyButton = hasCaseStudyBtn || hasLiveUrlBtn;

            return (
              <div className="col-md-6 col-lg-6" key={projectKey}>
                <div className="demo-card-item">
                  <div className="demo-mockup-frame">
                    <div className="demo-img-wrapper">
                      <img src={projectImg} alt={item.title} className="demo-mockup-img" />
                      {hasAnyButton && (
                        <div className="minimal-hover-overlay">
                          {hasCaseStudyBtn && (
                            <Link to={`/case-study/${projectKey}`} className="minimal-btn-hover btn-hover-case">
                              Case Study
                            </Link>
                          )}
                          {hasLiveUrlBtn && (
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
                      )}
                    </div>
                  </div>
                  <div className="demo-card-footer" style={{ textAlign: 'center', padding: '16px 4px 0 4px', width: '100%' }}>
                    <div className="demo-title-group" style={{ textAlign: 'center' }}>
                      <h3 className="demo-card-caption" style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', textAlign: 'center', lineHeight: 1.3 }}>
                        {hasCaseStudyBtn ? (
                          <Link to={`/case-study/${projectKey}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.title}</Link>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </h3>
                      <span className="demo-card-subtext" style={{ display: 'block', fontSize: '13.5px', color: '#64748b', margin: 0, textAlign: 'center', fontWeight: '500' }}>{item.subtitle || item.category || 'UI/UX Design & Development'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
