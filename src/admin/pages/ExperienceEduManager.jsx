import React, { useEffect, useState } from 'react';
import { contentApi } from '../services/api';
import { Plus, Edit, Trash2, Save, Briefcase } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

const ExperienceEduManager = () => {
  const { refreshPortfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState('experience');
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    institution: '',
    degree: '',
    period: '',
    location: '',
    description: '',
    order: 0
  });

  const fetchData = async () => {
    try {
      const [expRes, eduRes] = await Promise.all([
        contentApi.getCrud('experience').catch(() => null),
        contentApi.getCrud('education').catch(() => null)
      ]);

      const expList = expRes?.data?.data;
      const eduList = eduRes?.data?.data;

      setExperiences(Array.isArray(expList) ? expList : (expList?.experiences || []));
      setEducation(Array.isArray(eduList) ? eduList : (eduList?.education || []));
    } catch (err) {
      console.error('Error fetching experience/education data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || item.degree || '',
      company: item.company || '',
      institution: item.institution || '',
      degree: item.degree || '',
      period: item.period || '',
      location: item.location || '',
      description: item.description || '',
      order: item.order || 0
    });
  };

  const handleNew = () => {
    setEditingItem('new');
    const safeExp = Array.isArray(experiences) ? experiences : [];
    const safeEdu = Array.isArray(education) ? education : [];
    setFormData({
      title: '',
      company: '',
      institution: '',
      degree: '',
      period: '',
      location: '',
      description: '',
      order: (activeTab === 'experience' ? safeExp.length : safeEdu.length) + 1
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
      const payload = activeTab === 'experience' ? {
        title: formData.title,
        company: formData.company,
        period: formData.period,
        location: formData.location,
        description: formData.description,
        order: formData.order
      } : {
        degree: formData.title || formData.degree,
        institution: formData.institution || formData.company,
        period: formData.period,
        location: formData.location,
        description: formData.description,
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
    return <div style={{ color: '#d2ea26', fontWeight: '700', padding: '40px' }}>Loading Experience & Education...</div>;
  }

  const rawList = activeTab === 'experience' ? experiences : education;
  const currentList = Array.isArray(rawList) ? rawList : [];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Experience & Education</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Manage your career journey timeline, degrees, companies, and achievements.</p>
        </div>
        <button onClick={handleNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} />
          <span>Add New {activeTab === 'experience' ? 'Experience' : 'Education'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <button
          onClick={() => { setActiveTab('experience'); setEditingItem(null); }}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'experience' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'experience' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          Work Experiences ({Array.isArray(experiences) ? experiences.length : 0})
        </button>
        <button
          onClick={() => { setActiveTab('education'); setEditingItem(null); }}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'education' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'education' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          Education & Degrees ({Array.isArray(education) ? education.length : 0})
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
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>{activeTab === 'experience' ? 'JOB TITLE' : 'DEGREE / CERTIFICATION'}</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>{activeTab === 'experience' ? 'COMPANY NAME' : 'INSTITUTION / UNIVERSITY'}</label>
              <input type="text" required value={activeTab === 'experience' ? formData.company : formData.institution} onChange={(e) => setFormData({ ...formData, company: e.target.value, institution: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>PERIOD / DURATION (e.g. 2023 - Present)</label>
              <input type="text" required value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>LOCATION</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>DESCRIPTION & KEY HIGHLIGHTS</label>
              <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ padding: '10px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '10px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Save Entry</button>
            <button type="button" onClick={() => setEditingItem(null)} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {/* ITEMS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentList.length === 0 ? (
          <div style={{ background: '#0f172a', padding: '40px', borderRadius: '20px', textAlign: 'center', color: '#64748b' }}>
            No entries added yet. Click "Add New" above to create one.
          </div>
        ) : (
          currentList.map((item) => (
            <div key={item._id} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#d2ea26', fontWeight: '800', textTransform: 'uppercase', display: 'inline-block', marginBottom: '4px' }}>{item.period}</span>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>{item.title || item.degree}</h3>
                <span style={{ fontSize: '13.5px', color: '#94a3b8', fontWeight: '600', display: 'block' }}>{item.company || item.institution} {item.location ? `• ${item.location}` : ''}</span>
                {item.description && <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 0 0', lineHeight: 1.5 }}>{item.description}</p>}
              </div>

              <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                <button onClick={() => handleEdit(item)} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '700' }}>
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(item._id)} style={{ padding: '8px 14px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '700' }}>
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceEduManager;
