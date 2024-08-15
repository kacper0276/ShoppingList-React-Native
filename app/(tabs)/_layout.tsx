import { Tabs } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useTheme } from "@/context/ThemeContext";

export default function TabLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Strona główna",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              Zmień styl na {theme === "light" ? "ciemny" : "jasny"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    left: 20,
    bottom: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
