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
  FileText,
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
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Event Logs</Text>
              <Text style={styles.headerSubtitle}>Monitor all security events</Text>
            </View>
            <View style={styles.headerIconContainer}>
              <FileText color="#4DB6AC" size={wp(6)} />
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
                placeholder="Search events..."
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

          {/* Event Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBadge}>
              <Text style={styles.statNumber}>{filteredLogs.length}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            {filterType !== 'all' && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>
                  Filtered by: {filterType}
                </Text>
                <TouchableOpacity onPress={() => setFilterType('all')}>
                  <Text style={styles.clearFilterText}>Clear</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Logs List */}
          {filteredLogs.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIcon}>
                <Search color="#6B7280" size={wp(12)} />
              </View>
              <Text style={styles.emptyStateText}>No events found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter settings
              </Text>
              {(searchQuery || filterType !== 'all') && (
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={() => {
                    setSearchQuery('');
                    setFilterType('all');
                  }}
                >
                  <Text style={styles.resetButtonText}>Reset Filters</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.logsList}>
              {filteredLogs.map((log) => {
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
                            <Video color="#4DB6AC" size={wp(5)} />
                          </View>
                        ) : (
                          <View style={[styles.thumbnailContainer, styles.noThumbnail]}>
                            <IconComponent color="#4DB6AC" size={wp(5)} />
                          </View>
                        )}
                        
                        <View style={styles.logDetails}>
                          <View style={styles.logHeader}>
                            <View style={[styles.iconBadge, { backgroundColor: `${iconColor}20` }]}>
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
              })}
            </View>
          )}
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
    paddingBottom: hp(3),
    backgroundColor: '#0B0E14',
  },
  container: {
    flex: 1,
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
  headerSubtitle: {
    fontSize: wp(3.8),
    color: '#9CA3AF',
    marginTop: hp(0.5),
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
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#2A2F3E',
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
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#4DB6AC',
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterWrapper: {
    marginBottom: hp(1.5),
  },
  filterTabsContent: {
    paddingRight: wp(4),
  },
  filterTab: {
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1),
    backgroundColor: '#1A1F2E',
    borderWidth: 1,
    borderColor: '#2A2F3E',
    borderRadius: wp(5),
    marginRight: wp(2.5),
  },
  filterTabActive: {
    backgroundColor: '#4DB6AC',
    borderColor: '#4DB6AC',
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
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#1A1F2E',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#2A2F3E',
  },
  statNumber: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#4DB6AC',
    marginRight: wp(1.5),
  },
  statLabel: {
    fontSize: wp(3.5),
    color: '#9CA3AF',
  },
  filterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(77, 182, 172, 0.1)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  filterBadgeText: {
    fontSize: wp(3.2),
    color: '#4DB6AC',
    marginRight: wp(2),
  },
  clearFilterText: {
    fontSize: wp(3.2),
    fontWeight: '600',
    color: '#EF4444',
  },
  logsList: {
    flex: 1,
  },
  logCard: {
    marginBottom: hp(1.5),
    backgroundColor: '#1A1F2E',
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
    backgroundColor: '#141922',
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
    borderWidth: 1,
    borderColor: '#2A2F3E',
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
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(2.75),
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
    marginLeft: wp(7.5),
  },
  logTimestamp: {
    fontSize: wp(3),
    color: '#6B7280',
    marginLeft: wp(7.5),
  },
  downloadButton: {
    padding: wp(2.5),
    backgroundColor: '#141922',
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(10),
  },
  emptyStateIcon: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: '#1A1F2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#2A2F3E',
  },
  emptyStateText: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: hp(1),
  },
  emptyStateSubtext: {
    fontSize: wp(3.5),
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  resetButton: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    backgroundColor: '#1A1F2E',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  resetButtonText: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: '#4DB6AC',
  },
});

export default EventLogsScreen;