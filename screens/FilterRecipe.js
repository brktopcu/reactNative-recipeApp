import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar, Card } from "react-native-elements";
import { searchRecipes } from "../api/fetchRecipes";
import { tabIconColor, tabBackgroundColor, primaryColor } from "../constants";
export class FilterRecipe extends Component {
  state = {
    data: [],
    searchText: "",
    loading: false,
  };

  handleSearch = async () => {
    try {
      this.setState({ loading: true }, async () => {
        const recipes = await searchRecipes(this.state.searchText);
        this.setState({ data: recipes, loading: false });
      });
    } catch (error) {
      console.log(error);
    }
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
            <Card.Title>{recipe.title}</Card.Title>
          </View>
          <Card.Divider style={styles.divider} />
          <Card.Image source={{ uri: recipe.image }} />
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchView}>
          <SearchBar
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchInput}
            inputContainerStyle={styles.searchInputContainer}
            placeholder="Search.."
            onChangeText={(text) => this.setState({ searchText: text })}
            value={this.state.searchText}
            round
          />
          <TouchableOpacity
            onPress={this.handleSearch}
            style={styles.searchIcon}
          >
            <AntDesign name="enter" size={32} color={tabIconColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.searchResults}>
          {this.state.loading && (
            <ActivityIndicator size="large" color={primaryColor} />
          )}
          {this.state.data.results &&
            this.state.data.results.map((recipe) => this.renderCards(recipe))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  searchView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBarContainer: {
    color: "black",
    flex: 0.8,
    paddingTop: 20,
    height: 80,
    backgroundColor: "white",
    borderTopColor: "white",
    borderBottomColor: "white",
  },
  searchInputContainer: {
    backgroundColor: "white",
  },
  searchInput: {
    borderRadius: 10,
    backgroundColor: "#EDEDED",
  },
  searchIcon: {
    flex: 0.2,
    paddingTop: 20,
    height: 50,
    width: 50,
  },
  searchResults: { marginTop: 70 },
  divider: { backgroundColor: primaryColor, height: 1.5 },
});
export default FilterRecipe;
