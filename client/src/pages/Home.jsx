import React from 'react';
import Hero from '../components/home/Hero';
import AboutTeaser from '../components/home/AboutTeaser';
import SelectedWorks from '../components/home/SelectedWorks';
import FaqAccordion from '../components/home/FaqAccordion';
import CtaSection from '../components/common/CtaSection';

const Home = () => {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <SelectedWorks />
      <FaqAccordion />
      <CtaSection />
    </>
  );
};

export default Home;
