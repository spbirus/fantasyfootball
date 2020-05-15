import { times, find } from 'lodash';
import { getRosterESPNData } from '../api/espnFantasyFootballapi';
import espnDataMunger from '../mungers/mungey';

const createPowerRankings = async (
  teams,
  matchups,
  leagueId,
  leagueYear,
  setWeeklyRecord,
  setWeeklyCons,
  setWeeklyOvlWins,
  setWeeklyPPG,
  setWeeklyRank,
  setPowerRankings,
) => {
  const powerRankingsOverTime = [];
  const teamWeeklyRecord = [];
  const teamWeeklyCons = [];
  const teamWeeklyOvlWins = [];
  const teamWeeklyPPG = [];
  const teamWeeklyRank = [];
  const weeksPlayed = matchups[1] ? matchups[1].length : 0;

  for (const week of times(weeksPlayed)) {
    // get the ratings for each week only once from ESPN
    const weeklyRankings = espnDataMunger(
      await getRosterESPNData({
        leagueID: leagueId,
        leagueYear: leagueYear,
        scoringPeriod: week + 1,
      }),
    );

    for (const teamId of Object.keys(matchups)) {
      const teamWeeklyMatchups = matchups[teamId];
      const weekData = teamWeeklyMatchups[week];

      // record
      const winPct = weekData.wins / (week + 1);
      teamWeeklyRecord[teamId]?.data
        ? teamWeeklyRecord[teamId].data.push({ number: winPct })
        : (teamWeeklyRecord[teamId] = { id: parseInt(teamId), data: [{ number: winPct }] });

      // consistent wins
      const winsInARow =
        week !== 0
          ? weekData.won
            ? teamWeeklyCons[teamId].data[week - 1].number + 1
            : 0
          : weekData.won
          ? 1
          : 0;
      teamWeeklyCons[teamId]?.data
        ? teamWeeklyCons[teamId].data.push({ number: winsInARow })
        : (teamWeeklyCons[teamId] = { id: parseInt(teamId), data: [{ number: winsInARow }] });

      // overall wins against everyone else in the league
      const overallWins = determineOverallWins(weekData.points, matchups, week, teamId);
      teamWeeklyOvlWins[teamId]?.data
        ? teamWeeklyOvlWins[teamId].data.push({ number: overallWins })
        : (teamWeeklyOvlWins[teamId] = { id: parseInt(teamId), data: [{ number: overallWins }] });

      // PPG
      let points = 0;
      times(week + 1).forEach((idx) => {
        points = points + teamWeeklyMatchups[idx].points;
      });
      const ppg = points / (week + 1);
      teamWeeklyPPG[teamId]?.data
        ? teamWeeklyPPG[teamId].data.push({ number: ppg })
        : (teamWeeklyPPG[teamId] = { id: parseInt(teamId), data: [{ number: ppg }] });

      // rankings
      const weekRank = find(weeklyRankings.teams, { id: parseInt(teamId) })?.rosterStats
        .totalRankingPosition;
      teamWeeklyRank[teamId]?.data
        ? teamWeeklyRank[teamId].data.push({ number: weekRank })
        : (teamWeeklyRank[teamId] = { id: parseInt(teamId), data: [{ number: weekRank }] });
    }
  }

  // will have to turn all of these numbers into relative values i.e. 1-16
  createRelationalData(teamWeeklyRecord, weeksPlayed, false);
  createRelationalData(teamWeeklyPPG, weeksPlayed, false);
  createRelationalData(teamWeeklyCons, weeksPlayed, false);
  createRelationalData(teamWeeklyOvlWins, weeksPlayed, true);
  createRelationalData(teamWeeklyRank, weeksPlayed, true);

  // set the redux store values
  setWeeklyRecord(teamWeeklyRecord);
  setWeeklyPPG(teamWeeklyPPG);
  setWeeklyCons(teamWeeklyCons);
  setWeeklyOvlWins(teamWeeklyOvlWins);
  setWeeklyRank(teamWeeklyRank);

  // calculate the overall power rankings
  for (const week of times(weeksPlayed)) {
    const weekNumber = week + 1;
    teams.forEach((team) => {
      const record = find(teamWeeklyRecord, { id: parseInt(team.id) }).data[week].position;
      const ppg = find(teamWeeklyPPG, { id: parseInt(team.id) }).data[week].position;
      const cons = find(teamWeeklyCons, { id: parseInt(team.id) }).data[week].position;
      const ovlWins = find(teamWeeklyOvlWins, { id: parseInt(team.id) }).data[week].position;
      const rank = find(teamWeeklyRank, { id: parseInt(team.id) }).data[week].position;
      // power ranking tweaks to include weight for record after week 3
      // and weight for consistency after week 8
      const powerRankNumber =
        (record * (weekNumber < 3 ? 1.2 : 3) +
          ppg +
          cons * (weekNumber < 8 ? 0 : 1.2) +
          ovlWins +
          rank * 1.5) /
        7;
      powerRankingsOverTime[team.id]?.data
        ? powerRankingsOverTime[team.id].data.push({ number: powerRankNumber })
        : (powerRankingsOverTime[team.id] = {
            id: parseInt(team.id),
            data: [{ number: powerRankNumber }],
          });
    });
  }
  createRelationalData(powerRankingsOverTime, weeksPlayed, true);
  setPowerRankings(powerRankingsOverTime);
  return powerRankingsOverTime;
};

const determineOverallWins = (weeksPoints, matchups, week, teamId) => {
  let wins = 0;
  Object.keys(matchups).forEach((oppTeamId) => {
    if (teamId !== oppTeamId && weeksPoints > matchups[oppTeamId][week].points) {
      wins++;
    }
  });
  return wins;
};

const createRelationalData = (d, numberOfWeeks, direction) => {
  times(numberOfWeeks).forEach((weekIndex) => {
    d.sort((a, b) =>
      direction
        ? a.data[weekIndex].number - b.data[weekIndex].number
        : b.data[weekIndex].number - a.data[weekIndex].number,
    ).map((item, idx) => (item.data[weekIndex].position = idx + 1));
  });
};

export default createPowerRankings;
