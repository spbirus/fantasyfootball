import { actualStats, projectedStats } from '../constants/statTypes';
import { find } from 'lodash';

const espnPlayerMunger = (data) => {
  const seasonStats = [];
  const leaguePlayers = [];
  data.map((weekStats) => {
    seasonStats.push(createLeagueWideWeekStats(weekStats.players, leaguePlayers));
  });

  return { seasonStats, leaguePlayers };
};

const createLeagueWideWeekStats = (players, leaguePlayers) => {
  const leagueWideWeekStats = {};
  players.forEach((player) => {
    const playerStats = {
      id: player.id,
      fullName: player.player.fullName,
      actualStats: getStats(player.player.stats, actualStats),
      projectedStats: getStats(player.player.stats, projectedStats),
    };
    leagueWideWeekStats[player.id] = playerStats;
    if (!leaguePlayers.some((item) => item.id === player.id)) {
      leaguePlayers.push({ id: player.id, name: player.player.fullName });
    }
  });

  return leagueWideWeekStats;
};

const getStats = (stats, type) => {
  return find(stats, type);
};

export default espnPlayerMunger;
