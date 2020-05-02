import React, { useState } from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import {setLeagueYear, setLeagueId, setLeagueMembers, setLeagueTeams} from "../actions/leagueData"
import { useHistory, withRouter } from "react-router-dom";
import { compose } from 'redux';
import {getAllESPNData} from "../api/espnFantasyFootballapi"
import espnDataMunger from "../mungers/mungey"

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

const LeagueSelector = ({setLeagueId, setLeagueYear, setLeagueMembers, setLeagueTeams}) => {
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
      const response = await getAllESPNData({leagueID: parseInt(leagueIdState), leagueYear: parseInt(leagueYearState), scoringPeriod: 1});
      const munge = espnDataMunger(response)
      setLeagueId(parseInt(leagueIdState))
      setLeagueYear(parseInt(leagueYearState))
      setLeagueMembers(munge.members)
      setLeagueTeams(munge.teams)
      history.push("/dashboard");
    } catch (e) {
      console.error("No league/season data found", e)
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
    setLeagueYear: (leagueYear) => dispatch(setLeagueYear(leagueYear)),
    setLeagueMembers: (leagueMembers) => dispatch(setLeagueMembers(leagueMembers)),
    setLeagueTeams: (leagueTeams) => dispatch(setLeagueTeams(leagueTeams)),
  }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(LeagueSelector);
