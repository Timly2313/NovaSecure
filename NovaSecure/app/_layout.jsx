import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext"; // adjust path as needed
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OnboardingScreen from "./OnboardingScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min caching
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { isAuthenticated, isLoading, profile, refreshProfile } = useAuth();
  const router = useRouter();

  // Wait for auth to load
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3F51B5" />
        <Text style={{ marginTop: 12 }}>Loading...</Text>
      </View>
    );
  }

  // If not authenticated, show auth screens (login/signup) via Slot
  if (!isAuthenticated) {
    return <Slot />;
  }

  // If authenticated but profile not loaded yet, show loading
  if (!profile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3F51B5" />
        <Text style={{ marginTop: 12 }}>Loading profile...</Text>
      </View>
    );
  }

  // If onboarding not completed, show onboarding screen
  if (!profile.onboarding_completed) {
    const handleOnboardingComplete = async () => {
      // Refresh profile to get updated onboarding_completed status
      await refreshProfile();
      // Optionally, navigate to main app (but the re-render will handle it)
      // The layout will re-evaluate and show Slot once onboarding_completed becomes true
    };

    const handleOnboardingSkip = async () => {
      // If skip, we might still want to mark onboarding as completed? Or just skip?
      // Typically, skip means they can finish later, but for now we can allow them to proceed
      // without completing all details. You can decide to set onboarding_completed = false
      // and still allow access. But for simplicity, we'll also refresh.
      await refreshProfile();
    };

    return (
      <OnboardingScreen
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  // Authenticated and onboarding completed: show main app
  return <Slot />;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}