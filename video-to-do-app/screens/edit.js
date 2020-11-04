import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'

import t from 'tcomb-form-native';
import _ from 'lodash';

const Form = t.form.Form;
const stylesheet = _.cloneDeep(Form.stylesheet);
stylesheet.textbox.normal.height = 300;
stylesheet.textbox.normal.textAlignVertical = 'top';
const Video = t.struct({
  title: t.String,
  totalFrames: t.Number,
  currentFrame: t.Number,
  description: t.maybe(t.String)
});
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20
  },
});

export default class EditScreen extends Component {
  item = this.props.route.params.item;
  prevScreen = this.props.route.params.prev;
  state = {
      value: {
        title: this.item.title,
        totalFrames: this.item.totalFrames,
        currentFrame: this.item.currentFrame,
        description: this.item.description,
      },
      hasScript: this.item.script,
      labelTagName: this.item.labelTagName
  };
  videoService = new VideoService();
  options = {
    fields: {
      description: {
        multiline: true,
        stylesheet: stylesheet
      }
    }
  };

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) {
      this.videoService.editVideo(this.item.id,
        value.title, value.totalFrames,
        value.currentFrame, value.description, this.state.hasScript,
        this.state.labelTagName
      )
        .then(() => {
          if (this.prevScreen == 'doing') {
            this.props.navigation.navigate('Tabs', {
              screen: 'Doing'
            });
          } else {
            this.props.navigation.navigate('Tabs', {
              screen: 'Ideas'
            });
          }
        })
        .catch((error) => {
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        });
    }
  }

  changeValue(state) {
    const value = this.refs.form.getValue();
    if (value) {
      this.setState({
        value: {
          title: value.title,
          totalFrames: value.totalFrames,
          currentFrame: value.currentFrame,
          description: value.description
        }
      })
    }
    this.setState({
      hasScript: state
    });
  }

  render() {
    return (
      <View style = { styles.container }>
        <Form
          ref = 'form'
          type = { Video }
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
        <Button
          title = 'Update'
          onPress = { this.handleSubmit }
          color = 'tomato'
        />
      </View>
    );
  }
}
