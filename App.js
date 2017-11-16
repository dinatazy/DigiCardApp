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
import { AccessToken, LoginManager } from 'react-native-fbsdk';

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
    let { passedProps } = props;
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
  }

  /*   registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log('res', res)
          alert('success', res);
        });
    } */

  signInUser() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log('Success , Signed in', res)
      })
      .catch((err) => {
        console.log('Failed , Signed in', err)
      })
  }

  loginWithFacebook() {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }

        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        // get the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        // login with credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((currentUser) => {
        console.warn(JSON.stringify(currentUser.toJSON()));
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
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
          style={{ width: 100, height: 60 }}
          placeholder='Email'
          value={email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={{ width: 100, height: 60 }}
          placeholder='Password'
          value={password}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity onPress={() => this.loginWithFacebook()}>
          <Text>Sign up</Text>
        </TouchableOpacity>
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
