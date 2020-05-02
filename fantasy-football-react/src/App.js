import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard"
import LeagueSelector from './components/LeagueSelector';
import { Provider } from 'react-redux';
import store from "./store"
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom'; 

const App = () => { 
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={LeagueSelector}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </Provider>
  );
}

export default withRouter(App);
