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
      const playerPositionId = player.playerPoolEntry.player.defaultPositionId;
      const playerPositionRanking = player.playerPoolEntry.ratings[0].positionalRanking;
      const playerLineupPositionId = player.lineupSlotId
      
      //only rank the starters
      const totalRanking = determineOverallWeightedPlayerValue(playerPositionId, playerLineupPositionId, player.playerPoolEntry.ratings[0].totalRanking);
      if (totalRanking !== 0) {
        totalPlayers += 1;
      }

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


export default espnDataMunger