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
      done: [],
      seed: 1,
      refreshing: false
    };
    this.videoService = new VideoService();
  }

  getData() {
    this.videoService.getDone().then((done) => {
      this.setState({
        done: done,
        refreshing: false
      });
    });
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
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
    });
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      seed: this.state.seed + 1
    },
    () => {
      this.getData();
    });
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
            <View style = {{
              backgroundColor: 'white',
              flexDirection: 'row-reverse',
              flex: 1,
            }}>
              <Text
                style = {{
                  margin: 15,
                  backgroundColor: item.script ? 'lightgreen' : 'darksalmon',
                  padding: 5,
                  borderRadius: 12
                }}
              >
                {item.script ? 'has script' : 'no script'}
              </Text>
              <Text
                style = {{ margin: 15, alignSelf: 'flex-end', flex: 1 }}
              >
                { item.title }
              </Text>
            </View>
          </TouchableHighlight>
        )}
        refreshing = { this.state.refreshing }
        onRefresh = { this.handleRefresh }
      />
    );
  }
}
