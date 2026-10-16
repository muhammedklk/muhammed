import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqsData } from '../data/faqs';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(faqsData[0]?.id || null);

  const toggleItem = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions">
      {faqsData.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button
              type="button"
              className="faq-button"
              onClick={() => toggleItem(faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              id={`faq-btn-${faq.id}`}
            >
              <span>{faq.question}</span>
              <span className="faq-icon" aria-hidden="true">
                <ChevronDown size={18} />
              </span>
            </button>
            <div
              id={`faq-answer-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              className="faq-answer"
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
