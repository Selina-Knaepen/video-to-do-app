import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet,
  Picker
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
      refreshing: false,
      allLabels: [],
      labelValue: 0,
      selectedLabel: ''
    };
    this.filters = [];
    this.videoService = new VideoService();
  }

  getData() {
    this.videoService.getIdeas().then((ideas) => {
      this.setState({
        ideas: ideas
      });
    });
  }

  getLabels() {
    this.videoService.getAllLabels().then((givenLabels) => {
      this.setState({ allLabels: givenLabels })
    });
  }

  getFilteredData() {
    if (this.state.selectedLabel == 'All' || this.state.labelValue == 0) {
      this.getData();
    } else {
      this.videoService
      .getByLabelId(this.state.allLabels[this.state.labelValue - 1].id)
      .then((ideas) => {
        this.setState({
          ideas: ideas
        });
      });
    }

    this.setState({ refreshing: false })
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
      this.getLabels();
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
        item: item,
        prev: 'ideas'
      }
    });
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      seed: this.state.seed + 1
    },
    () => {
      this.getLabels();
      this.getFilteredData();
    });
  }

  showLabel(text) {
    if (text == null) {
      return;
    } else {
      return(
        <Text
        style = {{
          backgroundColor: '#fffff0',
          width: 'auto',
          margin: 20,
          marginTop: 0,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'lightgray',
          padding: 5
        }}>
          { text }
        </Text>
      );
    }
  }

  loadPickerValues() {
    this.filters = ['All'];
    const allLabelsArray = this.state.allLabels;
    for (let i = 0; i < allLabelsArray.length; i++) {
      this.filters.push(allLabelsArray[i].name);
    }
  }

  onPickerChanged(i) {
    this.setState({
      labelValue: i,
      selectedLabel: this.filters[i],
      refreshing: true,
      seed: this.state.seed + 1
    },() => {
      this.getFilteredData();
    });
  }

  render() {
    return (
      <View style = {{ flex: 1 }}>
      { this.loadPickerValues() }
      <Picker
        key = 'labels'
        mode = 'dropdown'
        selectedValue = { this.state.labelValue }
        style = {{ height: 50, width: 250, alignSelf: 'center' }}
        onValueChange = { (itemValue) => {
          this.onPickerChanged(itemValue)
        }}
      >
      {
        this.filters.map((item, index) => {
          return (<Picker.Item label = { item } key = { index } value = { index }/>)
        })
      }
      </Picker>
      <FlatList
        data = { this.state.ideas }
        ItemSeparatorComponent = { this.FlatListItemSeparator }
        renderItem = {({ item, index, separators }) => (
          <TouchableHighlight
            keyExtractor = { (item) => item.id }
            onPress = { () => this._onPress(item) }>
            <View style = {{ backgroundColor: 'white' }}>
            <View style = {{
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
            <View style = {{ alignSelf: 'flex-start' }}>
              { this.showLabel(item.labelTagName) }
            </View>
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
