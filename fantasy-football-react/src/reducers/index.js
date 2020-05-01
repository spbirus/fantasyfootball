import {combineReducers } from "redux";
import leagueData from "./leagueData";

const appReducer = combineReducers({
  leagueData,
})

export default (state, action) => {
  return appReducer(state, action)
}