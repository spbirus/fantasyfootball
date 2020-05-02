
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, Card, CardContent } from "@material-ui/core";


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
    padding: "3px",
    display: "table-cell",
    width: "6px"
  },
  name: {
    padding: "3px",
    display: "table-cell",
    width: "15px"
  }
});

const Roster = ({ roster }) => {
  const classes = useStyles();
  
  return (
    <div>
      <List component="nav">
        {roster.map(player => {
          return (
            <ListItem button={false}>
                <Card className={classes.card}>
                  <CardContent className={classes.content}>
                    <div className={classes.row}>
                      <Typography className={classes.position}>{player.defaultPosition}</Typography>
                      <Typography className={classes.name}>{player.fullName}</Typography>
                    </div>
                  </CardContent>
                </Card>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default Roster;