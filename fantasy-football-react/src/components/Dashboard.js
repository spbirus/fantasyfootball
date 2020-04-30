import React, { useState } from 'react';

import { Team } from 'espn-fantasy-football-api';
import { leagueId, seasonId, scoringPeriod } from '../constants/DynastyLeague';
import AppBarReact from './AppBar';
import DrawerReact from './Drawer';
import DepthRankings from './DepthRankings';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [openPage, setOpenPage] = useState("");

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const clickDrawerItem = (id) => {
    console.log(id)
    setOpenPage(id)
    setIsDrawerOpen(false)
  }

  return (
    <div>
      <AppBarReact isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
      <DrawerReact isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} selectDrawerItem={clickDrawerItem}/>
      <div style={{marginTop: "35px"}}>
        Dashboard
        {openPage === "depthRankings" && <DepthRankings />}
      </div>
    </div>
  )
}


export default Dashboard