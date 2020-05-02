import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {PeopleRounded, ShowChartRounded} from "@material-ui/icons"

const useStyles = makeStyles({
  drawer: {
    width: "200px",
  },
  leagueNameCard: {
    height: "40px",
    textAlign: "center",
  },
  leagueNameText: {
    fontSize: "24px"
  }
});

const items = [
  {
    name: "Depth Chart",
    id: "depthRankings",
    icon: <PeopleRounded/>
  },
  {
    name: "Roster Rankings",
    id: "rosterRankings",
    icon: <ShowChartRounded/>
  }
  // {
  //   name: "Power Rankings",
  //   id: "powerRankings"
  // }
]

const DrawerReact = ({isDrawerOpen, toggleDrawer, selectDrawerItem}) => {
  const classes = useStyles();
  const [leagueName, setLeagueName] = useState("")

  useEffect(async () => {
    // TODO: set the league name
    // setLeagueName(leagueInfo.name)
  }, [])

  return (
    <div id="drawer">
      <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <div className={classes.leagueNameCard}>
            <Typography className={classes.leagueNameText}>{leagueName}</Typography>
          </div>
          <div>
            <List >
              {items.map((item) => (
                <ListItem button key={item.id} onClick={() => selectDrawerItem(item.id)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
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