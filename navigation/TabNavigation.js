import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FilterRecipe from "../screens/FilterRecipe";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { tabBackgroundColor, tabIconColor } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import Favourites from "../screens/Favourites";
import AllRecipesStack from "./AllRecipesStack";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "AllRecipes") {
            return <Entypo name="open-book" size={20} color={tabIconColor} />;
          } else if (route.name === "FilterRecipe") {
            return <AntDesign name="filter" size={20} color={tabIconColor} />;
          } else if (route.name === "Favourites") {
            return (
              <MaterialIcons
                name="favorite-border"
                size={20}
                color={tabIconColor}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showLabel: false,
        activeBackgroundColor: tabBackgroundColor,
      }}
    >
      <Tab.Screen name="AllRecipes" component={AllRecipesStack} />
      <Tab.Screen name="FilterRecipe" component={FilterRecipe} />
      <Tab.Screen name="Favourites" component={Favourites} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
