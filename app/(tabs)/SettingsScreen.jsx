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
                  <User color="#FFFFFF" size={wp(7)} />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>John Doe</Text>
                  <Text style={styles.profileEmail}>john.doe@email.com</Text>
                </View>
                <View style={styles.profileChevron}>
                  <ChevronRight color="#6B7280" size={wp(4.5)} />
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>

          {/* Notification Settings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBadge}>
                <Bell color="#4DB6AC" size={wp(4.5)} />
              </View>
              <Text style={styles.sectionTitle}>Notification Settings</Text>
            </View>
            
            <GlassCard style={styles.settingsCard}>
              {notificationItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <View key={item.key} style={[
                    styles.settingItem,
                    index !== notificationItems.length - 1 && styles.settingItemBorder
                  ]}>
                    <View style={styles.settingItemLeft}>
                      <View style={styles.settingIconContainer}>
                        <IconComponent color="#4DB6AC" size={wp(4.5)} />
                      </View>
                      <Text style={styles.settingItemLabel}>{item.label}</Text>
                    </View>
                    <Switch
                      value={notifications[item.key]}
                      onValueChange={() => handleNotificationToggle(item.key)}
                      trackColor={{ false: '#2A2F3E', true: '#4DB6AC' }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="#2A2F3E"
                    />
                  </View>
                );
              })}
            </GlassCard>
          </View>

          {/* Device Management Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBadge}>
                <Video color="#4DB6AC" size={wp(4.5)} />
              </View>
              <Text style={styles.sectionTitle}>Device Management</Text>
            </View>
            
            <GlassCard style={styles.settingsCard}>
              {devices.map((device, index) => (
                <TouchableOpacity
                  key={device.name}
                  style={[
                    styles.deviceItem,
                    index !== devices.length - 1 && styles.deviceItemBorder
                  ]}
                  onPress={() => handleDevicePress(device)}
                  activeOpacity={0.7}
                >
                  <View style={styles.deviceInfo}>
                    <View style={styles.deviceIconContainer}>
                      {device.type === "Drone" ? (
                        <Shield color="#4DB6AC" size={wp(4.5)} />
                      ) : (
                        <Video color="#4DB6AC" size={wp(4.5)} />
                      )}
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
                    <ChevronRight color="#4B5563" size={wp(4)} style={styles.deviceChevron} />
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
              <View style={styles.sectionIconBadge}>
                <Shield color="#4DB6AC" size={wp(4.5)} />
              </View>
              <Text style={styles.sectionTitle}>Security Settings</Text>
            </View>
            
            <GlassCard style={styles.settingsCard}>
              <TouchableOpacity
                style={[styles.securityItem, styles.securityItemBorder]}
                onPress={() => router.push('/security/password')}
                activeOpacity={0.7}
              >
                <View style={styles.securityItemLeft}>
                  <View style={styles.settingIconContainer}>
                    <Lock color="#4DB6AC" size={wp(4.5)} />
                  </View>
                  <Text style={styles.securityItemLabel}>Change Password</Text>
                </View>
                <ChevronRight color="#4B5563" size={wp(4.5)} />
              </TouchableOpacity>

              <View style={[styles.securityItem, styles.securityItemBorder]}>
                <View style={styles.securityItemLeft}>
                  <View style={styles.settingIconContainer}>
                    <Smartphone color="#4DB6AC" size={wp(4.5)} />
                  </View>
                  <Text style={styles.securityItemLabel}>Two-Factor Authentication</Text>
                </View>
                <Switch
                  value={twoFactor}
                  onValueChange={() => setTwoFactor(!twoFactor)}
                  trackColor={{ false: '#2A2F3E', true: '#4DB6AC' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#2A2F3E"
                />
              </View>

              <TouchableOpacity
                style={styles.securityItem}
                activeOpacity={0.7}
              >
                <View style={styles.securityItemLeft}>
                  <View style={styles.settingIconContainer}>
                    <Key color="#4DB6AC" size={wp(4.5)} />
                  </View>
                  <Text style={styles.securityItemLabel}>Biometric Login</Text>
                </View>
                <ChevronRight color="#4B5563" size={wp(4.5)} />
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
    backgroundColor: '#0B0E14',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: hp(4),
    backgroundColor: '#0B0E14',
  },
  container: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    backgroundColor: '#0B0E14',
  },
  header: {
    marginBottom: hp(2.5),
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: wp(3.8),
    color: '#9CA3AF',
    marginTop: hp(0.5),
  },
  profileCardWrapper: {
    marginBottom: hp(2.5),
  },
  profileCard: {
    padding: wp(4),
    backgroundColor: '#1A1F2E',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: '#4DB6AC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: hp(0.3),
  },
  profileEmail: {
    fontSize: wp(3.5),
    color: '#9CA3AF',
  },
  profileChevron: {
    padding: wp(2),
    backgroundColor: '#141922',
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: '#2A2F3E',
  },
  section: {
    marginBottom: hp(2.5),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  sectionIconBadge: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: '#141922',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.5),
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingsCard: {
    padding: 0,
    backgroundColor: '#1A1F2E',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: '#141922',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  settingItemLabel: {
    fontSize: wp(3.8),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  deviceItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
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
    backgroundColor: '#141922',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: wp(3.8),
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: hp(0.3),
  },
  deviceType: {
    fontSize: wp(3.2),
    color: '#9CA3AF',
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
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
    marginRight: wp(2),
  },
  statusTextOnline: {
    color: '#10B981',
  },
  statusTextOffline: {
    color: '#EF4444',
  },
  deviceChevron: {
    marginLeft: wp(1),
  },
  addDeviceButton: {
    paddingVertical: hp(1.8),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A2F3E',
  },
  addDeviceButtonText: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: '#4DB6AC',
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
  },
  securityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  securityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityItemLabel: {
    fontSize: wp(3.8),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  logoutButtonWrapper: {
    marginBottom: hp(2.5),
  },
  logoutCard: {
    padding: wp(4),
    backgroundColor: '#1A1F2E',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.2),
  },
  logoutButtonText: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: wp(2.5),
  },
  footer: {
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  footerText: {
    fontSize: wp(3.2),
    color: '#6B7280',
    marginTop: hp(0.5),
  },
});

export default SettingsScreen;