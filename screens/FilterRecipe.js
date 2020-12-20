import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { SearchBar, ListItem, Card } from "react-native-elements";
import { searchRecipes } from "../api/fetchRecipes";
import { tabIconColor, tabBackgroundColor } from "../constants";
export class FilterRecipe extends Component {
  state = {
    data: [],
    searchText: ''
  }

  handleSearch = async () => {
    try {
      const recipes = await searchRecipes(this.state.searchText);
      this.setState({ data: recipes });
      this.renderRecipes()
    } catch (error) {
      console.log(error)
    }
  }

  // onPressRecipe = results => {
  //   this.props.navigation.navigate('RecipeDetails', { results });
  // };

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
      <View style={{ marginTop: 25, flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.8, marginLeft: 20 }}>
            <SearchBar
              style={styles.searchBar}
              platform="android"
              placeholder='Search..'
              lightTheme
              searchIcond
              clearIcon
              inputContainerStyle={{
                backgroundColor: '#EDEDED'
              }}
              inputStyle={{
                backgroundColor: '#EDEDED',
                borderRadius: 10,
                color: 'black'
              }}
              onChangeText={text => this.setState({ searchText: text })}
              value={this.state.searchText}
            />
          </View>
          <View
            style={{
              flex: 0.2, alignItems: 'center', marginTop: 20,
              alignSelf: 'flex-start'
            }}>
            <AntDesign name="enter" size={32} color="black"
              onPress={this.handleSearch}
              color={tabIconColor}
            />
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <ScrollView>
            {this.state.data.results &&
              this.state.data.results.map((recipe) => this.renderCards(recipe))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  searchBar: {

  },
  photo: {

  },
  title: {

  }
})
export default FilterRecipe;
