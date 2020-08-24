import React, { Component } from 'react';
import VideoService from '../services/video';
import {
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
  }
})

export default class DoingScreen extends Component {
  constructor() {
    super();
    this.state = {
      doing: []
    };
    this.videoService = new VideoService();
  }

  getData() {
    this.videoService.getDoing().then((doing) => {
      this.setState({
        doing: doing
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

  render() {
    return (
      <Text style = {{ fontSize: 20 }}>Doing screen</Text>
    );
  }
}
