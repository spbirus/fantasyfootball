import {times, find} from "lodash";
import {getRosterESPNData} from "../api/espnFantasyFootballapi"
import espnDataMunger from "../mungers/mungey"

const createPowerRankings = async (teams, matchups, leagueId, leagueYear) => {
  const powerRankingsOverTime = []
  const teamWeeklyRecord = []
  const teamWeeklyCons = []
  const teamWeeklyOvlWins = []
  const teamWeeklyPPG = []
  const teamWeeklyRank = []
  const weeksPlayed = matchups[1] ? matchups[1].length : 0;

  for(const week of times(weeksPlayed)){
    // get the ratings for each week only once from ESPN
    const weeklyRankings = espnDataMunger(await getRosterESPNData({leagueID: leagueId, leagueYear: leagueYear, scoringPeriod: (week+1)}))

    for(const teamId of Object.keys(matchups)) {
      const teamWeeklyMatchups = matchups[teamId]
      const weekData = teamWeeklyMatchups[week]

      // record
      const winPct = weekData.wins / (week + 1);
      (teamWeeklyRecord[teamId]?.data) ? teamWeeklyRecord[teamId].data.push({number: winPct}) : teamWeeklyRecord[teamId] = {id: teamId, data: [{number: winPct}]};

      // consistent wins
      const winsInARow = (week !== 0) ? (weekData.won ? teamWeeklyCons[teamId][week - 1] + 1 : 0) : (weekData.won ? 1 : 0);
      (teamWeeklyCons[teamId]?.data) ? teamWeeklyCons[teamId].data.push({number: winsInARow}) : teamWeeklyCons[teamId] = {id: teamId, data: [{number: winsInARow}]};

      // overall wins against everyone else in the league
      const overallWins = determineOverallWins(weekData.points, matchups, week, teamId);
      (teamWeeklyOvlWins[teamId]?.data) ? teamWeeklyOvlWins[teamId].data.push({number: overallWins}) : teamWeeklyOvlWins[teamId] = {id: teamId, data: [{number: overallWins}]};

      // PPG
      let points = 0;
      times(week + 1).forEach(idx => {
        points = points + teamWeeklyMatchups[idx].points;
      })
      const ppg = points / (week + 1);
      (teamWeeklyPPG[teamId]?.data) ? teamWeeklyPPG[teamId].data.push({number: ppg}) : teamWeeklyPPG[teamId] = {id: teamId, data: [{number: ppg}]};

      // rankings
      const weekRank = find(weeklyRankings.teams, {'id': parseInt(teamId)})?.rosterStats.totalRankingPosition;
      (teamWeeklyRank[teamId]?.data) ? teamWeeklyRank[teamId].data.push({number: weekRank}) : teamWeeklyRank[teamId] = {id: teamId, data: [{number: weekRank}]};

      

    }

  }
  createRelationalData(teamWeeklyRecord, weeksPlayed)
  createRelationalData(teamWeeklyPPG, weeksPlayed)
  createRelationalData(teamWeeklyCons, weeksPlayed)
  createRelationalData(teamWeeklyOvlWins, weeksPlayed)
  createRelationalData(teamWeeklyRank, weeksPlayed)
  console.log(teamWeeklyRecord)
  console.log(teamWeeklyPPG)
  console.log(teamWeeklyCons)
  console.log(teamWeeklyOvlWins)
  console.log(teamWeeklyRank)

  
  // calculate the overall power rankings
  // will have to turn all of these numbers into relative values i.e. 1-16

  // push to powerRankingsOverTime
  // powerRankingsOverTime[teamId].push()
}

const determineOverallWins = (weeksPoints, matchups, week, teamId) => {
  let wins = 0;
  Object.keys(matchups).forEach((oppTeamId) => {
    if(teamId !== oppTeamId && weeksPoints > matchups[oppTeamId][week].points) {
      wins++;
    }
  })
  return wins;
}

const createRelationalData = (d, numberOfWeeks) => {
  times(numberOfWeeks).forEach(weekIndex => {
    d.sort((a,b) => b.data[weekIndex].number - a.data[weekIndex].number).map((item, idx) => 
      item.data[weekIndex].position = idx + 1
    )
  })


  // sort based on each position ranking
  // times(numberOfWeeks).forEach(weekIndex => {
  //   times(numberOfTeams).forEach(teamIndex => {
  //     data.sort((a, b) => a[teamIndex][weekIndex].number - b[teamIndex][weekIndex].number).map((item, idx) => 
  //       item[teamIndex][weekIndex].position = idx + 1
  //     )
  //   })
  // })
}

export default createPowerRankings