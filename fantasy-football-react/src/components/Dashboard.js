import React from 'react';

import { Team } from 'espn-fantasy-football-api';
import { leagueId, seasonId, scoringPeriod } from '../constants/DynastyLeague';
import AppBarReact from './AppBar';

const Dashboard = () => {
  return (
    <div>
      <AppBarReact />
      Dashboard
    </div>
  )
}


export default Dashboard