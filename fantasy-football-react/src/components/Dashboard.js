import React, { useState } from 'react';

import { Team } from 'espn-fantasy-football-api';
import { leagueId, seasonId, scoringPeriod } from '../constants/DynastyLeague';
import AppBarReact from './AppBar';
import DrawerReact from './Drawer';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };


  return (
    <div>
      <AppBarReact isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
      <DrawerReact isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
      Dashboard
    </div>
  )
}


export default Dashboard