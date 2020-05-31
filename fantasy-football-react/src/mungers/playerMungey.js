import { actualStats, projectedStats } from '../constants/statTypes';
import { find } from 'lodash';

const espnPlayerMunger = (data) => {
  const seasonStats = [];
  data.map((weekStats) => {
    seasonStats.push(createLeagueWideWeekStats(weekStats.players));
  });

  return seasonStats;
};

const createLeagueWideWeekStats = (players) => {
  const leagueWideWeekStats = {};
  players.forEach((player) => {
    const playerStats = {
      id: player.id,
      fullName: player.player.fullName,
      actualStats: getStats(player.player.stats, actualStats),
      projectedStats: getStats(player.player.stats, projectedStats),
    };
    leagueWideWeekStats[player.id] = playerStats;
  });

  return leagueWideWeekStats;
};

const getStats = (stats, type) => {
  return find(stats, type);
};

export default espnPlayerMunger;
