import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, MapPin, Users, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useGeofenceStore } from '@/stores/geofenceStore';
import { AddGeofenceModal } from '@/components/AddGeofenceModal';

export default function GeofencesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { geofences, removeGeofence } = useGeofenceStore();

  const filteredGeofences = geofences.filter(
    (geofence) => geofence.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGeofenceItem = ({ item }: { item: any }) => (
    <View style={styles.geofenceCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <MapPin size={18} color={Colors.primary[600]} />
          <Text style={styles.geofenceName}>{item.name}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={18} color={Colors.gray[600]} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => removeGeofence(item.id)}
          >
            <Trash2 size={18} color={Colors.danger[500]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.geofenceDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Radius:</Text>
          <Text style={styles.detailValue}>{item.radius}m</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Center:</Text>
          <Text style={styles.detailValue}>
            {item.center.latitude.toFixed(6)}, {item.center.longitude.toFixed(6)}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Current Count:</Text>
          <View style={styles.countBadge}>
            <Users size={14} color={Colors.white} />
            <Text style={styles.countText}>{item.peopleCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Geofences</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray[400]} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search geofences"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.gray[400]}
        />
      </View>

      {geofences.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MapPin size={48} color={Colors.gray[300]} />
          <Text style={styles.emptyText}>No geofences yet</Text>
          <Text style={styles.emptySubText}>
            Create your first geofence to start tracking
          </Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => setShowAddModal(true)}
          >
            <Text style={styles.emptyButtonText}>Create Geofence</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredGeofences}
          renderItem={renderGeofenceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <AddGeofenceModal 
        visible={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray[900],
  },
  addButton: {
    backgroundColor: Colors.primary[600],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[800],
  },
  listContent: {
    padding: 16,
  },
  geofenceCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  geofenceName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray[900],
    marginLeft: 8,
  },
  cardActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  geofenceDetails: {
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
    padding: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[600],
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[800],
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[600],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray[700],
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
    marginTop: 8,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: Colors.primary[600],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
  },
  emptyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
  },
});