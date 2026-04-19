import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";

function AppContent() {

  return <Slot />;
}

export default function RootLayout() {
  return (
    
        <AppContent />
  
  );
}