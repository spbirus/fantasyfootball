import { actualStats, projectedStats } from '../constants/statTypes';
import { find } from 'lodash';

const espnPlayerMunger = (data) => {
  const seasonStats = [];
  const leaguePlayers = [];
  data.forEach((weekStats) => {
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
      playerPositionRank: player.ratings ? player.ratings[0].positionalRanking : null,
      playerTotalRanking: player.ratings ? player.ratings[0].totalRanking : null,
      isQB: player.player.eligibleSlots.includes(0),
      isRB: player.player.eligibleSlots.includes(2),
      isWR: player.player.eligibleSlots.includes(4),
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
