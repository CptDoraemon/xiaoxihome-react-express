import React from "react";
import {SpinLoader} from "../../../animations/spin-loader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import useDelayedActive from "./use-delayed-active";

const commonLoaderStyles = (delay: number) => createStyles({
  loader: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transition: `opacity ${delay}ms`
  }
});

const useStyles = (delay: number) =>
  (makeStyles({
    loaderActive: {
      ...commonLoaderStyles(delay).loader,
      opacity: 1
    },
    loaderInactive: {
      ...commonLoaderStyles(delay).loader,
      opacity: 0
    }
  }))();

interface CoverLoaderProps {
  active: boolean,
  delayOut: number,
  size: number,
  margin: number
}

const CoverLoader: React.FC<CoverLoaderProps> = ({active, delayOut, size, margin}) => {
  const classes = useStyles(delayOut);
  const delayedOutActive = useDelayedActive(active, 0, delayOut).delayedActiveOut;

  if (delayedOutActive) {
    return <div className={active ? classes.loaderActive : classes.loaderInactive}><SpinLoader size={size} margin={margin}/></div>
  } else {
    return null
  }
};

export default CoverLoader
