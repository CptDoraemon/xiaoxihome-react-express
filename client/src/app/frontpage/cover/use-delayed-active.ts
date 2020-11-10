import {useEffect, useRef, useState} from "react";

const usePrevious = (value: any) => {
  const ref = useRef(value);

  useEffect(() => {
    return () => {
      ref.current = value
    }
  });

  return ref.current
};

const useDelayedActive = (active: boolean, delay: number) => {
  const [delayedActive, setDelayedActive] = useState(active);
  const timeoutRef = useRef<number[]>([]);
  const previousActive = usePrevious(active);

  useEffect(() => {
    if (active !== previousActive) {
      timeoutRef.current.push(
        window.setTimeout(() => setDelayedActive(active), delay)
      )
    }
  });

  useEffect(() => {
    return () => {
      timeoutRef.current.forEach(id => window.clearTimeout(id));
    }
  }, []);

  return delayedActive
};

export default useDelayedActive
