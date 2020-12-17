import React, { Component } from "react";
import { Text, View } from "react-native";

export class RecipeDetails extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.title,
    });
  }
  render() {
    return (
      <View>
        <Text> Recipe Details </Text>
      </View>
    );
  }
}

export default RecipeDetails;
