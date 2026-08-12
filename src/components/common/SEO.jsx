import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const SEO = ({ page = 'home', title, description, keywords, ogImage }) => {
  const { seo } = usePortfolio();

  // Find page-specific SEO config from CMS or fallback to default
  const pageSeo = (seo || []).find((s) => s.page === page) || (seo || []).find((s) => s.page === 'global') || {};

  const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://muhammedfolio.vercel.app';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const currentUrl = pageSeo.canonicalUrl || `${siteOrigin}${currentPath}`;

  const defaultTitles = {
    home: 'Muhammed | UI/UX Designer & Front-End Developer | Kochi, Kerala, India',
    about: 'About Muhammed | Senior UI/UX Designer & React Front-End Specialist in Kerala',
    works: 'Selected Works & Projects | Muhammed UI/UX Portfolio | Figma to React',
    casestudy: 'UX Case Study & Digital Product Design | Muhammed',
    contact: 'Contact & Hire Muhammed | UI/UX Designer & Web Developer in Kerala'
  };

  const defaultDescriptions = {
    home: 'Muhammed is a Senior UI/UX Designer & Front-End Developer in Kochi, Kerala, India specializing in Figma design systems, React web development, and sub-second web performance.',
    about: 'Learn about Muhammed, a specialized UI/UX Designer & Front-End Developer in Kerala with 4+ years experience building high-performance React web applications.',
    works: 'Explore UI/UX design case studies, Figma design systems, and custom React web development projects built by Muhammed in Kerala.',
    casestudy: 'Deep dive into UX strategy, user journey mapping, design systems, and front-end engineering results for digital products.',
    contact: 'Get in touch with Muhammed in Kochi, Kerala for freelance projects, design system consultations, and full-stack web engineering inquiries.'
  };

  const finalTitle = title || pageSeo.metaTitle || defaultTitles[page] || defaultTitles.home;
  const finalDescription = description || pageSeo.metaDescription || defaultDescriptions[page] || defaultDescriptions.home;
  const finalKeywords = keywords || (pageSeo.keywords && pageSeo.keywords.length ? pageSeo.keywords.join(', ') : 'UI/UX designer Kerala, web designer Kochi, website developer Kerala, front-end developer India, Figma to React developer, hire UI/UX designer India, Muhammed portfolio, UI UX design systems');
  const rawOgImg = ogImage || pageSeo.ogImage || '/assets/portfolio/gyogrea.png';
  const finalOgImage = rawOgImg.startsWith('http') ? rawOgImg : `${siteOrigin}${rawOgImg}`;
  const finalRobots = pageSeo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  useEffect(() => {
    // 1. Update Document Title & Lang Attribute
    document.title = finalTitle;
    if (document.documentElement) {
      document.documentElement.setAttribute('lang', 'en');
    }

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
    updateMetaTag('meta[name="geo.placename"]', 'name', 'geo.placename', 'Kochi, Kerala');

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

    // Person Schema (Entity linking with real social profiles & expertise)
    const personEntity = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteOrigin}/#person`,
      'name': 'Muhammed',
      'url': siteOrigin,
      'jobTitle': 'Senior UI/UX Designer & Front-End Developer',
      'description': 'Muhammed is a Senior UI/UX Designer & Front-End Developer in Kochi, Kerala, India specializing in Figma design systems, custom React web development, and Figma-to-React conversion.',
      'image': `${siteOrigin}/assets/portfolio/gyogrea.png`,
      'sameAs': [
        'https://www.linkedin.com/in/muhammed-klkm/',
        'https://github.com/muhammedklk',
        'https://www.instagram.com/___muhammedk/'
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Kochi',
        'addressRegion': 'Kerala',
        'addressCountry': 'India'
      },
      'knowsAbout': [
        { '@type': 'DefinedTerm', 'name': 'User Experience Design', 'sameAs': 'https://en.wikipedia.org/wiki/User_experience_design' },
        { '@type': 'DefinedTerm', 'name': 'User Interface Design', 'sameAs': 'https://en.wikipedia.org/wiki/User_interface_design' },
        { '@type': 'DefinedTerm', 'name': 'Front-End Web Development', 'sameAs': 'https://en.wikipedia.org/wiki/Front-end_web_development' },
        { '@type': 'DefinedTerm', 'name': 'React (JavaScript library)', 'sameAs': 'https://en.wikipedia.org/wiki/React_(JavaScript_library)' },
        { '@type': 'DefinedTerm', 'name': 'Figma', 'sameAs': 'https://en.wikipedia.org/wiki/Figma' }
      ]
    };
    jsonLdGraph.push(personEntity);

    // ProfilePage Schema wrapping Person
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${siteOrigin}/#profilepage`,
      'url': currentUrl,
      'name': finalTitle,
      'mainEntity': personEntity
    });

    // WebSite Schema with SearchAction
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteOrigin}/#website`,
      'url': siteOrigin,
      'name': 'Muhammed Portfolio',
      'description': 'Official portfolio website of Muhammed, Senior UI/UX Designer & Front-End Developer in Kerala, India.',
      'publisher': { '@id': `${siteOrigin}/#person` },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${siteOrigin}/works?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    // Professional Service Schema (For agency & client hire intent)
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${siteOrigin}/#service`,
      'name': 'Muhammed UI/UX Design & Development Services',
      'url': siteOrigin,
      'priceRange': '$$',
      'areaServed': ['Kerala', 'Kochi', 'India', 'Worldwide', 'Remote'],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Kochi',
        'addressRegion': 'Kerala',
        'addressCountry': 'India'
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Design & Engineering Services',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'UI/UX Design' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Web Design' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Website Development' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Figma to React Conversion' } }
        ]
      }
    });

    // BreadcrumbList Schema
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteOrigin },
        { '@type': 'ListItem', 'position': 2, 'name': page.toUpperCase(), 'item': currentUrl }
      ]
    });

    // FAQ Schema (For Google Rich Snippets & AI Model Answer Citations)
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Who is a good UI/UX designer in Kerala?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Muhammed is a top UI/UX Designer and Front-End Developer in Kochi, Kerala specializing in Figma design systems and custom React web development.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What services does Muhammed offer?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Muhammed provides UI/UX Design, Web Design, Website Development, Figma Design Token Systems, and Figma-to-React conversion.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How to hire Muhammed for a web project?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'You can contact Muhammed directly via https://muhammedfolio.vercel.app/contact or request a quote on his portfolio website.'
          }
        }
      ]
    });

    // CreativeWork / Project Schemas for Featured Works
    const projectsList = [
      { name: 'Voyagera Travel Platform', url: `${siteOrigin}/case-study/voyagera`, desc: 'Luxury travel expedition platform built with Figma and React.' },
      { name: 'Styleora Luxury E-Commerce', url: `${siteOrigin}/case-study/styleora-fashion-e-commerce`, desc: 'Modern luxury fashion e-commerce digital flagship.' },
      { name: 'Elve Mobility Platform', url: `${siteOrigin}/case-study/elve-creative-agency-portfolio`, desc: 'Asset and luxury car rental platform with fluid GSAP animations.' },
      { name: 'Green Track Sustainability Dashboard', url: `${siteOrigin}/case-study/greentrack-sustainability-dashboard`, desc: 'ESG analytics intelligence platform for corporate carbon accounting.' }
    ];

    projectsList.forEach((proj) => {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        'name': proj.name,
        'url': proj.url,
        'description': proj.desc,
        'author': { '@id': `${siteOrigin}/#person` }
      });
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


