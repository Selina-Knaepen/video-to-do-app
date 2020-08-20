import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import Task from '../models/task';
import FAB from 'react-native-fab';
import AddScreen from './add';

export default class IdeasScreen extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      seed: 1,
      refreshing: false
    };
    this.videoService = new VideoService();
  }

  getData() {
    this.videoService.getIdeas().then((ideas) => {
      this.setState({
        ideas: ideas,
        refreshing: false
      })
    });
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      seed: this.state.seed + 1
    },
    () => {
      this.getData();
    }
  );
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
        refreshing = { this.state.refreshing }
        onRefresh = { this.handleRefresh }
      />

      <FAB
        buttonColor = 'tomato'
        iconTextColor = '#FFFFFF'
        onClickAction = {() => {
          this.props.navigation.navigate('Edit', {screen: 'AddIdea'})
        }}
        visible = { true }
        />
      </View>
    );
  }
}
