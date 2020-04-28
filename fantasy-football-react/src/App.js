import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Client } from 'espn-fantasy-football-api';
import { leagueId, seasonId, scoringPeriod } from './constants/DynastyLeague';


const myClient = new Client({ leagueId: leagueId});

const App = async () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
