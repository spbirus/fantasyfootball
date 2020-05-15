import axios from 'axios';

export const getAllESPNData = async ({ leagueID, leagueYear, scoringPeriod }) => {
  const res = await axios.get(
    `http://fantasy.espn.com/apis/v3/games/FBA/seasons/${leagueYear}/segments/0/leagues/${leagueID}?scoringPeriodId=${scoringPeriod}&view=mRoster&view=mTeam`,
  );
  const allData = res.data;
  return allData;
};
