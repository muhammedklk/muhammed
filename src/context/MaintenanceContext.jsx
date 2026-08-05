import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('We are improving the experience for you. Please check back shortly.');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [updatedBy, setUpdatedBy] = useState('Admin');
  const [loading, setLoading] = useState(true);

  const [previewToken, setPreviewToken] = useState('');
  const [fullPreviewUrl, setFullPreviewUrl] = useState('');
  const [isPreviewAuthorized, setIsPreviewAuthorized] = useState(false);

  // Check URL query params for ?preview=<token> on load
  const checkPreviewTokenAuthorization = useCallback(async (tokenFromUrl) => {
    try {
      const storedToken = sessionStorage.getItem('preview_auth_token');
      const tokenToValidate = tokenFromUrl || storedToken;

      if (!tokenToValidate) {
        setIsPreviewAuthorized(false);
        return false;
      }

      const res = await api.get(`/settings/validate-preview?token=${encodeURIComponent(tokenToValidate)}`);
      if (res && res.data && res.data.valid) {
        sessionStorage.setItem('preview_auth_token', tokenToValidate);
        setIsPreviewAuthorized(true);
        return true;
      } else {
        if (tokenFromUrl) {
          sessionStorage.removeItem('preview_auth_token');
        }
        setIsPreviewAuthorized(false);
        return false;
      }
    } catch (_) {
      setIsPreviewAuthorized(false);
      return false;
    }
  }, []);

  // Sync settings with MongoDB / API
  const fetchSettings = useCallback(async () => {
    try {
      const res = await api.get('/settings');
      if (res && res.data) {
        const mode = !!res.data.maintenanceMode;
        setIsMaintenanceMode(mode);
        if (res.data.maintenanceMessage) setMaintenanceMessage(res.data.maintenanceMessage);
        if (res.data.updatedAt) setUpdatedAt(res.data.updatedAt);
        if (res.data.updatedBy) setUpdatedBy(res.data.updatedBy);

        localStorage.setItem('portfolio_realtime_maintenance', mode ? 'true' : 'false');
        window.dispatchEvent(new Event('maintenance_realtime_event'));
      }
    } catch (err) {
      console.error('Error fetching site settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch admin preview token
  const fetchPreviewToken = useCallback(async () => {
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) return;

    try {
      const res = await api.get('/settings/preview-token');
      if (res && res.data) {
        setPreviewToken(res.data.previewToken || '');
        setFullPreviewUrl(res.data.fullPreviewUrl || '');
        if (res.data.updatedAt) setUpdatedAt(res.data.updatedAt);
        if (res.data.updatedBy) setUpdatedBy(res.data.updatedBy);
      }
    } catch (err) {
      console.error('Error fetching preview token:', err);
    }
  }, []);

  // Toggle Maintenance Mode (Admin)
  const toggleMaintenanceMode = async (newStatus, customMsg) => {
    try {
      const res = await api.put('/settings/maintenance', {
        maintenanceMode: newStatus,
        ...(customMsg ? { maintenanceMessage: customMsg } : {})
      });

      setIsMaintenanceMode(newStatus);
      if (customMsg) setMaintenanceMessage(customMsg);
      if (res.data?.setting?.updatedAt) setUpdatedAt(res.data.setting.updatedAt);
      if (res.data?.setting?.updatedBy) setUpdatedBy(res.data.setting.updatedBy);

      localStorage.setItem('portfolio_realtime_maintenance', newStatus ? 'true' : 'false');
      window.dispatchEvent(new Event('maintenance_realtime_event'));
      return res.data;
    } catch (err) {
      console.error('Failed to update maintenance status:', err);
      throw err;
    }
  };

  // Regenerate Preview Token (Admin)
  const regeneratePreviewToken = async () => {
    try {
      const res = await api.post('/settings/regenerate-preview');
      if (res && res.data) {
        setPreviewToken(res.data.previewToken || '');
        setFullPreviewUrl(res.data.fullPreviewUrl || '');
        if (res.data.updatedAt) setUpdatedAt(res.data.updatedAt);
        if (res.data.updatedBy) setUpdatedBy(res.data.updatedBy);
      }
      return res.data;
    } catch (err) {
      console.error('Failed to regenerate preview token:', err);
      throw err;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchSettings();
    fetchPreviewToken();

    // Check URL search query for ?preview=...
    const urlParams = new URLSearchParams(window.location.search);
    const tokenInUrl = urlParams.get('preview');
    if (tokenInUrl) {
      checkPreviewTokenAuthorization(tokenInUrl);
    } else {
      checkPreviewTokenAuthorization(null);
    }

    // ⚡ Realtime Polling (2000ms / 2s loop)
    const intervalId = setInterval(fetchSettings, 2000);

    // ⚡ Instant tab-to-tab sync listeners
    const handleStorageChange = (e) => {
      if (e.key === 'portfolio_realtime_maintenance' || !e.key) {
        fetchSettings();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSettings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('maintenance_realtime_event', fetchSettings);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('maintenance_realtime_event', fetchSettings);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchSettings, fetchPreviewToken, checkPreviewTokenAuthorization]);

  return (
    <MaintenanceContext.Provider
      value={{
        isMaintenanceMode,
        maintenanceMessage,
        updatedAt,
        updatedBy,
        loading,
        previewToken,
        fullPreviewUrl,
        isPreviewAuthorized,
        toggleMaintenanceMode,
        regeneratePreviewToken,
        fetchSettings,
        fetchPreviewToken
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
};
