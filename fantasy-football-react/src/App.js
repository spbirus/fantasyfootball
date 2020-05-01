import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard"
import LeagueSelector from './components/LeagueSelector';
import { Provider } from 'react-redux';
import store from "./store"

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <LeagueSelector />
      </div>
    </Provider>
  );
}

export default App;
