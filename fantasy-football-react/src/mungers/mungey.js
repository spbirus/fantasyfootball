import {times} from "lodash";

const espnDataMunger = (data) => {
  const members = createMembers(data.members)
  const teams = createTeams(data.teams)

  return {
    members,
    teams
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
      totalPlayers += 1;
      const playerPositionId = player.playerPoolEntry.player.defaultPositionId;
      const playerPositionRanking = player.playerPoolEntry.ratings[0].positionalRanking;
      const totalRanking = player.playerPoolEntry.ratings[0].totalRanking;

      if(positionPlayers[playerPositionId]){
        positionPlayers[playerPositionId] = positionPlayers[playerPositionId] + 1;
      } else {
        positionPlayers[playerPositionId] = 1;
      }

      if(positionRankings[playerPositionId]){
        positionRankings[playerPositionId] += playerPositionRanking;
      } else {
        positionRankings[playerPositionId] = playerPositionRanking;
      }
      totalRankings += totalRanking
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
      teamSorted2.map((team, idx) => {
        if(team.rosterStats.positionRankingNumber[index]){
          team.rosterStats.positionRankingPosition[index] = idx + 1
        }
      })
    } catch (e) {
      console.error(e)
    }
  })
}


export default espnDataMunger