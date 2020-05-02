import { SET_LEAGUE_ID, SET_LEAGUE_YEAR, SET_LEAGUE_MEMBERS, SET_LEAGUE_TEAMS } from "../actiontypes/leagueData";

const initialState = {
  leagueId: 40974493,
  leagueYear: 2019,
  leagueMembers: [],
  leagueTeams: [],
}

const leagueData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEAGUE_ID:
      return {
        ...state,
        leagueId: action.leagueId
      }
    case SET_LEAGUE_YEAR:
      return {
        ...state,
        leagueYear: action.leagueYear
      }
    case SET_LEAGUE_MEMBERS:
      return {
        ...state,
        leagueMembers: action.leagueMembers
      }
    case SET_LEAGUE_TEAMS:
      return {
        ...state,
        leagueTeams: action.leagueTeams
      }
    default:
      return state
  }
}

export default leagueData