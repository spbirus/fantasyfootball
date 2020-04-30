import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { leagueId, seasonId } from '../constants/DynastyLeague';
import { Client } from 'espn-fantasy-football-api';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  drawer: {
    width: "200px",
  },
});

const DrawerReact = ({isDrawerOpen, toggleDrawer}) => {
  const classes = useStyles();
  const [leagueName, setLeagueName] = useState("")

  useEffect(async () => {
    const client = new Client({leagueId})
    const leagueInfo = await client.getLeagueInfo({seasonId})
    setLeagueName(leagueInfo.name)
  }, [])

  return (
    <div id="drawer">
      <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <Typography>{leagueName}</Typography>
        </div>
      </Drawer>
    </div>
  )
}


export default DrawerReact