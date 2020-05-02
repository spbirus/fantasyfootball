import React, { useState } from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import {setLeagueYear, setLeagueId, setLeagueMembers, setLeagueTeams, setLeagueName} from "../actions/leagueData"
import { useHistory, withRouter } from "react-router-dom";
import { compose } from 'redux';
import {getAllESPNData, getESPNLeagueInfo} from "../api/espnFantasyFootballapi"
import espnDataMunger from "../mungers/mungey"
import { useTracking, track } from 'react-tracking';

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

const LeagueSelector = ({setLeagueId, setLeagueYear, setLeagueMembers, setLeagueTeams, setLeagueName}) => {
  const classes = useStyles();
  const history = useHistory();
  const tracking = useTracking();
  const [leagueIdState, setLeagueIdState] = useState("40974493");
  const [leagueYearState, setLeagueYearState] = useState("2019");

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
    setLeagueName: (leagueName) => dispatch(setLeagueName(leagueName)),
  }
}

export default track()(compose(withRouter, connect(null, mapDispatchToProps))(LeagueSelector));
