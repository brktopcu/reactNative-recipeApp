import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { fetchRandomRecipes } from "../api/fetchRecipes";
import { Button, Card } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor, tabIconColor } from "../constants";
import * as firebase from "firebase";
import "firebase/firestore";
import { db } from "../App";
import _ from "lodash";

export class AllRecipes extends Component {
  state = {
    recipes: [],
    favouriteRecipes: [],
    favouriteRecipeIds: [],
    uid: "",
  };

  getRecipes = async () => {
    let recipes = [];

    try {
      recipes = await fetchRandomRecipes();
      this.setState({ recipes: recipes.recipes }, async () => {
        if (_.isEmpty(this.state.recipes)) {
          let recipes = [];
          const snapshot = await db
            .collection("recipes")
            .get()
            .then(
              (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  recipes.push(doc.data());
                });
                this.setState({ recipes: recipes });
              },
              (error) => console.log(error)
            );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getRecipes();
    this.setState({ uid: `${firebase.auth().currentUser.uid}` });
    this.getFavouriteRecipes();
  }

  getFavouriteRecipes = async () => {
    let favourites = [];
    let favouriteIds = [];
    const snapshot = await db
      .collection("userData")
      .doc(`${firebase.auth().currentUser.uid}`)
      .collection("favouriteRecipes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          favourites.push(doc.data());
        });
      });

    this.setState({ favouriteRecipes: favourites });
    favourites.map((item) => favouriteIds.push(item.id));
    this.setState({ favouriteRecipeIds: favouriteIds });
  };

  handleSetFavourite = (recipe) => {
    const { uid } = this.state;

    db.collection("userData")
      .doc(uid)
      .collection("favouriteRecipes")
      .doc(`${recipe.id}`)
      .set(recipe);

    this.setState((prevState) => {
      return {
        favouriteRecipeIds: [...prevState.favouriteRecipeIds, recipe.id],
      };
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
            <TouchableOpacity
              onPress={() => {
                this.handleSetFavourite(recipe);
              }}
            >
              <AntDesign
                name="heart"
                size={24}
                color={
                  this.state.favouriteRecipeIds.includes(recipe.id)
                    ? "orange"
                    : "grey"
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
            <AntDesign name="clockcircle" size={15} color={primaryColor} />{" "}
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
