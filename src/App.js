import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import LoginScreen from  './LoginScreen';
import MainScreen from './MainScreen';
import MenuAppBar from  './MenuAppBar';

var config = {
  apiKey: "AIzaSyARAqiI6gTrvur2cSODp2Q30Y3oiiz-Tq4",
  authDomain: "eldik-kg.firebaseapp.com",
  databaseURL: "https://eldik-kg.firebaseio.com",
  projectId: "eldik-kg",
  storageBucket: "eldik-kg.appspot.com",
  messagingSenderId: "773548592368"
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();

class App extends Component {
  constructor(){
    super();
    this.state = {
      isSignedIn: false,
      loaded: false,
      title: 'Элдик'
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        loaded: true
      });
    });
  }

  setTitle = title => {
    this.setState({ title: title });
  }

  render() {
    return (
      <div>
        { this.state.loaded ? (
          <div>
            { this.state.isSignedIn ? (
              <div className="App">
                <MenuAppBar title={this.state.title} />
                <MainScreen auth={auth} database={database} setTitle={this.setTitle.bind(this)} />
              </div>
            ) : (
              <LoginScreen />
            ) }
          </div>) : (
            <div>Loading...</div>
          ) }
      </div>
    );
  }
}

export default App;
