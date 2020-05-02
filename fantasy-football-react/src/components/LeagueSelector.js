import React, { useState } from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import {setLeagueYear, setLeagueId} from "../actions/leagueData"
import { Client } from 'espn-fantasy-football-api';
import { useHistory, withRouter } from "react-router-dom";
import { compose } from 'redux';

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
  const history = useHistory();
  const [leagueIdState, setLeagueIdState] = useState("");
  const [leagueYearState, setLeagueYearState] = useState("");

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
      setLeagueId(parseInt(leagueIdState))
      setLeagueYear(parseInt(leagueYearState))
      history.push("/dashboard");
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
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLeagueId: (leagueId) => dispatch(setLeagueId(leagueId)),
    setLeagueYear: (leagueYear) => dispatch(setLeagueYear(leagueYear))
  }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(LeagueSelector);