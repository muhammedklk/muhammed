import React from 'react';
import { X, Download, FileText, CheckCircle, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';
import { personalInfo, experienceData, educationData, skillsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    // Generate a printable CV document or trigger download alert
    const resumeText = `MUHAMMED K — RESUME\n\nRole: ${personalInfo.role}\nEmail: ${personalInfo.email}\nLocation: ${personalInfo.location}\n\nBIO:\n${personalInfo.longBio}\n\nEXPERIENCE:\n${experienceData.map(e => `${e.role} at ${e.company} (${e.period})\n- ${e.description}`).join('\n\n')}\n\nEDUCATION:\n${educationData.map(ed => `${ed.degree} — ${ed.institution} (${ed.period})`).join('\n')}`;
    
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Muhammed_K_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="resume-modal-backdrop animate-fade-in">
      <div className="resume-modal-card card-portfolio">
        {/* Header */}
        <div className="resume-modal-header border-bottom-subtle pb-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="resume-icon-badge">
              <FileText size={22} className="text-accent" />
            </div>
            <div>
              <h3 className="font-serif heading-section mb-0 text-xl">{personalInfo.name}</h3>
              <p className="text-sm text-secondary mb-0">{personalInfo.role}</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button onClick={handleDownloadPDF} className="btn-primary-custom py-2 px-3 text-xs">
              <Download size={15} />
              <span>Download CV</span>
            </button>

            <button onClick={onClose} className="btn-secondary-custom p-2" aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="resume-modal-body">
          {/* Summary */}
          <div className="mb-4">
            <h5 className="font-serif text-base font-bold mb-2">Executive Summary</h5>
            <p className="text-sm text-secondary leading-relaxed mb-0">
              {personalInfo.longBio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-4">
            <h5 className="font-serif text-base font-bold mb-3 d-flex align-items-center gap-2">
              <Briefcase size={16} className="text-accent" />
              <span>Work Experience</span>
            </h5>

            <div className="timeline-wrapper">
              {experienceData.map((item, idx) => (
                <div key={idx} className="timeline-item mb-4">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-1 mb-1">
                    <h6 className="font-semibold text-sm mb-0">{item.role}</h6>
                    <span className="badge-pill font-mono text-xs">{item.period}</span>
                  </div>
                  <div className="text-xs text-accent font-medium mb-2">{item.company} • {item.location}</div>
                  <p className="text-xs text-secondary mb-2">{item.description}</p>
                  <ul className="resume-bullets-list">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-secondary">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h5 className="font-serif text-base font-bold mb-3 d-flex align-items-center gap-2">
              <GraduationCap size={16} className="text-accent" />
              <span>Education & Certifications</span>
            </h5>

            {educationData.map((edu, idx) => (
              <div key={idx} className="edu-card p-3 mb-2 bg-body rounded-md">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <span className="font-semibold text-xs">{edu.degree}</span>
                  <span className="badge-pill font-mono text-xs">{edu.period}</span>
                </div>
                <div className="text-xs text-secondary">{edu.institution}</div>
              </div>
            ))}
          </div>

          {/* Skills Breakdown */}
          <div>
            <h5 className="font-serif text-base font-bold mb-2">Core Competencies</h5>
            <div className="d-flex flex-wrap gap-2">
              {[...skillsData.design, ...skillsData.development].map((skill, i) => (
                <span key={i} className="badge-pill text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .resume-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .resume-modal-card {
          width: 720px;
          max-width: 100%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface) !important;
          padding: 2rem !important;
        }

        .resume-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .resume-icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resume-modal-body {
          flex: 1;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .timeline-item {
          padding-left: 1rem;
          border-left: 2px solid var(--border-subtle);
          position: relative;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-primary);
        }

        .resume-bullets-list {
          padding-left: 1.25rem;
          margin-bottom: 0;
        }

        .resume-bullets-list li {
          margin-bottom: 0.25rem;
        }

        .text-xl {
          font-size: 1.35rem;
        }
      `}</style>
    </div>
  );
}
