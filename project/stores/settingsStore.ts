import { create } from 'zustand';

interface SettingsStore {
  trackingEnabled: boolean;
  notificationsEnabled: boolean;
  batteryOptimizationEnabled: boolean;
  toggleTracking: () => void;
  toggleNotifications: () => void;
  toggleBatteryOptimization: () => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  trackingEnabled: true,
  notificationsEnabled: true,
  batteryOptimizationEnabled: false,
  
  toggleTracking: () =>
    set((state) => ({ trackingEnabled: !state.trackingEnabled })),
  
  toggleNotifications: () =>
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  
  toggleBatteryOptimization: () =>
    set((state) => ({ batteryOptimizationEnabled: !state.batteryOptimizationEnabled })),
}));