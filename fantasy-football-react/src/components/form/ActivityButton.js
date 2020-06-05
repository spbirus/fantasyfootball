import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from './Button';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles({
  root: {
    marginRight: '8px',
  },
});

const ActivityButton = ({
  isActive = false,
  progressSize = 14,
  disableButtonWhileActive = false,
  disabled = false,
  children = null,
  ...buttonProps
}) => {
  const classes = useStyles();
  return (
    <Button
      {...buttonProps}
      disabled={disableButtonWhileActive ? isActive | disabled : disabled}
      variant="contained"
      // color="primary"
      capitalizeLabel
    >
      {isActive && (
        <Grow in={isActive}>
          <CircularProgress classes={{ root: classes.root }} size={progressSize} />
        </Grow>
      )}
      {children}
    </Button>
  );
};

export default ActivityButton;
