/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import DoingScreen from './screens/doing';
import IdeasScreen from './screens/ideas';
import AddScreen from './screens/add';
import StatsScreen from './screens/stats';
import DoneScreen from './screens/done';
import DetailsScreen from './screens/details';
import EditScreen from './screens/edit';
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
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{ headerShown: false }}
      >
      <Stack.Screen
        name = "Tabs"
        component = { Tabs }
      />
      <Stack.Screen
        name = "Edit"
        component = { Edit }
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  return(
    <Tab.Navigator
    tabBarOptions = {{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      labelStyle: {
        padding: 15,
        fontSize: 16
      }
    }}
    >
      <Tab.Screen
        name = "Doing"
        component = { DoingScreen }
      />
      <Tab.Screen
        name = "Ideas"
        component = { IdeasScreen }
      />
      <Tab.Screen
        name = "Stats"
        component = { StatsScreen }
      />
      <Tab.Screen
        name = "Done"
        component = { DoneScreen }
      />
    </Tab.Navigator>
  );
}

function Edit() {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name = "AddIdea"
        options = {{ title: "Add Idea" }}
        component = { AddScreen }
      />
      <Stack.Screen
        name = "Details"
        component = { DetailsScreen }
      />
      <Stack.Screen
        name = "EditVideo"
        options = {{ title: "Edit" }}
        component = { EditScreen }
      />
    </Stack.Navigator>
    );
}

export default App;
