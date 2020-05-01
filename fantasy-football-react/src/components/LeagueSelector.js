import React, { useState, useEffect } from 'react';
import Dashboard from "./Dashboard"
import { TextField, FormControl, makeStyles, Button } from '@material-ui/core';
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

const LeagueSelector = () => {
  const classes = useStyles();
  const [leagueId, setLeagueId] = useState("");
  const [leagueYear, setLeagueYear] = useState("");
  const [isValidData, setIsValidData] = useState(false);

  const changeLeagueId = (event) => {
    setLeagueId(event.target.value);
  }

  const changeLeagueYear = (event) => {
    setLeagueYear(event.target.value);
  }

  const getTeams = async () => {
    try {
      const client = new Client({leagueId: parseInt(leagueId)})
      const teamArr = []
      const teams = await client.getTeamsAtWeek({seasonId: parseInt(leagueYear), scoringPeriodId: 1})
      teams.forEach((team) => {
        teamArr.push(team)
      })
      setIsValidData(true)
    } catch {
      console.error("No league/season data found")
    }
  }

  return (
    <div className="App">
      <div className={classes.card}>
        <form>
          <TextField value={leagueId} onChange={changeLeagueId} label="League ID"/>
          <TextField value={leagueYear} onChange={changeLeagueYear} label="Year"/>
          <Button onClick={getTeams}>
            Submit
          </Button>
        </form>
      </div>
      {isValidData && <Dashboard />}
    </div>
  );
}

export default LeagueSelector;
