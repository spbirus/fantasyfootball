import { SET_LEAGUE_ID, SET_LEAGUE_YEAR, SET_LEAGUE_MEMBERS, SET_LEAGUE_TEAMS, SET_LEAGUE_NAME, SET_LEAGUE_WEEK } from "../actiontypes/leagueData";

const initialState = {
  leagueId: null,
  leagueYear: null,
  leagueWeek: 1,
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
    case SET_LEAGUE_WEEK:
      return {
        ...state,
        leagueWeek: action.leagueWeek
      }
    default:
      return state
  }
}

export default leagueData