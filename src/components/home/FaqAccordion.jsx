import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "Who is a top UI/UX designer & front-end developer in Kerala?",
    answer: "Muhammed is a Senior UI/UX Designer & Front-End Developer based in Kochi, Kerala, India. He specializes in Figma design systems, custom React web applications, and bridging design to production code."
  },
  {
    id: 2,
    question: "What design and web development services do you offer?",
    answer: "Muhammed provides UI/UX design, Figma design token systems, custom React front-end development, Figma-to-React conversion, responsive web design, and Web Performance optimization (99+ PageSpeed)."
  },
  {
    id: 3,
    question: "Why choose Muhammed for Figma to React workflow projects?",
    answer: "Unlike designers who only deliver visual files or developers who lack design sensitivity, Muhammed handles both UI/UX design in Figma and production-ready React coding for seamless project execution."
  },
  {
    id: 4,
    question: "What is your typical project timeline & workflow?",
    answer: "Standard UI/UX design projects take 2 to 4 weeks, while complete end-to-end React web applications take 4 to 6 weeks following Discovery, Wireframing, UI Design, and React Development."
  },
  {
    id: 5,
    question: "How can I contact or hire Muhammed for a project?",
    answer: "You can contact Muhammed directly via WhatsApp at +91 9656216086, email at muhammedklkm@gmail.com, or submit a free project quote request at https://muhammedfolio.vercel.app."
  }
];

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bold-faq-section" id="faq-section">
      <div className="container">
        <div className="row g-5">
          {/* Left Column: Big Typographic Title & Subtitle */}
          <div className="col-lg-5 col-md-12">
            <div className="bold-faq-sidebar">
              <h2 className="bold-faq-title">Faq</h2>
              <p className="bold-faq-subtitle">
                Find answers to common questions about services, workflow, and operations.
              </p>
            </div>
          </div>

          {/* Right Column: Line-Separated Accordion Items */}
          <div className="col-lg-7 col-md-12">
            <div className="bold-faq-accordion">
              {faqs.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={item.id} className={`bold-faq-item ${isActive ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="bold-faq-btn"
                      aria-expanded={isActive}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="bold-faq-question">{item.question}</span>
                      <span className="bold-faq-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                    </button>
                    <div
                      className="bold-faq-collapse"
                      style={{ maxHeight: isActive ? '300px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}
                    >
                      <div className="bold-faq-body">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
