import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import find from 'lodash/find';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles({
  root: {
    paddingTop: '15px',
  },
  playerOne: {
    width: '50%',
    margin: 'auto',
  },
  lineChart: {
    width: '100%',
    margin: 'auto',
  },
});

const colors = [
  { actual: '#034efc', projected: '#ababab' },
  { actual: '#eb4034', projected: '#474747' },
];

const PlayerStatChart = ({ players, playerStats }) => {
  const classes = useStyles();
  const [lineGraphData, setLineGraphData] = useState(null);

  // get the player stats for each week
  useEffect(() => {
    const datasets = [];
    players.forEach((player, idx) => {
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

      datasets.push({
        label: player?.name ? `${player.name} Actual Points` : `Player ${idx + 1} Actual Points`,
        fill: false,
        lineTension: 0,
        backgroundColor: colors[idx].actual,
        borderColor: colors[idx].actual,
        borderWidth: 2,
        data: actualStatsPerWeek,
      });
      datasets.push({
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
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    setLineGraphData({
      labels,
      datasets,
    });
  }, [players]);

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
