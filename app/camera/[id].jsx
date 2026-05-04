import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  AppState,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ⚠️ Make sure this IP is still correct. Notice it ends in /snapshot now.
const STREAM_URL = 'http://192.168.1.8:8000/snapshot';

export default function CameraStreamScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const intervalRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);

  // Force reload the image every 500ms (2 fps)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (appStateRef.current === 'active') {
        setImageKey(prev => prev + 1);
      }
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Listen to app state to stop refreshing when background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appStateRef.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setImageKey(prev => prev + 1);
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (appStateRef.current === 'active') {
          setImageKey(prev => prev + 1);
        }
      }, 500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Security Feed</Text>
        <View style={styles.statusBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>AI ACTIVE</Text>
        </View>
      </View>

      <View style={styles.streamContainer}>
        <Image
          key={imageKey}
          source={{ uri: `${STREAM_URL}?_=${imageKey}` }}
          style={styles.stream}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          resizeMode="contain"
        />
        {isLoading && !hasError && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#4DB6AC" />
            <Text style={styles.overlayText}>Loading stream...</Text>
          </View>
        )}
        {hasError && (
          <View style={styles.overlay}>
            <Ionicons name="alert-circle" size={48} color="#EF4444" />
            <Text style={styles.errorText}>
              Cannot connect to detection server.
              {'\n\n'}Make sure:
              {'\n'}• Backend is running (python webcam_server.py)
              {'\n'}• Phone and computer are on same WiFi
              {'\n'}• IP address is correct (currently {STREAM_URL.split('/')[2]})
              {'\n'}• Windows Firewall allows port 8000
            </Text>
            <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Ionicons name="desktop-outline" size={14} color="#4DB6AC" />
        <Text style={styles.footerText}>
          YOLOv8 object detection | Streaming via computer webcam
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(77, 182, 172, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4DB6AC',
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', marginRight: 6 },
  liveText: { fontSize: 10, fontWeight: 'bold', color: '#4DB6AC' },
  streamContainer: { flex: 1, backgroundColor: '#000', position: 'relative' },
  stream: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  overlayText: { color: '#FFF', marginTop: 12, fontSize: 14, textAlign: 'center' },
  errorText: { color: '#EF4444', textAlign: 'center', marginTop: 12, marginBottom: 20, fontSize: 14 },
  retryButton: { backgroundColor: '#4DB6AC', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#1A1F2E',
  },
  footerText: { color: '#9CA3AF', marginLeft: 8, fontSize: 11 },
});