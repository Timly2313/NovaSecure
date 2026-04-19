// app/settings.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Bell,
  Video,
  Shield,
  ChevronRight,
  LogOut,
  Lock,
  Smartphone,
  Key,
} from 'lucide-react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GlassCard from '../../components/GlassCard';
import { hp, wp } from '../../utilities/dimensions';

const SettingsScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    motion: true,
    face: true,
    door: true,
    system: false,
  });
  const [twoFactor, setTwoFactor] = useState(false);

  const devices = [
    { name: "Front Door Camera", status: "Online", type: "Camera", id: "1" },
    { name: "Backyard Camera", status: "Online", type: "Camera", id: "2" },
    { name: "Living Room Camera", status: "Online", type: "Camera", id: "4" },
    { name: "Garage Camera", status: "Offline", type: "Camera", id: "3" },
    { name: "ESP32 Drone", status: "Online", type: "Drone", id: "drone" },
  ];

  const notificationItems = [
    { key: "motion", label: "Motion Detection", icon: Video },
    { key: "face", label: "Face Recognition", icon: User },
    { key: "door", label: "Door Events", icon: Shield },
    { key: "system", label: "System Alerts", icon: Bell },
  ];

  const handleLogout = () => {
    router.push('/signin');
  };

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleDevicePress = (device) => {
    if (device.type === "Camera") {
      router.push(`/camera/${device.id}`);
    } else {
      router.push('/drone');
    }
  };

  const handleAddDevice = () => {
    console.log('Add new device');
    // Navigate to add device screen or show modal
  };

  return (
    <ScreenWrapper bg="#0B0E14">
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>Manage your preferences</Text>
            </View>
          </View>

          {/* Profile Card */}
          <TouchableOpacity 
            style={styles.profileCardWrapper}
            onPress={() => router.push('/profile/edit')}
            activeOpacity={0.7}
          >
            <GlassCard style={styles.profileCard}>
              <View style={styles.profileContent}>
                <View style={styles.profileAvatar}>
                  <User color="#FFFFFF" size={wp(8)} />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>John Doe</Text>
                  <Text style={styles.profileEmail}>john.doe@email.com</Text>
                </View>
                <View style={styles.profileChevron}>
                  <ChevronRight color="#9CA3AF" size={wp(5)} />
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>

          {/* Notification Settings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Bell color="#4DB6AC" size={wp(5)} />
              <Text style={styles.sectionTitle}>Notification Settings</Text>
            </View>
            
            <GlassCard style={styles.settingsCard}>
              {notificationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <View key={item.key} style={styles.settingItem}>
                    <View style={styles.settingItemLeft}>
                      <IconComponent color="#4DB6AC" size={wp(5)} />
                      <Text style={styles.settingItemLabel}>{item.label}</Text>
                    </View>
                    <Switch
                      value={notifications[item.key]}
                      onValueChange={() => handleNotificationToggle(item.key)}
                      trackColor={{ false: '#4B5563', true: '#4DB6AC' }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="#4B5563"
                    />
                  </View>
                );
              })}
            </GlassCard>
          </View>

          {/* Device Management Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Video color="#4DB6AC" size={wp(5)} />
              <Text style={styles.sectionTitle}>Device Management</Text>
            </View>
            
            <GlassCard style={styles.settingsCard}>
              {devices.map((device) => (
                <TouchableOpacity
                  key={device.name}
                  style={styles.deviceItem}
                  onPress={() => handleDevicePress(device)}
                  activeOpacity={0.7}
                >
                  <View style={styles.deviceInfo}>
                    <View style={styles.deviceIconContainer}>
                      <Video color="#4DB6AC" size={wp(5)} />
                    </View>
                    <View style={styles.deviceDetails}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      <Text style={styles.deviceType}>{device.type}</Text>
                    </View>
                  </View>
                  <View style={styles.deviceStatus}>
                    <View style={[
                      styles.statusDot,
                      device.status === "Online" ? styles.statusOnline : styles.statusOffline
                    ]} />
                    <Text style={[
                      styles.statusText,
                      device.status === "Online" ? styles.statusTextOnline : styles.statusTextOffline
                    ]}>
                      {device.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.addDeviceButton}
                onPress={handleAddDevice}
                activeOpacity={0.7}
              >
                <Text style={styles.addDeviceButtonText}>+ Add New Device</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>

          {/* Security Settings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield color="#4DB6AC" size={wp(5)} />
              <Text style={styles.sectionTitle}>Security Settings</Text>
            </View>
            
            <GlassCard style={styles.settingsCard}>
              <TouchableOpacity
                style={styles.securityItem}
                onPress={() => router.push('/security/password')}
                activeOpacity={0.7}
              >
                <View style={styles.securityItemLeft}>
                  <Lock color="#4DB6AC" size={wp(5)} />
                  <Text style={styles.securityItemLabel}>Change Password</Text>
                </View>
                <ChevronRight color="#9CA3AF" size={wp(5)} />
              </TouchableOpacity>

              <View style={styles.securityItem}>
                <View style={styles.securityItemLeft}>
                  <Smartphone color="#4DB6AC" size={wp(5)} />
                  <Text style={styles.securityItemLabel}>Two-Factor Authentication</Text>
                </View>
                <Switch
                  value={twoFactor}
                  onValueChange={() => setTwoFactor(!twoFactor)}
                  trackColor={{ false: '#4B5563', true: '#4DB6AC' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#4B5563"
                />
              </View>

              <TouchableOpacity
                style={styles.securityItem}
                activeOpacity={0.7}
              >
                <View style={styles.securityItemLeft}>
                  <Key color="#4DB6AC" size={wp(5)} />
                  <Text style={styles.securityItemLabel}>Biometric Login</Text>
                </View>
                <ChevronRight color="#9CA3AF" size={wp(5)} />
              </TouchableOpacity>
            </GlassCard>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButtonWrapper}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <GlassCard style={styles.logoutCard}>
              <View style={styles.logoutButton}>
                <LogOut color="#EF4444" size={wp(5)} />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </View>
            </GlassCard>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Nova Secure AI v1.0.0</Text>
            <Text style={styles.footerText}>© 2026 All rights reserved</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: hp(4),
  },
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    
  },
  header: {
    marginBottom: hp(2),
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: wp(6),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: wp(3.5),
    color: '#9CA3AF',
    marginTop: hp(0.5),
  },
  profileCardWrapper: {
    marginBottom: hp(2),
  },
  profileCard: {
    padding: wp(4),
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: '#4DB6AC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  profileEmail: {
    fontSize: wp(3.5),
    color: '#9CA3AF',
    marginTop: hp(0.5),
  },
  profileChevron: {
    padding: wp(2),
    backgroundColor: '#141922',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.2)',
  },
  section: {
    marginBottom: hp(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  sectionTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: wp(2),
  },
  settingsCard: {
    padding: wp(4),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    backgroundColor: '#141922',
    borderRadius: wp(3),
    marginBottom: hp(1),
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemLabel: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: wp(3),
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    backgroundColor: '#141922',
    borderRadius: wp(3),
    marginBottom: hp(1),
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  deviceType: {
    fontSize: wp(3),
    color: '#9CA3AF',
    marginTop: hp(0.25),
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    marginRight: wp(2),
  },
  statusOnline: {
    backgroundColor: '#10B981',
  },
  statusOffline: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: wp(3.5),
    fontWeight: '500',
  },
  statusTextOnline: {
    color: '#10B981',
  },
  statusTextOffline: {
    color: '#EF4444',
  },
  addDeviceButton: {
    width: '100%',
    paddingVertical: hp(1.5),
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.2)',
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  addDeviceButtonText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#4DB6AC',
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    backgroundColor: '#141922',
    borderRadius: wp(3),
    marginBottom: hp(1),
  },
  securityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityItemLabel: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: wp(3),
  },
  logoutButtonWrapper: {
    marginBottom: hp(2),
  },
  logoutCard: {
    padding: wp(4),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.5),
  },
  logoutButtonText: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: wp(2),
  },
  footer: {
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  footerText: {
    fontSize: wp(3),
    color: '#9CA3AF',
    marginTop: hp(0.5),
  },
});

export default SettingsScreen;