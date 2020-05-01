import { SET_LEAGUE_ID, SET_LEAGUE_YEAR } from "../actiontypes/leagueData";

export const setLeagueId = (leagueId) => {
  return {
    type: SET_LEAGUE_ID,
    leagueId
  }
}

export const setLeagueYear = (leagueYear) => {
  return {
    type: SET_LEAGUE_YEAR,
    leagueYear
  }
}