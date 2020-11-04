import React, { Component, useState } from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToastAndroid,
  Switch
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'

import t from 'tcomb-form-native';
import _ from 'lodash';

const Form = t.form.Form;

const stylesheet = _.cloneDeep(Form.stylesheet);

stylesheet.textbox.normal.height = 300;
stylesheet.textbox.normal.textAlignVertical = 'top';
stylesheet.checkbox.normal.onTintColor = {false: "#767577", true: "#81b0ff"}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20
  },
});

const Idea = t.struct({
  title: t.String,
  totalFrames: t.maybe(t.Number),
  description: t.maybe(t.String)
});

const hasScript = false;

export default class AddScreen extends Component {
  constructor() {
    super();
    this.videoService = new VideoService();

    this.state = {
      hasScript: false,
      value: {
        title: '',
        totalFrames: '',
        description: ''
      }
    }

    this.options = {
      fields: {
        description: {
          multiline: true,
          stylesheet: stylesheet
        },
      },
      i18n: {
        optional: '',
        required: ''
      }
    }
  }

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) {
        this.videoService.createIdea(value.title,
           value.totalFrames, value.description, this.state.hasScript)
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

  changeValue(state) {
    const value = this.refs.form.getValue();
    if (value) {
      this.setState({
        value: {
          title: value.title,
          totalFrames: value.totalFrames,
          description: value.description
        }
      })
    }
    this.setState({
      hasScript: state
    });
  }

  render() {
    return(
      <View style = { styles.container }>
        <Form
          ref = 'form'
          type = { Idea }
          value = { this.state.value }
          options = { this.options }
        />
        <ToggleSwitch
          label = "Has Script?"
          isOn = { this.state.hasScript }
          onToggle = { isOn => this.changeValue(isOn) }
          onColor = "tomato"
          labelStyle = {{ margin: 15 }}
        />
        <Button title = 'Add' onPress = { this.handleSubmit }
        color = 'tomato'/>
      </View>
    );
  }
}
