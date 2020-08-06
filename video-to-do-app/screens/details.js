import React, { Component } from 'react';
import { Text } from 'react-native';

export default class DetailsScreen extends Component {
  render() {
    return(
      <Text>{ this.props.route.params.item.title }</Text>
    );
  }
}
