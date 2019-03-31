import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import logo from './logo.png';
import axios from 'axios';
import Timer from 'easytimer.js';
import $ from 'jquery'; 


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
        <CountDown></CountDown>
      </div>
    );
  }
}

class CountDown extends Component {

  componentDidMount() {
    var timer = new Timer();
      $('#chronoExample .startButton').click(function () {
          timer.start({countdown: true, startValues: {seconds: 5}});
          $('#chronoExample .values h1').html(timer.getTimeValues().toString());
          timer.addEventListener('secondsUpdated', function (e) {
              $('#chronoExample .values h1').html(timer.getTimeValues().toString());
          });
          timer.addEventListener('targetAchieved', function (e) {
              $('#chronoExample .values h1').html('Pomodoro Finished! Start another one.');
          });
      });
      $('#chronoExample .pauseButton').click(function () {
          timer.pause();
      });
      $('#chronoExample .stopButton').click(function () {
          timer.stop();
      });
      $('#chronoExample .resetButton').click(function () {
          timer.reset();
      });
      timer.addEventListener('secondsUpdated', function (e) {
          $('#chronoExample .values h1').html(timer.getTimeValues().toString());
      });
      timer.addEventListener('started', function (e) {
          $('#chronoExample .values h1').html(timer.getTimeValues().toString());
      });
      timer.addEventListener('reset', function (e) {
          $('#chronoExample .values h1').html(timer.getTimeValues().toString());
    });
  }

  render() {
    return(
      <div id="chronoExample">
        <div class="values">
          <h1>
            00:00:00
          </h1>
        </div>
        <div>
            <button class="startButton">Start</button>
            <button class="pauseButton" >Pause</button>
            <button class="stopButton">Stop</button>
            <button class="resetButton">Reset</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
	<App />, document.getElementById('root')
	);
registerServiceWorker();

