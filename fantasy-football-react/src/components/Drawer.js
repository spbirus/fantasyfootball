import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { leagueId, seasonId } from '../constants/DynastyLeague';
import { Client } from 'espn-fantasy-football-api';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  drawer: {
    width: "200px",
  },
});

const items = [
  {
    name: "Depth Rankings",
    id: "depthRankings"
  },
  // {
  //   name: "Power Rankings",
  //   id: "powerRankings"
  // }
]

const DrawerReact = ({isDrawerOpen, toggleDrawer, selectDrawerItem}) => {
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
          <div>
            <List >
              {items.map((item) => (
                <ListItem button key={item.id} onClick={() => selectDrawerItem(item.id)}>
                  <ListItemIcon>{}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Drawer>
    </div>
  )
}


export default DrawerReact