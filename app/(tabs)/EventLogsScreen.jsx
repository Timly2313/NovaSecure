// app/logs.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  Filter,
  Activity,
  UserCheck,
  AlertTriangle,
  Video,
  Download,
} from 'lucide-react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import GlassCard from '../../components/GlassCard';
import { hp, wp } from '../../utilities/dimensions';

const EventLogsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const logs = [
    {
      id: 1,
      type: "motion",
      title: "Motion Detected",
      location: "Front Door",
      timestamp: "2026-04-17 14:30:00",
      severity: "warning",
      hasThumbnail: true,
    },
    {
      id: 2,
      type: "face",
      title: "Unknown Face Detected",
      location: "Living Room",
      timestamp: "2026-04-17 14:15:00",
      severity: "alert",
      hasThumbnail: true,
    },
    {
      id: 3,
      type: "door",
      title: "Door Opened",
      location: "Main Entrance",
      timestamp: "2026-04-17 13:45:00",
      severity: "info",
      hasThumbnail: false,
    },
    {
      id: 4,
      type: "face",
      title: "Face Recognized - John Doe",
      location: "Front Door",
      timestamp: "2026-04-17 08:30:00",
      severity: "success",
      hasThumbnail: true,
    },
    {
      id: 5,
      type: "motion",
      title: "Motion Detected",
      location: "Backyard",
      timestamp: "2026-04-17 07:15:00",
      severity: "warning",
      hasThumbnail: true,
    },
    {
      id: 6,
      type: "system",
      title: "System Armed",
      location: "Control Panel",
      timestamp: "2026-04-17 07:00:00",
      severity: "info",
      hasThumbnail: false,
    },
  ];

  const filterTypes = ["all", "motion", "face", "door", "system"];

  const getIcon = (type) => {
    switch (type) {
      case "motion":
        return Activity;
      case "face":
        return UserCheck;
      case "door":
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case "alert":
        return "#EF4444";
      case "warning":
        return "#F59E0B";
      case "success":
        return "#10B981";
      default:
        return "#4DB6AC";
    }
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "alert":
        return styles.severityAlert;
      case "warning":
        return styles.severityWarning;
      case "success":
        return styles.severitySuccess;
      default:
        return styles.severityInfo;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleLogPress = (logId) => {
    router.push(`/logs/${logId}`);
  };

  const handleDownload = (logId) => {
    console.log(`Downloading footage for log ${logId}`);
    // Implement download logic here
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <ScreenWrapper bg="#0B0E14">
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Event Logs</Text>
            <Text style={styles.headerSubtitle}>{filteredLogs.length} total events</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search color="#6B7280" size={wp(5)} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search logs..."
              placeholderTextColor="#6B7280"
              selectionColor="#4DB6AC"
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            activeOpacity={0.7}
            onPress={() => console.log('Filter pressed')}
          >
            <Filter color="#4DB6AC" size={wp(5)} />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterTabsContent}
          >
            {filterTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterTab,
                  filterType === type && styles.filterTabActive
                ]}
                onPress={() => setFilterType(type)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.filterTabText,
                  filterType === type && styles.filterTabTextActive
                ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Logs List */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.logsList}
          contentContainerStyle={styles.logsListContent}
        >
          {filteredLogs.length === 0 ? (
            <View style={styles.emptyState}>
              <Activity color="#6B7280" size={wp(12)} />
              <Text style={styles.emptyStateText}>No events found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your search or filter</Text>
            </View>
          ) : (
            filteredLogs.map((log) => {
              const IconComponent = getIcon(log.type);
              const iconColor = getIconColor(log.severity);
              
              return (
                <TouchableOpacity
                  key={log.id}
                  onPress={() => handleLogPress(log.id)}
                  activeOpacity={0.7}
                >
                  <GlassCard style={[styles.logCard, getSeverityStyle(log.severity)]}>
                    <View style={styles.logContent}>
                      {log.hasThumbnail ? (
                        <View style={styles.thumbnailContainer}>
                          <Video color="rgba(255,255,255,0.4)" size={wp(6)} />
                        </View>
                      ) : (
                        <View style={[styles.thumbnailContainer, styles.noThumbnail]}>
                          <IconComponent color="rgba(255,255,255,0.4)" size={wp(6)} />
                        </View>
                      )}
                      
                      <View style={styles.logDetails}>
                        <View style={styles.logHeader}>
                          <View style={[styles.iconBadge, { backgroundColor: `${iconColor}15` }]}>
                            <IconComponent color={iconColor} size={wp(3.5)} />
                          </View>
                          <Text style={styles.logTitle} numberOfLines={1}>
                            {log.title}
                          </Text>
                        </View>
                        
                        <Text style={styles.logLocation} numberOfLines={1}>
                          {log.location}
                        </Text>
                        <Text style={styles.logTimestamp}>
                          {formatTimestamp(log.timestamp)}
                        </Text>
                      </View>

                      {log.hasThumbnail && (
                        <TouchableOpacity 
                          style={styles.downloadButton}
                          onPress={(e) => {
                            e.stopPropagation();
                            handleDownload(log.id);
                          }}
                          activeOpacity={0.7}
                        >
                          <Download color="#4DB6AC" size={wp(4)} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </GlassCard>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(6),
  },
  header: {
    marginBottom: hp(2),
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
    fontSize: wp(3.5),
    color: '#9CA3AF',
    marginTop: hp(0.5),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(2),
  },
  searchInputWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: wp(3.5),
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    height: hp(6.5),
    backgroundColor: '#141922',
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.15)',
    borderRadius: wp(3.5),
    paddingLeft: wp(11),
    paddingRight: wp(4),
    fontSize: wp(3.8),
    color: '#FFFFFF',
    fontWeight: '400',
  },
  filterButton: {
    width: hp(6.5),
    height: hp(6.5),
    backgroundColor: '#141922',
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.15)',
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterWrapper: {
    marginBottom: hp(1),
  },
  filterTabsContent: {
    paddingRight: wp(4),
  },
  filterTab: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    backgroundColor: '#141922',
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.15)',
    borderRadius: wp(5),
    marginRight: wp(2.5),
  },
  filterTabActive: {
    backgroundColor: '#4DB6AC',
    borderColor: '#4DB6AC',
    shadowColor: '#4DB6AC',
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.2,
    shadowRadius: wp(2),
    elevation: 3,
  },
  filterTabText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#9CA3AF',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logsList: {
    flex: 1,
  },
  logsListContent: {
    paddingBottom: hp(3),
  },
  logCard: {
    marginBottom: hp(1.5),
  },
  severityAlert: {
    borderLeftWidth: wp(1),
    borderLeftColor: '#EF4444',
  },
  severityWarning: {
    borderLeftWidth: wp(1),
    borderLeftColor: '#F59E0B',
  },
  severitySuccess: {
    borderLeftWidth: wp(1),
    borderLeftColor: '#10B981',
  },
  severityInfo: {
    borderLeftWidth: wp(1),
    borderLeftColor: '#4DB6AC',
  },
  logContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
  },
  thumbnailContainer: {
    width: wp(14),
    height: wp(14),
    backgroundColor: '#0B0E14',
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.1)',
  },
  noThumbnail: {
    backgroundColor: '#141922',
  },
  logDetails: {
    flex: 1,
    marginRight: wp(2),
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  iconBadge: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2),
  },
  logTitle: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  logLocation: {
    fontSize: wp(3.4),
    color: '#9CA3AF',
    marginBottom: hp(0.5),
    marginLeft: wp(7),
  },
  logTimestamp: {
    fontSize: wp(3),
    color: '#6B7280',
    marginLeft: wp(7),
  },
  downloadButton: {
    padding: wp(2.5),
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.2)',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(10),
  },
  emptyStateText: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: hp(2),
  },
  emptyStateSubtext: {
    fontSize: wp(3.5),
    color: '#6B7280',
    marginTop: hp(1),
  },
});

export default EventLogsScreen;