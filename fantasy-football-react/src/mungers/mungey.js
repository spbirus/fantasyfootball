

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
        // TODO: map this to an actual position
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


export default espnDataMunger