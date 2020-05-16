import React, {useEffect, useState} from "react";

/**
 * returns the percentage of scrolled of the ref element
 * 0% -> when the top of the element reaches the bottom of the viewport
 * 100% -> when the bottom of the element reaches the top of the viewport
 * minimum precision is 0.001
 */
const useScrolledPercentage = <T,>(ref: React.RefObject<T & HTMLElement>) => {
    const [percentage, setPercentage] = useState(0);

    const scrollHandler = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const totalDistance = rect.height + window.innerHeight;
        const travelled = window.innerHeight - rect.top;
        let newPercentage =  parseFloat((travelled / totalDistance).toFixed(3));
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
    }, []);

    return percentage
};

export default useScrolledPercentage
