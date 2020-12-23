import React, { Component, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import { primaryColor } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import _ from "lodash";

export class RecipeDetails extends Component {
  state = {
    ingredients: [],
    instructions: [],
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.title,
    });

    this.getIngredients();
    this.getInstructions();
  }

  getIngredients = () => {
    let recipeIngredients = [];
    if (this.props.route.params.extendedIngredients) {
      this.props.route.params.extendedIngredients.map((ingredient) =>
        recipeIngredients.push(ingredient.original)
      );
      this.setState({ ingredients: recipeIngredients });
    } else {
      let ingredientObjects = [];
      let ingredients = [];

      this.props.route.params.analyzedInstructions[0].steps.map(
        (instruction) =>
          (ingredientObjects = [...ingredientObjects, instruction.ingredients])
      );
      _.flatten(ingredientObjects).map((object) =>
        ingredients.push(object.name)
      );
      this.setState({ ingredients });
    }
  };

  getInstructions = () => {
    let instructionObjects = [];
    this.props.route.params.analyzedInstructions[0].steps.map((instruction) =>
      instructionObjects.push(instruction.step)
    );
    this.setState({ instructions: instructionObjects });
  };

  render() {
    return (
      <ScrollView>
        <Image
          source={{ uri: this.props.route.params.image }}
          style={styles.thumbnail}
        />
        <Text style={styles.headerText}>{this.props.route.params.title}</Text>

        <View style={styles.iconContainer}>
          <Text style={styles.headerText}>
            <AntDesign name="clockcircle" size={15} color={primaryColor} />{" "}
            {this.props.route.params.readyInMinutes}
            {" min"}
          </Text>
          <Text style={styles.headerText}>
            <Ionicons name="md-restaurant" size={15} color={primaryColor} />{" "}
            {this.props.route.params.servings}
            {" servings"}
          </Text>
        </View>

        <Text style={styles.headerText}>Ingredients:</Text>
        <Divider style={styles.divider} />
        <View style={styles.ingredientContainer}>
          {this.state.ingredients.map((ingredient, index) => (
            <Text style={styles.headerText} key={index}>
              <MaterialCommunityIcons
                name="food-apple"
                size={15}
                color={primaryColor}
              />{" "}
              {ingredient}
            </Text>
          ))}
        </View>

        <Text style={styles.headerText}>Instructions:</Text>
        <Divider style={styles.divider} />
        <View style={styles.ingredientContainer}>
          {this.state.instructions.map((instruction, index) => (
            <Text style={styles.text} key={index}>
              <FontAwesome name="arrow-right" size={15} color={primaryColor} />{" "}
              {instruction}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default RecipeDetails;
const styles = StyleSheet.create({
  thumbnail: {
    height: 250,
    alignSelf: "stretch",
  },
  headerText: {
    padding: 10,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    padding: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: primaryColor,
    height: 1.5,
    marginTop: 15,
    marginBottom: 15,
    width: 180,
    alignSelf: "center",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ingredientContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
});
