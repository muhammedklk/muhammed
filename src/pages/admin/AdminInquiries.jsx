import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await api.get('/inquiries');
      setInquiries(res.data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this inquiry message?')) {
      try {
        await api.delete(`/inquiries/${id}`);
        fetchInquiries();
      } catch (err) {
        alert('Failed to delete inquiry');
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>Client Inquiries</h1>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
          Messages and project inquiries submitted by visitors via the contact form
        </p>
      </div>

      {loading ? (
        <div style={{ color: '#94a3b8', textAlign: 'center', padding: '32px' }}>Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div style={{ color: '#94a3b8', textAlign: 'center', padding: '40px', background: '#12141a', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          No client inquiries received yet. Contact form submissions will appear here automatically!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {inquiries.map((inq) => (
            <div key={inq._id} style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#fff' }}>{inq.name}</h3>
                  <a href={`mailto:${inq.email}`} style={{ color: '#d2ea26', fontSize: '14px', textDecoration: 'none' }}>{inq.email}</a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(inq._id)}
                    style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  🏷️ Service: {inq.service}
                </span>
                <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  💵 Budget: {inq.budget}
                </span>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
                {inq.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
