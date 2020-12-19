import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { primaryColor } from "./constants";
import TabNavigation from "./navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";
import AuthStack from "./navigation/AuthStack";
import * as firebase from "firebase";
import { firebaseConfig } from "./firebase";

const theme = {
  colors: {
    primary: primaryColor,
  },
};

if (LogBox) {
  LogBox.ignoreLogs(["Setting a timer"]);
  LogBox.ignoreLogs(["Require cycle"]);
}

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export class App extends Component {
  state = {
    isAuthenticated: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticated: !!user });
  };

  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <StatusBar style="auto" />
          <NavigationContainer>
            {this.state.isAuthenticated ? <TabNavigation /> : <AuthStack />}
          </NavigationContainer>
        </ThemeProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
