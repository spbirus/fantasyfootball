import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {PeopleRounded, ShowChartRounded, MultilineChartRounded} from "@material-ui/icons"
import { connect } from 'react-redux'
import { TextField, makeStyles, Button } from '@material-ui/core';
import {setLeagueYear, setLeagueId, setLeagueMembers, setLeagueTeams, setLeagueName, setLeagueWeek, setLeagueMatchups} from "../actions/leagueData"
import { useHistory } from "react-router-dom";
import {getAllESPNData, getESPNLeagueInfo} from "../api/espnFantasyFootballapi"
import espnDataMunger from "../mungers/mungey"
import { useTracking, track } from 'react-tracking';
import pjson from '../../package.json';

const useStyles = makeStyles({
  drawer: {
    width: "250px",
  },
  leagueNameCard: {
    height: "40px",
    textAlign: "center",
  },
  leagueNameText: {
    fontSize: "24px"
  },
  card: {
    width: "90%",
    margin: "auto"
  },
  version: {
    color: "grey",
    bottom: 0,
    position: "fixed",
    left: "100px"
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
  },
  {
    name: "Power Rankings",
    id: "powerRankings",
    icon: <MultilineChartRounded />
  }
]

const DrawerReact = ({isDrawerOpen, toggleDrawer, selectDrawerItem, leagueName, leagueId, leagueWeek, leagueYear, setLeagueId, setLeagueYear, setLeagueMembers, setLeagueTeams, setLeagueName, setLeagueWeek, setLeagueMatchups}) => {
  const classes = useStyles();
  const history = useHistory();
  const tracking = useTracking();
  const [leagueIdState, setLeagueIdState] = useState(leagueId.toString());
  const [leagueYearState, setLeagueYearState] = useState(leagueYear.toString());
  const [leagueWeekState, setLeagueWeekState] = useState(leagueWeek.toString());

  const changeLeagueId = (event) => {
    setLeagueIdState(event.target.value);
  }

  const changeLeagueYear = (event) => {
    setLeagueYearState(event.target.value);
  }

  const changeLeagueWeek = (event) => {
    setLeagueWeekState(event.target.value);
  }

  const getTeams = async () => {
    try {
      const response = await getAllESPNData({leagueID: parseInt(leagueIdState), leagueYear: parseInt(leagueYearState), scoringPeriod: parseInt(leagueWeekState)});
      const munge = espnDataMunger(response)
      setLeagueId(parseInt(leagueIdState))
      setLeagueYear(parseInt(leagueYearState))
      setLeagueWeek(parseInt(leagueWeekState))
      setLeagueMembers(munge.members)
      setLeagueTeams(munge.teams)
      setLeagueMatchups(munge.matchups)

      const responseLeague = await getESPNLeagueInfo({leagueID: parseInt(leagueIdState), leagueYear: parseInt(leagueYearState)});
      setLeagueName(responseLeague.settings.name)

      tracking.trackEvent({action: "submit-league-info", leagueID: leagueIdState, leagueYear: leagueYearState})

      history.push("/dashboard");
    } catch (e) {
      alert("No league/season data found")
      console.error("No league/season data found", e)
    }
  }

  return (
    <div id="drawer">
      <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <div className={classes.leagueNameCard}>
            <Typography className={classes.leagueNameText}>{leagueName}</Typography>
          </div>
          <div className={classes.card}>
            <form>
              <TextField value={leagueIdState} onChange={changeLeagueId} label="League ID"/>
              <TextField value={leagueYearState} onChange={changeLeagueYear} label="Year"/>
              <TextField value={leagueWeekState} onChange={changeLeagueWeek} label="Week"/>
              <Button onClick={getTeams}>
                Submit
              </Button>
            </form>
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
          <div className={classes.version}>
            {pjson.version}
          </div>
        </div>
      </Drawer>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    leagueName: state.leagueData.leagueName,
    leagueId: state.leagueData.leagueId,
    leagueYear: state.leagueData.leagueYear,
    leagueWeek: state.leagueData.leagueWeek,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLeagueId: (leagueId) => dispatch(setLeagueId(leagueId)),
    setLeagueYear: (leagueYear) => dispatch(setLeagueYear(leagueYear)),
    setLeagueMembers: (leagueMembers) => dispatch(setLeagueMembers(leagueMembers)),
    setLeagueTeams: (leagueTeams) => dispatch(setLeagueTeams(leagueTeams)),
    setLeagueWeek: (leagueWeek) => dispatch(setLeagueWeek(leagueWeek)),
    setLeagueName: (leagueName) => dispatch(setLeagueName(leagueName)),
    setLeagueMatchups: (leagueMatchups) => dispatch(setLeagueMatchups(leagueMatchups)),
  }
}


export default track()(connect(mapStateToProps, mapDispatchToProps)(DrawerReact));