import React, { useState } from 'react';
import { times } from 'lodash';
import Drawer from '@material-ui/core/Drawer';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import { TextField, makeStyles } from '@material-ui/core';
import {
  setLeagueYear,
  setLeagueId,
  setLeagueMembers,
  setLeagueTeams,
  setLeagueName,
  setLeagueWeek,
  setLeagueMatchups,
} from '../actions/leagueData';
import {
  getAllESPNData,
  getESPNLeagueInfo,
  getESPNPlayerStats,
} from '../api/espnFantasyFootballapi';
import espnDataMunger from '../mungers/mungey';
import { useTracking, track } from 'react-tracking';
import pjson from '../../package.json';
import {
  setWeeklyRecord,
  setWeeklyCons,
  setWeeklyOvlWins,
  setWeeklyPPG,
  setWeeklyRank,
  setPowerRankings,
} from '../actions/powerRankingData';
import { setPlayerStats, setPlayers } from '../actions/playerData';
import espnPlayerMunger from '../mungers/playerMungey';
import createPowerRankings from '../utils/createPowerRankings';
import ActivityButton from './form/ActivityButton';
import { toolOptions } from '../constants/toolOptions';
import { BugReportRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  drawer: {
    width: '250px',
  },
  leagueNameCard: {
    height: '40px',
    textAlign: 'center',
  },
  leagueNameText: {
    fontSize: '24px',
  },
  card: {
    width: '90%',
    margin: 'auto',
  },
  version: {
    color: 'grey',
    bottom: 0,
    position: 'fixed',
    left: '100px',
  },
});

const DrawerReact = ({
  isDrawerOpen,
  toggleDrawer,
  selectDrawerItem,
  leagueName,
  leagueId,
  leagueWeek,
  leagueYear,
  setLeagueId,
  setLeagueYear,
  setLeagueMembers,
  setLeagueTeams,
  setLeagueName,
  setLeagueWeek,
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
  const tracking = useTracking();
  const [leagueIdState, setLeagueIdState] = useState(leagueId.toString());
  const [leagueYearState, setLeagueYearState] = useState(leagueYear.toString());
  const [leagueWeekState, setLeagueWeekState] = useState(leagueWeek.toString());
  const [isLoadingData, setIsLoadingData] = useState(false);

  const changeLeagueId = (event) => {
    setLeagueIdState(event.target.value);
  };

  const changeLeagueYear = (event) => {
    setLeagueYearState(event.target.value);
  };

  const changeLeagueWeek = (event) => {
    setLeagueWeekState(event.target.value);
  };

  const getTeams = async () => {
    setIsLoadingData(true);
    try {
      // get basic roster/league data
      const response = await getAllESPNData({
        leagueID: parseInt(leagueIdState),
        leagueYear: parseInt(leagueYearState),
        scoringPeriod: parseInt(leagueWeekState),
      });
      const munge = espnDataMunger(response);
      setLeagueId(parseInt(leagueIdState));
      setLeagueYear(parseInt(leagueYearState));
      setLeagueWeek(parseInt(leagueWeekState));
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
    } catch (e) {
      alert('No league/season data found');
      console.error('No league/season data found', e);
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <div id="drawer">
      <Drawer anchor={'left'} open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <div className={classes.leagueNameCard}>
            <Typography className={classes.leagueNameText}>{leagueName}</Typography>
          </div>
          <div className={classes.card}>
            <form>
              <TextField value={leagueIdState} onChange={changeLeagueId} label="League ID" />
              <TextField value={leagueYearState} onChange={changeLeagueYear} label="Year" />
              <TextField value={leagueWeekState} onChange={changeLeagueWeek} label="Week" />
              <ActivityButton onClick={getTeams} isActive={isLoadingData}>
                Submit
              </ActivityButton>
            </form>
          </div>
          <div>
            <List>
              {toolOptions.map((item) => (
                <ListItem button key={item.name} onClick={() => selectDrawerItem(item.route)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}

              <ListItem
                button
                key={'bugreporter'}
                onClick={() => (window.location.href = 'https://forms.gle/r9xCnhTuYKj2mDUh6')}
              >
                <ListItemIcon>
                  <BugReportRounded />
                </ListItemIcon>
                <ListItemText primary="Bug Reporting and Feature Requests" />
              </ListItem>
            </List>
          </div>
          <div className={classes.version}>{pjson.version}</div>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leagueName: state.leagueData.leagueName,
    leagueId: state.leagueData.leagueId,
    leagueYear: state.leagueData.leagueYear,
    leagueWeek: state.leagueData.leagueWeek,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLeagueId: (leagueId) => dispatch(setLeagueId(leagueId)),
    setLeagueYear: (leagueYear) => dispatch(setLeagueYear(leagueYear)),
    setLeagueMembers: (leagueMembers) => dispatch(setLeagueMembers(leagueMembers)),
    setLeagueTeams: (leagueTeams) => dispatch(setLeagueTeams(leagueTeams)),
    setLeagueWeek: (leagueWeek) => dispatch(setLeagueWeek(leagueWeek)),
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

export default track()(connect(mapStateToProps, mapDispatchToProps)(DrawerReact));
