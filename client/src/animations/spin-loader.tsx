import React, {CSSProperties} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: `50%`,
  },
  spinnerAnimation1: {
    animation: '$spin-loader-spin-1 1s linear infinite'
  },
  spinnerAnimation2: {
    animation: '$spin-loader-spin-2 1s linear infinite'
  },
  spinnerAnimation3: {
    animation: '$spin-loader-spin-3 1s linear infinite'
  },
  '@keyframes spin-loader-spin-1': {
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'}
  },
  '@keyframes spin-loader-spin-2': {
    '0%': {transform: 'rotate(45deg)'},
    '100%': {transform: 'rotate(405deg)'}
  },
  '@keyframes spin-loader-spin-3': {
    '0%': {transform: 'rotate(90deg)'},
    '100%': {transform: 'rotate(450deg)'}
  }
});

interface SpinLoaderProps {
  size: number,
  margin: number
}

const SpinLoader: React.FC<SpinLoaderProps> = ({size, margin}) => {
  const classes = useStyles();
  const wrapperStyle = {
    width: `${size}px`,
    height: `${size}px`,
    margin: `${margin}px`,
  };
  const spinnerStyle1 = {
    width: `${size}px`,
    height: `${size}px`,
    border: `3px solid white`,
    borderColor: 'white transparent transparent transparent',
  };
  const spinnerStyle2 = {
    width: `${0.6 * size}px`,
    height: `${0.6 * size}px`,
    margin: `${0.2 * size}px`,
    border: `3px solid white`,
    borderColor: 'white transparent transparent transparent',
  };
  const spinnerStyle3 = {
    width: `${0.2 * size}px`,
    height: `${0.2 * size}px`,
    margin: `${0.4 * size}px`,
    border: `3px solid white`,
    borderColor: 'white transparent transparent transparent',
  };

  return (
    <div className={classes.wrapper} style={wrapperStyle}>
      <div className={clsx(classes.spinner, classes.spinnerAnimation3)} style={spinnerStyle1}> </div>
      <div className={clsx(classes.spinner, classes.spinnerAnimation2)} style={spinnerStyle2}> </div>
      <div className={clsx(classes.spinner, classes.spinnerAnimation1)} style={spinnerStyle3}> </div>
    </div>
  )
};

export { SpinLoader };
