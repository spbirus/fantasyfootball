import { combineReducers } from 'redux';
import leagueData from './leagueData';
import powerRankingData from './powerRankingData';

const appReducer = combineReducers({
  leagueData,
  powerRankingData,
});

export default (state, action) => {
  return appReducer(state, action);
};
