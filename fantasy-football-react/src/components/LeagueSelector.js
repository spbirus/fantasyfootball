import React, { useState, useEffect } from 'react';
import Dashboard from "./Dashboard"
import { TextField, FormControl, makeStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import {setLeagueYear, setLeagueId} from "../actions/leagueData"
import { Client } from 'espn-fantasy-football-api';

const useStyles = makeStyles({
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-50px",
    marginLeft: "-50px",
    width: "100px",
    height: "100px"
  },
});

const LeagueSelector = ({setLeagueId, setLeagueYear}) => {
  const classes = useStyles();
  const [leagueIdState, setLeagueIdState] = useState("");
  const [leagueYearState, setLeagueYearState] = useState("");
  const [isValidData, setIsValidData] = useState(false);

  const changeLeagueId = (event) => {
    setLeagueIdState(event.target.value);
  }

  const changeLeagueYear = (event) => {
    setLeagueYearState(event.target.value);
  }

  const getTeams = async () => {
    try {
      const client = new Client({leagueId: parseInt(leagueIdState)})
      const teamArr = []
      const teams = await client.getTeamsAtWeek({seasonId: parseInt(leagueYearState), scoringPeriodId: 1})
      teams.forEach((team) => {
        teamArr.push(team)
      })
      setIsValidData(true)
      setLeagueId(leagueIdState)
      setLeagueYear(leagueYearState)
    } catch {
      console.error("No league/season data found")
    }
  }

  return (
    <div className="App">
      <div className={classes.card}>
        <form>
          <TextField value={leagueIdState} onChange={changeLeagueId} label="League ID"/>
          <TextField value={leagueYearState} onChange={changeLeagueYear} label="Year"/>
          <Button onClick={getTeams}>
            Submit
          </Button>
        </form>
      </div>
      {isValidData && <Dashboard />}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLeagueId: (leagueId) => dispatch(setLeagueId(leagueId)),
    setLeagueYear: (leagueYear) => dispatch(setLeagueYear(leagueYear))
  }
}

export default connect(null, mapDispatchToProps)(LeagueSelector);
