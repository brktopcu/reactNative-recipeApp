import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetails from "../screens/RecipeDetails";
import { headerColor, secondaryColor } from "../constants";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import FilterRecipe from "../screens/FilterRecipe";

const Stack = createStackNavigator();

export class FilterRecipesStack extends Component {
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
            <TouchableOpacity onPress={this.handleLogout}>
              <Icon
                {...props}
                name="sign-out"
                type="font-awesome"
                size={25}
                style={{ marginRight: 10 }}
                accessibilityLabel="Sign Out"
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="AllRecipes"
          component={FilterRecipe}
          options={{ title: "Search Recipes" }}
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

export default FilterRecipesStack;
