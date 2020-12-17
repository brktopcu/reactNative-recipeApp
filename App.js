import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appBackgroundColor, primaryColor } from "./constants";
import TabNavigation from "./navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";

const theme = {
  colors: {
    primary: primaryColor,
  },
};

export default function App() {
  return (
    <View style={styles.container}>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
