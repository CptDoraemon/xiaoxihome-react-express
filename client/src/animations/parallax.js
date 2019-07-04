import {useEffect, useState} from "react";

function useParallax(startInPixel, endInPixel, parallaxEffectStrength) {
    function scrollEventListener() {
        const scrolled = window.scrollY;
        if (scrolled > endInPixel) return; // element not visible
        const newTranslateY = (scrolled - startInPixel) * parallaxEffectStrength;
        setTranslateY(newTranslateY);
    }
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        document.addEventListener('scroll', scrollEventListener);
        return () => document.removeEventListener('scroll', scrollEventListener);
    });

    return translateY
}

function useScrollOpacityAnimation(startInPixel, endInPixel) {
    const [scrolledPercentage, setScrolledPercentage] = useState(0);
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [startInPixel, endInPixel]);
    function scrollHandler() {
        if (window.scrollY > endInPixel || window.scrollY < startInPixel) return;
        const containerHeight = endInPixel - startInPixel;
        const returnPercentage = Math.min(Math.max(Math.ceil(100 * (window.scrollY / (0.8 * containerHeight))) / 100, 0), 1);
        setScrolledPercentage(returnPercentage);
    }
    return scrolledPercentage;
}

function useGetContainerPosition(ref) {
    const [containerPosition, setContainerPosition] = useState({offsetTop: 0, offsetHeight: 1});
    useEffect(() => {
        setContainerPosition({
            offsetTop: ref.current.offsetTop,
            offsetHeight: ref.current.offsetHeight
        });
    }, []);
    return containerPosition
}

export { useParallax, useScrollOpacityAnimation, useGetContainerPosition };