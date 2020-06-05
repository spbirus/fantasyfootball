import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid } from '@material-ui/core';
import { toolOptions } from '../constants/toolOptions';
import ToolCard from './Cards/ToolCard';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: '10px',
  },
  title: {
    fontSize: '26px',
    marginBottom: '10px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  cards: {
    display: 'inline-block',
  },
});

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Welcome to Fantasy Sports Tools</div>
      <div className={classes.text}>
        Below are the tools available right now to see Fantasy Sports statistics, player
        comparisons, and much much more!
      </div>
      <div className={classes.cards}>
        <Grid container spacing={2}>
          {toolOptions
            .filter((tool) => tool.name.toLowerCase() !== 'dashboard')
            .map((tool) => (
              <Grid item xs key={`grid-${tool.name}`}>
                <ToolCard tool={tool} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
