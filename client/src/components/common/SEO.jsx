import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const SEO = ({ page = 'home', title, description, keywords, ogImage }) => {
  const { seo } = usePortfolio();

  const pageSeo = (seo || []).find((s) => s.page === page) || (seo || []).find((s) => s.page === 'global') || {};

  const finalTitle = title || pageSeo.metaTitle || 'Senior Full Stack Software Architect | Portfolio';
  const finalDescription = description || pageSeo.metaDescription || 'Senior Full Stack Software Architect crafting high-performance web applications, scalable platforms, and pixel-perfect design systems.';
  const finalKeywords = keywords || (pageSeo.keywords ? pageSeo.keywords.join(', ') : 'Software Architect, Full Stack Developer, React, Node.js, Express, MongoDB');
  const finalOgImage = ogImage || pageSeo.ogImage || '/assets/portfolio/gyogrea.png';
  const finalRobots = pageSeo.robots || 'index, follow';

  useEffect(() => {
    document.title = finalTitle;

    const updateMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
    updateMetaTag('meta[name="robots"]', 'name', 'robots', finalRobots);

    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', finalOgImage);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');

    if (pageSeo.canonicalUrl) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', pageSeo.canonicalUrl);
    }

    if (pageSeo.jsonLdSchema) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = pageSeo.jsonLdSchema;
    }
  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, finalRobots, pageSeo]);

  return null;
};

export default SEO;
