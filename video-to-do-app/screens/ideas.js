import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} from 'react-native';
import Task from '../models/task';
import FAB from 'react-native-fab';
import AddScreen from './add';

export default class IdeasScreen extends Component {
  constructor() {
    super();
    this.state = {
      ideas: []
    };
    this.videoService = new VideoService();
  }

  componentDidMount() {
    this.videoService.getIdeas().then((ideas) => {
      this.setState({ideas: ideas})
    })
  }

  FlatListItemSeparator = () => {
  return (
    <View
      style = {{
        height: 1,
        width: "100%",
      }}
    />
  );
}

  _onPress(item) {
    this.props.navigation.navigate('Edit', {
      screen: 'Details',
      params: {
        item: item
      }
    })
  }

  render() {
    return (
      <View style = {{ flex: 1 }}>
      <FlatList
        data = { this.state.ideas }
        ItemSeparatorComponent = { this.FlatListItemSeparator }
        renderItem = {({ item, index, separators }) => (
          <TouchableHighlight
            keyExtractor = { (item) => item.id }
            onPress = { () => this._onPress(item) }>
            <View style = {{ backgroundColor: 'white' }}>
              <Text style = {{ margin: 15 }}>{ item.title }</Text>
            </View>
          </TouchableHighlight>
        )}
      />

      <FAB
        buttonColor = "tomato"
        iconTextColor = "#FFFFFF"
        onClickAction = {() => {
          this.props.navigation.navigate('Edit', {screen: 'AddIdea'})
        }}
        visible = { true }
        />
      </View>
    );
  }
}
