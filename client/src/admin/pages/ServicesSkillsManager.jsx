import React, { useEffect, useState } from 'react';
import { contentApi } from '../services/api';
import { Plus, Edit, Trash2, Save, Wrench } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

const ServicesSkillsManager = () => {
  const { refreshPortfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Code',
    category: 'Frontend',
    proficiency: 90,
    tags: '',
    order: 0
  });

  const fetchData = async () => {
    try {
      const [serviceRes, skillRes] = await Promise.all([
        contentApi.getCrud('services').catch(() => null),
        contentApi.getCrud('skills').catch(() => null)
      ]);

      const sList = serviceRes?.data?.data;
      const kList = skillRes?.data?.data;

      setServices(Array.isArray(sList) ? sList : (sList?.services || []));
      setSkills(Array.isArray(kList) ? kList : (kList?.skills || []));
    } catch (err) {
      console.error('Error fetching services/skills data:', err);
      setServices([]);
      setSkills([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || item.name || '',
      description: item.description || '',
      icon: item.icon || 'Code',
      category: item.category || 'Frontend',
      proficiency: item.proficiency || 90,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
      order: item.order || 0
    });
  };

  const handleNew = () => {
    setEditingItem('new');
    const safeServices = Array.isArray(services) ? services : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    setFormData({
      title: '',
      description: '',
      icon: 'Code',
      category: 'Frontend',
      proficiency: 90,
      tags: '',
      order: (activeTab === 'services' ? safeServices.length : safeSkills.length) + 1
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await contentApi.deleteCrud(activeTab, id);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      fetchData();
    } catch (err) {
      alert('Error deleting item: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = activeTab === 'services' ? {
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
        order: formData.order
      } : {
        name: formData.title,
        category: formData.category,
        proficiency: Number(formData.proficiency),
        icon: formData.icon,
        order: formData.order
      };

      if (editingItem && editingItem !== 'new') {
        await contentApi.updateCrud(activeTab, editingItem._id, payload);
      } else {
        await contentApi.createCrud(activeTab, payload);
      }
      
      if (refreshPortfolio) {
        await refreshPortfolio();
      }

      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('Error saving entry: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div style={{ color: '#d2ea26', fontWeight: '700', padding: '40px' }}>Loading Services & Skills...</div>;
  }

  const rawList = activeTab === 'services' ? services : skills;
  const currentList = Array.isArray(rawList) ? rawList : [];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Services & Skills</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Configure offered client services and technical skills matrix.</p>
        </div>
        <button onClick={handleNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} />
          <span>Add New {activeTab === 'services' ? 'Service' : 'Skill'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <button
          onClick={() => { setActiveTab('services'); setEditingItem(null); }}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'services' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'services' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          Offered Services ({Array.isArray(services) ? services.length : 0})
        </button>
        <button
          onClick={() => { setActiveTab('skills'); setEditingItem(null); }}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'skills' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'skills' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          Technical Skills ({Array.isArray(skills) ? skills.length : 0})
        </button>
      </div>

      {/* FORM MODAL / CARD */}
      {editingItem && (
        <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid rgba(210,234,38,0.3)', borderRadius: '20px', padding: '28px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#d2ea26', marginBottom: '20px' }}>
            {editingItem === 'new' ? `Add ${activeTab}` : `Edit ${activeTab}`}
          </h3>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>{activeTab === 'services' ? 'SERVICE TITLE' : 'SKILL NAME'}</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            {activeTab === 'services' ? (
              <>
                <div className="col-12 col-md-6">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SERVICE TAGS (COMMA SEPARATED)</label>
                  <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="React, Node, Cloud" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
                <div className="col-12">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SERVICE DESCRIPTION</label>
                  <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
              </>
            ) : (
              <>
                <div className="col-12 col-md-4">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CATEGORY</label>
                  <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Frontend, Backend, DevOps" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
                <div className="col-12 col-md-2">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>PROFICIENCY %</label>
                  <input type="number" min={0} max={100} value={formData.proficiency} onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
              </>
            )}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ padding: '10px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '10px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Save Entry</button>
            <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {/* ITEMS LIST */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {currentList.length === 0 ? (
          <div style={{ background: '#0f172a', padding: '40px', gridColumn: '1 / -1', borderRadius: '20px', textAlign: 'center', color: '#64748b' }}>
            No entries added yet. Click "Add New" above to create one.
          </div>
        ) : (
          currentList.map((item) => (
            <div key={item._id} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0' }}>{item.title || item.name}</h3>
                {item.category && <span style={{ fontSize: '11px', color: '#d2ea26', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{item.category} ({item.proficiency || 90}%)</span>}
                {item.description && <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{item.description}</p>}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => handleEdit(item)} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>Edit</button>
                <button onClick={() => handleDelete(item._id)} style={{ flex: 1, padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServicesSkillsManager;
