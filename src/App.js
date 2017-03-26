import React, { Component } from 'react';
import Gameboard from './Gameboard.react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Blackjack</h2>
        </div>
        <Gameboard />
      </div>
    );
  }
}

export default App;
