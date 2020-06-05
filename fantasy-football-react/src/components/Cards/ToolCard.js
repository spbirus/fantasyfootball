import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
});

const ToolCard = ({ tool }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={tool.image} title={tool.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tool.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tool.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => history.push(`/${tool.route}`)}>
          See it in action!
        </Button>
      </CardActions>
    </Card>
  );
};

export default ToolCard;
