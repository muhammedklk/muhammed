import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "We provide full-suite digital solutions including UI/UX design, custom web & mobile app development, brand identity, and interactive prototyping tailored to scale your product."
  },
  {
    id: 2,
    question: "What is your typical project workflow?",
    answer: "Our process follows four key steps: Discovery & Research, Wireframing & Prototyping, High-Fidelity UI/UX & Development, followed by Testing, Launch & Support."
  },
  {
    id: 3,
    question: "How long does a standard project take?",
    answer: "Timelines depend on scope. Typical UI/UX design projects take 2 to 4 weeks, while complete end-to-end web applications take 4 to 8 weeks from start to finish."
  },
  {
    id: 4,
    question: "Are revision rounds included in the scope?",
    answer: "Yes, all projects include 2 to 3 structured revision rounds per phase to ensure full alignment with your vision and goals before final sign-off."
  },
  {
    id: 5,
    question: "How can we get in touch and start?",
    answer: "You can reach out directly via our contact page or email. We'll schedule a discovery call within 24 hours to discuss your project requirements and timeline."
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
