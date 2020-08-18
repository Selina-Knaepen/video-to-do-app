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
        <Text>{ this.item.title }</Text>
        <Text>{ this.item.totalFrames }</Text>
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
