import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {PeopleRounded, ShowChartRounded} from "@material-ui/icons"
import { connect } from 'react-redux'

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

const DrawerReact = ({isDrawerOpen, toggleDrawer, selectDrawerItem, leagueName}) => {
  const classes = useStyles();

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

const mapStateToProps = (state) => {
  return {
    leagueName: state.leagueData.leagueName,
  }
}


export default connect(mapStateToProps)(DrawerReact);