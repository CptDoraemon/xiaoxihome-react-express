import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  spinLoader: {
    animation: '$spin-loader-spin 1s linear infinite'
  },
  '@keyframes spin-loader-spin': {
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'}
  }
});

interface SpinLoaderProps {
  size: number
}

const SpinLoader: React.FC<SpinLoaderProps> = ({size}) => {
  const classes = useStyles();
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `100%`,
    margin: size * 0.8,
    border: `${size * 0.1}px solid white`,
    borderColor: 'white transparent transparent transparent',
  };

  return (
    <div className={classes.spinLoader}
         style={styles}>
        <div>
        </div>
    </div>
  )
};

export { SpinLoader };
