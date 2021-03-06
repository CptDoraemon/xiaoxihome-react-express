import React from "react";

/**
 * returns the percentage (in range [-0.5, 1.5] of scrolled of the ref element
 * 0 -> when the top of the element reaches the bottom of the viewport
 * 1 -> when the bottom of the element reaches the top of the viewport
 * a little extra padding helps edge cases (eg: when element is at top of the document)
 */
const getScrolledPercentage = <T,>(ref: React.RefObject<T & HTMLElement>) => {
    if (!ref.current) return 0;

    const rect = ref.current.getBoundingClientRect();
    const totalDistance = rect.height + window.innerHeight;
    const travelled = window.innerHeight - rect.top;
    let newPercentage =  travelled / totalDistance;
    newPercentage = Math.min(1.5, newPercentage);
    newPercentage = Math.max(-0.5, newPercentage);

    return newPercentage
};

export default getScrolledPercentage
