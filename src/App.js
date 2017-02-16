import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDwSxf_Ax0A7wlwkKmxG4oShg7abmgCGPc',
      authDomain: 'auth-26c37.firebaseapp.com',
      databaseURL: 'https://auth-26c37.firebaseio.com',
      storageBucket: 'auth-26c37.appspot.com',
      messagingSenderId: '365588240276'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  };

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button
              children="Log Out"
              onPress={() => firebase.auth().signOut()}
            />
          </CardSection>
      );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  };

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
};

export default App;
