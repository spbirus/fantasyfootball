
import React, {useState,useEffect} from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Card, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import Roster from "./Roster";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TeamCard = ({teamName, roster, abbreviation, logoURL}) => {
  const classes = useStyles();
  
  return (
    <div>
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {`${teamName} - ${abbreviation}`}
        </Typography>
        <Roster roster={roster} />
      </CardContent>
    </Card>
    </div>
  )
}

export default TeamCard;