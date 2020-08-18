import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class DetailsScreen extends Component {
  item = this.props.route.params.item

  render() {
    return(
      <View>
        <Text>{ this.item.title }</Text>
        <Text>{ this.item.totalFrames }</Text>
        <Text>{ this.item.currentFrame }</Text>
      </View>
    );
  }
}
