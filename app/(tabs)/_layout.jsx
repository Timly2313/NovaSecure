// app/(tabs)/_layout.js
import { Tabs } from "expo-router";
import CustomNavBar from "../../components/CustomNavBar";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tabs.Screen name="DashboardScreen" options={{ title: "Home" }} />
      <Tabs.Screen name="EventLogsScreen" options={{ title: "Logs" }} />
      <Tabs.Screen name="CloudStorageScreen" options={{ title: "Storage" }} />
      <Tabs.Screen name="DroneScreen" options={{ title: "Drone" }} />
      <Tabs.Screen name="SettingsScreen" options={{ title: "Settings" }} />
    </Tabs>
  );
}
