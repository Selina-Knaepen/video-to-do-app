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
const Video = t.struct({
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

export default class EditScreen extends Component {
  item = this.props.route.params.item;
  prevScreen = this.props.route.params.prev;
  state = {
      value: {
        title: this.item.title,
        totalFrames: this.item.totalFrames,
        currentFrame: this.item.currentFrame
      }
  };
  videoService = new VideoService();

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) {
      this.videoService.editVideo(this.item.id,
        value.title, value.totalFrames,
        value.currentFrame)
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

  render() {
    return (
      <View style = { styles.container }>
        <Form
          ref = 'form'
          type = { Video }
          value = { this.state.value }
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
