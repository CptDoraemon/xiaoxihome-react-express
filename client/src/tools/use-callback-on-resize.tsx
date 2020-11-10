import {useEffect, useMemo, useRef} from "react";

const useCallbackOnResize = (callback: () => void, delay: number = 500) => {
  const widthRef = useRef(window.innerWidth);
  const timeoutRef = useRef<null | number>(null);

  const resetTimeout = useMemo(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null
      }
    }
  }, []);

  const resizeHandler = useMemo(() => {
    return () => {
      console.log('handler called');
      const currentWidth = window.innerWidth;
      if (currentWidth !== widthRef.current) {
        widthRef.current = currentWidth;
        resetTimeout();
        timeoutRef.current = window.setTimeout(() => {
          console.log('called');
          callback();
        }, delay)
      }
    }
  }, [callback, delay, resetTimeout]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      resetTimeout();
    }
  }, [resetTimeout, resizeHandler])
};

export default useCallbackOnResize;
