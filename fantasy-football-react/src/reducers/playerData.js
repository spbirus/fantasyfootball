import { SET_PLAYER_STATS, SET_PLAYERS } from '../actiontypes/playerData';

const initialState = {
  playerStats: [],
  players: [],
};

const playerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATS:
      return {
        ...state,
        playerStats: action.playerStats,
      };
    case SET_PLAYERS:
      return {
        ...state,
        players: action.players,
      };
    default:
      return state;
  }
};

export default playerData;
