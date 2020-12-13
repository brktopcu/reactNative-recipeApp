import React, { Component } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { tabIconColor } from "../constants";
export class FilterRecipe extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{ marginTop: 25 }}>
          <SearchBar
            style={styles.searchBar}
            platform="android"
            //placeholderTextColor={tabIconColor}
            placeholder='Search..'
            lightTheme
            round />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    color: tabIconColor,
  }
})
export default FilterRecipe;
