import { SET_PLAYER_STATS, SET_PLAYERS } from '../actiontypes/playerData';

export const setPlayerStats = (playerStats) => {
  return {
    type: SET_PLAYER_STATS,
    playerStats,
  };
};

export const setPlayers = (players) => {
  return {
    type: SET_PLAYERS,
    players,
  };
};
