import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default class App extends React.Component {

  componentDidMount( ) {
    const config = {
      apiKey: "AIzaSyAIH1WJFPEwGk7F7hMGw-CQdKGX0D15K5E",
      authDomain: "fir-userlogin-44527.firebaseapp.com",
      databaseURL: "https://fir-userlogin-44527.firebaseio.com",
      projectId: "fir-userlogin-44527",
      storageBucket: "fir-userlogin-44527.appspot.com",
      messagingSenderId: "850962494609"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUp />
        <SignIn />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
