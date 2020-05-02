import React, { useState } from 'react';

import AppBarReact from './AppBar';
import DrawerReact from './Drawer';
import HistoricalRoster from './HistoricalRoster';
import { withRouter } from 'react-router-dom'
import RosterRankings from './RosterRankings';

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
    setOpenPage(id)
    setIsDrawerOpen(false)
  }

  return (
    <div>
      <AppBarReact isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
      <DrawerReact isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} selectDrawerItem={clickDrawerItem}/>
      <div style={{marginTop: "35px"}}>
        Dashboard
        {openPage === "depthRankings" && <HistoricalRoster />}
        {openPage === "rosterRankings" && <RosterRankings />}
      </div>
    </div>
  )
}


export default withRouter(Dashboard);