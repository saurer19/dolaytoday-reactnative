import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './home';
import ReactCalculator from './calculator';


export default class App extends Component {
  render() {
      return (
        <Router>
            <Scene key="root">
                <Scene key="home"
                    component={Home}
                    hideNavBar={true}
                    initial/>
                <Scene
                    key="calculator"
                    component={ReactCalculator}
                    title="Calculator"
                    hideNavBar={false}
                  />
            </Scene>
        </Router>
    );
  }
}
