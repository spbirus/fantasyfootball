import {times} from "lodash";

const espnDataMunger = (data) => {
  const members = data.members ? createMembers(data.members) : null;
  const teams = data.teams ? createTeams(data.teams) : null;
  const matchups = data.schedule ? createMatchups(data.schedule) : null;

  return {
    members,
    teams,
    matchups
  }
}

const createMembers = (members) => {
  const mungedMembers = [];
  members.forEach( member => {
    mungedMembers.push({
      firstName: member.firstName,
      lastName: member.lastName,
      displayName: member.displayName,
      id: member.id,
    })
  })
  return mungedMembers
}

const createTeams = (teams) => {
  const mungedTeams = [];
  teams.forEach(team => {
    window.team = team
    mungedTeams.push({
      id: team.id,
      abbrev: team.abbrev,
      location: team.location,
      nickname: team.nickname,
      logoURL: team.logo,
      owners: team.owners,
      primaryOwner: team.primaryOwner,
      roster: createRoster(team.roster),
      rosterStats: createRosterStatsHardData(team.roster),
    })
  })
  createRosterStatsRelationalData(mungedTeams);
  return mungedTeams;
}

const createRoster = (roster) => {
  const mungedRoster = [];
  if(roster){
    roster.entries.forEach(player => {
      mungedRoster.push({
        playerId: player.playerId,
        name: player.playerPoolEntry.player.fullName,
        defaultPositionId: player.playerPoolEntry.player.defaultPositionId,
        rankings: {
          positionRank: player.playerPoolEntry.ratings[0].positionalRanking,
          totalRanking: player.playerPoolEntry.ratings[0].totalRanking,
        },
        lineupSlot: player.lineupSlotId
      })
    })
  }
  return mungedRoster;
}

const createRosterStatsHardData = (roster) => {
  let mungedRosterStats = {};
  const positionRankings = [];
  const positionPlayers = [];
  let totalRankings = 0;
  let totalPlayers = 0;
  if(roster){
    roster.entries.forEach(player => {
      const playerPositionId = player.playerPoolEntry.player.defaultPositionId;
      const playerPositionRanking = player.playerPoolEntry.ratings[0].positionalRanking;
      const playerLineupPositionId = player.lineupSlotId
      const playerOverallRanking = player.playerPoolEntry.ratings[0].totalRanking;
      
      // total the overall rankings
      // only rank the starters
      const totalRanking = determineOverallWeightedPlayerValue(playerPositionId, playerLineupPositionId, playerPositionRanking);
      if (totalRanking !== 0) {
        totalPlayers += 1;
      }
      totalRankings += totalRanking

      // total each positional ranking
      const positionWeightedValue = determineWeightedPlayerValue(playerPositionId, playerLineupPositionId, playerPositionRanking);
      if (positionWeightedValue !== 0){
        // increase the total number of players at each position
        if(positionPlayers[playerPositionId]){
          positionPlayers[playerPositionId] = positionPlayers[playerPositionId] + 1;
        } else {
          positionPlayers[playerPositionId] = 1;
        }
        // increase the total ranking of each position
        if(positionRankings[playerPositionId]){
          positionRankings[playerPositionId] += positionWeightedValue;
        } else {
          positionRankings[playerPositionId] = positionWeightedValue
        }
      }
    })
    const positionRankingNumber = positionRankings.map((rank, idx) => rank/positionPlayers[idx])
    mungedRosterStats = {
      totalRankingNumber: totalRankings/totalPlayers,
      positionRankingNumber,
      positionRankingPosition: [],
    }
  }
  return mungedRosterStats
}

const createRosterStatsRelationalData = (teams) => {
  // sort based on overall ranking
  const teamSorted = teams.sort((a, b) => {
    return a.rosterStats.totalRankingNumber - b.rosterStats.totalRankingNumber
  })
  teamSorted.map((team, idx) => {
    team.rosterStats.totalRankingPosition = idx + 1;
  })

  // sort based on each position ranking
  times(6).forEach(index => {
    try{
      const teamSorted2 = teams.sort((a, b) => {
        return a.rosterStats.positionRankingNumber[index] - b.rosterStats.positionRankingNumber[index]
      })
      // have to use a value here due to the fact that people could have 0 of a certain position and 
      // idx in the .map would account for those empty slots
      let value = 0;
      teamSorted2.map((team) => {
        if(team.rosterStats.positionRankingNumber[index]){
          value += 1
          team.rosterStats.positionRankingPosition[index] = value
        }
      })
    } catch (e) {
      console.error(e)
    }
  })
}

