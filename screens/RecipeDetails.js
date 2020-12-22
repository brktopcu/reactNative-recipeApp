import React, { Component, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

export class RecipeDetails extends Component {

  componentDidMount() {


    this.props.navigation.setOptions({
      title: this.props.route.params.title,
    });
  }

  _keyExtractor = this.route.params.id;
  _renderItem = (item) => {

    const  { title,
      readyInMinutes,
      aggregateLikes,
      healthScore,
      spoonacularScore,
      cheap,
      glutenFree,
      ketogenic,
      sustainable,
      vegan,
      vegetarian,
      veryHealthy,
      veryPopular } = item;



    const groups = this.props.route.param.extendedIngredients.map((items, index) => {
      return
      (
        <Text>({items.orginal})</Text>
      )
    })

    //const {} = item.groups;
    return (
      <View>
        <View style={styles.cardContainerStyle}>
          <View style={{ paddingRight: 5 }}>

            <Text style={styles.cardTextStyle}>

            <Text>title: {title}</Text>
            <Text>readyInMinutes: {readyInMinutes}</Text>
            <Text>aggregateLikes: {aggregateLikes}</Text>
            <Text>healthScore: {healthScore}</Text>
            <Text>spoonacularScore: {spoonacularScore}</Text>
            <Text>cheap: {cheap}</Text>
            <Text>glutenFree: {glutenFree}</Text>
            <Text>ketogenic: {ketogenic}</Text>
            <Text>sustainable: {sustainable}</Text>
            <Text>vegan: {vegan}</Text>
            <Text>vegetarian: {vegetarian}</Text>
            <Text>veryHealthy: {veryHealthy}</Text>
            <Text>veryPopular: {veryPopular}</Text>
              {groups}

            </Text>

          </View>
         
        </View>
      </View>
    );
  };


  render() {
    return (
      <View>
        <Card>

          <Card.Divider />
          <Card.Image source={{ uri: recipe.image }} />
          <FlatList data={this.props.route.params} renderItem={_renderItem} keyExtractor={_keyExtractor}>

          </FlatList>


        </Card>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  text:
  {
    padding: 16,
    marginTop: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10
  }

});

export default RecipeDetails;
