import { SET_LEAGUE_ID, SET_LEAGUE_YEAR } from "../actiontypes/leagueData";

const initialState = {
  leagueId: null,
  leagueYear: null,
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
    default:
      return state
  }
}

export default leagueData