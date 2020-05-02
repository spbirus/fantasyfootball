
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Card, Typography, Grid } from "@material-ui/core";
import Roster from "./Roster";


const useStyles = makeStyles({
  root: {
    width: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    textAlign: "center",
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TeamCard = ({teamLocation, teamNickname, roster, abbreviation, logoURL}) => {
  const classes = useStyles();
  
  return (
    <Grid item xs>
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              {`${teamLocation} ${teamNickname} - ${abbreviation}`}
            </Typography>
            <Roster roster={roster} />
          </CardContent>
        </Card>
      </div>
    </Grid>
  )
}

export default TeamCard;