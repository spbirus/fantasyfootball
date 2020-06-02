import React, { useState } from 'react';
import { times } from 'lodash';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  setLeagueYear,
  setLeagueId,
  setLeagueMembers,
  setLeagueTeams,
  setLeagueName,
  setLeagueMatchups,
} from '../actions/leagueData';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  getAllESPNData,
  getESPNLeagueInfo,
  getESPNPlayerStats,
} from '../api/espnFantasyFootballapi';
import espnDataMunger from '../mungers/mungey';
import espnPlayerMunger from '../mungers/playerMungey';
import { useTracking, track } from 'react-tracking';
import {
  setWeeklyRecord,
  setWeeklyCons,
  setWeeklyOvlWins,
  setWeeklyPPG,
  setWeeklyRank,
  setPowerRankings,
} from '../actions/powerRankingData';
import { setPlayerStats, setPlayers } from '../actions/playerData';
import createPowerRankings from '../utils/createPowerRankings';

const useStyles = makeStyles({
  card: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-50px',
    marginLeft: '-50px',
    width: '100px',
    height: '100px',
  },
});

const LeagueSelector = ({
  setLeagueId,
  setLeagueYear,
  setLeagueMembers,
  setLeagueTeams,
  setLeagueName,
  setLeagueMatchups,
  setWeeklyRecord,
  setWeeklyCons,
  setWeeklyOvlWins,
  setWeeklyPPG,
  setWeeklyRank,
  setPowerRankings,
  setPlayerStats,
  setPlayers,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const tracking = useTracking();
  const [leagueIdState, setLeagueIdState] = useState('40974493');
  const [leagueYearState, setLeagueYearState] = useState('2020');

  const changeLeagueId = (event) => {
    setLeagueIdState(event.target.value);
  };

  const changeLeagueYear = (event) => {
    setLeagueYearState(event.target.value);
  };

  const getTeams = async () => {
    try {
      // get basic roster/league data
      const response = await getAllESPNData({
        leagueID: parseInt(leagueIdState),
        leagueYear: parseInt(leagueYearState),
        scoringPeriod: 1,
      });
      const munge = espnDataMunger(response);
      setLeagueId(parseInt(leagueIdState));
      setLeagueYear(parseInt(leagueYearState));
      setLeagueMembers(munge.members);
      setLeagueTeams(munge.teams);
      setLeagueMatchups(munge.matchups);

      const responseLeague = await getESPNLeagueInfo({
        leagueID: parseInt(leagueIdState),
        leagueYear: parseInt(leagueYearState),
      });
      setLeagueName(responseLeague.settings.name);

      tracking.trackEvent({
        action: 'submit-league-info',
        leagueID: leagueIdState,
        leagueYear: leagueYearState,
      });

      // get player stats
      const playerStats = [];
      for (const week of times(17)) {
        const response = await getESPNPlayerStats({
          leagueID: parseInt(leagueIdState),
          leagueYear: parseInt(leagueYearState),
          scoringPeriod: week + 1,
        });
        playerStats.push(response);
      }
      const playerMunge = espnPlayerMunger(playerStats);
      setPlayerStats(playerMunge.seasonStats);
      setPlayers(playerMunge.leaguePlayers);

      // create power rankings
      await createPowerRankings(
        munge.teams,
        munge.matchups,
        parseInt(leagueIdState),
        parseInt(leagueYearState),
        setWeeklyRecord,
        setWeeklyCons,
        setWeeklyOvlWins,
        setWeeklyPPG,
        setWeeklyRank,
        setPowerRankings,
      );

      history.push('/dashboard');
    } catch (e) {
      alert('No league/season data found');
      console.error('No league/season data found', e);
    }
  };

  return (
    <div className="App">
      <div className={classes.card}>
        <form>
          <TextField value={leagueIdState} onChange={changeLeagueId} label="League ID" />
          <TextField value={leagueYearState} onChange={changeLeagueYear} label="Year" />
          <Button onClick={getTeams}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLeagueId: (leagueId) => dispatch(setLeagueId(leagueId)),
    setLeagueYear: (leagueYear) => dispatch(setLeagueYear(leagueYear)),
    setLeagueMembers: (leagueMembers) => dispatch(setLeagueMembers(leagueMembers)),
    setLeagueTeams: (leagueTeams) => dispatch(setLeagueTeams(leagueTeams)),
    setLeagueName: (leagueName) => dispatch(setLeagueName(leagueName)),
    setLeagueMatchups: (leagueMatchups) => dispatch(setLeagueMatchups(leagueMatchups)),
    setWeeklyRecord: (weeklyRecord) => dispatch(setWeeklyRecord(weeklyRecord)),
    setWeeklyCons: (weeklyCons) => dispatch(setWeeklyCons(weeklyCons)),
    setWeeklyOvlWins: (weeklyOvlWins) => dispatch(setWeeklyOvlWins(weeklyOvlWins)),
    setWeeklyPPG: (weeklyPPG) => dispatch(setWeeklyPPG(weeklyPPG)),
    setWeeklyRank: (weeklyRank) => dispatch(setWeeklyRank(weeklyRank)),
    setPowerRankings: (powerRankings) => dispatch(setPowerRankings(powerRankings)),
    setPlayerStats: (playerStats) => dispatch(setPlayerStats(playerStats)),
    setPlayers: (players) => dispatch(setPlayers(players)),
  };
};

export default track()(compose(withRouter, connect(null, mapDispatchToProps))(LeagueSelector));
