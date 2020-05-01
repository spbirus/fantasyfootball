import React, { useState, useEffect } from 'react';

import { Client } from 'espn-fantasy-football-api';
import TeamCard from './TeamCard';
import { connect } from 'react-redux';

const DepthRankings = ({leagueId, leagueYear}) => {
  const [teams, setTeams] = useState([])

  useEffect(async () => {
    const client = new Client({leagueId})
    const teamArr = []
    const teams = await client.getTeamsAtWeek({seasonId: leagueYear, scoringPeriodId: 1})
    teams.forEach((team) => {
      teamArr.push(team)
    })
    console.log(teamArr)
    setTeams(teamArr)
  }, [])
  

  return (
    <div>
      Rankings
      {teams.map((team) => {return (<TeamCard teamName={team.name} roster={team.roster} abbreviation={team.abbreviation} logoURL={team.logoURL} />)})}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    leagueYear: state.leagueData.leagueYear,
    leagueId: state.leagueData.leagueId
  }
}

export default connect(mapStateToProps)(DepthRankings);