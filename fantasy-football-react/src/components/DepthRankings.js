import React, { useState, useEffect } from 'react';

import { Client } from 'espn-fantasy-football-api';
import { leagueId, seasonId } from '../constants/DynastyLeague';
import TeamCard from './TeamCard';

const DepthRankings = () => {
  const [teams, setTeams] = useState([])

  useEffect(async () => {
    const client = new Client({leagueId})
    const teamArr = []
    const teams = await client.getTeamsAtWeek({seasonId, scoringPeriodId: 1})
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


export default DepthRankings