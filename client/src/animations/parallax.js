import React, {useEffect, useState, useRef} from "react";
import './parallax.css';

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

function useScrollOpacityAnimation(startInPixel, endInPixel, animationFinishPoint0to1) {
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
        const returnPercentage = Math.min(Math.max(Math.ceil(100 * (window.scrollY / (animationFinishPoint0to1 * containerHeight))) / 100, 0), 1);
        setScrolledPercentage(returnPercentage);
    }
    return scrolledPercentage; /* [0-1] */
}

function useGetContainerPosition(ref) {
    const [containerPosition, setContainerPosition] = useState({offsetTop: 0, offsetHeight: 1});
    useEffect(() => {
        setContainerPosition({
            offsetTop: ref.current.offsetTop,
            offsetHeight: ref.current.offsetHeight
        });
    }, [ref.current]);
    return containerPosition
}

function parallaxWrapper(WrappedComponent) {
    return function(props) {
        const parallaxRef = useRef();
        const placeholderRef = useRef();
        const placeholderPosition = useGetContainerPosition(placeholderRef);
        const parallaxBoxPosition = useGetContainerPosition(parallaxRef);
        const [parallaxBoxTop, setParallaxBoxTop] = useState(0);
        useEffect(() => {
            setParallaxBoxTop(placeholderPosition.offsetTop - parallaxBoxPosition.offsetHeight + 300);
        });
        return (
            <>
                <div className='parallax-wrapper' style={{transform: `translateZ(-5px) scale(6)`, top: `${parallaxBoxTop}px`}} ref={parallaxRef}>
                    <WrappedComponent {...props}/>
                </div>
                <div className='parallax-placeholder' style={{height: '300px'}} ref={placeholderRef}>
                </div>
            </>
            )
    }
}

export { useParallax, useScrollOpacityAnimation, useGetContainerPosition, parallaxWrapper };