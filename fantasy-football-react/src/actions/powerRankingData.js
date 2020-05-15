import {
  WEEKLY_RECORD,
  WEEKLY_CONS,
  WEEKLY_OVL_WINS,
  WEEKLY_PPG,
  WEEKLY_RANK,
} from '../actiontypes/powerRankingData';

export const setWeeklyRecord = (weeklyRecord) => {
  return {
    type: WEEKLY_RECORD,
    weeklyRecord,
  };
};

export const setWeeklyCons = (weeklyCons) => {
  return {
    type: WEEKLY_CONS,
    weeklyCons,
  };
};

export const setWeeklyOvlWins = (weeklyOvlWins) => {
  return {
    type: WEEKLY_OVL_WINS,
    weeklyOvlWins,
  };
};

export const setWeeklyPPG = (weeklyPPG) => {
  return {
    type: WEEKLY_PPG,
    weeklyPPG,
  };
};

export const setWeeklyRank = (weeklyRank) => {
  return {
    type: WEEKLY_RANK,
    weeklyRank,
  };
};
