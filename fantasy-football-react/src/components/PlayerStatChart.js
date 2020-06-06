import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  Paper,
} from '@material-ui/core';
import find from 'lodash/find';
import { Line, Radar } from 'react-chartjs-2';
import { stats } from '../constants/statTypes';

const useStyles = makeStyles({
  root: {
    paddingTop: '15px',
  },
  lineChart: {
    width: '60%',
    margin: 'auto',
  },
});

const colors = [
  { actual: '#034efc', projected: '#ababab' },
  { actual: '#eb4034', projected: '#474747' },
];

const PlayerStatChart = ({ players, playerStats, weekRange }) => {
  const classes = useStyles();
  const [lineGraphData, setLineGraphData] = useState(null);
  const [individualStatData, setIndividualStatData] = useState(null);

  // get the player stats for each week
  useEffect(() => {
    const lineGraphDatasets = [];
    players.forEach((player, idx) => {
      // line graph
      const actualStatsPerWeek = [];
      const projStatsPerWeek = [];
      playerStats.forEach((weekStats) => {
        const weeklyStats = find(weekStats, { id: player?.id }, null);
        actualStatsPerWeek.push(
          weeklyStats?.actualStats?.appliedTotal ? weeklyStats?.actualStats?.appliedTotal : 0,
        );
        projStatsPerWeek.push(
          weeklyStats?.projectedStats?.appliedTotal ? weeklyStats?.projectedStats?.appliedTotal : 0,
        );
      });

      lineGraphDatasets.push({
        label: player?.name ? `${player.name} Actual Points` : `Player ${idx + 1} Actual Points`,
        fill: false,
        lineTension: 0,
        backgroundColor: colors[idx].actual,
        borderColor: colors[idx].actual,
        borderWidth: 2,
        data: actualStatsPerWeek,
      });
      lineGraphDatasets.push({
        label: player?.name
          ? `${player.name} Projected Points`
          : `Player ${idx + 1} Projected Points`,
        fill: false,
        lineTension: 0,
        backgroundColor: colors[idx].projected,
        borderColor: colors[idx].projected,
        borderWidth: 2,
        data: projStatsPerWeek,
      });
    });
    const lineGraphLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    setLineGraphData({
      labels: lineGraphLabels,
      datasets: lineGraphDatasets,
    });
  }, [players]);

  useEffect(() => {
    const individualDatasets = [];
    players.forEach((player, idx) => {
      // radar graph
      let totalStats = [];
      playerStats.forEach((weekStats, weekIndex) => {
        if (weekIndex + 1 >= weekRange[0] && weekIndex + 1 <= weekRange[1]) {
          const weeklyStats = find(weekStats, { id: player?.id }, null);
          const justWeekStats = [];
          stats.forEach((item) => {
            justWeekStats.push(
              weeklyStats?.actualStats?.stats[item.id]
                ? weeklyStats?.actualStats?.stats[item.id]
                : 0,
            );
          });
          if (totalStats.length < 1) {
            totalStats = justWeekStats;
          } else {
            totalStats = totalStats.map(function (num, idx) {
              return num + justWeekStats[idx];
            });
          }
        }
      });

      individualDatasets.push({
        name: player?.name ? `${player.name}` : `Player ${idx + 1}`,
        data: totalStats,
      });
    });

    const labels = ['Player Name'];
    stats.forEach((item) => {
      labels.push(item.name);
    });
    setIndividualStatData({
      labels: labels,
      data: individualDatasets,
    });
  }, [players, weekRange]);

  return (
    <div className={classes.root}>
      <div className={classes.lineChart}>
        {lineGraphData ? (
          <Line
            data={lineGraphData}
            options={{
              title: {
                display: true,
                text: 'Player Weekly Fantasy Points',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      suggestedMax: 50,
                    },
                  },
                ],
              },
            }}
          />
        ) : null}
        <div>
          {individualStatData ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {individualStatData.labels.map((label) => (
                      <TableCell>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {individualStatData.data.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      {row.data.map((stats) => (
                        <TableCell>{stats}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playerStats: state.playerData.playerStats,
  };
};

export default connect(mapStateToProps)(PlayerStatChart);
