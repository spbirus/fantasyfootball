import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard"
import LeagueSelector from './components/LeagueSelector';

const App = () => {
  return (
    <div className="App">
      <LeagueSelector />
    </div>
  );
}

export default App;
