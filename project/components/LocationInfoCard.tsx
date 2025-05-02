import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface LocationInfoCardProps {
  isLoading: boolean;
  location: Location.LocationObject | null;
  inGeofence: boolean;
  geofenceName?: string;
}

export const LocationInfoCard: React.FC<LocationInfoCardProps> = ({
  isLoading,
  location,
  inGeofence,
  geofenceName,
}) => {
  if (isLoading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="small" color={Colors.primary[600]} />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Location unavailable</Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.card,
        inGeofence ? styles.inGeofenceCard : styles.outsideGeofenceCard,
      ]}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
    >
      <View style={styles.locationHeader}>
        <MapPin size={18} color={inGeofence ? Colors.primary[600] : Colors.gray[600]} />
        <Text style={styles.locationHeaderText}>
          {inGeofence 
            ? `Inside: ${geofenceName || 'Geofence'}`
            : 'Outside Geofence'}
        </Text>
      </View>

      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesLabel}>Current Location</Text>
        <Text style={styles.coordinates}>
          {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
        </Text>
      </View>

      {inGeofence && (
        <View style={styles.geofenceStatusContainer}>
          <View style={styles.statusIndicator} />
          <Text style={styles.geofenceStatusText}>Tracking Active</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inGeofenceCard: {
    borderTopWidth: 3,
    borderTopColor: Colors.primary[500],
  },
  outsideGeofenceCard: {
    borderTopWidth: 3,
    borderTopColor: Colors.gray[300],
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationHeaderText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
    color: Colors.gray[900],
  },
  coordinatesContainer: {
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  coordinatesLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[600],
    marginBottom: 4,
  },
  coordinates: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[800],
  },
  geofenceStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success[500],
    marginRight: 8,
  },
  geofenceStatusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.success[600],
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
    marginTop: 8,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.danger[600],
  },
});