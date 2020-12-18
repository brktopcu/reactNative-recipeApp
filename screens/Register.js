import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";

export class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  handleRegister = () => {
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then(
        () => {},
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="E-mail"
          leftIcon={<MaterialIcons name="email" size={15} color="black" />}
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <Input
          placeholder="Password"
          leftIcon={<MaterialIcons name="lock" size={15} color="black" />}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Input
          placeholder="Confirm password"
          leftIcon={<MaterialIcons name="lock" size={15} color="black" />}
          secureTextEntry={true}
          value={this.state.confirmPassword}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
        />

        <Button title="Register" onPress={this.handleRegister} />
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

export default Register;
