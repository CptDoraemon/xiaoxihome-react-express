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

export { useParallax };