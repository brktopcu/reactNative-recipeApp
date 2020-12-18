import React, { Component } from "react";
import { Text, View } from "react-native";
import { db } from "../sqlite";

export class Favourites extends Component {
  componentDidMount() {}
  render() {
    return (
      <View>
        <Text>Favourites</Text>
      </View>
    );
  }
}

export default Favourites;
