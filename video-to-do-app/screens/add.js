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
import _ from 'lodash';

const Form = t.form.Form;

const stylesheet = _.cloneDeep(Form.stylesheet);

stylesheet.textbox.normal.height = 300;
stylesheet.textbox.normal.textAlignVertical = 'top';

const Idea = t.struct({
  title: t.String,
  totalFrames: t.Number,
  description: t.maybe(t.String)
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20
  }
});

export default class AddScreen extends Component {
  constructor() {
    super();
    this.videoService = new VideoService();

    this.options = {
      fields: {
        description: {
          multiline: true,
          stylesheet: stylesheet
        }
      }
    }
  }

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) {
        this.videoService.createIdea(value.title, value.totalFrames, value.description)
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
          ref = 'form'
          type = { Idea }
          options = { this.options }
        />
        <Button title = 'Add' onPress = { this.handleSubmit }
        color = 'tomato'/>
      </View>
    );
  }
}
