import React, { Component} from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Picker,
  Button,
  Alert,
  ToastAndroid
} from 'react-native';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20
  },
  viewContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    margin: 2,
    flex: 1
  },
  progressBar: {
    alignSelf: 'center',
  }
});

export default class DoingScreen extends Component {
  constructor() {
    super();
    this.state = {
      doing: [],
      value: 0,
      seed: 1,
      refreshing: false,
      test: 'First',
      selectedItem: ''
    };
    this.videoService = new VideoService();
    this.options = ['Pick an item', '[No Item]', '[No Item]']
  }

  getProgress() {
    const item = this.state.selectedItem;
    return item.currentFrame / item.totalFrames;
  }

  getData() {
    this.videoService.getDoing().then((doing) => {
      this.setState({
        doing: doing,
        refreshing: false,
      });
      this.loadScreenValues(this.state.value);
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

  loadPickerValues() {
    this.options[1] = '[No Item]';
    this.options[2] = '[No Item]';

    if (this.state.doing && this.state.doing.length > 0) {
      this.options[1] = this.state.doing[0].title;
      if (this.state.doing.length == 2) {
          this.options[2] = this.state.doing[1].title;
      }
    }
  }

  loadScreenValues(i) {
    this.setState({ value: i });

    if (i == 1 && this.options[1] != '[No Item]') {
      this.setState({
        selectedItem: this.state.doing[0]
      });
    } else if (i == 2 && this.options[2] != '[No Item]') {
      this.setState({
        selectedItem: this.state.doing[1]
      });
    } else {
      this.setState({
        selectedItem: ''
      });
    }
  }

  showInfo() {
    const itemValue = this.state.value;
    if ((itemValue == 1 && this.options[1] != '[No Item]')
          || (itemValue == 2 && this.options[2] != '[No Item]')) {
      return (
        <View>
          <Text style = {{ fontSize: 20, marginBottom: 40 }}>
            { this.state.selectedItem.title }
          </Text>
          <Progress.Circle
            style = { styles.progressBar }
            showsText = { true }
            size = { 175 }
            borderColor = 'red'
            color = '#ff6347'
            progress = { this.getProgress() }
            formatText={() => {
                  return `${ Math.round(this.getProgress() * 100) }%`
                }}
          />

          <View style = { styles.viewContainer }>
            <View style = { styles.buttonContainer }>
              <Button
                title = 'Details'
                onPress = { this.goDetails }
                color = 'tomato'
              />
            </View>

            <View style = { styles.buttonContainer }>
              <Button
                title = 'Update'
                onPress = { this.goEdit }
                color = 'orangered'
              />
            </View>
          </View>

          <View style = {{ padding: 5 }}>
            <Button
              title = 'Finish'
              onPress = { this.moveToDone }
              color = 'red'
            />
          </View>

          <View style = {{ padding: 5 }}>
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

  goEdit = () => {
    this.props.navigation.navigate('Edit', {
      screen: 'EditVideo',
      params: {
        item: this.state.selectedItem,
        prev: 'doing',
      }
    });
  }

  moveToDone = () => {
    this.videoService.moveDoingToDone(this.state.selectedItem.id)
      .then(() => {
        ToastAndroid.show('The video has been successfully moved to done',
        ToastAndroid.LONG);
        this.getData();
        this.setState({ value: 0 });
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
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

  removeIdea = () => {
    this.videoService.deleteIdea(this.state.selectedItem.id)
      .then(() => {
        ToastAndroid.show('The item has been successfully removed',
        ToastAndroid.LONG);
        this.setState({ value: 0 });
        this.handleRefresh();
      });
  }

  goDetails = () => {
    this.props.navigation.navigate('Edit', {
      screen: 'Details',
      params: {
        item: this.state.selectedItem,
        prev: 'doing'
      }
    });
  }

  render() {
    return (
      <View style = {{ flex: 1 }}>
      <ScrollView
        contentContainerStyle = { styles.scrollView }
        refreshControl = {
          <RefreshControl
            refreshing = { this.state.refreshing }
            onRefresh = { this.handleRefresh }/>
        }
      >
        { this.loadPickerValues() }
        <Picker
          key = 'items'
          mode = 'dropdown'
          selectedValue = { this.state.value }
          style = {{ height: 50, width: 250 }}
          onValueChange = { (itemValue) => {
            this.loadScreenValues(itemValue)
          }}
        >
        {
          this.options.map((item, index) => {
            return (<Picker.Item label = { item } value = { index } key = { index }/>)
          })
        }
        </Picker>
        { this.showInfo() }
      </ScrollView>
      </View>
    );
  }
}
