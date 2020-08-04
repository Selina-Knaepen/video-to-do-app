/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import DoingScreen from './screens/doing';
import IdeasScreen from './screens/ideas';
import 'react-native-gesture-handler';
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          padding: 15,
          fontSize: 16
        }
      }}
      >
        <Tab.Screen
          name="Doing"
          component={DoingScreen}
        />
        <Tab.Screen
          name="Ideas"
          component={IdeasScreen}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
        />
        <Tab.Screen
          name="Done"
          component={DoneScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function StatsScreen() {
  return (
    <Text>Stats Screen</Text>
  );
}

function DoneScreen() {
  return (
    <Text>Done Screen</Text>
  );
}

export default App;
