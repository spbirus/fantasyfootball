import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { makeStyles, Select, MenuItem } from '@material-ui/core';
import PlayerStatChart from './PlayerStatChart';
import times from 'lodash/times';

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
  const [firstWeek, setFirstWeek] = useState(1);
  const [secondWeek, setSecondWeek] = useState(17);

  const handleFirstWeekChange = (event) => {
    setFirstWeek(event.target.value);
  };

  const handleSecondWeekChange = (event) => {
    setSecondWeek(event.target.value);
  };

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
      <Select labelId="firstWeek" id="firstweek" value={firstWeek} onChange={handleFirstWeekChange}>
        {times(17).map((item) => (
          <MenuItem value={item + 1}>{item + 1}</MenuItem>
        ))}
      </Select>
      <Select
        labelId="secondWeek"
        id="secondweek"
        value={secondWeek}
        onChange={handleSecondWeekChange}
      >
        {times(17).map((item) => (
          <MenuItem value={item + 1}>{item + 1}</MenuItem>
        ))}
      </Select>
      <PlayerStatChart players={[playerOne, playerTwo]} weekRange={[firstWeek, secondWeek]} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.playerData.players,
  };
};

export default connect(mapStateToProps)(PlayerComparison);
