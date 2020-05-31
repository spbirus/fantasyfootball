import { SET_PLAYER_STATS } from '../actiontypes/playerData';

const initialState = {
  playerStats: [],
};

const playerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATS:
      return {
        ...state,
        playerStats: action.playerStats,
      };
    default:
      return state;
  }
};

export default playerData;
