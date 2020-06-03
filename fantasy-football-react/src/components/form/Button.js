import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MUIButton from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    marginTop: '6px',
    boxShadow: 'none',
    textTransform: ({ capitalizeLabel }) => (capitalizeLabel ? 'uppercase' : 'none'),
    '&:hover': {
      boxShadow: 'none',
    },
    '&:disabled': {
      opacity: 0.6,
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: `0px 0px 4px 0px #0003`,
    },
    containedPrimary: {
      color: '#000',
      backgroundColor: 'blue',
      '&:hover': {
        backgroundColor: 'dark blue',
      },
      '&:disabled': {
        backgroundColor: 'blue',
      },
    },
  },
});

const Button = ({
  capitalizeLabel,
  disabled,
  onClick,
  variant,
  color,
  type,
  children,
  className,
}) => {
  const classes = useStyles({ capitalizeLabel });
  return (
    <MUIButton
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      color={color}
      type={type}
      className={className}
      classes={classes}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
