

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
      rosterStats: createRosterStats(team.roster),
    })
  })
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
        //stats
      })
    })
  }
  return mungedRoster;
}

const createRosterStats = (roster) => {
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
    const positionRanking = positionRankings.map((rank, idx) => rank/positionPlayers[idx])
    mungedRosterStats = {
      totalRanking: totalRankings/totalPlayers,
      positionRanking,
    }
  }
  return mungedRosterStats
}


export default espnDataMunger