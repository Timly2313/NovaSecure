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
    if (batteryLevel > 20) return "#FBBF24";
    return "#EF4444";
  };

  const handlePatrolToggle = () => {
    if (isConnected) {
      setIsPatrolling(!isPatrolling);
      // Add actual patrol control logic here
    }
  };

  const handleManualControl = () => {
    if (isConnected) {
      console.log('Manual control activated');
      // Navigate to manual control screen or activate mode
    }
  };

  const handleReturnHome = () => {
    if (isConnected) {
      console.log('Returning to home');
      // Add return to home logic here
    }
  };

  const handleDirectionControl = (direction) => {
    if (isConnected) {
      console.log(`Moving ${direction}`);
      // Add direction control logic here
    }
  };

  const handleRotate = (direction) => {
    if (isConnected) {
      console.log(`Rotating ${direction}`);
      // Add rotation logic here
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
              <View style={styles.cameraGradient} />
              <View style={styles.cameraIconContainer}>
                <Video color="rgba(255,255,255,0.4)" size={wp(16)} />
              </View>
              
              {isConnected && (
                <>
                  <View style={styles.liveIndicator}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>Live Feed</Text>
                  </View>
                  <View style={styles.batteryIndicator}>
                    <Battery color={getBatteryColor()} size={wp(4)} />
                    <Text style={styles.batteryText}>{batteryLevel}%</Text>
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
            {droneStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <GlassCard key={stat.label} style={styles.statCard}>
                  <View style={styles.statContent}>
                    <IconComponent color="#4DB6AC" size={wp(5)} />
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
              <Play color="#4DB6AC" size={wp(5)} />
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
                    <Square color="#EF4444" size={wp(5)} />
                    <Text style={[styles.patrolButtonText, styles.stopPatrolText]}>
                      Stop Surveillance Patrol
                    </Text>
                  </>
                ) : (
                  <>
                    <Play color="#10B981" size={wp(5)} />
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
            <Text style={styles.controlPadTitle}>Manual Control</Text>
            
            <View style={styles.controlPadContainer}>
              <View style={styles.controlPadOuter}>
                <View style={styles.controlPadInner} />

                {/* Up Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.upButton]}
                  onPress={() => handleDirectionControl('forward')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowUp} />
                </TouchableOpacity>

                {/* Down Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.downButton]}
                  onPress={() => handleDirectionControl('backward')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowDown} />
                </TouchableOpacity>

                {/* Left Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.leftButton]}
                  onPress={() => handleDirectionControl('left')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowLeft} />
                </TouchableOpacity>

                {/* Right Button */}
                <TouchableOpacity
                  style={[styles.directionButton, styles.rightButton]}
                  onPress={() => handleDirectionControl('right')}
                  disabled={!isConnected}
                  activeOpacity={0.7}
                >
                  <View style={styles.arrowRight} />
                </TouchableOpacity>

                {/* Center Drone Icon */}
                <View style={styles.centerDroneIcon}>
                  <Plane color="#4DB6AC" size={wp(8)} />
                </View>
              </View>
            </View>

            {/* Rotation Controls */}
            <View style={styles.rotationControls}>
              <TouchableOpacity
                style={[
                  styles.rotateButton,
                  !isConnected && styles.disabledButton
                ]}
                onPress={() => handleRotate('left')}
                disabled={!isConnected}
                activeOpacity={0.7}
              >
                <Text style={styles.rotateButtonText}>Rotate Left</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.rotateButton,
                  !isConnected && styles.disabledButton
                ]}
                onPress={() => handleRotate('right')}
                disabled={!isConnected}
                activeOpacity={0.7}
              >
                <Text style={styles.rotateButtonText}>Rotate Right</Text>
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
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    paddingBottom: hp(6)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  connectionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  connectionDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
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
    fontWeight: '500',
  },
  connectedText: {
    color: '#10B981',
  },
  disconnectedText: {
    color: '#EF4444',
  },
  headerIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    borderWidth: 2,
    borderColor: '#4DB6AC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraCard: {
    padding: wp(4),
    marginBottom: hp(2),
  },
  cameraPreview: {
    aspectRatio: 16 / 9,
    backgroundColor: '#111827',
    borderRadius: wp(3),
    overflow: 'hidden',
    position: 'relative',
  },
  cameraGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
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
  },
  liveDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: '#EF4444',
    marginRight: wp(1.5),
  },
  liveText: {
    fontSize: wp(3),
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: wp(1),
    fontWeight: '500',
    overflow: 'hidden',
  },
  batteryIndicator: {
    position: 'absolute',
    top: hp(1.5),
    right: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(1),
  },
  batteryText: {
    fontSize: wp(3),
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: wp(1),
  },
  offlineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineText: {
    fontSize: wp(4),
    color: 'rgba(255, 255, 255, 0.6)',
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  statCard: {
    flex: 1,
    padding: wp(3),
    marginRight: wp(3),
  },
  statContent: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: wp(3),
    color: '#9CA3AF',
    marginTop: hp(1),
    marginBottom: hp(0.5),
  },
  statValue: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quickActionsCard: {
    padding: wp(6),
    marginBottom: hp(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: wp(2),
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
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  stopPatrolButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  patrolButtonText: {
    fontSize: wp(3.5),
    fontWeight: '500',
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
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    borderColor: 'rgba(77, 182, 172, 0.2)',
  },
  manualControlText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#4DB6AC',
  },
  returnHomeButton: {
    backgroundColor: '#141922',
    borderColor: 'rgba(77, 182, 172, 0.2)',
  },
  returnHomeText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#D1D5DB',
  },
  disabledButton: {
    opacity: 0.5,
  },
  controlPadCard: {
    padding: wp(6),
    marginBottom: hp(2),
  },
  controlPadTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: hp(2),
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
    borderColor: 'rgba(77, 182, 172, 0.3)',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlPadInner: {
    width: '60%',
    height: '60%',
    borderRadius: wp(35),
    backgroundColor: '#141922',
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.2)',
    position: 'absolute',
  },
  directionButton: {
    width: wp(16),
    height: wp(16),
    maxWidth: 64,
    maxHeight: 64,
    borderRadius: wp(8),
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.5)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upButton: {
    top: 0,
    left: '50%',
    transform: [{ translateX: -wp(8) }],
  },
  downButton: {
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -wp(8) }],
  },
  leftButton: {
    left: 0,
    top: '50%',
    transform: [{ translateY: -hp(4) }],
  },
  rightButton: {
    right: 0,
    top: '50%',
    transform: [{ translateY: -hp(4) }],
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeftWidth: wp(2),
    borderRightWidth: wp(2),
    borderBottomWidth: hp(1.5),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4DB6AC',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: wp(2),
    borderRightWidth: wp(2),
    borderTopWidth: hp(1.5),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4DB6AC',
  },
  arrowLeft: {
    width: 0,
    height: 0,
    borderTopWidth: wp(2),
    borderBottomWidth: wp(2),
    borderRightWidth: wp(3),
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#4DB6AC',
  },
  arrowRight: {
    width: 0,
    height: 0,
    borderTopWidth: wp(2),
    borderBottomWidth: wp(2),
    borderLeftWidth: wp(3),
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#4DB6AC',
  },
  centerDroneIcon: {
    position: 'absolute',
    width: wp(20),
    height: wp(20),
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: wp(10),
    backgroundColor: 'rgba(77, 182, 172, 0.2)',
    borderWidth: 2,
    borderColor: '#4DB6AC',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: 'rgba(77, 182, 172, 0.2)',
    borderRadius: wp(3),
    alignItems: 'center',
  },
  rotateButtonText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#D1D5DB',
  },
  connectionCard: {
    padding: wp(4),
    marginBottom: hp(2),
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
    fontSize: wp(4),
    fontWeight: '500',
  },
  connectButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(2),
    borderWidth: 1,
  },
  connectButtonStyle: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  disconnectButtonStyle: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  connectButtonText: {
    fontSize: wp(3.5),
    fontWeight: '500',
  },
  connectText: {
    color: '#10B981',
  },
  disconnectText: {
    color: '#EF4444',
  },
});

export default DroneScreen;