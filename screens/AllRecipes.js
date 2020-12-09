import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchRandomRecipes } from "../api/fetchRecipes";
import { Card, ListItem, Button, Icon } from "react-native-elements";

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
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
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
