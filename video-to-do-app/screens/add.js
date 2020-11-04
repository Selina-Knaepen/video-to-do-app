import React, { Component, useState } from 'react';
import VideoService from '../services/video';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToastAndroid,
  Picker,
  TextInput,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native';
import _ from 'lodash';

const Form = t.form.Form;

const stylesheet = _.cloneDeep(Form.stylesheet);

stylesheet.textbox.normal.height = 300;
stylesheet.textbox.normal.textAlignVertical = 'top';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20
  },
});

const Idea = t.struct({
  title: t.String,
  totalFrames: t.maybe(t.Number),
  description: t.maybe(t.String)
});

const hasScript = false;

export default class AddScreen extends Component {
  constructor() {
    super();
    this.videoService = new VideoService();

    this.state = {
      hasScript: false,
      value: {
        title: '',
        totalFrames: '',
        description: ''
      },
      labelValue: 0,
      selectedLabel: '',
      allLabels: []
    };

    this.labelNames = [];

    this.options = {
      fields: {
        description: {
          multiline: true,
          stylesheet: stylesheet
        },
      },
      i18n: {
        optional: '',
        required: ''
      }
    };

  }

  componentDidMount() {
    this.videoService.getAllLabels().then((givenLabels) => {
      this.setState({ allLabels: givenLabels })
    });
  }

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) {
        this.videoService.createIdea(value.title,
           value.totalFrames, value.description, this.state.hasScript,
           this.state.selectedLabel
         )
        .then(() => {
          this.props.navigation.navigate('Tabs', {
            screen: 'Ideas'
          });
        })
        .catch((error) => {
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        });
    }
  };

  changeValue(state) {
    const value = this.refs.form.getValue();
    if (value) {
      this.setState({
        value: {
          title: value.title,
          totalFrames: value.totalFrames,
          description: value.description
        }
      })
    }
    this.setState({
      hasScript: state
    });
  }

  loadPickerValues() {
    this.labelNames = ['[Make new label]'];
    const allLabelsArray = this.state.allLabels;
    for (let i = 0; i < allLabelsArray.length; i++) {
      this.labelNames.push(allLabelsArray[i].name);
    }
  }

  onPickerChanged(i) {
    const value = this.refs.form.getValue();
    if (value) {
      this.setState({
        value: {
          title: value.title,
          totalFrames: value.totalFrames,
          description: value.description
        }
      });
    }
    
    this.setState({ labelValue: i });
    this.setState({ selectedLabel: this.labelNames[i] });
  }

  showInput() {
    if (this.state.labelValue == 0) {
      return(
        <TextInput
          style={{
            height: 40,
            borderColor: 'lightgray',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10
          }}
          value = { this.state.selectedLabel }
          onChangeText = { (text) => this.onInputChanged(text) }
        />
      );
    }
  }

  onInputChanged(textValue) {
    const value = this.refs.form.getValue();
    if (value) {
      this.setState({
        value: {
          title: value.title,
          totalFrames: value.totalFrames,
          description: value.description
        }
      });
    }

    this.setState({selectedLabel: textValue})
  }

  render() {
    return(
      <KeyboardAwareScrollView>
      <View style = { styles.container }>
        <Form
          ref = 'form'
          type = { Idea }
          value = { this.state.value }
          options = { this.options }
        />

        <ToggleSwitch
          label = 'Has Script?'
          isOn = { this.state.hasScript }
          onToggle = { isOn => this.changeValue(isOn) }
          onColor = 'tomato'
          labelStyle = {{ margin: 15 }}
        />

        <Text>Label</Text>
        { this.loadPickerValues() }
        <Picker
          key = 'labels'
          mode = 'dropdown'
          selectedValue = { this.state.labelValue }
          style = {{ height: 50, width: 250 }}
          onValueChange = { (itemValue) => {
              this.onPickerChanged(itemValue)
          }}
        >
          {
            this.labelNames.map((item, index) => {
              return (<Picker.Item label = { item } key = { index } value = { index }/>)
            })
          }
        </Picker>
        { this.showInput() }

        <Button title = 'Add' onPress = { this.handleSubmit }
        color = 'tomato'/>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}
