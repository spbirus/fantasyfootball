import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {playerRatingMap} from "../constants/playerPostion"

const useStyles = makeStyles({
  card: {
    width: "100%"
  },
  content: {
    width: "80%",
    display: "table"
  },
  row: {
    display: "table-row"
  },
  position: {
    fontSize: "12px",
    padding: "3px",
    display: "table-cell",
    width: "6px"
  },
  name: {
    fontSize: "12px",
    padding: "3px",
    display: "table-cell",
    width: "15px"
  }
});

const Roster = ({ roster, leagueId, leagueYear }) => {
  const classes = useStyles();
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Pos Rank</TableCell>
              <TableCell align="right">Overall Rank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roster.sort((a,b) => a.defaultPositionId - b.defaultPositionId).map(player => {
              return (
                <TableRow key={player.playerId}>
                  <TableCell align="right" key={player.defaultPositionId}>{playerRatingMap[player.defaultPositionId]}</TableCell>
                  <TableCell align="right">{player.name}</TableCell>
                  <TableCell align="right">{player.rankings.positionRank}</TableCell>
                  <TableCell align="right">{player.rankings.totalRanking}</TableCell>
                </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Roster;