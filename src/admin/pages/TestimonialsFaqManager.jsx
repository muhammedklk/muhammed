import React, { useEffect, useState } from 'react';
import { contentApi } from '../services/api';
import { Plus, Edit, Trash2, Save } from '../components/Icons';

const TestimonialsFaqManager = () => {
  const [activeTab, setActiveTab] = useState('testimonials');
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientTitle: '',
    company: '',
    avatarUrl: '',
    quote: '',
    rating: 5,
    question: '',
    answer: '',
    category: 'General',
    order: 0
  });

  const fetchData = async () => {
    try {
      const [testRes, faqRes] = await Promise.all([
        contentApi.getCrud('testimonials').catch(() => null),
        contentApi.getCrud('faqs').catch(() => null)
      ]);

      if (testRes && testRes.data && testRes.data.data) {
        setTestimonials(testRes.data.data);
      }

      if (faqRes && faqRes.data && faqRes.data.data) {
        setFaqs(faqRes.data.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName || '',
      clientTitle: item.clientTitle || '',
      company: item.company || '',
      avatarUrl: item.avatarUrl || '',
      quote: item.quote || '',
      rating: item.rating || 5,
      question: item.question || '',
      answer: item.answer || '',
      category: item.category || 'General',
      order: item.order || 0
    });
  };

  const handleNew = () => {
    setEditingItem('new');
    setFormData({
      clientName: '',
      clientTitle: '',
      company: '',
      avatarUrl: '',
      quote: '',
      rating: 5,
      question: '',
      answer: '',
      category: 'General',
      order: (activeTab === 'testimonials' ? testimonials.length : faqs.length) + 1
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await contentApi.deleteCrud(activeTab === 'testimonials' ? 'testimonials' : 'faqs', id);
      fetchData();
    } catch (err) {
      alert('Error deleting item: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const moduleName = activeTab === 'testimonials' ? 'testimonials' : 'faqs';
      const payload = activeTab === 'testimonials' ? {
        clientName: formData.clientName,
        clientTitle: formData.clientTitle,
        company: formData.company,
        avatarUrl: formData.avatarUrl,
        quote: formData.quote,
        rating: Number(formData.rating),
        order: formData.order
      } : {
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        order: formData.order
      };

      if (editingItem && editingItem !== 'new') {
        await contentApi.updateCrud(moduleName, editingItem._id, payload);
      } else {
        await contentApi.createCrud(moduleName, payload);
      }
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('Error saving entry: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div style={{ color: '#d2ea26', fontWeight: '700', padding: '40px' }}>Loading Testimonials & FAQs...</div>;
  }

  const currentList = activeTab === 'testimonials' ? testimonials : faqs;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Testimonials & FAQs</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Manage client feedback quotes and frequently asked questions.</p>
        </div>
        <button onClick={handleNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} />
          <span>Add New {activeTab === 'testimonials' ? 'Testimonial' : 'FAQ'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <button
          onClick={() => { setActiveTab('testimonials'); setEditingItem(null); }}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'testimonials' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'testimonials' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          Client Testimonials ({testimonials.length})
        </button>
        <button
          onClick={() => { setActiveTab('faqs'); setEditingItem(null); }}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'faqs' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'faqs' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          Frequently Asked Questions ({faqs.length})
        </button>
      </div>

      {/* FORM MODAL / CARD */}
      {editingItem && (
        <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid rgba(210,234,38,0.3)', borderRadius: '20px', padding: '28px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#d2ea26', marginBottom: '20px' }}>
            {editingItem === 'new' ? `Add ${activeTab}` : `Edit ${activeTab}`}
          </h3>
          <div className="row g-3">
            {activeTab === 'testimonials' ? (
              <>
                <div className="col-12 col-md-4">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CLIENT NAME</label>
                  <input type="text" required value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
                <div className="col-12 col-md-4">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CLIENT TITLE / ROLE</label>
                  <input type="text" value={formData.clientTitle} onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })} placeholder="CEO, Product Lead" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
                <div className="col-12 col-md-4">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>COMPANY NAME</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
                <div className="col-12">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>TESTIMONIAL QUOTE</label>
                  <textarea rows={3} required value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
              </>
            ) : (
              <>
                <div className="col-12">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>QUESTION</label>
                  <input type="text" required value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
                </div>
                <div className="col-12">
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>DETAILED ANSWER</label>
                  <textarea rows={4} required value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentList.length === 0 ? (
          <div style={{ background: '#0f172a', padding: '40px', borderRadius: '20px', textAlign: 'center', color: '#64748b' }}>
            No entries added yet. Click "Add New" above to create one.
          </div>
        ) : (
          currentList.map((item) => (
            <div key={item._id} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0' }}>{item.clientName || item.question}</h3>
                {item.company && <span style={{ fontSize: '12.5px', color: '#d2ea26', fontWeight: '700', display: 'block', marginBottom: '8px' }}>{item.clientTitle ? `${item.clientTitle} at ` : ''}{item.company}</span>}
                <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>"{item.quote || item.answer}"</p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                <button onClick={() => handleEdit(item)} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '12.5px', fontWeight: '700' }}>Edit</button>
                <button onClick={() => handleDelete(item._id)} style={{ padding: '8px 14px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer', fontSize: '12.5px', fontWeight: '700' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialsFaqManager;
