import React, { Component } from 'react'
import VideoService from '../services/video'
import { Text, FlatList, View, TouchableHighlight } from 'react-native'
import Task from '../models/task';

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
      style={{
        height: 1,
        width: "100%",
      }}
    />
  );
}

  _onPress(item) {

  }

  render() {
    return (
      <FlatList
        data = {this.state.ideas}
        ItemSeparatorComponent = { this.FlatListItemSeparator }
        renderItem = {({item, index, separators}) => (
          <TouchableHighlight
            keyExtractor = {(item) => item.id}
            onPress = {() => this._onPress(item)}>
            <View style = {{ backgroundColor: 'white' }}>
              <Text style = {{margin: 15}}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}
