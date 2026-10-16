import React, { useState } from 'react';
import {
  personalInfo,
  experienceData,
  educationData,
  skillsData,
  cameraRollPhotos,
  faqData,
} from '../data/portfolioData';
import PhotoLightbox from '../components/PhotoLightbox';
import { Briefcase, GraduationCap, Camera, ChevronDown, Download, Sparkles } from 'lucide-react';

export default function About({ onOpenResume }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="about-page-container section-padding-hero">
      <div className="container">
        {/* Hero Section */}
        <div className="row align-items-center g-5 mb-5">
          <div className="col-lg-7">
            <span className="badge-pill mb-3">
              <Sparkles size={14} className="text-accent" />
              <span>Hey, I’m Muhammed.</span>
            </span>
            <h1 className="heading-display font-serif mb-4">
              I design products, build things, and craft <span className="italic font-normal text-accent">human interfaces</span>.
            </h1>
            <p className="subheading-lead mb-4">
              {personalInfo.longBio}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button onClick={onOpenResume} className="btn-primary-custom">
                <Download size={16} />
                <span>Download Full CV</span>
              </button>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card-portfolio text-center p-4">
              <div className="profile-avatar-frame mb-3 mx-auto">
                <div className="profile-avatar-placeholder font-serif">MK</div>
              </div>
              <h3 className="font-serif text-xl mb-1">{personalInfo.name}</h3>
              <p className="text-xs text-accent font-medium mb-3">{personalInfo.role}</p>
              <div className="badge-pill mx-auto text-xs">
                <span>📍 {personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section: How I got into design */}
        <div className="section-padding py-5 border-top-subtle">
          <div className="max-w-2xl">
            <h2 className="heading-section font-serif mb-3">How I got into design & code</h2>
            <p className="text-secondary leading-relaxed mb-3">
              I started out filling notebook margins with UI layouts, icon sets, and vector illustrations. During my software engineering studies, I realized that many powerful digital tools failed because their interfaces were confusing.
            </p>
            <p className="text-secondary leading-relaxed mb-0">
              I taught myself product design, studied typography, and started building the things I designed in React and CSS. AI helped streamline repetitive code so I could focus on high-craft interactions, micro-animations, and seamless user experiences.
            </p>
          </div>
        </div>

        {/* Experience & Education Timeline */}
        <div className="section-padding py-5 border-top-subtle">
          <div className="row g-5">
            {/* Experience Column */}
            <div className="col-lg-7">
              <h2 className="heading-section font-serif mb-4 d-flex align-items-center gap-2">
                <Briefcase size={22} className="text-accent" />
                <span>Experience</span>
              </h2>

              <div className="experience-timeline">
                {experienceData.map((exp, index) => (
                  <div key={index} className="timeline-card card-portfolio mb-4">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="font-serif text-lg mb-0">{exp.role}</h4>
                        <span className="text-sm text-accent font-medium">{exp.company}</span>
                      </div>
                      <span className="badge-pill font-mono">{exp.period}</span>
                    </div>

                    <p className="text-sm text-secondary mb-3">{exp.description}</p>

                    <ul className="exp-highlights-list">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-secondary mb-1">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Skills Column */}
            <div className="col-lg-5">
              <h2 className="heading-section font-serif mb-4 d-flex align-items-center gap-2">
                <GraduationCap size={22} className="text-accent" />
                <span>Education</span>
              </h2>

              {educationData.map((edu, idx) => (
                <div key={idx} className="card-portfolio p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="font-serif text-base mb-0">{edu.degree}</h5>
                    <span className="badge-pill font-mono text-xs">{edu.period}</span>
                  </div>
                  <p className="text-xs text-accent mb-2">{edu.institution}</p>
                  <p className="text-xs text-secondary mb-0">{edu.details}</p>
                </div>
              ))}

              {/* Skills Matrix */}
              <div className="card-portfolio p-4 mt-4">
                <h4 className="font-serif text-lg mb-3">Skills Matrix</h4>
                
                <div className="mb-3">
                  <span className="text-xs font-semibold text-muted-custom block mb-2">DESIGN & UX</span>
                  <div className="d-flex flex-wrap gap-1.5">
                    {skillsData.design.map((s, i) => (
                      <span key={i} className="badge-pill text-xs">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-muted-custom block mb-2">DEVELOPMENT & REACT</span>
                  <div className="d-flex flex-wrap gap-1.5">
                    {skillsData.development.map((s, i) => (
                      <span key={i} className="badge-pill text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Camera Roll Section */}
        <div className="section-padding py-5 border-top-subtle">
          <div className="mb-4">
            <span className="badge-pill mb-2">
              <Camera size={14} className="text-accent" />
              <span>My Camera Roll</span>
            </span>
            <h2 className="heading-section font-serif mb-1">A few photos from my travels</h2>
            <p className="text-secondary text-sm">Click any photo to expand in full lightbox.</p>
          </div>

          <div className="row g-3">
            {cameraRollPhotos.map((photo) => (
              <div key={photo.id} className="col-md-4 col-sm-6">
                <div
                  onClick={() => setSelectedPhoto(photo)}
                  className="camera-photo-card"
                >
                  <img src={photo.url} alt={photo.title} className="camera-photo-img" />
                  <div className="camera-photo-overlay">
                    <span className="font-serif text-sm text-white mb-0">{photo.title}</span>
                    <span className="text-xs text-white-50">{photo.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="section-padding py-5 border-top-subtle">
          <div className="max-w-2xl mx-auto">
            <h2 className="heading-section font-serif mb-4 text-center">Frequently Asked Questions</h2>
            
            <div className="faq-accordion-list">
              {faqData.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="faq-item card-portfolio mb-3 p-3">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="faq-question-btn d-flex justify-content-between align-items-center w-100 text-left"
                    >
                      <span className="font-serif text-base font-semibold">{faq.question}</span>
                      <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <p className="text-sm text-secondary mt-3 mb-0 pt-2 border-top-subtle animate-fade-in">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}

      <style>{`
        .profile-avatar-frame {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background-color: var(--accent-subtle);
          border: 2px solid var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-avatar-placeholder {
          font-size: 2.2rem;
          color: var(--accent-primary);
        }

        .exp-highlights-list {
          padding-left: 1rem;
          margin-bottom: 0;
        }

        .camera-photo-card {
          position: relative;
          height: 240px;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--border-subtle);
        }

        .camera-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .camera-photo-card:hover .camera-photo-img {
          transform: scale(1.06);
        }

        .camera-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .camera-photo-card:hover .camera-photo-overlay {
          opacity: 1;
        }

        .faq-chevron {
          transition: transform 0.3s ease;
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}
