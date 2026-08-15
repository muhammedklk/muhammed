import React, { useEffect, useState } from 'react';
import { projectsApi } from '../services/api';
import { Save, Sparkles, ArrowUp, ArrowDown } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageUploadInput from '../components/ImageUploadInput';

const HomeSelectedWorksManager = () => {
  const { refreshPortfolio, updateProjectLocally, updateAllProjectsLocally } = usePortfolio();
  const [projects, setProjects] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await projectsApi.getAllAdmin();
      const rawData = res.data?.data;
      const list = Array.isArray(rawData) ? rawData : (rawData?.projects || []);
      // Sort by order rank ascending (1, 2, 3, 4...)
      const sorted = [...list].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      setProjects(sorted);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Save full reordered list to backend & local state
  const saveAllReorderedProjects = async (reorderedList) => {
    try {
      if (updateAllProjectsLocally) {
        updateAllProjectsLocally(reorderedList);
      }
      
      // Update each item with its new order rank (1, 2, 3, 4...)
      const updatePromises = reorderedList.slice(0, 4).map((proj, idx) => {
        const targetId = proj._id || proj.id;
        const isMongoId = targetId && /^[0-9a-fA-F]{24}$/.test(targetId);
        const newOrder = idx + 1;
        const payload = {
          ...proj,
          order: newOrder,
          featured: true,
          status: 'publish'
        };

        if (isMongoId) {
          return projectsApi.update(targetId, payload);
        }
        return Promise.resolve();
      });

      await Promise.all(updatePromises);

      if (refreshPortfolio) {
        await refreshPortfolio();
      }

      setMessage('✨ Card order updated! SLOT #1 is now 1st on Home Page.');
      setTimeout(() => setMessage(''), 3500);
    } catch (err) {
      console.error('Error saving reordered projects:', err);
    }
  };

  // Move card up
  const handleMoveUp = (index) => {
    if (index <= 0) return;
    const newList = [...projects];
    const temp = newList[index];
    newList[index] = newList[index - 1];
    newList[index - 1] = temp;

    const reordered = newList.map((p, i) => ({ ...p, order: i + 1 }));
    setProjects(reordered);
    saveAllReorderedProjects(reordered);
  };

  // Move card down
  const handleMoveDown = (index) => {
    if (index >= projects.length - 1 || index >= 3) return;
    const newList = [...projects];
    const temp = newList[index];
    newList[index] = newList[index + 1];
    newList[index + 1] = temp;

    const reordered = newList.map((p, i) => ({ ...p, order: i + 1 }));
    setProjects(reordered);
    saveAllReorderedProjects(reordered);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newList = [...projects];
    const draggedItem = newList[draggedIndex];
    newList.splice(draggedIndex, 1);
    newList.splice(dropIndex, 0, draggedItem);

    const reordered = newList.map((p, i) => ({ ...p, order: i + 1 }));
    setProjects(reordered);
    setDraggedIndex(null);
    saveAllReorderedProjects(reordered);
  };

  // Single card update
  const handleUpdateProject = async (proj, index) => {
    const targetId = proj._id || proj.id;
    setSavingId(targetId);
    setMessage('');
    try {
      const homeCategoryVal = proj.homeCategory || proj.category || proj.subtitle || 'UI/UX Design & Development';
      const homeTitleVal = proj.homeTitle || proj.title || '';
      const homeMockupVal = proj.homeMockupImg || proj.heroImg || proj.image || '';
      const homeLiveVal = proj.homeLiveUrl !== undefined ? proj.homeLiveUrl : (proj.liveUrl || '');
      const orderVal = index + 1;

      const payload = {
        ...proj,
        homeTitle: homeTitleVal,
        homeCategory: homeCategoryVal,
        homeMockupImg: homeMockupVal,
        homeLiveUrl: homeLiveVal,
        order: orderVal,
        featured: true,
        status: 'publish'
      };

      const isMongoId = targetId && /^[0-9a-fA-F]{24}$/.test(targetId);
      if (isMongoId) {
        await projectsApi.update(targetId, payload);
      } else {
        await projectsApi.create({
          ...payload,
          title: proj.title || homeTitleVal || `Project ${index + 1}`,
          category: proj.category || homeCategoryVal,
          heroImg: proj.heroImg || homeMockupVal || '/assets/portfolio/gyogrea.png',
          slug: targetId || (homeTitleVal || proj.title).toLowerCase().replace(/\s+/g, '-')
        });
      }

      if (updateProjectLocally) {
        updateProjectLocally(payload);
      }

      if (refreshPortfolio) {
        await refreshPortfolio();
      }

      setMessage(`✅ Updated Home Mockup for "${homeTitleVal || proj.title}"! Appears in SLOT #${index + 1} live on Home page.`);
      setTimeout(() => setMessage(''), 4000);
      fetchProjects();
    } catch (err) {
      alert('Error updating home mockup: ' + (err.response?.data?.message || err.message));
    } finally {
      setSavingId(null);
    }
  };

  const featuredProjects = projects.slice(0, 4);

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff' }}>
            Home Page Selected Works (Drag / Move to Reorder)
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            Use the <strong style={{ color: '#d2ea26' }}>▲ Move Up</strong> & <strong style={{ color: '#d2ea26' }}>▼ Move Down</strong> buttons (or drag with mouse) to position your cards. Top card (SLOT #1) displays 1st on the Home page.
          </p>
        </div>
      </div>

      {message && (
        <div style={{ padding: '10px 16px', background: 'rgba(210, 234, 38, 0.15)', border: '1px solid rgba(210, 234, 38, 0.3)', color: '#d2ea26', borderRadius: '10px', marginBottom: '16px', fontWeight: '700', fontSize: '13px' }}>
          {message}
        </div>
      )}

      {/* 2x2 Grid of 4 Home Selected Works */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(540px, 1fr))', gap: '16px' }}>
        {featuredProjects.length === 0 ? (
          <div style={{ background: '#0f172a', padding: '30px', gridColumn: '1 / -1', borderRadius: '16px', textAlign: 'center', color: '#64748b' }}>
            No projects found. Add projects from the Projects Manager first.
          </div>
        ) : (
          featuredProjects.map((proj, index) => {
            const currentHomeTitle = proj.homeTitle !== undefined && proj.homeTitle !== '' ? proj.homeTitle : proj.title;
            const currentHomeCat = proj.homeCategory !== undefined && proj.homeCategory !== '' ? proj.homeCategory : (proj.category || proj.subtitle || '');
            const currentHomeLive = proj.homeLiveUrl !== undefined && proj.homeLiveUrl !== '' ? proj.homeLiveUrl : (proj.liveUrl || '');
            const currentHomeImg = proj.homeMockupImg || proj.heroImg || proj.image || '';

            return (
              <div
                key={proj._id || proj.id || index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                style={{
                  background: '#0f172a',
                  border: draggedIndex === index ? '2px dashed #d2ea26' : '1px solid rgba(210, 234, 38, 0.25)',
                  borderRadius: '18px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  opacity: draggedIndex === index ? 0.6 : 1,
                  cursor: 'grab'
                }}
              >
                
                {/* Header Badge & Move Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ cursor: 'grab', color: '#64748b', fontSize: '14px', fontWeight: '800' }} title="Drag to reorder">
                      ⋮⋮
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '800', padding: '3px 10px', background: '#d2ea26', color: '#0f172a', borderRadius: '20px' }}>
                      HOME SLOT #{index + 1}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff' }}>{proj.title}</span>
                  </div>

                  {/* Move Up / Down Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      title="Move card up in priority"
                      style={{
                        padding: '4px 10px',
                        background: index === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(210, 234, 38, 0.15)',
                        border: '1px solid rgba(210, 234, 38, 0.3)',
                        borderRadius: '6px',
                        color: index === 0 ? '#64748b' : '#d2ea26',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: index === 0 ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ArrowUp size={12} />
                      <span>Move Up</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === featuredProjects.length - 1 || index === 3}
                      title="Move card down in priority"
                      style={{
                        padding: '4px 10px',
                        background: index === featuredProjects.length - 1 || index === 3 ? 'rgba(255,255,255,0.04)' : 'rgba(210, 234, 38, 0.15)',
                        border: '1px solid rgba(210, 234, 38, 0.3)',
                        borderRadius: '6px',
                        color: index === featuredProjects.length - 1 || index === 3 ? '#64748b' : '#d2ea26',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: index === featuredProjects.length - 1 || index === 3 ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ArrowDown size={12} />
                      <span>Move Down</span>
                    </button>
                  </div>
                </div>

                {/* Card Body Flex */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  {/* Mockup Preview Column */}
                  <div style={{ width: '150px', flexShrink: 0 }}>
                    <div style={{ height: '145px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#090d16', position: 'relative' }}>
                      <img src={currentHomeImg || '/assets/portfolio/gyogrea.png'} alt={currentHomeTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ display: 'block', textAlign: 'center', fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                      Home Mockup Preview
                    </span>
                  </div>

                  {/* Form Fields Column */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    
                    {/* Title & Subtitle side-by-side */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', color: '#94a3b8', fontWeight: '700', marginBottom: '3px' }}>HOME TITLE</label>
                        <input
                          type="text"
                          value={currentHomeTitle}
                          onChange={(e) => {
                            const newTitle = e.target.value;
                            setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, homeTitle: newTitle } : p));
                          }}
                          style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '13px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', color: '#94a3b8', fontWeight: '700', marginBottom: '3px' }}>HOME CATEGORY</label>
                        <input
                          type="text"
                          value={currentHomeCat}
                          onChange={(e) => {
                            const newCat = e.target.value;
                            setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, homeCategory: newCat } : p));
                          }}
                          style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '13px' }}
                        />
                      </div>
                    </div>

                    {/* Live Website Demo URL */}
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', color: '#d2ea26', fontWeight: '700', marginBottom: '3px' }}>HOME LIVE DEMO URL</label>
                      <input
                        type="text"
                        value={currentHomeLive}
                        placeholder="https://..."
                        onChange={(e) => {
                          const newUrl = e.target.value;
                          setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, homeLiveUrl: newUrl } : p));
                        }}
                        style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(210, 234, 38, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '12.5px' }}
                      />
                    </div>

                    {/* Screenshot Image Upload */}
                    <ImageUploadInput
                      label="HOME MOCKUP IMAGE (Home Page Only)"
                      value={currentHomeImg}
                      onChange={(uploadedUrl) => {
                        setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, homeMockupImg: uploadedUrl } : p));
                      }}
                      placeholder="/assets/portfolio/... or upload file"
                    />

                    {/* Submit Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                      <button
                        type="button"
                        onClick={() => handleUpdateProject(proj, index)}
                        disabled={savingId === (proj._id || proj.id)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#d2ea26', color: '#0f172a', borderRadius: '8px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: savingId === (proj._id || proj.id) ? 'not-allowed' : 'pointer' }}
                      >
                        <Save size={14} />
                        <span>{savingId === (proj._id || proj.id) ? 'Saving...' : 'Update Home Card'}</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeSelectedWorksManager;
