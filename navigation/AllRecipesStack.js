import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetails from "../screens/RecipeDetails";
import AllRecipes from "../screens/AllRecipes";
import { headerColor, secondaryColor } from "../constants";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";

const Stack = createStackNavigator();

export class AllRecipesStack extends Component {
  handleLogout = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <Stack.Navigator
        initialRouteName="AllRecipes"
        screenOptions={{
          headerTintColor: headerColor,
          headerStyle: { backgroundColor: secondaryColor },
          headerRight: (props) => (
            <Icon
              {...props}
              name="sign-out"
              type="font-awesome"
              size={20}
              style={{ marginRight: 10 }}
              accessibilityLabel="Çıkış Yap"
              onPress={this.handleLogout}
            />
          ),
        }}
      >
        <Stack.Screen
          name="AllRecipes"
          component={AllRecipes}
          options={{ title: "All Recipes" }}
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

export default AllRecipesStack;
