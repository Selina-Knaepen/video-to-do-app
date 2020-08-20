import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToastAndroid
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
  viewContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    margin: 2,
    flex: 1
  }
});

export default class DetailsScreen extends Component {
  item = this.props.route.params.item
  videoService = new VideoService();

  // constructor() {
  //   super();
  //   this.videoService = new VideoService();
  // }

  handleSubmit = () => {
    this.props.navigation.navigate('Edit', {
      screen: 'EditVideo',
      params: {
        item: this.item
      }
    });
  }

  onPress = () => {
    this.videoService.moveIdeaToDoing(this.item.id)
      .then(() => {
        ToastAndroid.show('The idea has been successfully added to doing',
        ToastAndroid.LONG);
        this.props.navigation.navigate('Tabs', {
          screen: 'Doing'
        });
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      })
  }

  render() {
    return(
      <View style = { styles.container }>
        <Text>{ this.item.state }</Text>

        <Text style = { styles.label }>Title:</Text>
        <Text>{ this.item.title }</Text>

        <View style = {{ marginTop: 20 }}/>
        <Text style = { styles.label }>Total Frames:</Text>
        <Text>{ this.item.totalFrames }</Text>

        <View style = {{ marginTop: 20 }}/>
        <Text style = { styles.label }>Current Frame:</Text>
        <Text>{ this.item.currentFrame }</Text>

        <View style = { styles.viewContainer }>
        <View style = { styles.buttonContainer }>
        <Button
          title = 'Edit'
          onPress = { this.handleSubmit }
          color = 'tomato'
        />
        </View>

        <View style = { styles.buttonContainer }>
        <Button
          title = 'Start'
          onPress = { this.onPress }
          color = 'orangered'
        />
        </View>
        </View>

      </View>
    );
  }
}
