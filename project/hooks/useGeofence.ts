import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useGeofenceStore } from '@/stores/geofenceStore';
import { calculateDistance } from '@/utils/locationUtils';

export function useGeofence(location: Location.LocationObject | null) {
  const [activeGeofence, setActiveGeofence] = useState<any>(null);
  const [inGeofence, setInGeofence] = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  
  const { geofences, updateGeofence } = useGeofenceStore();

  useEffect(() => {
    if (!location) return;

    // Check if user is in any geofence
    let foundInGeofence = false;
    let closestGeofence = null;
    let minDistance = Infinity;

    geofences.forEach(geofence => {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        geofence.center.latitude,
        geofence.center.longitude
      );

      // Update closest geofence
      if (distance < minDistance) {
        minDistance = distance;
        closestGeofence = geofence;
      }

      // Check if inside geofence
      if (distance <= geofence.radius) {
        foundInGeofence = true;
        
        // Only increment people count if we weren't in this geofence before
        if (activeGeofence?.id !== geofence.id || !inGeofence) {
          const updatedGeofence = {
            ...geofence,
            peopleCount: geofence.peopleCount + 1
          };
          updateGeofence(updatedGeofence);
          setPeopleCount(updatedGeofence.peopleCount);
        } else {
          setPeopleCount(geofence.peopleCount);
        }
        
        setActiveGeofence(geofence);
      }
    });

    // If not in any geofence but we have geofences, show the closest one
    if (!foundInGeofence && closestGeofence) {
      setActiveGeofence(closestGeofence);
      setPeopleCount(closestGeofence.peopleCount);
    }

    // Update geofence status
    setInGeofence(foundInGeofence);

    // If we just left a geofence, set people count to 1 (just the user)
    if (!foundInGeofence && inGeofence) {
      setPeopleCount(1);
    } else if (!foundInGeofence && !inGeofence) {
      // Default people count to 1 when outside all geofences
      setPeopleCount(1);
    }
  }, [location, geofences]);

  return {
    activeGeofence,
    inGeofence,
    peopleCount,
  };
}