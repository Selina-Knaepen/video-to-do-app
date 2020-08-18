import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default class DetailsScreen extends Component {
  item = this.props.route.params.item

  handleSubmit = () => {
    this.props.navigation.navigate('Edit', {
      screen: 'EditVideo',
      params: {
        item: this.item
      }
    });
  }

  render() {
    return(
      <View style = { styles.container }>
        <Text style = { styles.label }>Title:</Text>
        <Text>{ this.item.title }</Text>

        <View style = {{ marginTop: 20 }}/>
        <Text style = { styles.label }>Total Frames:</Text>
        <Text>{ this.item.totalFrames }</Text>

        <View style = {{ marginTop: 20 }}/>
        <Text style = { styles.label }>Current Frame:</Text>
        <Text>{ this.item.currentFrame }</Text>

        <View style = {{ marginTop: 20 }}/>
        <Button
          title = "Edit"
          onPress = { this.handleSubmit }
          color = "tomato"
        />
      </View>
    );
  }
}
