import React from 'react';
import './App.css';
import SidebarAppbarWrapper from './components/SidebarAppbarWrapper';
import LeagueSelector from './components/LeagueSelector';
import HistoricalRoster from './components/HistoricalRoster';
import RosterRankings from './components/RosterRankings';
import PowerRankings from './components/PowerRankings';
import PlayerComparison from './components/PlayerComparison';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import store from './store';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  DASHBOARD_ROUTE,
  DEPTH_ROUTE,
  ROSTER_ROUTE,
  POWER_RANKING_ROUTE,
  PLAYER_COMPARISON_ROUTE,
} from './constants/routes';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={LeagueSelector} />
        <PrivateRoute exact path={`/${DASHBOARD_ROUTE}`}>
          <SidebarAppbarWrapper>
            <Dashboard />
          </SidebarAppbarWrapper>
        </PrivateRoute>
        <PrivateRoute exact path={`/${DEPTH_ROUTE}`}>
          <SidebarAppbarWrapper>
            <HistoricalRoster />
          </SidebarAppbarWrapper>
        </PrivateRoute>
        <PrivateRoute exact path={`/${ROSTER_ROUTE}`}>
          <SidebarAppbarWrapper>
            <RosterRankings />
          </SidebarAppbarWrapper>
        </PrivateRoute>
        <PrivateRoute exact path={`/${POWER_RANKING_ROUTE}`}>
          <SidebarAppbarWrapper>
            <PowerRankings />
          </SidebarAppbarWrapper>
        </PrivateRoute>
        <PrivateRoute exact path={`/${PLAYER_COMPARISON_ROUTE}`}>
          <SidebarAppbarWrapper>
            <PlayerComparison />
          </SidebarAppbarWrapper>
        </PrivateRoute>
      </Switch>
    </Provider>
  );
};

export default withRouter(App);
