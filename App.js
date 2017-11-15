/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firebase from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var config = {
  appId: "1:321647296520:ios:d2a6c381620d43a9",
  apiKey: "AIzaSyB9lpk8wLConvKe0ZvXdGGztJ6X2lFiN10",
  authDomain: "myfirstfirebaseproject-493e9.firebaseapp.com",
  databaseURL: "https://myfirstfirebaseproject-493e9.firebaseio.com",
  projectId: "myfirstfirebaseproject-493e9",
  storageBucket: "myfirstfirebaseproject-493e9.appspot.com",
  messagingSenderId: "321647296520"
};
firebase.initializeApp(config);

export default class App extends Component<{}> {

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
     firebase.auth().createUserWithEmailAndPassword('manualll@email.com', 'password12345')
      .then((res) => {
        console.log('res',res)
        alert('success',res);
      }); 
  }

  registerUser() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log('res', res)
        alert('success', res);
      });
  }

  render() {
    let { email, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Register user!
        </Text>
        <TextInput
          value={email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          value={password}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity onPress={this.registerUser}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
