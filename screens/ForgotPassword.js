import React, { Component } from "react";
import { Text, View, StyleSheet, Alert,TouchableWithoutFeedback,Keyboard } from "react-native";
import { Input, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";

export class ForgotPassword extends Component {
  state = {
    username: "",
  };

  handleResetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.username)
      .then(
        () => {
          Alert.alert("Password reset e-mail has been sent");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.container}>
        <Input
          placeholder="E-mail"
          leftIcon={<MaterialIcons name="email" size={15} color="black" />}
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <Button title="Reset password" onPress={this.handleResetPassword} />
      </View>
       </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ForgotPassword;
