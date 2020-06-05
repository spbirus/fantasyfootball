import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import PlayerStatChart from './PlayerStatChart';

const useStyles = makeStyles({
  root: {
    paddingTop: '15px',
    margin: '15px',
  },
  autocompleteDiv: {
    display: 'inline-flex',
  },
  playerSelector: {
    padding: '5px',
  },
});

const PlayerComparison = ({ players }) => {
  const classes = useStyles();
  const [playerOne, setPlayerOne] = useState({});
  const [playerTwo, setPlayerTwo] = useState({});

  return (
    <div className={classes.root}>
      <div className={classes.autocompleteDiv}>
        <Autocomplete
          id="combo-box1"
          value={playerOne}
          onChange={(_event, newValue) => {
            setPlayerOne(newValue);
          }}
          options={players}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Player One" variant="outlined" />}
          className={classes.playerSelector}
        />
        <Autocomplete
          id="combo-box2"
          value={playerTwo}
          onChange={(_event, newValue) => {
            setPlayerTwo(newValue);
          }}
          options={players}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Player Two" variant="outlined" />}
          className={classes.playerSelector}
        />
      </div>
      <PlayerStatChart players={[playerOne, playerTwo]} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.playerData.players,
  };
};

export default connect(mapStateToProps)(PlayerComparison);
