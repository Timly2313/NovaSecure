import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

// ⚠️ Ensure this is your correct computer IP
const STREAM_URL = 'http://192.168.1.8:8000/video_feed';

export default function CameraStreamScreen() {
  const router = useRouter();

  // We wrap the stream in a basic HTML page so the WebView knows exactly how to display it natively
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body { margin: 0; padding: 0; background-color: #000; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
          img { width: 100vw; height: 100vh; object-fit: contain; }
        </style>
      </head>
      <body>
        <img src="${STREAM_URL}" alt="Live Security Feed" />
      </body>
    </html>
  `;

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
        <WebView 
          source={{ html: htmlContent, baseUrl: 'http://192.168.1.8:8000' }}
          style={styles.stream}
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // Added to ensure cleartext HTTP works in Android WebView
          mixedContentMode="always" 
        />
      </View>

      <View style={styles.footer}>
        <Ionicons name="desktop-outline" size={14} color="#4DB6AC" />
        <Text style={styles.footerText}>
          YOLOv8 object detection | TRUE Live Stream
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
  streamContainer: { flex: 1, backgroundColor: '#000' },
  stream: { flex: 1, backgroundColor: '#000' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#1A1F2E',
  },
  footerText: { color: '#9CA3AF', marginLeft: 8, fontSize: 11 },
});