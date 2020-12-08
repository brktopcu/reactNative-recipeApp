import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { fetchRandomRecipes } from "../api/fetchRecipes";

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
    return recipes.recipes;
  };
  componentDidMount() {
    this.getRecipes();
  }
  render() {
    return (
      <View>
        <Text> All Recipes </Text>
        <ScrollView>
          {this.state.recipes.map((recipe) => (
            <p>{recipe.title}</p>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default AllRecipes;
