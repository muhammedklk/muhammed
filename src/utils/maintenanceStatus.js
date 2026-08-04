import api from '../api/axios';

export const getMaintenanceMode = () => {
  try {
    return localStorage.getItem('portfolio_maintenance_status') === 'true';
  } catch (e) {
    return false;
  }
};

export const setMaintenanceMode = async (status, customMessage = '') => {
  const isON = !!status;
  try {
    // 1. Save immediately to LocalStorage for instant zero-delay persistence
    localStorage.setItem('portfolio_maintenance_status', isON ? 'true' : 'false');

    // 2. Broadcast event across all tabs & components in real-time
    window.dispatchEvent(new Event('maintenance_updated'));

    // 3. Sync to API & Database
    const profileRes = await api.get('/profile').catch(() => ({ data: {} }));
    const currentProfile = profileRes.data || {};
    const updated = {
      ...currentProfile,
      isMaintenanceMode: isON,
      ...(customMessage ? { maintenanceMessage: customMessage } : {})
    };

    await api.put('/profile', updated);
  } catch (err) {
    console.error('Error persisting maintenance mode:', err);
  }
};
