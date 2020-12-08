import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appBackgroundColor } from "./constants";
import TabNavigation from "./navigation/TabNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TabNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appBackgroundColor,
    justifyContent: "center",
  },
});
