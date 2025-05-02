import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Plus, Minus, Target, Users } from 'lucide-react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { useGeofence } from '@/hooks/useGeofence';
import { LocationInfoCard } from '@/components/LocationInfoCard';
import { PeopleCountBadge } from '@/components/PeopleCountBadge';
import * as Location from 'expo-location';

// Only import MapView on native platforms
let MapView: any;
let Marker: any;
let Circle: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  Circle = Maps.Circle;
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const badgeScale = useSharedValue(1);
  
  const { activeGeofence, inGeofence, peopleCount } = useGeofence(location);

  useEffect(() => {
    badgeScale.value = withSpring(1.2, { damping: 10 });
    setTimeout(() => {
      badgeScale.value = withSpring(1, { damping: 12 });
    }, 300);
  }, [peopleCount]);

  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: badgeScale.value }],
    };
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
    })();

    const locationSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 5,
      },
      (newLocation) => {
        setLocation(newLocation);
      }
    );

    return () => {
      locationSubscription.then(sub => sub.remove());
    };
  }, []);

  const centerOnUser = () => {
    if (location && mapRef.current && Platform.OS !== 'web') {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.webMapText}>Map view is not available on web platform</Text>
          {location && (
            <Text style={styles.webLocationText}>
              Current Location: {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
            </Text>
          )}
        </View>
      );
    }

    if (!location || Platform.OS === 'web') return null;

    return (
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass
        rotateEnabled
      >
        {activeGeofence && Platform.OS !== 'web' && (
          <Circle
            center={activeGeofence.center}
            radius={activeGeofence.radius}
            strokeWidth={2}
            strokeColor={Colors.primary[500]}
            fillColor={inGeofence ? Colors.primary[200] + '40' : Colors.gray[200] + '20'}
          />
        )}
      </MapView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.mapContainer}>
        {renderMap()}
        
        {Platform.OS !== 'web' && (
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.mapButton} onPress={centerOnUser}>
              <Target size={22} color={Colors.primary[700]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton} onPress={() => mapRef.current?.zoomIn()}>
              <Plus size={22} color={Colors.primary[700]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton} onPress={() => mapRef.current?.zoomOut()}>
              <Minus size={22} color={Colors.primary[700]} />
            </TouchableOpacity>
          </View>
        )}

        <Animated.View style={[styles.countBadgeContainer, animatedBadgeStyle]}>
          <PeopleCountBadge count={peopleCount} />
        </Animated.View>
      </View>

      <LocationInfoCard 
        isLoading={isLoading}
        location={location}
        inGeofence={inGeofence}
        geofenceName={activeGeofence?.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    padding: 20,
  },
  webMapText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[600],
    marginBottom: 12,
  },
  webLocationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: 'transparent',
  },
  mapButton: {
    backgroundColor: Colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  countBadgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
});