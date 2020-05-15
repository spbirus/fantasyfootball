import {
  WEEKLY_RECORD,
  WEEKLY_CONS,
  WEEKLY_OVL_WINS,
  WEEKLY_PPG,
  WEEKLY_RANK,
} from '../actiontypes/powerRankingData';

const initialState = {
  weeklyRecord: [],
  weeklyCons: [],
  weeklyOvlWins: [],
  weeklyPPG: [],
  weeklyRank: [],
};

const powerRankingData = (state = initialState, action) => {
  switch (action.type) {
    case WEEKLY_RECORD:
      return {
        ...state,
        weeklyRecord: action.weeklyRecord,
      };
    case WEEKLY_CONS:
      return {
        ...state,
        weeklyCons: action.weeklyCons,
      };
    case WEEKLY_OVL_WINS:
      return {
        ...state,
        weeklyOvlWins: action.weeklyOvlWins,
      };
    case WEEKLY_PPG:
      return {
        ...state,
        weeklyPPG: action.weeklyPPG,
      };
    case WEEKLY_RANK:
      return {
        ...state,
        weeklyRank: action.weeklyRank,
      };
    default:
      return state;
  }
};

export default powerRankingData;
