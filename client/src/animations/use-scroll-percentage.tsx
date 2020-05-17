import React, {useEffect, useState} from "react";

let debouncer = 10;

/**
 * returns the percentage of scrolled of the ref element
 * 0% -> when the top of the element reaches the bottom of the viewport
 * 100% -> when the bottom of the element reaches the top of the viewport
 */
const useScrolledPercentage = <T,>(ref: React.RefObject<T & HTMLElement>) => {
    const [percentage, setPercentage] = useState(0);
    // const [lastCalled, setLastCalled] = useState(0);

    const scrollHandler = () => {
        // const now = Date.now();
        // if (now - lastCalled < debouncer) {
        //     return
        // } else {
        //     console.log(now - lastCalled);
        //     setLastCalled(now);
        // }

        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const totalDistance = rect.height + window.innerHeight;
        const travelled = window.innerHeight - rect.top;
        let newPercentage =  travelled / totalDistance;
        newPercentage = Math.min(1, newPercentage);
        newPercentage = Math.max(0, newPercentage);

        if (percentage !== newPercentage) {
            setPercentage(newPercentage)
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [percentage]);

    return percentage
};

export default useScrolledPercentage
