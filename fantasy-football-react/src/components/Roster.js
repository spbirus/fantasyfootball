
import React, {useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";


const useStyles = makeStyles({
});

const Roster = ({ roster }) => {
  const classes = useStyles();
  
  return (
    <div>
      <List component="nav">
        {roster.map(player => {
          return (
            <ListItem button={false}>
              <div>
                <Typography>{player.defaultPosition}</Typography>
                <Typography>{player.fullName}</Typography>
              </div>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default Roster;