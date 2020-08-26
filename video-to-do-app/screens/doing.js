import React, { Component} from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Picker
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
  },
  scrollView: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class DoingScreen extends Component {
  constructor() {
    super();
    this.state = {
      doing: [],
      value: 0,
      seed: 1,
      refreshing: false
    };
    this.videoService = new VideoService();
    this.options = ['Pick an item', '[No Item]', '[No Item]']
  }

  getData() {
    this.videoService.getDoing().then((doing) => {
      this.setState({
        doing: doing,
        refreshing: false
      });
    });
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
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

  loadValues() {
    if (this.state.doing && this.state.doing.length > 0) {
      this.options[1] = this.state.doing[0].title;
      if (this.state.doing.length == 2) {
          this.options[2] = this.state.doing[1].title;
      }
    }
  }

  render() {
    return (
      <View>
      <ScrollView
        contentContainerStyle = { styles.scrollView }
        refreshControl = {
          <RefreshControl
            refreshing = { this.state.refreshing }
            onRefresh = { this.handleRefresh }/>
        }
      >
        <Text style = {{ fontSize: 20 }}>Doing screen</Text>
        { this.loadValues() }
        <Picker
          key = 'items'
          mode = 'dropdown'
          selectedValue = { this.state.value }
          style = {{ height: 50, width: 250 }}
          onValueChange = { (itemValue, itemIndex) => {
            this.setState({ value: itemValue });
          }}
        >
        {
          this.options.map((item, index) => {
            return (<Picker.Item label = { item } value = { index } key = { index }/>)
          })
        }
        </Picker>
      </ScrollView>
      </View>
    );
  }
}
