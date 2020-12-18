import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { fetchRandomRecipes } from "../api/fetchRecipes";
import { Card } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor, tabIconColor } from "../constants";

export class AllRecipes extends Component {
  state = {
    recipes: [],
    favouriteRecipes: [],
    favouriteRecipeIds: [],
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

  handleSetFavourite = (recipe) => {};

  renderCards = (recipe) => {
    return (
      <TouchableOpacity
        key={recipe.id}
        onPress={() => {
          this.props.navigation.navigate("RecipeDetails", recipe);
        }}
      >
        <Card>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.handleSetFavourite(recipe);
              }}
            >
              <AntDesign
                name="heart"
                size={24}
                color={
                  "grey"
                  //this.state.favouriteRecipeIds.includes(recipe.id)
                  //  ? "orange"
                  //  : "grey"
                }
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <Card.Title>{recipe.title}</Card.Title>
          </View>
          <Card.Divider style={styles.divider} />
          <Card.Image source={{ uri: recipe.image }} />
          <Text
            style={{ marginTop: 10, alignSelf: "center", fontWeight: "bold" }}
          >
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
        <ScrollView>
          {this.state.recipes &&
            this.state.recipes.map((recipe) => this.renderCards(recipe))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  divider: { backgroundColor: primaryColor, height: 1.5 },
});

export default AllRecipes;
