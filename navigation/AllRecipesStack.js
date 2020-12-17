import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetails from "../screens/RecipeDetails";
import AllRecipes from "../screens/AllRecipes";
import { headerColor, secondaryColor } from "../constants";

const Stack = createStackNavigator();

export class AllRecipesStack extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="AllRecipes"
        screenOptions={{
          headerTintColor: headerColor,
          headerStyle: { backgroundColor: secondaryColor },
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
