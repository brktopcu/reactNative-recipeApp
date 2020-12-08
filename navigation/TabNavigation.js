import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllRecipes from "../screens/AllRecipes";
import FilterRecipe from "../screens/FilterRecipe";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { tabBackgroundColor, tabIconColor } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import Favourites from "../screens/Favourites";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="AllRecipes" component={AllRecipes} />
        <Tab.Screen name="FilterRecipe" component={FilterRecipe} />
        <Tab.Screen name="Favourites" component={Favourites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
