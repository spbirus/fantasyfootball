
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Card, Grid } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

const TeamCardSkeleton = () => {
  const classes = useStyles();
  
  return (
    <Grid item xs>
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Skeleton variant="text" width={200} className={classes.title}/>
            <Skeleton variant="rect" width={'100%'} height={400} />
          </CardContent>
        </Card>
      </div>
    </Grid>
  )
}

export default TeamCardSkeleton;