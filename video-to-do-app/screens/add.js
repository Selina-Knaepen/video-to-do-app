import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const Idea = t.struct({
  title: t.String,
  totalFrames: t.Number,
  currentFrame: t.Number
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20
  },
});

export default class AddScreen extends Component {
  handleSubmit = () => {
  };

  render() {
    return(
      <View style = { styles.container }>
        <Form type = { Idea }/>
        <Button title = "Add" onPress = { this.handleSubmit }
        color = "tomato"/>
      </View>
    );
  }
}
