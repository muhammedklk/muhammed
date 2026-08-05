import React, { useState, useEffect } from 'react';
import { useMaintenance } from '../../context/MaintenanceContext';

const AdminSiteControls = () => {
  const {
    isMaintenanceMode,
    maintenanceMessage,
    updatedAt,
    updatedBy,
    loading,
    fullPreviewUrl,
    previewToken,
    toggleMaintenanceMode,
    regeneratePreviewToken,
    fetchPreviewToken
  } = useMaintenance();

  const [messageInput, setMessageInput] = useState(maintenanceMessage || '');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ type: '', text: '' });

  // Confirmation Modals
  const [showEnableConfirmModal, setShowEnableConfirmModal] = useState(false);
  const [showRegenConfirmModal, setShowRegenConfirmModal] = useState(false);

  useEffect(() => {
    setMessageInput(maintenanceMessage);
  }, [maintenanceMessage]);

  useEffect(() => {
    fetchPreviewToken();
  }, [fetchPreviewToken]);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: '', text: '' }), 4000);
  };

  const handleToggleClick = () => {
    if (!isMaintenanceMode) {
      // Enabling mode requires confirmation dialog
      setShowEnableConfirmModal(true);
    } else {
      // Disabling mode directly
      executeToggle(false);
    }
  };

  const executeToggle = async (targetStatus) => {
    setSubmitting(true);
    setShowEnableConfirmModal(false);
    try {
      await toggleMaintenanceMode(targetStatus, messageInput);
      showToast('success', `Maintenance Mode turned ${targetStatus ? 'ON 🔴' : 'OFF 🟢'} successfully!`);
    } catch (err) {
      showToast('error', 'Failed to update Maintenance Mode: ' + (err.message || 'Server error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveMessage = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await toggleMaintenanceMode(isMaintenanceMode, messageInput);
      showToast('success', 'Maintenance message saved successfully!');
    } catch (err) {
      showToast('error', 'Failed to save message: ' + (err.message || 'Server error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyUrl = () => {
    if (!fullPreviewUrl) return;
    navigator.clipboard.writeText(fullPreviewUrl);
    setCopied(true);
    showToast('success', 'Preview URL copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const executeRegenerateToken = async () => {
    setSubmitting(true);
    setShowRegenConfirmModal(false);
    try {
      await regeneratePreviewToken();
      showToast('success', 'Cryptographic Preview Token regenerated successfully!');
    } catch (err) {
      showToast('error', 'Failed to regenerate preview token: ' + (err.message || 'Server error'));
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px' }}>
      {/* Toast Feedback */}
      {toast.text && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 99999,
            backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <span>{toast.type === 'success' ? '✅' : '⚠️'}</span>
          <span>{toast.text}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff', letterSpacing: '-0.5px' }}>
          Site Controls
        </h1>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '14.5px' }}>
          Realtime Maintenance Mode System & Cryptographically Secure Admin Preview URL Management
        </p>
      </div>

      {/* SECTION 1: MAINTENANCE MODE TOGGLE SWITCH & STATUS CARD */}
      <div
        style={{
          background: '#12141a',
          border: isMaintenanceMode ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '28px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: isMaintenanceMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px'
              }}
            >
              {isMaintenanceMode ? '🔴' : '🟢'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Maintenance Mode
                </h2>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: isMaintenanceMode ? '#ef4444' : '#22c55e',
                    color: '#ffffff'
                  }}
                >
                  {isMaintenanceMode ? '🔴 ON — Website Updating' : '🟢 OFF — Website is Live'}
                </span>
              </div>
              <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '14px' }}>
                {isMaintenanceMode
                  ? 'All public visitors across the world are currently seeing the Maintenance Screen in realtime.'
                  : 'Your website is live, fully accessible, and publicly visible worldwide.'}
              </p>
            </div>
          </div>

          {/* Professional Toggle Switch Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: isMaintenanceMode ? '#ef4444' : '#94a3b8' }}>
              {isMaintenanceMode ? '🔴 ON' : '🟢 OFF'}
            </span>
            <button
              type="button"
              onClick={handleToggleClick}
              disabled={submitting || loading}
              style={{
                position: 'relative',
                width: '74px',
                height: '38px',
                borderRadius: '30px',
                background: isMaintenanceMode ? '#ef4444' : '#334155',
                border: 'none',
                cursor: (submitting || loading) ? 'wait' : 'pointer',
                padding: '4px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isMaintenanceMode ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none'
              }}
              title="Toggle Maintenance Mode ON or OFF"
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  transform: isMaintenanceMode ? 'translateX(36px)' : 'translateX(0px)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px'
                }}
              >
                {isMaintenanceMode ? '🔒' : '🌐'}
              </div>
            </button>
          </div>
        </div>

        {/* Audit Meta Row */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '13px',
            color: '#64748b'
          }}
        >
          <div>
            <span>🕒 Last Status Change: </span>
            <strong style={{ color: '#cbd5e1' }}>{formatDate(updatedAt)}</strong>
          </div>
          <div>
            <span>👤 Updated By: </span>
            <strong style={{ color: '#d2ea26' }}>{updatedBy || 'Admin'}</strong>
          </div>
        </div>
      </div>

      {/* SECTION 2: ADMIN PREVIEW URL GENERATOR & ACCESS */}
      <div
        style={{
          background: '#12141a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#d2ea26', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔐</span> Admin Preview URL System
            </h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '13.5px' }}>
              Shareable secure token URL allowing authenticated admins to preview the live site while Maintenance Mode is ON.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowRegenConfirmModal(true)}
            disabled={submitting}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              fontSize: '13px',
              fontWeight: 700,
              cursor: submitting ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🔄</span>
            <span>Regenerate Token</span>
          </button>
        </div>

        {/* Display Full Preview URL Box */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12.5px', color: '#64748b', marginBottom: '6px', fontWeight: 700 }}>
            SECURE PREVIEW URL
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              readOnly
              value={fullPreviewUrl || 'Loading preview URL token...'}
              style={{
                flex: 1,
                minWidth: '280px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#38bdf8',
                fontSize: '13.5px',
                fontFamily: 'monospace',
                fontWeight: 600
              }}
            />
            <button
              type="button"
              onClick={handleCopyUrl}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: 'none',
                background: copied ? '#10b981' : '#d2ea26',
                color: '#08090c',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? 'Copied!' : 'Copy URL'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.open(fullPreviewUrl || '/?preview=' + previewToken, '_blank')}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>👁️</span>
              <span>Open Preview</span>
            </button>
          </div>
        </div>

        <div style={{ background: 'rgba(210, 234, 38, 0.05)', border: '1px solid rgba(210, 234, 38, 0.15)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#cbd5e1' }}>
          💡 <strong>Security Guarantee:</strong> The preview token uses a 256-bit cryptographically generated random key. Visitors without this exact token are blocked from viewing the website while Maintenance Mode is ON.
        </div>
      </div>

      {/* SECTION 3: CUSTOM MAINTENANCE MESSAGE EDITOR */}
      <form onSubmit={handleSaveMessage} style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>
          Custom Maintenance Screen Message
        </h2>
        <p style={{ color: '#94a3b8', margin: '0 0 16px 0', fontSize: '13.5px' }}>
          This message is rendered directly inside the glassmorphism card on the fullscreen Maintenance Screen.
        </p>

        <textarea
          rows="3"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="We are improving the experience for you. Please check back shortly."
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '14px 16px',
            color: '#ffffff',
            fontSize: '14px',
            lineHeight: 1.5,
            marginBottom: '16px',
            fontFamily: 'inherit'
          }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #d2ea26 0%, #a3b814 100%)',
            color: '#08090c',
            fontWeight: 800,
            fontSize: '14px',
            cursor: submitting ? 'wait' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>💾</span>
          <span>{submitting ? 'Saving Message...' : 'Save Maintenance Message'}</span>
        </button>
      </form>

      {/* CONFIRMATION MODAL 1: Enable Maintenance Mode */}
      {showEnableConfirmModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            style={{
              maxWidth: '460px',
              width: '100%',
              background: '#12141a',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ fontSize: '44px', marginBottom: '16px' }}>🚨</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px 0' }}>
              Turn ON Maintenance Mode?
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 24px 0', lineHeight: 1.55 }}>
              Are you sure you want to enable Maintenance Mode? <strong>All public visitors worldwide</strong> will immediately see the Maintenance Screen in realtime.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowEnableConfirmModal(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeToggle(true)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
                }}
              >
                🔴 Turn ON Maintenance Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL 2: Regenerate Token */}
      {showRegenConfirmModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            style={{
              maxWidth: '460px',
              width: '100%',
              background: '#12141a',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ fontSize: '44px', marginBottom: '16px' }}>🔑</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px 0' }}>
              Regenerate Preview Token?
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 24px 0', lineHeight: 1.55 }}>
              This will invalidate the existing Preview URL. Anyone previously using the old preview link will be blocked until given the new token URL.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowRegenConfirmModal(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeRegenerateToken}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#eab308',
                  color: '#08090c',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                🔄 Yes, Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSiteControls;
