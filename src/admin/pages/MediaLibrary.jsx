import React, { useEffect, useState } from 'react';
import { mediaApi } from '../services/api';
import { Plus, Trash2, Image } from '../components/Icons';

const MediaLibrary = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await mediaApi.getAll();
      const rawData = res.data?.data;
      const list = Array.isArray(rawData) ? rawData : (rawData?.media || rawData?.items || []);
      setMediaList(list);
    } catch (err) {
      console.error('Error fetching media:', err);
      setMediaList([]);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await mediaApi.upload(formData);
      fetchMedia();
    } catch (err) {
      alert('Error uploading media: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media asset?')) return;
    try {
      await mediaApi.delete(id);
      fetchMedia();
    } catch (err) {
      alert('Error deleting media: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  const safeList = Array.isArray(mediaList) ? mediaList : [];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a', letterSpacing: '-0.02em' }}>Media Library</h1>
          <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, fontWeight: '500' }}>Upload project screenshots, avatars, and assets directly to Cloudinary.</p>
        </div>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#0f172a', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' }}>
          <Plus size={18} />
          <span>{uploading ? 'Uploading Image...' : 'Upload Image'}</span>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {safeList.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '40px', gridColumn: '1 / -1', borderRadius: '20px', textAlign: 'center', color: '#64748b', fontWeight: '500' }}>
            No images uploaded yet. Upload image files to Cloudinary above.
          </div>
        ) : (
          safeList.map((item) => (
            <div key={item._id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)' }}>
              <div style={{ height: '160px', background: '#f8fafc', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
                <img src={item.url} alt={item.originalName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#0f172a', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.originalName || 'Image Asset'}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{(item.size / 1024).toFixed(1)} KB</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button onClick={() => handleCopyUrl(item.url)} style={{ flex: 1, padding: '6px 10px', background: '#f8fafc', color: '#0f172a', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: '11.5px', fontWeight: '700' }}>Copy URL</button>
                  <button onClick={() => handleDelete(item._id)} style={{ padding: '6px 10px', background: '#fef2f2', color: '#ef4444', borderRadius: '8px', border: '1px solid #fecaca', cursor: 'pointer', fontSize: '11.5px', fontWeight: '700' }}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
