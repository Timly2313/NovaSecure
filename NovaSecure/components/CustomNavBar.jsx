import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Home, FileText,Cloud,Plane,Settings} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const PRIMARY_COLOR = "#4DB6AC";
const SECONDARY_COLOR = '#1A1F2E';

const CustomNavBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

 
  const visibleRoutes = state.routes.filter(
    (r) => !["_layout", "_sitemap", "()", "Create"].includes(r.name)
  );

  return (
    <View style={styles.wrapper}>
      {/* ----- WHITE NAVBAR ----- */}
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {/* LEFT side buttons */}
        <View style={styles.sideGroup}>
          {renderTab(visibleRoutes[0], state, descriptors, navigation)}
          {renderTab(visibleRoutes[1], state, descriptors, navigation)}
          {renderTab(visibleRoutes[2], state, descriptors, navigation)}
          {renderTab(visibleRoutes[3], state, descriptors, navigation)}
          {renderTab(visibleRoutes[4], state, descriptors, navigation)}
        </View>
      </View>
    </View>
  );
};

const renderTab = (route, state, descriptors, navigation) => {
  if (!route) return null;

  const { options } = descriptors[route.key];
  const isFocused = state.index === state.routes.indexOf(route);

  const label =
    options?.tabBarLabel ??
    options?.title ??
    route.name.replace("/index", "").replace(/[()]/g, "");

  const onPress = () => {
    if (!isFocused) navigation.navigate(route.name);
  };

  return (
    <TouchableOpacity
      key={route.key}
      onPress={onPress}
      style={styles.tabItem}
    >
      {getIcon(label, isFocused ? PRIMARY_COLOR : "#777")}
      <Text style={[styles.tabText, { color: isFocused ? PRIMARY_COLOR : "#777" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const getIcon = (name, color) => {
  switch (name) {
    case "Home":
      return <Home size={24} color={color} />;
    case "Logs":
      return <FileText size={24} color={color} />;
    case "Storage":
      return <Cloud size={24} color={color} />;
    case "Drone":
      return <Plane size={24} color={color} />;
    case "Settings":
      return <Settings size={24} color={color} />;
    default:
      return <Home size={24} color={color} />;
  }
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: SECONDARY_COLOR, 
    paddingHorizontal: 25,
    paddingTop: 5,
    paddingBottom: 0,

    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  sideGroup: {
    flexDirection: "row",
    gap: 0,
  },

  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
  },

  tabText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default CustomNavBar;
