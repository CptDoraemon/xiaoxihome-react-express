import {useEffect, useState} from "react";

/**
 * Return a cushioned delayedActive state based on input active state, use case eg: CSS fade out
 * @param active
 * @param delayIn
 * @param delayOut
 */
const useDelayedActive = (active: boolean, delayIn: number, delayOut: number) => {
  const [delayedActiveIn, setDelayedActiveIn] = useState(delayIn !== 0 && active ? false : active);
  const [delayedActiveOut, setDelayedActiveOut] = useState(delayOut !== 0 && !active ? true : active);

  useEffect(() => {
    if (active && !delayedActiveIn) {
      setTimeout(() => setDelayedActiveIn(true), delayIn)
    } else if (!active && delayedActiveOut) {
      setTimeout(() => setDelayedActiveOut(false), delayOut)
    }
  }, [active]);

  return {
    delayedActiveIn,
    delayedActiveOut
  }
};

export default useDelayedActive
