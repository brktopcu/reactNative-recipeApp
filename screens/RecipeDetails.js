import React, { Component, useState } from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import { Card } from "react-native-elements";

export class RecipeDetails extends Component {

  componentDidMount() {


    this.props.navigation.setOptions({
      title: this.props.route.params.title,
    });
  };

  state = {
    RecipeProperties: [
      { title: 'yemek ismi', value: this.props.route.params.title },
      { title: 'readyInMinutes', value: this.props.route.params.readyInMinutes },
      { title: 'aggregateLikes', value: this.props.route.params.aggregateLikes },
      { title: 'healthScore', value: this.props.route.params.healthScore },
      { title: 'spoonacularScore', value: this.props.route.params.spoonacularScore },
      { title: 'cheap', value: Istrue(this.props.route.params.cheap) },
      { title: 'glutenFree', value: Istrue(this.props.route.params.glutenFree) },
      { title: 'ketogenic', value: Istrue(this.props.route.params.ketogenic) },
      { title: 'sustainable', value: Istrue(this.props.route.params.sustainable) },
      { title: 'vegan', value: Istrue(this.props.route.params.vegan) },
      { title: 'vegetarian', value: Istrue(this.props.route.params.vegetarian) },
      { title: 'veryHealthy', value: Istrue(this.props.route.params.veryHealthy) },
      { title: 'veryPopular', value: Istrue(this.props.route.params.veryPopular) }],

  };

  groups = this.props.route.params.extendedIngredients.map((items, index) => {
    return (<Text style={styles.text}>({items.original})</Text>)
  })

  render() {
    return (
      <View>
        <Card>


          <Card.Image source={{ uri: this.props.route.params.image }} />


        </Card>
        <View style={styles.container}>
          <ScrollView >
            <Text style={styles.header}> Özellikler</Text>
            <FlatList data={this.state.RecipeProperties} renderItem={({ item }) => (<Text style={styles.text}>{item.title}:{item.value}</Text>)} />
            <Text style={styles.header}> Malzemeler</Text>
            {this.groups}
          </ScrollView>
        </View>
      </View>
    );
  }



}

export default RecipeDetails;
const styles = StyleSheet.create({
  text:
  {
    padding: 16,
    marginTop: 10,
    borderColor: '#bbb',
    textAlign: 'center',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#fbaed2',
  },
  header:
  {
    padding: 16,
    marginTop: 10,
    borderColor: '#bbb',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#ffa812',
  },
  container: {
    padding: 24,

  },

});

const Istrue = (Bool) => {
  return (
    <View>
      <Text >{Bool ? " Evet" : " Hayır"}
      </Text>
    </View>
  );
}
