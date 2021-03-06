import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToastAndroid,
  Alert
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'

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
  item = this.props.route.params.item;
  prevScreen = this.props.route.params.prev;
  videoService = new VideoService();

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
      });
  }

  removeIdea = () => {
    this.videoService.deleteIdea(this.item.id)
      .then(() => {
        ToastAndroid.show('The idea has been successfully removed',
        ToastAndroid.LONG);
        this.props.navigation.navigate('Tabs', {
          screen: 'Ideas'
        });
      });
  }

  createAlert = () => {
    Alert.alert(
      'Remove Idea',
      'Are you sure you want to remove this idea?',
      [
        {
          text: 'No',
          style: 'canel'
        },
        {
          text: 'Yes',
          onPress: this.removeIdea
        }
      ],
      { cancelable: false }
    );
  }

  displayButtons() {
    if (this.prevScreen == 'ideas') {
      return (
        <View>
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

        <View style = {{ padding: 10 }}>
          <Button
            title = 'Remove'
            onPress = { this.createAlert }
            color = 'red'
          />
        </View>
        </View>
      )
    }
  }

  render() {
    return(
      <View style = { styles.container }>
        <Text style = { styles.label }>Title:</Text>
        <Text>{ this.item.title }</Text>

        <ToggleSwitch
          label = 'Has Script?'
          isOn = { this.item.script }
          onColor = 'tomato'
          labelStyle = {{ margin: 20, marginLeft: 0, fontWeight: 'bold' }}
          size = 'small'
          disabled = { true }
        />
        <View />
        <Text style = { styles.label }>Total Frames:</Text>
        <Text>{ this.item.totalFrames }</Text>

        <View style = {{ marginTop: 20 }}/>
        <Text style = { styles.label }>Current Frame:</Text>
        <Text>{ this.item.currentFrame }</Text>

        <View style = {{ marginTop: 20 }}/>
        <Text style = { styles.label }>Label:</Text>
        <Text>{ this.item.labelTagName }</Text>
        
        <View style = {{ marginTop: 20 }}/>
        <Text style = { styles.label }>Description:</Text>
        <Text>{ this.item.description }</Text>

        { this.displayButtons() }

      </View>
    );
  }
}