const determineOverallWeightedPlayerValue = (playerPositionId, playerLineupPositionId, playerValue) => {
  if (playerLineupPositionId !== (20 || 21)){
    if(playerPositionId === 1){
      //QB
      return playerValue * 0.2;
    } else if(playerPositionId === 2){
      //RB
      return playerValue * 0.4;
    } else if(playerPositionId === 3){
      // WR
      return playerValue * 0.3;
    } else if(playerPositionId === 4){
      // TE
      return playerValue * 0.1;
    }
  } else {
    return 0
  }
}

// if the player is at 20 (bench) or 21 (IR) then exclude them
// As of 5/2 there is no weight on each position since we are already removing the bench players
const determineWeightedPlayerValue = (playerPositionId, playerLineupPositionId, playerPositionRanking) => {
  return playerLineupPositionId !== (20 || 21) ? playerPositionRanking : 0
}

const createMatchups = (schedule) => {
  const teamSchedules = [];
  schedule.forEach(matchup => {
    const matchupPeriodId = matchup.matchupPeriodId

    // determine all the points scored during each week
    if (matchup.winner === "AWAY"){
      // away win
      const awayTeamId = matchup.away.teamId
      const awayWinData = {
        wins: teamSchedules[awayTeamId] ? teamSchedules[awayTeamId][teamSchedules[awayTeamId].length - 1].wins + 1 : 1,
        loses: teamSchedules[awayTeamId] ? teamSchedules[awayTeamId][teamSchedules[awayTeamId].length - 1].loses : 0,
        won: true,
        points: matchup.away.totalPoints,
        matchupPeriodId
      }
      if(teamSchedules[awayTeamId]){
        teamSchedules[awayTeamId].push(awayWinData)
      } else {
        teamSchedules[awayTeamId] = [awayWinData]
      }

      // home loss
      const homeTeamId = matchup.home.teamId
      const homeLossData = {
        wins: teamSchedules[homeTeamId] ? teamSchedules[homeTeamId][teamSchedules[homeTeamId].length - 1].wins : 0,
        loses: teamSchedules[homeTeamId] ? teamSchedules[homeTeamId][teamSchedules[homeTeamId].length - 1].loses + 1 : 1,
        won: false,
        points: matchup.home.totalPoints,
        matchupPeriodId
      }
      if(teamSchedules[homeTeamId]){
        teamSchedules[homeTeamId].push(homeLossData)
      } else {
        teamSchedules[homeTeamId] = [homeLossData]
      }
    } else if (matchup.winner === "HOME") {
      // away loss
      const awayTeamId = matchup.away.teamId
      const awayLossData = {
        wins: teamSchedules[awayTeamId] ? teamSchedules[awayTeamId][teamSchedules[awayTeamId].length - 1].wins : 0,
        loses: teamSchedules[awayTeamId] ? teamSchedules[awayTeamId][teamSchedules[awayTeamId].length - 1].loses + 1 : 1,
        won: false,
        points: matchup.away.totalPoints,
        matchupPeriodId
      }
      if(teamSchedules[awayTeamId]){
        teamSchedules[awayTeamId].push(awayLossData)
      } else {
        teamSchedules[awayTeamId] = [awayLossData]
      }

      // home win
      const homeTeamId = matchup.home.teamId
      const homeWinData = {
        wins: teamSchedules[homeTeamId] ? teamSchedules[homeTeamId][teamSchedules[homeTeamId].length - 1].wins + 1 : 1,
        loses: teamSchedules[homeTeamId] ? teamSchedules[homeTeamId][teamSchedules[homeTeamId].length - 1].loses : 0,
        won: true,
        points: matchup.home.totalPoints,
        matchupPeriodId
      }
      if(teamSchedules[homeTeamId]){
        teamSchedules[homeTeamId].push(homeWinData)
      } else {
        teamSchedules[homeTeamId] = [homeWinData]
      }
    }
  })

  return teamSchedules
}


export default espnDataMunger