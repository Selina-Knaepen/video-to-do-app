import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToastAndroid
} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Idea = t.struct({
  title: t.String,
  totalFrames: t.Number
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20
  },
});

export default class AddScreen extends Component {
  constructor() {
    super();
    this.videoService = new VideoService();
  }

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) {
        this.videoService.createIdea(value.title, value.totalFrames)
        .then(() => {
          this.props.navigation.navigate('Tabs', {
            screen: 'Ideas'
          });
        })
        .catch((error) => {
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        });
    }
  };

  render() {
    return(
      <View style = { styles.container }>
        <Form
          ref = "form"
          type = { Idea }
        />
        <Button title = "Add" onPress = { this.handleSubmit }
        color = "tomato"/>
      </View>
    );
  }
}
