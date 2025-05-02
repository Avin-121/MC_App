import { create } from 'zustand';
import type { Geofence } from '@/types/geofence';

interface GeofenceStore {
  geofences: Geofence[];
  addGeofence: (geofence: Geofence) => void;
  updateGeofence: (geofence: Geofence) => void;
  removeGeofence: (id: string) => void;
}

// Initial mockup data
const initialGeofences: Geofence[] = [
  {
    id: '1',
    name: 'Office Building',
    center: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    radius: 100,
    peopleCount: 12,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Central Park',
    center: {
      latitude: 37.7739,
      longitude: -122.4312,
    },
    radius: 250,
    peopleCount: 37,
    createdAt: new Date(),
  }
];

export const useGeofenceStore = create<GeofenceStore>((set) => ({
  geofences: initialGeofences,
  
  addGeofence: (geofence: Geofence) => 
    set((state) => ({ geofences: [...state.geofences, geofence] })),
  
  updateGeofence: (updatedGeofence: Geofence) => 
    set((state) => ({
      geofences: state.geofences.map((geofence) => 
        geofence.id === updatedGeofence.id ? updatedGeofence : geofence
      ),
    })),
  
  removeGeofence: (id: string) => 
    set((state) => ({
      geofences: state.geofences.filter((geofence) => geofence.id !== id),
    })),
}));