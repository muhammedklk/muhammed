import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../services/api';
import {
  FolderKanban,
  MessageSquare,
  Image,
  Activity,
  CheckCircle,
  RefreshCw
} from '../components/Icons';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalMedia: 0,
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await dashboardApi.getStats();
      if (res.data && res.data.data) {
        setStats(res.data.data.stats || {});
        setLogs(res.data.data.recentLogs || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Projects', value: stats?.totalProjects || 0, subtitle: `${stats?.publishedProjects || 0} Published • ${stats?.draftProjects || 0} Drafts`, icon: FolderKanban, color: '#38bdf8' },
    { title: 'Contact Inbox', value: stats?.totalMessages || 0, subtitle: `${stats?.unreadMessages || 0} Unread Messages`, icon: MessageSquare, color: '#d2ea26' },
    { title: 'Media Assets', value: stats?.totalMedia || 0, subtitle: 'Cloudinary Assets', icon: Image, color: '#a855f7' },
    { title: 'System Status', value: 'Active', subtitle: 'v1.0 Production ready', icon: CheckCircle, color: '#22c55e' },
  ];

  const safeLogs = Array.isArray(logs) ? logs : [];

  return (
    <div>
      {/* Top Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
            System Dashboard
          </h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>
            Real-time control metrics and activity logs for your portfolio CMS.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
        >
          <RefreshCw size={15} className={loading ? 'spin' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="row g-3 mb-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.title}</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${card.color}15`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.03em' }}>{card.value}</div>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{card.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Audit Trail */}
      <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} color="#d2ea26" />
            <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#ffffff' }}>Recent Activity Logs</h3>
          </div>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Last 10 administrative actions</span>
        </div>

        {safeLogs.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#64748b', fontSize: '13.5px' }}>
            No recent activity logged yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {safeLogs.map((log) => (
              <div key={log._id || Math.random()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(210, 234, 38, 0.1)', color: '#d2ea26', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                    {log.module || 'SYSTEM'}
                  </div>
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#ffffff', display: 'block' }}>{log.details || log.action}</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b' }}>By {log.userName || 'Admin'}</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>
                  {log.createdAt ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
