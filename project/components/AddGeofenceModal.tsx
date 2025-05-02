import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { X } from 'lucide-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { useGeofenceStore } from '@/stores/geofenceStore';
import * as Location from 'expo-location';

interface AddGeofenceModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddGeofenceModal: React.FC<AddGeofenceModalProps> = ({ 
  visible, 
  onClose 
}) => {
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('100');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addGeofence } = useGeofenceStore();

  const handleGetCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setIsLoading(false);
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (err) {
      setError('Error getting location');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGeofence = () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (!location) {
      setError('Please get your current location');
      return;
    }

    const parsedRadius = parseInt(radius, 10);
    if (isNaN(parsedRadius) || parsedRadius <= 0) {
      setError('Please enter a valid radius');
      return;
    }

    // Create new geofence
    const newGeofence = {
      id: Date.now().toString(),
      name: name.trim(),
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      radius: parsedRadius,
      peopleCount: 1, // Start with 1 (the user)
      createdAt: new Date(),
    };

    addGeofence(newGeofence);
    
    // Reset form
    setName('');
    setRadius('100');
    setLocation(null);
    
    // Close modal
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Geofence</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={22} color={Colors.gray[600]} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Text style={styles.inputLabel}>Geofence Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="E.g., Office Building"
              placeholderTextColor={Colors.gray[400]}
            />

            <Text style={styles.inputLabel}>Radius (meters)</Text>
            <TextInput
              style={styles.textInput}
              value={radius}
              onChangeText={setRadius}
              placeholder="100"
              keyboardType="numeric"
              placeholderTextColor={Colors.gray[400]}
            />

            <Text style={styles.sectionTitle}>Location</Text>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={handleGetCurrentLocation}
              disabled={isLoading}
            >
              <Text style={styles.locationButtonText}>
                {isLoading ? 'Getting Location...' : 'Use Current Location'}
              </Text>
            </TouchableOpacity>

            {location && (
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Selected Location:</Text>
                <Text style={styles.locationCoordinates}>
                  {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.createButton]} 
              onPress={handleCreateGeofence}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray[900],
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 16,
  },
  errorContainer: {
    backgroundColor: Colors.danger[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.danger[200],
  },
  errorText: {
    color: Colors.danger[700],
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[700],
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[900],
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray[900],
    marginBottom: 12,
  },
  locationButton: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  locationButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.primary[700],
  },
  locationInfo: {
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[600],
    marginBottom: 4,
  },
  locationCoordinates: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[900],
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.gray[100],
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[700],
  },
  createButton: {
    backgroundColor: Colors.primary[600],
    marginLeft: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
  },
});