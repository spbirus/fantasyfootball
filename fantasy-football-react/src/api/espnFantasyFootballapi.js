import axios from 'axios';

export const getAllESPNData = async ({ leagueID, leagueYear, scoringPeriod }) => {
  const res = await axios.get(
    `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${leagueYear}/segments/0/leagues/${leagueID}?scoringPeriodId=${scoringPeriod}&view=mRoster&view=mTeam&view=mMatchup`,
  );
  const allData = res.data;
  return allData;
};

export const getRosterESPNData = async ({ leagueID, leagueYear, scoringPeriod }) => {
  const res = await axios.get(
    `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${leagueYear}/segments/0/leagues/${leagueID}?scoringPeriodId=${scoringPeriod}&view=mRoster&view=mTeam`,
  );
  const allData = res.data;
  return allData;
};

export const getESPNLeagueInfo = async ({ leagueID, leagueYear }) => {
  const res = await axios.get(
    `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${leagueYear}/segments/0/leagues/${leagueID}?view=mSettings`,
  );
  const allData = res.data;
  return allData;
};

export const getESPNPlayerStats = async ({ leagueID, leagueYear, scoringPeriod }) => {
  const res = await axios.get(
    `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${leagueYear}/segments/0/leagues/${leagueID}?scoringPeriodId=${scoringPeriod}&view=kona_player_info`,
  );
  const playerData = res.data;
  return playerData;
};
