import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchRandomRecipes } from "../api/fetchRecipes";
import { Card } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { tabIconColor } from "../constants";

export class AllRecipes extends Component {
  state = {
    recipes: [],
  };

  getRecipes = async () => {
    let recipes = [];

    try {
      recipes = await fetchRandomRecipes();
      this.setState({ recipes: recipes.recipes });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getRecipes();
  }

  renderCards = (recipe) => {
    return (
      <TouchableOpacity key={recipe.id}>
        <Card>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: recipe.image }} />

          <Text style={{ marginTop: 10 }}>
            <AntDesign name="clockcircleo" size={15} color={tabIconColor} />{" "}
            {recipe.readyInMinutes} min
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <Text> All Recipes </Text>
        <ScrollView>
          {this.state.recipes.map((recipe) => this.renderCards(recipe))}
        </ScrollView>
      </View>
    );
  }
}

export default AllRecipes;
