import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard"
import LeagueSelector from './components/LeagueSelector';
import { Provider } from 'react-redux';
import PrivateRoute from "./components/PrivateRoute"
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
        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Provider>
  );
}

export default withRouter(App);
