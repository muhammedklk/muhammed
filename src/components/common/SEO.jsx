import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const SEO = ({ page = 'home', title, description, keywords, ogImage }) => {
  const { seo } = usePortfolio();

  // Find page-specific SEO config from CMS or fallback to default
  const pageSeo = (seo || []).find((s) => s.page === page) || (seo || []).find((s) => s.page === 'global') || {};

  const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://muhammed.dev';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const currentUrl = pageSeo.canonicalUrl || `${siteOrigin}${currentPath}`;

  const defaultTitles = {
    home: 'Muhammed | UI/UX Designer & Front-End Developer | Kochi, Kerala',
    about: 'About Muhammed | Senior UI/UX Designer & React Front-End Specialist',
    works: 'Selected Works & Projects | Muhammed UI/UX Portfolio',
    casestudy: 'UX Case Study & Digital Product Design | Muhammed',
    contact: 'Contact & Hire Muhammed | UI/UX Designer & Web Developer'
  };

  const defaultDescriptions = {
    home: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products and scalable design systems in React & Figma.',
    about: 'Learn about Muhammed, a specialized UI/UX Designer & Front-End Developer with 4+ years experience delivering 99+ PageSpeed rated web applications.',
    works: 'Explore UI/UX design case studies and high-performance React web applications built by Muhammed.',
    casestudy: 'Deep dive into UX strategy, user journey mapping, design systems, and front-end engineering results for digital products.',
    contact: 'Get in touch with Muhammed for freelance projects, design system consultations, and full-stack web engineering inquiries.'
  };

  const finalTitle = title || pageSeo.metaTitle || defaultTitles[page] || defaultTitles.home;
  const finalDescription = description || pageSeo.metaDescription || defaultDescriptions[page] || defaultDescriptions.home;
  const finalKeywords = keywords || (pageSeo.keywords && pageSeo.keywords.length ? pageSeo.keywords.join(', ') : 'UI/UX Designer, Front-End Developer, React, Web Design, Figma, Design Systems, Kochi, Kerala, Hire UI UX Designer, Web Development');
  const rawOgImg = ogImage || pageSeo.ogImage || '/assets/portfolio/gyogrea.png';
  const finalOgImage = rawOgImg.startsWith('http') ? rawOgImg : `${siteOrigin}${rawOgImg}`;
  const finalRobots = pageSeo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Core Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
    updateMetaTag('meta[name="robots"]', 'name', 'robots', finalRobots);
    updateMetaTag('meta[name="author"]', 'name', 'author', 'Muhammed');
    updateMetaTag('meta[name="publisher"]', 'name', 'publisher', 'Muhammed');
    updateMetaTag('meta[name="geo.region"]', 'name', 'geo.region', 'IN-KL');
    updateMetaTag('meta[name="geo.placename"]', 'name', 'geo.placename', 'Kochi');

    // 3. OpenGraph Social Card Meta Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', finalOgImage);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Muhammed Portfolio');
    updateMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 4. Twitter Card Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalOgImage);
    updateMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@muhammed_dev');

    // 5. Canonical Link
    let linkElement = document.querySelector('link[rel="canonical"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', currentUrl);

    // 6. JSON-LD Schema.org Entity-Linked Structured Data (Optimized for Google & AI Models)
    const jsonLdGraph = [];

    // Custom CMS JSON-LD override if available
    if (pageSeo.jsonLdSchema) {
      try {
        const parsed = JSON.parse(pageSeo.jsonLdSchema);
        jsonLdGraph.push(parsed);
      } catch (e) {
        // Non-fatal JSON parse error fallback
      }
    }

    // Default Person Schema (Entity linking for AI Search Engine Crawlers)
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteOrigin}/#person`,
      'name': 'Muhammed',
      'url': siteOrigin,
      'jobTitle': 'Senior UI/UX Designer & Front-End Developer',
      'description': 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance web products, scalable design systems, and modern React applications.',
      'image': `${siteOrigin}/assets/portfolio/gyogrea.png`,
      'knowsAbout': [
        { '@type': 'DefinedTerm', 'name': 'User Experience Design', 'sameAs': 'https://en.wikipedia.org/wiki/User_experience_design' },
        { '@type': 'DefinedTerm', 'name': 'User Interface Design', 'sameAs': 'https://en.wikipedia.org/wiki/User_interface_design' },
        { '@type': 'DefinedTerm', 'name': 'Front-End Web Development', 'sameAs': 'https://en.wikipedia.org/wiki/Front-end_web_development' },
        { '@type': 'DefinedTerm', 'name': 'React (JavaScript library)', 'sameAs': 'https://en.wikipedia.org/wiki/React_(JavaScript_library)' },
        { '@type': 'DefinedTerm', 'name': 'Figma', 'sameAs': 'https://en.wikipedia.org/wiki/Figma' }
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Kochi',
        'addressRegion': 'Kerala',
        'addressCountry': 'India'
      }
    });

    // Professional Service Schema (For hiring & agency search queries)
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${siteOrigin}/#service`,
      'name': 'Muhammed UI/UX Design & Development Services',
      'url': siteOrigin,
      'priceRange': '$$',
      'areaServed': ['Worldwide', 'India', 'Kerala', 'Remote'],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Kochi',
        'addressRegion': 'Kerala',
        'addressCountry': 'India'
      }
    });

    // FAQ Schema (For Google Rich Snippets & AI Model Answer Citations)
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What services does Muhammed offer?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Muhammed specializes in UI/UX Design, Figma Design Systems, Custom React Front-End Development, and Mobile Interface Prototyping.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How to hire Muhammed for web design or front-end development?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'You can contact Muhammed directly via https://muhammed.dev/contact or submit a project lead inquiry on his portfolio website.'
          }
        }
      ]
    });

    let scriptElement = document.querySelector('script[id="jsonld-seo-schema"]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('id', 'jsonld-seo-schema');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLdGraph });

  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, finalRobots, pageSeo, currentUrl, siteOrigin, page]);

  return null;
};

export default SEO;

