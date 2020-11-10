import React from "react";
import {SpinLoader} from "../../../animations/spin-loader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import useDelayedActive from "./use-delayed-active";

const commonLoaderStyles = createStyles({
  loader: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});

const useStyles = makeStyles({
  loaderActive: {
    ...commonLoaderStyles.loader,
    opacity: 1
  },
  loaderInactive: {
    ...commonLoaderStyles.loader,
    opacity: 0,
    transition: `opacity ${500}ms`
  }
});

interface CoverLoaderProps {
  active: boolean,
  size: number,
  margin: number
}

const CoverLoader: React.FC<CoverLoaderProps> = ({active, size, margin}) => {
  const classes = useStyles();
  const isLoaderMounted = useDelayedActive(active, 500);

  if (isLoaderMounted) {
    return <div className={active ? classes.loaderActive : classes.loaderInactive}><SpinLoader size={size} margin={margin}/></div>
  } else {
    return <></>
  }
};

export default CoverLoader
