import axios from 'axios';

export const getAllESPNData = async ({leagueID, leagueYear, scoringPeriod}) => {
  const res = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/${leagueYear}/segments/0/leagues/${leagueID}?scoringPeriodId=${scoringPeriod}&view=mRoster&view=mTeam`)
  const allData = res.data;
  return allData;
}
