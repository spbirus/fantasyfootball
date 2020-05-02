import { SET_LEAGUE_ID, SET_LEAGUE_YEAR, SET_LEAGUE_MEMBERS, SET_LEAGUE_TEAMS, SET_LEAGUE_NAME } from "../actiontypes/leagueData";

const initialState = {
  leagueId: null,
  leagueYear: null,
  leagueMembers: [],
  leagueTeams: [],
  leagueName: "",
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
    case SET_LEAGUE_NAME:
      return {
        ...state,
        leagueName: action.leagueName
      }
    default:
      return state
  }
}

export default leagueData