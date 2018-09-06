import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import logo from './logo.png';
import axios from 'axios';

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
        <Timer></Timer>
      </div>
    );
  }
}

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.getTimeRemaining = this.getTimeRemaining.bind(this)
    this.postToAirtable = this.postToAirtable.bind(this)
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => {
    	this.setState({time: Date.now() - this.state.start});
      if (25*60*1000 - this.state.time<200) {
        this.stopTimer();
        const recordId = this.postToAirtable();
        console.log(recordId);
      };
    }, 1);
  }

  postToAirtable() {
    axios({
          method:'get',
          url:'https://api.airtable.com/v0/appGOvx0K6n52RPYO/August?maxRecords=3&view=Grid%20view&sort%5B0%5D%5Bfield%5D=Name&sort%5B0%5D%5Bdirection%5D=desc',
          headers:{'Authorization': 'Bearer keyYZBRuaSbhVQi5P'},
        })
        .then(function (response) {
          //console.log(response.data.records[0].id);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 0, isOn: false})
  }

  getTimeRemaining(timeInMilliSecs) {
    // return a string value of the time remaining
    const total = timeInMilliSecs,
      minutes = Math.floor(total / 1000 / 60 % 60),
      seconds = Math.floor(total / 1000 % 60) < 10
        ? '0' + Math.floor(total / 1000 % 60)
        : Math.floor(total / 1000 % 60);
    const timeString = minutes +":" + seconds;
    return timeString;
  }

  render() {
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
    return(
      <div>
        <h1>{this.getTimeRemaining(25*60*1000 - this.state.time)}</h1>
        {start}
        {resume}
        {stop}
        {reset}
      </div>
    )
  }
}

ReactDOM.render(
	<App />, document.getElementById('root')
	);
registerServiceWorker();

