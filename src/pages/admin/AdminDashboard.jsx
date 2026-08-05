import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useMaintenance } from '../../context/MaintenanceContext';

const AdminDashboard = () => {
  const { isMaintenanceMode } = useMaintenance();
  const [stats, setStats] = useState({
    projectsCount: 0,
    faqsCount: 0,
    inquiriesCount: 0,
    profileLoaded: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, faqsRes, inquiriesRes] = await Promise.all([
          api.get('/projects').catch(() => ({ data: [] })),
          api.get('/faqs').catch(() => ({ data: [] })),
          api.get('/inquiries').catch(() => ({ data: [] }))
        ]);

        let localInquiries = [];
        try { localInquiries = JSON.parse(localStorage.getItem('admin_inquiries_data') || '[]'); } catch (_) {}
        const apiInquiries = inquiriesRes.data || [];
        const mergedInquiriesCount = Math.max(localInquiries.length, apiInquiries.length);

        setStats({
          projectsCount: projectsRes.data.length || 0,
          faqsCount: faqsRes.data.length || 0,
          inquiriesCount: mergedInquiriesCount,
          profileLoaded: true
        });
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px', color: '#fff' }}>
          Welcome to Portfolio Admin Panel 👋
        </h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>
          Manage all content, case studies, profile details, and client inquiries from one central hub.
        </p>
      </div>

      {/* Realtime Site Controls Banner */}
      <div
        style={{
          background: isMaintenanceMode
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(18, 20, 26, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(18, 20, 26, 0.95) 100%)',
          border: isMaintenanceMode ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '20px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: isMaintenanceMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}
          >
            {isMaintenanceMode ? '🔴' : '🟢'}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>
              Website Status: {isMaintenanceMode ? 'Maintenance Mode Active 🔴' : 'Live & Publicly Visible 🟢'}
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
              {isMaintenanceMode
                ? 'Visitors worldwide see the Maintenance Screen in realtime.'
                : 'Your portfolio is live and visible to all visitors normally.'}
            </p>
          </div>
        </div>

        <Link
          to="/admin/site-controls"
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            background: isMaintenanceMode ? '#ef4444' : '#22c55e',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '13px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>⚙️ Open Site Controls →</span>
        </Link>
      </div>


      {/* Overview Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {/* Stat Card 1: Projects */}
        <div style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Total Case Studies</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#fff' }}>
              {loading ? '...' : stats.projectsCount}
            </h2>
          </div>
        </div>

        {/* Stat Card 2: Inquiries */}
        <div style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(234, 179, 8, 0.15)',
            color: '#eab308',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Client Inquiries</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#fff' }}>
              {loading ? '...' : stats.inquiriesCount}
            </h2>
          </div>
        </div>

        {/* Stat Card 3: FAQs */}
        <div style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(168, 85, 247, 0.15)',
            color: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Active FAQs</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#fff' }}>
              {loading ? '...' : stats.faqsCount}
            </h2>
          </div>
        </div>

        {/* Stat Card 4: System Status */}
        <div style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Auth Status</span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#10b981' }}>
              Authenticated
            </h4>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Quick Management Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <Link to="/admin/projects" style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px',
          textDecoration: 'none',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0' }}>Manage Case Studies</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Add, edit, or upload project images</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d2ea26" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </Link>

        <Link to="/admin/profile" style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px',
          textDecoration: 'none',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0' }}>Edit Profile & Bio</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Update Hero title, resume link, contact details</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d2ea26" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </Link>

        <Link to="/admin/inquiries" style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px',
          textDecoration: 'none',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0' }}>View Client Inquiries</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Read messages sent from contact form</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d2ea26" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
