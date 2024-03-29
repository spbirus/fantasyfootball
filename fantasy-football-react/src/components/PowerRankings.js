import React, { useEffect, useState, useCallback } from 'react';
import {
  makeStyles,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import createPowerRankings from '../utils/createPowerRankings';
import { Line } from 'react-chartjs-2';
import { find } from 'lodash';
import PowerRankingSkeleton from '../skeletons/powerRankingSkeleton';
import {
  setWeeklyRecord,
  setWeeklyCons,
  setWeeklyOvlWins,
  setWeeklyPPG,
  setWeeklyRank,
  setPowerRankings,
} from '../actions/powerRankingData';
import { ArrowUpwardRounded, ArrowDownwardRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  lineChart: {
    width: '70%',
    margin: 'auto',
  },
});

const colors = [
  '#00FFFF',
  '#808080',
  '#000080',
  '#C0C0C0',
  '#000000',
  '#008000',
  '#808000',
  '#008080',
  '#0000FF',
  '#00FF00',
  '#800080',
  '#ff69ca',
  '#FF00FF',
  '#800000',
  '#FF0000',
  '#FFFF00',
];

const PowerRankings = ({
  leagueTeams,
  leagueMatchups,
  leagueId,
  leagueYear,
  setWeeklyRecord,
  setWeeklyCons,
  setWeeklyOvlWins,
  setWeeklyPPG,
  setWeeklyRank,
  setPowerRankings,
  powerRankings,
}) => {
  const classes = useStyles();
  const [rankings, setRankings] = useState(null);

  const createPower = useCallback(async () => {
    let teamRankings = [];
    if (!powerRankings) {
      teamRankings = await createPowerRankings(
        leagueTeams,
        leagueMatchups,
        leagueId,
        leagueYear,
        setWeeklyRecord,
        setWeeklyCons,
        setWeeklyOvlWins,
        setWeeklyPPG,
        setWeeklyRank,
        setPowerRankings,
      );
    } else {
      teamRankings = powerRankings;
    }
    const datasets = [];
    teamRankings.forEach((teamRank) => {
      const data = teamRank.data.map((item) => item.position);
      datasets.push({
        label: find(leagueTeams, { id: teamRank.id }).abbrev,
        fill: false,
        lineTension: 0,
        backgroundColor: colors[teamRank.id - 1],
        borderColor: colors[teamRank.id - 1],
        borderWidth: 2,
        data,
      });
    });
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    setRankings({
      labels,
      datasets,
    });
  }, [
    leagueTeams,
    leagueMatchups,
    leagueId,
    leagueYear,
    powerRankings,
    setPowerRankings,
    setWeeklyCons,
    setWeeklyOvlWins,
    setWeeklyPPG,
    setWeeklyRank,
    setWeeklyRecord,
  ]);

  useEffect(() => {
    createPower();
  }, [leagueTeams, leagueMatchups, leagueId, leagueYear, powerRankings, createPower]);

  return (
    <div>
      <div className={classes.lineChart}>
        {rankings ? (
          <div>
            <Line
              data={rankings}
              options={{
                title: {
                  display: true,
                  text: 'Power Rankings',
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: 'right',
                },
                scales: {
                  yAxes: [
                    {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      id: 'y-axis-2',
                      ticks: {
                        reverse: true,
                      },
                    },
                  ],
                },
              }}
            />
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Team</TableCell>
                    <TableCell align="right">Ranking</TableCell>
                    <TableCell align="right">Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rankings.datasets.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell component="th" scope="row">
                        {row.label}
                      </TableCell>
                      <TableCell align="right">{row.data.slice(-1)[0]}</TableCell>
                      <TableCell align="right">
                        {row.data.slice(-2)[0] - row.data.slice(-1)[0] > 0 ? (
                          <ArrowUpwardRounded />
                        ) : row.data.slice(-2)[0] - row.data.slice(-1)[0] < 0 ? (
                          <ArrowDownwardRounded />
                        ) : null}
                        {Math.abs(row.data.slice(-2)[0] - row.data.slice(-1)[0])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <PowerRankingSkeleton />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leagueTeams: state.leagueData.leagueTeams,
    leagueMatchups: state.leagueData.leagueMatchups,
    leagueId: state.leagueData.leagueId,
    leagueYear: state.leagueData.leagueYear,
    powerRankings: state.powerRankingData.powerRankings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWeeklyRecord: (weeklyRecord) => dispatch(setWeeklyRecord(weeklyRecord)),
    setWeeklyCons: (weeklyCons) => dispatch(setWeeklyCons(weeklyCons)),
    setWeeklyOvlWins: (weeklyOvlWins) => dispatch(setWeeklyOvlWins(weeklyOvlWins)),
    setWeeklyPPG: (weeklyPPG) => dispatch(setWeeklyPPG(weeklyPPG)),
    setWeeklyRank: (weeklyRank) => dispatch(setWeeklyRank(weeklyRank)),
    setPowerRankings: (powerRankings) => dispatch(setPowerRankings(powerRankings)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PowerRankings);
