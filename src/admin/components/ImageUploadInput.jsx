import React, { useState, useRef } from 'react';
import { mediaApi } from '../services/api';
import { Upload, Image as ImageIcon, Check, Loader2 } from './Icons';

const ImageUploadInput = ({ label, value, onChange, placeholder = 'https://... or /assets/...' }) => {
  const [uploading, setUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setPreviewError(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await mediaApi.upload(formData);
      const uploadedUrl = res.data?.data?.media?.url || res.data?.data?.url || res.data?.url || res.data?.media?.url;

      if (uploadedUrl) {
        onChange(uploadedUrl);
      } else {
        alert('Upload succeeded but no URL returned.');
      }
    } catch (err) {
      console.error('File upload failed:', err);
      alert('File upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>
          {label}
        </label>
      )}

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.svg,.png,.jpg,.jpeg,.gif,.webp"
          style={{ display: 'none' }}
        />

        {/* Text Input for URL */}
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => {
              setPreviewError(false);
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#ffffff',
              fontSize: '13px'
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
            background: 'rgba(210, 234, 38, 0.15)',
            border: '1px solid rgba(210, 234, 38, 0.3)',
            borderRadius: '10px',
            color: '#d2ea26',
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
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={16} />
              <span>Upload from PC</span>
            </>
          )}
        </button>
      </div>

      {/* Image Thumbnail Preview */}
      {value && !previewError && (
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={value}
            alt="Preview"
            onError={() => setPreviewError(true)}
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: '#1e293b' }}
          />
          <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={14} /> Image linked successfully
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
