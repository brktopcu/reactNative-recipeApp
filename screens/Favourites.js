import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { db } from "../App";
import { Card } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor, tabIconColor } from "../constants";

export class Favourites extends Component {
  state = {
    favRecipes: [],
    refreshing: false,
  };

  componentDidMount() {
    this.getFavouriteRecipes();
  }

  getFavouriteRecipes = async () => {
    let favourites = [];
    const snapshot = await db
      .collection("userData")
      .doc(`${firebase.auth().currentUser.uid}`)
      .collection("favouriteRecipes")
      .get()
      .then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            favourites.push(doc.data());
          });
        },
        (error) => console.log(error)
      );

    this.setState({ favRecipes: favourites });
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
              color={"orange"}
              style={{ marginRight: 10 }}
            />
            <Card.Title>{recipe.title}</Card.Title>
          </View>
          <Card.Divider
            style={{ backgroundColor: primaryColor, height: 1.5 }}
          />
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

  handleRefresh = () => {
    this.setState({ refreshing: false });
    this.getFavouriteRecipes();
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        }
      >
        {this.state.favRecipes &&
          this.state.favRecipes.map((recipe) => this.renderCards(recipe))}
      </ScrollView>
    );
  }
}

export default Favourites;
