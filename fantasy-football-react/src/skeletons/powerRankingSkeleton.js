import React from 'react';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  lineChart: {
    width: '70%',
    margin: 'auto',
    padding: '10px',
  },
  title: {
    margin: 'auto',
  },
});

const PowerRankingSkeleton = ({ leagueTeams, leagueMatchups, leagueId, leagueYear }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.lineChart}>
        <Skeleton variant="text" width={200} className={classes.title} />
        <Skeleton variant="rect" width={'100%'} height={400} />
      </div>
    </div>
  );
};

export default PowerRankingSkeleton;
