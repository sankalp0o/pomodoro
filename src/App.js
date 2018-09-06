import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pomodoro Timer</h1>
        </header>
        <p className="App-intro">
          To get started, press <code>START</code>.
        </p>
        <button> START </button>
      </div>
    );
  }
}

export default App;
