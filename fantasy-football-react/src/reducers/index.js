import { combineReducers } from 'redux';
import leagueData from './leagueData';
import powerRankingData from './powerRankingData';
import playerData from './playerData';

const appReducer = combineReducers({
  leagueData,
  powerRankingData,
  playerData,
});

export default (state, action) => {
  return appReducer(state, action);
};
