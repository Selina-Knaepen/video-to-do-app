import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TouchableHighlight,
  View
} from 'react-native';
import VideoService from '../services/video';

export default class DoneScreen extends Component {
  constructor() {
    super();
    this.state = {
      done: []
    };
    this.videoService = new VideoService();
  }

  componentDidMount() {
    this.videoService.getDone().then((done) => {
      this.setState({done: done})
    })
  }

  FlatListItemSeparator = () => {
  return (
    <View
      style = {{
        height: 1,
        width: '100%',
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
    return(
      <FlatList
        data = { this.state.done }
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
    );
  }
}
