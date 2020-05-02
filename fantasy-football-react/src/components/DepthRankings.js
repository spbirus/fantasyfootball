import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { connect } from 'react-redux';
import { Grid, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  search: {
    margin: "5px 0px 5px 15px"
  },
});

const DepthRankings = ({leagueTeams}) => {
  const classes = useStyles();
  const [filterString, setFilterString] = useState("")

  const filterTeams = (event) => {
    setFilterString(event.target.value.toLowerCase());
  }

  return (
    <div>
      <div className={classes.search}>
          <TextField value={filterString} onChange={filterTeams} label="Filter Teams"/>
      </div>
      <Grid container spacing={2}>
        {leagueTeams.filter(team => (team.location + team.nickname + team.abbrev).toLowerCase().includes(filterString)).map((team) => {return (<TeamCard key={team.id} teamLocation={team.location} teamNickname={team.nickname} roster={team.roster} abbreviation={team.abbrev} logoURL={team.logoURL} />)})}
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    leagueYear: state.leagueData.leagueYear,
    leagueId: state.leagueData.leagueId,
    leagueTeams: state.leagueData.leagueTeams,
  }
}

export default connect(mapStateToProps)(DepthRankings);