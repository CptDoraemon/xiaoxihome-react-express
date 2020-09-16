import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useDelayedActive from "./use-delayed-active";

const useStyles = makeStyles({
  textWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& h1' : {
      color: '#3b3e42'
    }
  }
});

interface CoverBackgroundProps {
  srcUrl: string
  animationDuration: number
}

const CoverBackground: React.FC<CoverBackgroundProps> =
  ({
     srcUrl,
     animationDuration
  }) => {
  const classes = useStyles();
  const imageLoaded = srcUrl !== '';
  const {delayedActiveIn: isCoverAnimationStarted} = useDelayedActive(imageLoaded, 20, 0);
  const coverImageStyle = isCoverAnimationStarted ? {
    transform: `scale(1)`,
    transition: `transform ${animationDuration}ms`
  } : {
    transform: 'scale(2)'
  };

  return (
    <>
      {
        imageLoaded &&
        <img src={srcUrl} alt={'cover image'} style={coverImageStyle}/>
      }
    </>
  )
};

export default CoverBackground
