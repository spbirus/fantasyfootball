import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

const DepthRankings = ({leagueTeams}) => {

  return (
    <div>
      Rankings
      <Grid container spacing={2}>
        {leagueTeams.map((team) => {return (<TeamCard key={team.id} teamLocation={team.location} teamNickname={team.nickname} roster={team.roster} abbreviation={team.abbrev} logoURL={team.logoURL} />)})}
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