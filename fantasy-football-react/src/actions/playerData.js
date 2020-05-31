import { SET_PLAYER_STATS } from '../actiontypes/playerData';

export const setPlayerStats = (playerStats) => {
  return {
    type: SET_PLAYER_STATS,
    playerStats,
  };
};
