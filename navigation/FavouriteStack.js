import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetails from "../screens/RecipeDetails";
import { headerColor, secondaryColor } from "../constants";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import Favourites from "../screens/Favourites";

const Stack = createStackNavigator();

export class FavouriteStack extends Component {
  handleLogout = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Favourites"
        screenOptions={{
          headerTintColor: headerColor,
          headerStyle: { backgroundColor: secondaryColor },
          headerRight: (props) => (
            <TouchableOpacity onPress={this.handleLogout}>
              <Icon
                {...props}
                name="sign-out"
                type="font-awesome"
                size={25}
                style={{ marginRight: 10 }}
                accessibilityLabel="Çıkış Yap"
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{ title: "Favourites" }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{ title: "Recipe" }}
        />
      </Stack.Navigator>
    );
  }
}

export default FavouriteStack;
