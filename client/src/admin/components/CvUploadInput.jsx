import React, { useState, useRef } from 'react';
import { Upload, Check, Loader2, ExternalLink } from './Icons';

const CvUploadInput = ({ label = 'RESUME / CV FILE OR URL', value, onChange, placeholder = '/assets/cv/Muhammed_K_Resume.pdf or paste URL...' }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      if (dataUrl) {
        onChange(dataUrl);
      }
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      setUploading(false);
      alert('Failed to read CV file.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>
          {label}
        </label>
      )}

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* Hidden File Input for PDF/Word Documents */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          style={{ display: 'none' }}
        />

        {/* Text Input for URL or Path */}
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              color: '#0f172a',
              fontSize: '13.5px',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
            }}
          />
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            color: '#2563eb',
            fontWeight: '700',
            fontSize: '12.5px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="spin" />
              <span>Attaching File...</span>
            </>
          ) : (
            <>
              <Upload size={16} />
              <span>Upload PDF from PC</span>
            </>
          )}
        </button>
      </div>

      {/* Status & Preview link */}
      {value && (
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
            <Check size={14} /> CV document attached & active
          </span>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '12px',
              color: '#2563eb',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: '700'
            }}
          >
            <ExternalLink size={13} /> Test / View Uploaded CV
          </a>
        </div>
      )}
    </div>
  );
};

export default CvUploadInput;
