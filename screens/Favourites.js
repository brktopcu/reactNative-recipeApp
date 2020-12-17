import React, { Component } from "react";
import { Text, View } from "react-native";
import { db } from "../sqlite";

export class Favourites extends Component {
  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("select * from favourites", [], (tx, results) => {
        console.log(results.rows);
      });
    });
  }
  render() {
    return (
      <View>
        <Text>Favourites</Text>
      </View>
    );
  }
}

export default Favourites;
