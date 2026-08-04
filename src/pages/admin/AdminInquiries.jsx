import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const serviceMap = {
  uiux: 'UI/UX Interface Design',
  frontend: 'Front-End Development',
  fullstack: 'Full Web Application',
  redesign: 'Website Redesign',
  other: 'Consultation & Strategy'
};

const budgetMap = {
  '1k-3k': '$1,000 – $3,000',
  '3k-5k': '$3,000 – $5,000',
  '5k-10k': '$5,000 – $10,000',
  '10k+': '$10,000+'
};

const formatDateTime = (isoString) => {
  if (!isoString) return 'Just now';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return 'Recently';

  const dateStr = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return `${dateStr} at ${timeStr}`;
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    // ⚡ Read local storage inquiries IMMEDIATELY for 0ms delay
    let localData = [];
    try {
      localData = JSON.parse(localStorage.getItem('admin_inquiries_data') || '[]');
    } catch (_) {}

    if (localData.length > 0) {
      setInquiries(localData);
      setLoading(false);
    }

    try {
      const res = await api.get('/inquiries');
      const apiData = res.data || [];

      // Merge API inquiries + Local Storage inquiries (deduplicate by _id or message + email)
      const mergedMap = new Map();
      [...localData, ...apiData].forEach((item) => {
        const key = item._id || `${item.email}-${item.message}`;
        if (!mergedMap.has(key)) {
          mergedMap.set(key, item);
        }
      });

      const mergedList = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now())
      );

      setInquiries(mergedList);
      try {
        localStorage.setItem('admin_inquiries_data', JSON.stringify(mergedList));
      } catch (_) {}
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    // Auto-refresh every 5 seconds so new messages land live
    const interval = setInterval(fetchInquiries, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this inquiry message?')) {
      try {
        await api.delete(`/inquiries/${id}`).catch(() => {});
        const updated = inquiries.filter((inq) => inq._id !== id);
        setInquiries(updated);
        try {
          localStorage.setItem('admin_inquiries_data', JSON.stringify(updated));
        } catch (_) {}
      } catch (err) {
        alert('Failed to delete inquiry');
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>📩 Client Inquiries</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Messages and project inquiries submitted by visitors via the contact form
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          style={{ background: 'rgba(210, 234, 38, 0.15)', border: '1px solid #d2ea26', color: '#d2ea26', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          🔄 Refresh Inquiries
        </button>
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
            <div key={inq._id || Math.random()} style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#fff' }}>{inq.name}</h3>
                    <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                      NEW MESSAGE
                    </span>
                  </div>
                  <a href={`mailto:${inq.email}`} style={{ color: '#d2ea26', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>
                    📧 {inq.email}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                    🕒 {formatDateTime(inq.createdAt)}
                  </span>
                  <button
                    onClick={() => handleDelete(inq._id)}
                    style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700 }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  💼 Service: {serviceMap[inq.service] || inq.service || 'General Inquiry'}
                </span>
                <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  💰 Budget: {budgetMap[inq.budget] || inq.budget || 'Undisclosed'}
                </span>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '18px', fontSize: '14.5px', color: '#e2e8f0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
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
