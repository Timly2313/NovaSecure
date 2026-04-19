// app/drone.jsx
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
  Plane,
  Battery,
  Video,
  Play,
  Square,
  MapPin,
  Navigation,
  Wifi,
} from 'lucide-react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GlassCard from '../../components/GlassCard';
import { hp, wp } from '../../utilities/dimensions';

const DroneScreen = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(true);
  const [isPatrolling, setIsPatrolling] = useState(false);
  const [batteryLevel] = useState(85);

  const droneStats = [
    { label: "Altitude", value: "12m", icon: Navigation },
    { label: "Distance", value: "45m", icon: MapPin },
    { label: "Signal", value: "Strong", icon: Wifi },
  ];

  const getBatteryColor = () => {
    if (batteryLevel > 50) return "#10B981";
    if (batteryLevel > 20) return "#F59E0B";
    return "#EF4444";
  };

  const handlePatrolToggle = () => {
    if (isConnected) {
      setIsPatrolling(!isPatrolling);
    }
  };

  const handleManualControl = () => {
    if (isConnected) {
      console.log('Manual control activated');
    }
  };

  const handleReturnHome = () => {
    if (isConnected) {
      console.log('Returning to home');
    }
  };

  const handleDirectionControl = (direction) => {
    if (isConnected) {
      console.log(`Moving ${direction}`);
    }
  };

  const handleRotate = (direction) => {
    if (isConnected) {
      console.log(`Rotating ${direction}`);
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
              <Text style={styles.headerTitle}>ESP32 Drone</Text>
              <View style={styles.connectionStatusContainer}>
                <View style={[
                  styles.connectionDot, 
                  isConnected ? styles.connectedDot : styles.disconnectedDot
                ]} />
                <Text style={[
                  styles.connectionStatus,
                  isConnected ? styles.connectedText : styles.disconnectedText
                ]}>
                  {isConnected ? "Connected" : "Disconnected"}
                </Text>
              </View>
            </View>
            <View style={styles.headerIconContainer}>
              <Plane color="#4DB6AC" size={wp(6)} />
            </View>
          </View>

          {/* Camera Feed Card */}
          <GlassCard style={styles.cameraCard}>
            <View style={styles.cameraPreview}>
              <View style={styles.cameraIconContainer}>
                <Video color="#4DB6AC" size={wp(16)} opacity={0.3} />
              </View>
              
              {isConnected && (
                <>
                  <View style={styles.liveIndicator}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                  <View style={styles.batteryIndicator}>
                    <Battery color={getBatteryColor()} size={wp(4.5)} />
                    <Text style={[styles.batteryText, { color: getBatteryColor() }]}>
                      {batteryLevel}%
                    </Text>
                  </View>
                </>
              )}
              
              {!isConnected && (
                <View style={styles.offlineOverlay}>
                  <Text style={styles.offlineText}>Drone Offline</Text>
                </View>
              )}
            </View>
          </GlassCard>

          {/* Drone Stats Grid */}
          <View style={styles.statsGrid}>
            {droneStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <GlassCard 
                  key={stat.label} 
                  style={[
                    styles.statCard,
                    index < droneStats.length - 1 && styles.statCardMargin
                  ]}
                >
                  <View style={styles.statContent}>
                    <View style={styles.statIconContainer}>
                      <IconComponent color="#4DB6AC" size={wp(5)} />
                    </View>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                  </View>
                </GlassCard>
              );
            })}
          </View>

          {/* Quick Actions Card */}
          <GlassCard style={styles.quickActionsCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBadge}>
                <Play color="#4DB6AC" size={wp(4.5)} />
              </View>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[
                  styles.patrolButton,
                  isPatrolling ? styles.stopPatrolButton : styles.startPatrolButton,
                  !isConnected && styles.disabledButton
                ]}
                onPress={handlePatrolToggle}
                disabled={!isConnected}
                activeOpacity={0.7}
              >
                {isPatrolling ? (
                  <>
                    <Square color="#EF4444" size={wp(4.5)} />
                    <Text style={[styles.patrolButtonText, styles.stopPatrolText]}>
                      Stop Surveillance Patrol
                    </Text>
                  </>
                ) : (
                  <>
                    <Play color="#10B981" size={wp(4.5)} />
                    <Text style={[styles.patrolButtonText, styles.startPatrolText]}>
                      Start Surveillance Patrol
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.manualControlButton,
                  !isConnected && styles.disabledButton
                ]}
                onPress={handleManualControl}
                disabled={!isConnected}
                activeOpacity={0.7}
              >
                <Text style={styles.manualControlText}>Manual Control</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.returnHomeButton,
                  !isConnected && styles.disabledButton
                ]}
                onPress={handleReturnHome}
                disabled={!isConnected}
                activeOpacity={0.7}
              >
                <Text style={styles.returnHomeText}>Return to Home</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* Manual Control Pad */}
          <GlassCard style={styles.controlPadCard}>
            <View style={styles.controlPadHeader}>
              <Text style={styles.controlPadTitle}>Manual Control</Text>
              {!isConnected && (
                <View style={styles.offlineBadge}>
                  <Text style={styles.offlineBadgeText}>Offline</Text>
                </View>
              )}
            </View>
            
            <View style={styles.controlPadContainer}>
              <View style={styles.controlPadOuter}>
                <View style={styles.controlPadInner} />

                {/* Up Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.upButton, !isConnected && styles.directionDisabled]}
                  onPress={() => handleDirectionControl('forward')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowUp} />
                </TouchableOpacity>

                {/* Down Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.downButton, !isConnected && styles.directionDisabled]}
                  onPress={() => handleDirectionControl('backward')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowDown} />
                </TouchableOpacity>

                {/* Left Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.leftButton, !isConnected && styles.directionDisabled]}
                  onPress={() => handleDirectionControl('left')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowLeft} />
                </TouchableOpacity>

                {/* Right Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.rightButton, !isConnected && styles.directionDisabled]}
                  onPress={() => handleDirectionControl('right')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowRight} />
                </TouchableOpacity>

                {/* Center Drone Icon */}
                <View style={[styles.centerDroneIcon, !isConnected && styles.centerDroneDisabled]}>
                  <Plane color={isConnected ? "#4DB6AC" : "#6B7280"} size={wp(7)} />
                </View>
              </View>
            </View>

            {/* Rotation Controls */}
            <View style={styles.rotationControls}>
              <TouchableOpacity
                style={[
                  styles.rotateButton,
                  !isConnected && styles.rotateDisabled
                ]}
                onPress={() => handleRotate('left')}
                disabled={!isConnected}
                activeOpacity={0.7}
              >
                <Text style={[styles.rotateButtonText, !isConnected && styles.rotateTextDisabled]}>
                  Rotate Left
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.rotateButton,
                  !isConnected && styles.rotateDisabled
                ]}
                onPress={() => handleRotate('right')}
                disabled={!isConnected}
                activeOpacity={0.7}
              >
                <Text style={[styles.rotateButtonText, !isConnected && styles.rotateTextDisabled]}>
                  Rotate Right
                </Text>
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* Connection Status Card */}
          <GlassCard style={styles.connectionCard}>
            <View style={styles.connectionCardContent}>
              <View style={styles.connectionInfo}>
                <Text style={styles.connectionLabel}>Connection Status</Text>
                <Text style={[
                  styles.connectionStateText,
                  isConnected ? styles.connectedText : styles.disconnectedText
                ]}>
                  {isConnected ? "Connected to ESP32" : "Disconnected"}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.connectButton,
                  isConnected ? styles.disconnectButtonStyle : styles.connectButtonStyle
                ]}
                onPress={() => setIsConnected(!isConnected)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.connectButtonText,
                  isConnected ? styles.disconnectText : styles.connectText
                ]}>
                  {isConnected ? "Disconnect" : "Connect"}
                </Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
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
    paddingBottom: hp(10 ),
    backgroundColor: '#0B0E14',
  },
  container: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
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
  headerTitle: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  connectionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  connectionDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    marginRight: wp(1.5),
  },
  connectedDot: {
    backgroundColor: '#10B981',
  },
  disconnectedDot: {
    backgroundColor: '#EF4444',
  },
  connectionStatus: {
    fontSize: wp(3.5),
    fontWeight: '600',
  },
  connectedText: {
    color: '#10B981',
  },
  disconnectedText: {
    color: '#EF4444',
  },
  headerIconContainer: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: '#1A1F2E',
    borderWidth: 2,
    borderColor: '#4DB6AC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraCard: {
    padding: wp(4),
    marginBottom: hp(2.5),
    backgroundColor: '#1A1F2E',
  },
  cameraPreview: {
    aspectRatio: 16 / 9,
    backgroundColor: '#0B0E14',
    borderRadius: wp(3),
    overflow: 'hidden',
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
    borderWidth: 1,
    borderColor: '#EF4444',
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
  batteryIndicator: {
    position: 'absolute',
    top: hp(1.5),
    right: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141922',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#2A2F3E',
  },
  batteryText: {
    fontSize: wp(3),
    fontWeight: '600',
    marginLeft: wp(1.5),
  },
  offlineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(11, 14, 20, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineText: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: hp(2.5),
  },
  statCard: {
    flex: 1,
    padding: wp(3.5),
    backgroundColor: '#1A1F2E',
  },
  statCardMargin: {
    marginRight: wp(3),
  },
  statContent: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#141922',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  statLabel: {
    fontSize: wp(3.2),
    color: '#9CA3AF',
    marginBottom: hp(0.5),
  },
  statValue: {
    fontSize: wp(4.2),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quickActionsCard: {
    padding: wp(5),
    marginBottom: hp(2.5),
    backgroundColor: '#1A1F2E',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
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
  actionsContainer: {
    gap: hp(1.5),
  },
  patrolButton: {
    width: '100%',
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  startPatrolButton: {
    backgroundColor: '#1A2A1A',
    borderColor: '#10B981',
  },
  stopPatrolButton: {
    backgroundColor: '#2A1A1A',
    borderColor: '#EF4444',
  },
  patrolButtonText: {
    fontSize: wp(3.6),
    fontWeight: '600',
    marginLeft: wp(2),
  },
  startPatrolText: {
    color: '#10B981',
  },
  stopPatrolText: {
    color: '#EF4444',
  },
  actionButton: {
    width: '100%',
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    alignItems: 'center',
    borderWidth: 1,
  },
  manualControlButton: {
    backgroundColor: '#1A1F2E',
    borderColor: '#4DB6AC',
  },
  manualControlText: {
    fontSize: wp(3.6),
    fontWeight: '600',
    color: '#4DB6AC',
  },
  returnHomeButton: {
    backgroundColor: '#141922',
    borderColor: '#2A2F3E',
  },
  returnHomeText: {
    fontSize: wp(3.6),
    fontWeight: '500',
    color: '#9CA3AF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  controlPadCard: {
    padding: wp(5),
    marginBottom: hp(2.5),
    backgroundColor: '#1A1F2E',
  },
  controlPadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  controlPadTitle: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  offlineBadge: {
    backgroundColor: '#2A1A1A',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  offlineBadgeText: {
    fontSize: wp(3),
    fontWeight: '600',
    color: '#EF4444',
  },
  controlPadContainer: {
    alignItems: 'center',
    marginBottom: hp(3),
  },
  controlPadOuter: {
    width: wp(70),
    height: wp(70),
    maxWidth: 280,
    maxHeight: 280,
    borderRadius: wp(35),
    backgroundColor: '#141922',
    borderWidth: 2,
    borderColor: '#4DB6AC',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlPadInner: {
    width: '55%',
    height: '55%',
    borderRadius: wp(35),
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#2A2F3E',
    position: 'absolute',
  },
  directionButton: {
    width: wp(15),
    height: wp(15),
    maxWidth: 60,
    maxHeight: 60,
    borderRadius: wp(7.5),
    backgroundColor: '#1A1F2E',
    borderWidth: 1.5,
    borderColor: '#4DB6AC',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionDisabled: {
    borderColor: '#4B5563',
    opacity: 0.5,
  },
  upButton: {
    top: wp(1),
    left: '50%',
    transform: [{ translateX: -wp(7.5) }],
  },
  downButton: {
    bottom: wp(1),
    left: '50%',
    transform: [{ translateX: -wp(7.5) }],
  },
  leftButton: {
    left: wp(1),
    top: '50%',
    transform: [{ translateY: -hp(3.75) }],
  },
  rightButton: {
    right: wp(1),
    top: '50%',
    transform: [{ translateY: -hp(3.75) }],
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeftWidth: wp(2.5),
    borderRightWidth: wp(2.5),
    borderBottomWidth: hp(1.5),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4DB6AC',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: wp(2.5),
    borderRightWidth: wp(2.5),
    borderTopWidth: hp(1.5),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4DB6AC',
  },
  arrowLeft: {
    width: 0,
    height: 0,
    borderTopWidth: wp(2.5),
    borderBottomWidth: wp(2.5),
    borderRightWidth: wp(3.5),
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#4DB6AC',
  },
  arrowRight: {
    width: 0,
    height: 0,
    borderTopWidth: wp(2.5),
    borderBottomWidth: wp(2.5),
    borderLeftWidth: wp(3.5),
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#4DB6AC',
  },
  centerDroneIcon: {
    position: 'absolute',
    width: wp(18),
    height: wp(18),
    maxWidth: 72,
    maxHeight: 72,
    borderRadius: wp(9),
    backgroundColor: '#141922',
    borderWidth: 2,
    borderColor: '#4DB6AC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDroneDisabled: {
    borderColor: '#4B5563',
  },
  rotationControls: {
    flexDirection: 'row',
    gap: wp(3),
  },
  rotateButton: {
    flex: 1,
    paddingVertical: hp(1.5),
    backgroundColor: '#141922',
    borderWidth: 1,
    borderColor: '#2A2F3E',
    borderRadius: wp(3),
    alignItems: 'center',
  },
  rotateDisabled: {
    opacity: 0.5,
  },
  rotateButtonText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#D1D5DB',
  },
  rotateTextDisabled: {
    color: '#6B7280',
  },
  connectionCard: {
    padding: wp(5),
    backgroundColor: '#1A1F2E',
  },
  connectionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  connectionInfo: {
    flex: 1,
  },
  connectionLabel: {
    fontSize: wp(3.5),
    color: '#9CA3AF',
    marginBottom: hp(0.5),
  },
  connectionStateText: {
    fontSize: wp(4.2),
    fontWeight: '600',
  },
  connectButton: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.2),
    borderRadius: wp(3),
    borderWidth: 1,
  },
  connectButtonStyle: {
    backgroundColor: '#1A2A1A',
    borderColor: '#10B981',
  },
  disconnectButtonStyle: {
    backgroundColor: '#2A1A1A',
    borderColor: '#EF4444',
  },
  connectButtonText: {
    fontSize: wp(3.6),
    fontWeight: '600',
  },
  connectText: {
    color: '#10B981',
  },
  disconnectText: {
    color: '#EF4444',
  },
});

export default DroneScreen;