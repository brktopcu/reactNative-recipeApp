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
import { db } from "../sqlite";

export class AllRecipes extends Component {
  state = {
    recipes: [],
    changeColor: false,
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
    let favouriteRecipeIds = [];

    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists favourites (id integer primary key not null, title text, ingredients text, instructions text);"
      );
    });

    db.transaction((tx) => {
      tx.executeSql("select * from favourites", [], (tx, results) => {
        for (let index = 0; index < results.rows.length; index++) {
          favouriteRecipeIds.push(results.rows[index].id);
        }
        this.setState({ favouriteRecipeIds: favouriteRecipeIds });
      });
    });

    this.getRecipes();
  }

  handleSetFavourite = (recipe) => {
    let ingredientNames = recipe.extendedIngredients.map(
      (ingredient) => ingredient.original
    );
    let instructions = recipe.analyzedInstructions[0].steps.map(
      (instruction) => instruction.step
    );

    db.transaction((tx) => {
      tx.executeSql(
        "insert into favourites (id, title, ingredients, instructions) values (?, ?, ?, ?)",
        [recipe.id, recipe.title, ingredientNames, instructions],
        () => {
          this.setState((prevState) => ({
            favouriteRecipeIds: [...prevState.favouriteRecipeIds, recipe.id],
          }));
        }
      );
      //tx.executeSql("select * from favourites", [], (tx, results) => {
      //  console.log(results.rows);
      //});
    });
  };

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
            <AntDesign
              name="heart"
              size={24}
              color={
                this.state.favouriteRecipeIds.includes(recipe.id)
                  ? "orange"
                  : "grey"
              }
              style={{ marginRight: 10 }}
              onPress={() => {
                this.handleSetFavourite(recipe);
              }}
            />
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
          {this.state.recipes.map((recipe) => this.renderCards(recipe))}
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
