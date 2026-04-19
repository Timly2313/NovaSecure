// app/dashboard.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Shield,
  Video,
  Bell,
  Activity,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Eye,
} from 'lucide-react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GlassCard from '../../components/GlassCard';
import { hp, wp } from '../../utilities/dimensions';

const DashboardScreen = () => {
  const router = useRouter();
  const [isArmed, setIsArmed] = useState(false);
  const [cameras] = useState([
    { id: 1, name: "Front Door", status: "live", lastMotion: "2 min ago" },
    { id: 2, name: "Backyard", status: "live", lastMotion: "15 min ago" },
    { id: 3, name: "Garage", status: "offline", lastMotion: "1 hour ago" },
    { id: 4, name: "Living Room", status: "live", lastMotion: "Just now" },
  ]);

  const recentAlerts = [
    { id: 1, type: "motion", message: "Motion detected at Front Door", time: "2 min ago", severity: "warning" },
    { id: 2, type: "face", message: "Unknown face detected", time: "15 min ago", severity: "alert" },
    { id: 3, type: "activity", message: "Door opened", time: "1 hour ago", severity: "info" },
  ];

  const recentLogs = [
    { id: 1, event: "System Armed", time: "8:30 AM", type: "system" },
    { id: 2, event: "Motion Detected - Living Room", time: "7:45 AM", type: "motion" },
    { id: 3, event: "Face Recognized - John Doe", time: "7:30 AM", type: "face" },
  ];

  const activeCamerasCount = cameras.filter(c => c.status === "live").length;

  const getAlertIcon = (alert) => {
    const iconProps = { size: wp(4.5), color: '#4DB6AC' };
    
    if (alert.type === "motion") {
      return <Activity {...iconProps} color={alert.severity === "warning" ? "#F59E0B" : "#4DB6AC"} />;
    }
    if (alert.type === "face") {
      return <UserCheck {...iconProps} color="#EF4444" />;
    }
    return <AlertTriangle {...iconProps} />;
  };

  const getAlertSeverityStyle = (severity) => {
    switch (severity) {
      case "alert":
        return styles.severityAlert;
      case "warning":
        return styles.severityWarning;
      default:
        return styles.severityInfo;
    }
  };

  const getAlertBorderColor = (severity) => {
    switch (severity) {
      case "alert":
        return '#EF4444';
      case "warning":
        return '#F59E0B';
      default:
        return '#4DB6AC';
    }
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
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.secureText}>Your home is secure</Text>
            </View>
            <TouchableOpacity 
              style={styles.shieldIconContainer}
              onPress={() => router.push('/security')}
              activeOpacity={0.7}
            >
              <Shield color="#4DB6AC" size={wp(6)} />
            </TouchableOpacity>
          </View>

          {/* Camera Preview Card */}
          <TouchableOpacity 
            style={styles.cameraCardWrapper}
            onPress={() => router.push(`/camera/1`)}
            activeOpacity={0.7}
          >
            <GlassCard style={styles.cameraCard}>
              <View style={styles.cameraPreview}>
                <View style={styles.cameraIconContainer}>
                  <Video color="rgba(255,255,255,0.15)" size={wp(20)} />
                </View>
                <View style={styles.liveIndicator}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
                <View style={styles.cameraLabel}>
                  <Text style={styles.cameraLabelText}>Front Door Camera</Text>
                </View>
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push('/camera/1');
                  }}
                  activeOpacity={0.7}
                >
                  <Eye color="#4DB6AC" size={wp(5)} />
                </TouchableOpacity>
              </View>
            </GlassCard>
          </TouchableOpacity>

          {/* Status Cards Grid */}
          <View style={styles.statusGrid}>
            <GlassCard style={[styles.statusCard, styles.statusCardMargin]}>
              <View style={styles.statusHeader}>
                <View style={[styles.statusIconContainer, isArmed ? styles.armedIconBg : styles.disarmedIconBg]}>
                  <Shield color={isArmed ? "#10B981" : "#4DB6AC"} size={wp(5.5)} />
                </View>
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusLabel}>System Status</Text>
                  <Text style={[styles.statusValue, isArmed && styles.armedText]}>
                    {isArmed ? "Armed" : "Disarmed"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.armButton, isArmed ? styles.disarmButton : styles.armButtonStyle]}
                onPress={() => setIsArmed(!isArmed)}
                activeOpacity={0.7}
              >
                <Text style={[styles.armButtonText, isArmed ? styles.disarmButtonText : styles.armButtonTextStyle]}>
                  {isArmed ? "Disarm System" : "Arm System"}
                </Text>
              </TouchableOpacity>
            </GlassCard>

            <GlassCard style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <View style={[styles.statusIconContainer, styles.cameraIconBg]}>
                  <Video color="#4DB6AC" size={wp(5.5)} />
                </View>
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusLabel}>Active Cameras</Text>
                  <Text style={styles.statusValue}>{activeCamerasCount} / {cameras.length}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => router.push('/cameras')}
                activeOpacity={0.7}
              >
                <Text style={styles.viewAllButtonText}>View All Cameras</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>

          {/* AI Alerts Section */}
          <GlassCard style={styles.alertsCard}>
            <View style={styles.alertsHeader}>
              <View style={styles.alertsTitleContainer}>
                <View style={styles.sectionIconBadge}>
                  <Bell color="#4DB6AC" size={wp(5)} />
                </View>
                <Text style={styles.alertsTitle}>AI Alerts</Text>
              </View>
              <View style={styles.alertsBadge}>
                <Text style={styles.alertsCount}>{recentAlerts.length} new</Text>
              </View>
            </View>

            <View style={styles.alertsList}>
              {recentAlerts.map((alert) => (
                <TouchableOpacity
                  key={alert.id}
                  style={[styles.alertItem, { borderLeftColor: getAlertBorderColor(alert.severity) }]}
                  onPress={() => router.push(`/logs/${alert.id}`)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.alertIconContainer, getAlertSeverityStyle(alert.severity)]}>
                    {getAlertIcon(alert)}
                  </View>
                  <View style={styles.alertContent}>
                    <Text style={styles.alertMessage} numberOfLines={1}>
                      {alert.message}
                    </Text>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.criticalThreatsButton}
              onPress={() => router.push('/threat-alert')}
              activeOpacity={0.7}
            >
              <AlertTriangle color="#EF4444" size={wp(4.5)} />
              <Text style={styles.criticalThreatsText}>View Critical Threats</Text>
            </TouchableOpacity>
          </GlassCard>

          {/* Recent Activity Section */}
          <GlassCard style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityTitleContainer}>
                <View style={styles.sectionIconBadge}>
                  <Activity color="#4DB6AC" size={wp(5)} />
                </View>
                <Text style={styles.activityTitle}>Recent Activity</Text>
              </View>
              <TouchableOpacity 
                onPress={() => router.push('/logs')}
                activeOpacity={0.7}
                style={styles.viewAllLinkButton}
              >
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.activityList}>
              {recentLogs.map((log, index) => (
                <View key={log.id} style={[
                  styles.activityItem,
                  index !== recentLogs.length - 1 && styles.activityItemBorder
                ]}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityEvent}>{log.event}</Text>
                    <Text style={styles.activityTime}>{log.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </GlassCard>

          {/* Bottom Stats Grid */}
          <View style={styles.bottomStatsGrid}>
            <GlassCard style={[styles.statCard, styles.statCardMargin]}>
              <View style={styles.statContent}>
                <View style={[styles.statIconContainer, styles.successIconBg]}>
                  <CheckCircle color="#10B981" size={wp(5)} />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={styles.statLabel}>Last Check</Text>
                  <Text style={styles.statValue}>Just now</Text>
                </View>
              </View>
            </GlassCard>

            <GlassCard style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIconContainer, styles.infoIconBg]}>
                  <Activity color="#4DB6AC" size={wp(5)} />
                </View>
                <View style={styles.statTextContainer}>
                  <Text style={styles.statLabel}>Events Today</Text>
                  <Text style={styles.statValue}>12 events</Text>
                </View>
              </View>
            </GlassCard>
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
    paddingBottom: hp(2),
    backgroundColor: '#0B0E14',
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(8),
    backgroundColor: '#0B0E14',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2.5),
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  secureText: {
    fontSize: wp(3.8),
    color: '#9CA3AF',
    marginTop: hp(0.5),
  },
  shieldIconContainer: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: '#1A1F2E',
    borderWidth: 2,
    borderColor: '#4DB6AC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraCardWrapper: {
    marginBottom: hp(2.5),
  },
  cameraCard: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#1A1F2E',
  },
  cameraPreview: {
    aspectRatio: 16 / 9,
    backgroundColor: '#0B0E14',
    position: 'relative',
  },
  cameraIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveIndicator: {
    position: 'absolute',
    top: hp(1.5),
    left: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141922',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(5),
  },
  liveDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: '#EF4444',
    marginRight: wp(1.5),
  },
  liveText: {
    fontSize: wp(2.8),
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cameraLabel: {
    position: 'absolute',
    bottom: hp(1.5),
    left: wp(3),
    backgroundColor: '#141922',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: wp(5),
  },
  cameraLabelText: {
    fontSize: wp(3.5),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  eyeButton: {
    position: 'absolute',
    bottom: hp(1.5),
    right: wp(3),
    backgroundColor: '#1A1F2E',
    padding: wp(2.5),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  statusGrid: {
    flexDirection: 'row',
    marginBottom: hp(2.5),
  },
  statusCard: {
    flex: 1,
    padding: wp(4),
    backgroundColor: '#1A1F2E',
  },
  statusCardMargin: {
    marginRight: wp(3),
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  statusIconContainer: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  statusTextContainer: {
    flex: 1,
  },
  armedIconBg: {
    backgroundColor: '#1A2A1A',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  disarmedIconBg: {
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  cameraIconBg: {
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  statusLabel: {
    fontSize: wp(3.2),
    color: '#9CA3AF',
    marginBottom: hp(0.3),
  },
  statusValue: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  armedText: {
    color: '#10B981',
  },
  armButton: {
    width: '100%',
    paddingVertical: hp(1.2),
    borderRadius: wp(2.5),
    alignItems: 'center',
  },
  armButtonStyle: {
    backgroundColor: '#1A2A1A',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  disarmButton: {
    backgroundColor: '#2A1A1A',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  armButtonText: {
    fontSize: wp(3.5),
    fontWeight: '600',
  },
  armButtonTextStyle: {
    color: '#10B981',
  },
  disarmButtonText: {
    color: '#EF4444',
  },
  viewAllButton: {
    width: '100%',
    paddingVertical: hp(1.2),
    borderRadius: wp(2.5),
    alignItems: 'center',
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  viewAllButtonText: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: '#4DB6AC',
  },
  alertsCard: {
    padding: wp(4),
    marginBottom: hp(2.5),
    backgroundColor: '#1A1F2E',
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  alertsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  alertsTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertsBadge: {
    backgroundColor: '#141922',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  alertsCount: {
    fontSize: wp(3),
    fontWeight: '600',
    color: '#4DB6AC',
  },
  alertsList: {
    marginBottom: hp(2),
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3.5),
    backgroundColor: '#141922',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: '#2A2F3E',
    borderLeftWidth: wp(1),
    marginBottom: hp(1.2),
  },
  alertIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  severityAlert: {
    backgroundColor: '#2A1A1A',
  },
  severityWarning: {
    backgroundColor: '#2A251A',
  },
  severityInfo: {
    backgroundColor: '#1A1F2E',
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: wp(3.6),
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: hp(0.3),
  },
  alertTime: {
    fontSize: wp(3),
    color: '#6B7280',
  },
  criticalThreatsButton: {
    width: '100%',
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#2A1A1A',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  criticalThreatsText: {
    fontSize: wp(3.6),
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: wp(2),
  },
  activityCard: {
    padding: wp(4),
    marginBottom: hp(2.5),
    backgroundColor: '#1A1F2E',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  activityTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewAllLinkButton: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    backgroundColor: '#141922',
    borderRadius: wp(5),
  },
  viewAllLink: {
    fontSize: wp(3.2),
    color: '#4DB6AC',
    fontWeight: '600',
  },
  activityList: {
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  activityDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: '#4DB6AC',
    marginRight: wp(3),
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: wp(3.6),
    color: '#FFFFFF',
    marginBottom: hp(0.3),
  },
  activityTime: {
    fontSize: wp(3),
    color: '#6B7280',
  },
  bottomStatsGrid: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    padding: wp(4),
    backgroundColor: '#1A1F2E',
  },
  statCardMargin: {
    marginRight: wp(3),
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  statTextContainer: {
    flex: 1,
  },
  successIconBg: {
    backgroundColor: '#1A2A1A',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  infoIconBg: {
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  statLabel: {
    fontSize: wp(3.2),
    color: '#9CA3AF',
    marginBottom: hp(0.3),
  },
  statValue: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default DashboardScreen;