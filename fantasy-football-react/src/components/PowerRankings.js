import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import createPowerRankings from '../utils/createPowerRankings'

const PowerRankings = ({leagueTeams, leagueMatchups, leagueId, leagueYear}) => {
  
  useEffect(() => {
    createPowerRankings(leagueTeams, leagueMatchups, leagueId, leagueYear)
  })

  return (
    <div>
      power rankings
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    leagueTeams: state.leagueData.leagueTeams,
    leagueMatchups: state.leagueData.leagueMatchups,
    leagueId: state.leagueData.leagueId,
    leagueYear: state.leagueData.leagueYear,
  }
}

export default connect(mapStateToProps)(PowerRankings);