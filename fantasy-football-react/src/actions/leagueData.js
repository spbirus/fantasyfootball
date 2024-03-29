import {
  SET_LEAGUE_ID,
  SET_LEAGUE_YEAR,
  SET_LEAGUE_MEMBERS,
  SET_LEAGUE_TEAMS,
  SET_LEAGUE_NAME,
  SET_LEAGUE_WEEK,
  SET_LEAGUE_MATCHUPS,
} from '../actiontypes/leagueData';

export const setLeagueId = (leagueId) => {
  return {
    type: SET_LEAGUE_ID,
    leagueId,
  };
};

export const setLeagueYear = (leagueYear) => {
  return {
    type: SET_LEAGUE_YEAR,
    leagueYear,
  };
};

export const setLeagueMembers = (leagueMembers) => {
  return {
    type: SET_LEAGUE_MEMBERS,
    leagueMembers,
  };
};

export const setLeagueTeams = (leagueTeams) => {
  return {
    type: SET_LEAGUE_TEAMS,
    leagueTeams,
  };
};

export const setLeagueName = (leagueName) => {
  return {
    type: SET_LEAGUE_NAME,
    leagueName,
  };
};

export const setLeagueWeek = (leagueWeek) => {
  return {
    type: SET_LEAGUE_WEEK,
    leagueWeek,
  };
};

export const setLeagueMatchups = (leagueMatchups) => {
  return {
    type: SET_LEAGUE_MATCHUPS,
    leagueMatchups,
  };
};
