import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, MapPin, Clock, Battery, Smartphone, Shield, Info, ChevronRight, User 
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useSettingsStore } from '@/stores/settingsStore';

export default function SettingsScreen() {
  const { 
    trackingEnabled, 
    notificationsEnabled, 
    batteryOptimizationEnabled,
    toggleTracking,
    toggleNotifications,
    toggleBatteryOptimization
  } = useSettingsStore();

  const renderSettingItem = (
    icon: React.ReactNode, 
    title: string, 
    description: string, 
    value: boolean, 
    onToggle: () => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.gray[300], true: Colors.primary[500] }}
        thumbColor={Colors.white}
      />
    </View>
  );

  const renderLinkItem = (icon: React.ReactNode, title: string) => (
    <TouchableOpacity style={styles.linkItem}>
      <View style={styles.linkIcon}>{icon}</View>
      <Text style={styles.linkTitle}>{title}</Text>
      <ChevronRight size={18} color={Colors.gray[400]} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <User size={24} color={Colors.white} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>User1234</Text>
            <Text style={styles.profileStatus}>Active</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tracking</Text>
        
        {renderSettingItem(
          <MapPin size={22} color={Colors.primary[600]} />,
          'Location Tracking',
          'Allow app to track your location in background',
          trackingEnabled,
          toggleTracking
        )}
        
        {renderSettingItem(
          <Bell size={22} color={Colors.primary[600]} />,
          'Push Notifications',
          'Receive alerts for geofence events',
          notificationsEnabled,
          toggleNotifications
        )}
        
        {renderSettingItem(
          <Battery size={22} color={Colors.primary[600]} />,
          'Battery Optimization',
          'Reduce tracking frequency to save battery',
          batteryOptimizationEnabled,
          toggleBatteryOptimization
        )}

        <Text style={styles.sectionTitle}>App</Text>
        
        {renderLinkItem(
          <Smartphone size={22} color={Colors.primary[600]} />,
          'App Preferences'
        )}
        
        {renderLinkItem(
          <Shield size={22} color={Colors.primary[600]} />,
          'Privacy Settings'
        )}
        
        {renderLinkItem(
          <Info size={22} color={Colors.primary[600]} />,
          'About'
        )}

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
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
  scrollContent: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray[900],
  },
  profileStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.success[600],
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[700],
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[900],
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
    marginTop: 2,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  linkIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[900],
    marginLeft: 12,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
  },
});