import React, { Component } from 'react';
import {
  Text
} from 'react-native';

export default class EditScreen extends Component {
  item = this.props.route.params.item

  render() {
    return (
      <Text>Edit Screen</Text>
    );
  }
}
