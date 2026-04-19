// app/storage.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Cloud,
  HardDrive,
  Download,
  Trash2,
  Check,
  Video,
  Calendar,
} from 'lucide-react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GlassCard from '../../components/GlassCard';
import { hp, wp } from '../../utilities/dimensions';

const CloudStorageScreen = () => {
  const router = useRouter();
  const [selectedRecordings, setSelectedRecordings] = useState([]);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  
  const usedStorage = 3.2;
  const totalStorage = 5;
  const storagePercentage = (usedStorage / totalStorage) * 100;

  const plans = [
    {
      name: "Basic",
      storage: "5GB",
      price: "Free",
      features: ["5GB Cloud Storage", "30 Days Retention", "SD Quality", "Email Support"],
      current: true,
    },
    {
      name: "Pro",
      storage: "50GB",
      price: "$9.99/mo",
      features: ["50GB Cloud Storage", "90 Days Retention", "HD Quality", "Priority Support", "AI Analytics"],
      current: false,
      popular: true,
    },
    {
      name: "Ultra",
      storage: "Unlimited",
      price: "$29.99/mo",
      features: ["Unlimited Storage", "365 Days Retention", "4K Quality", "24/7 Support", "Advanced AI", "Multi-User"],
      current: false,
    },
  ];

  const recordings = [
    { id: 1, name: "Front Door - Motion", date: "Apr 17, 14:30", size: "125 MB", duration: "2:15" },
    { id: 2, name: "Living Room - Alert", date: "Apr 17, 14:15", size: "342 MB", duration: "5:30" },
    { id: 3, name: "Backyard - Motion", date: "Apr 17, 07:15", size: "98 MB", duration: "1:45" },
    { id: 4, name: "Front Door - Face ID", date: "Apr 17, 08:30", size: "156 MB", duration: "2:45" },
  ];

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: storagePercentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleDownload = (recordingId) => {
    console.log(`Downloading recording ${recordingId}`);
    // Implement download logic here
  };

  const handleDelete = (recordingId) => {
    console.log(`Deleting recording ${recordingId}`);
    // Implement delete logic here
  };

  const handleUpgrade = (planName) => {
    console.log(`Upgrading to ${planName} plan`);
    // Navigate to upgrade/payment screen
    router.push('/upgrade');
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
              <Text style={styles.headerTitle}>Cloud Storage</Text>
              <Text style={styles.headerSubtitle}>Manage your recordings</Text>
            </View>
            <View style={styles.headerIconContainer}>
              <Cloud color="#4DB6AC" size={wp(6)} />
            </View>
          </View>

          {/* Storage Usage Card */}
          <GlassCard style={styles.storageCard}>
            <View style={styles.storageHeader}>
              <View style={styles.storageIconContainer}>
                <HardDrive color="#4DB6AC" size={wp(8)} />
              </View>
              <View style={styles.storageInfo}>
                <Text style={styles.storageTitle}>Storage Usage</Text>
                <Text style={styles.storageSubtitle}>
                  {usedStorage}GB of {totalStorage}GB used
                </Text>
              </View>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <Animated.View 
                  style={[
                    styles.progressBarFill,
                    { width: progressWidth }
                  ]} 
                />
              </View>
            </View>
            <Text style={styles.progressPercentage}>
              {storagePercentage.toFixed(1)}% used
            </Text>
          </GlassCard>

          {/* Recent Recordings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Video color="#4DB6AC" size={wp(5)} />
              <Text style={styles.sectionTitle}>Recent Recordings</Text>
            </View>
            
            <View style={styles.recordingsList}>
              {recordings.map((recording) => (
                <GlassCard key={recording.id} style={styles.recordingCard}>
                  <View style={styles.recordingContent}>
                    <View style={styles.recordingIconContainer}>
                      <Video color="rgba(255,255,255,0.4)" size={wp(6)} />
                    </View>
                    <View style={styles.recordingDetails}>
                      <Text style={styles.recordingName} numberOfLines={1}>
                        {recording.name}
                      </Text>
                      <View style={styles.recordingMeta}>
                        <View style={styles.recordingMetaItem}>
                          <Calendar color="#9CA3AF" size={wp(3)} />
                          <Text style={styles.recordingMetaText}>{recording.date}</Text>
                        </View>
                        <Text style={styles.recordingMetaText}>{recording.duration}</Text>
                      </View>
                      <Text style={styles.recordingSize}>{recording.size}</Text>
                    </View>
                    <View style={styles.recordingActions}>
                      <TouchableOpacity 
                        style={styles.downloadButton}
                        onPress={() => handleDownload(recording.id)}
                        activeOpacity={0.7}
                      >
                        <Download color="#4DB6AC" size={wp(4)} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => handleDelete(recording.id)}
                        activeOpacity={0.7}
                      >
                        <Trash2 color="#EF4444" size={wp(4)} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </GlassCard>
              ))}
            </View>
          </View>

          {/* Upgrade Storage Section */}
          <View style={styles.section}>
            <Text style={styles.upgradeTitle}>Upgrade Storage</Text>
            
            <View style={styles.plansList}>
              {plans.map((plan) => (
                <GlassCard 
                  key={plan.name} 
                  style={[
                    styles.planCard,
                    plan.popular && styles.popularPlanCard
                  ]}
                >
                  {plan.popular && (
                    <View style={styles.popularBadgeContainer}>
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularBadgeText}>Popular</Text>
                      </View>
                    </View>
                  )}
                  
                  <View style={styles.planHeader}>
                    <View style={styles.planInfo}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <Text style={styles.planStorage}>{plan.storage}</Text>
                    </View>
                    <View style={styles.planPriceContainer}>
                      <Text style={styles.planPrice}>{plan.price}</Text>
                    </View>
                  </View>

                  <View style={styles.planFeatures}>
                    {plan.features.map((feature) => (
                      <View key={feature} style={styles.featureItem}>
                        <Check color="#10B981" size={wp(4)} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.upgradeButton,
                      plan.current && styles.currentPlanButton
                    ]}
                    onPress={() => !plan.current && handleUpgrade(plan.name)}
                    disabled={plan.current}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.upgradeButtonText,
                      plan.current && styles.currentPlanButtonText
                    ]}>
                      {plan.current ? "Current Plan" : "Upgrade Now"}
                    </Text>
                  </TouchableOpacity>
                </GlassCard>
              ))}
            </View>
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
  },
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
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
  headerSubtitle: {
    fontSize: wp(3.5),
    color: '#9CA3AF',
    marginTop: hp(0.5),
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
  storageCard: {
    padding: wp(6),
    marginBottom: hp(2),
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  storageIconContainer: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: 'rgba(77, 182, 172, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
  },
  storageInfo: {
    flex: 1,
  },
  storageTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: hp(0.5),
  },
  storageSubtitle: {
    fontSize: wp(3.5),
    color: '#9CA3AF',
  },
  progressBarContainer: {
    marginBottom: hp(1),
  },
  progressBarBackground: {
    height: hp(1.5),
    backgroundColor: '#374151',
    borderRadius: wp(2),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4DB6AC',
    borderRadius: wp(2),
  },
  progressPercentage: {
    fontSize: wp(3),
    color: '#9CA3AF',
    textAlign: 'right',
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
  recordingsList: {
    gap: hp(1),
  },
  recordingCard: {
    padding: wp(4),
  },
  recordingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingIconContainer: {
    width: wp(12),
    height: wp(12),
    backgroundColor: '#141922',
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  recordingDetails: {
    flex: 1,
  },
  recordingName: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: hp(0.5),
  },
  recordingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  recordingMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(3),
  },
  recordingMetaText: {
    fontSize: wp(3),
    color: '#9CA3AF',
    marginLeft: wp(1),
  },
  recordingSize: {
    fontSize: wp(3),
    color: '#9CA3AF',
  },
  recordingActions: {
    flexDirection: 'row',
    gap: wp(2),
  },
  downloadButton: {
    padding: wp(2),
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.2)',
  },
  deleteButton: {
    padding: wp(2),
    backgroundColor: '#141922',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.2)',
  },
  upgradeTitle: {
    fontSize: wp(4.5),
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: hp(1.5),
  },
  plansList: {
    gap: hp(1.5),
  },
  planCard: {
    padding: wp(4),
    position: 'relative',
  },
  popularPlanCard: {
    borderWidth: 2,
    borderColor: '#4DB6AC',
  },
  popularBadgeContainer: {
    position: 'absolute',
    top: -hp(1.5),
    left: '50%',
    transform: [{ translateX: -wp(15) }],
    zIndex: 1,
  },
  popularBadge: {
    backgroundColor: '#4DB6AC',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(4),
  },
  popularBadgeText: {
    fontSize: wp(3),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: hp(0.5),
  },
  planStorage: {
    fontSize: wp(3.5),
    color: '#D1D5DB',
  },
  planPriceContainer: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: wp(5),
    fontWeight: '600',
    color: '#4DB6AC',
  },
  planFeatures: {
    marginBottom: hp(2),
    gap: hp(1),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: wp(3.5),
    color: '#D1D5DB',
    marginLeft: wp(2),
  },
  upgradeButton: {
    width: '100%',
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    alignItems: 'center',
    backgroundColor: '#4DB6AC',
  },
  currentPlanButton: {
    backgroundColor: '#141922',
  },
  upgradeButtonText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  currentPlanButtonText: {
    color: '#9CA3AF',
  },
});

export default CloudStorageScreen;