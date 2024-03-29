import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: '35px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  button: {
    width: '10px',
    float: 'left',
    color: 'white',
  },
}));

const AppBarReact = ({ toggleDrawer, isDrawerOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
      >
        <Button onClick={toggleDrawer(true)} className={classes.button}>
          <MenuIcon />{' '}
        </Button>
      </AppBar>
    </div>
  );
};

export default AppBarReact;
