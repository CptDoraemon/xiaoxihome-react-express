import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Size {
    width: number,
    left: number,
    height: number
}

const useParallaxEffect = (
    parallaxStrength: number,
    containerRef: React.RefObject<HTMLElement>,
    fixedRef: React.RefObject<HTMLElement>,
    absoluteRef: React.RefObject<HTMLElement>,
) => {
    const [size, setSize] = useState<null | Size>(null);

    const updateSizeIfNeeded = () => {
        if (!absoluteRef.current) return;
        const rect = absoluteRef.current.getBoundingClientRect();
        if (!size || size.width !== rect.width || size.height !== rect.height || size.left !== rect.left) {
            setSize({
                width: rect.width,
                left: rect.left,
                height: rect.height
            });
        }
    };

    useEffect(() => {
        if (!size) {
            updateSizeIfNeeded();
            return;
        }

        const getScrolledPercentage = (targetElementRef: React.RefObject<HTMLElement>) => {
            if (!targetElementRef.current) return 0;
            const rect = targetElementRef.current.getBoundingClientRect();
            const totalDistance = rect.height + window.innerHeight;
            const travelled = window.innerHeight - rect.top;
            return travelled / totalDistance;
        };
        const scrollHandler = parallaxStrength === 0 ?
            () => {
                if (!containerRef.current || !fixedRef.current) return;
                updateSizeIfNeeded();
                fixedRef.current.style.top = `${containerRef.current.getBoundingClientRect().top}px`;
            } :
            () => {
                if (!containerRef.current || !fixedRef.current || !absoluteRef.current) return;
                updateSizeIfNeeded();
                fixedRef.current.style.top = `${containerRef.current.getBoundingClientRect().top}px`;
                absoluteRef.current.style.top = `${containerRef.current.getBoundingClientRect().height * getScrolledPercentage(containerRef) * parallaxStrength}px`;
            };

        scrollHandler();
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [size?.width, size?.height, size?.left]);

    return size
};

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        overflow: 'hidden'
    },
    absoluteContainer: {
        position: 'absolute',
    },
    placeholder: {

    }
});

interface ParallaxWrapperProps {
    className: string,
    parallaxStrength: number
}

/**
 * @param className Classname will be applied to the wrapper
 * @param parallaxStrength In range [-1, 1], sync at 0
 */
const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({children, className, parallaxStrength}) => {
    const classes = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const fixedRef = useRef<HTMLDivElement>(null);
    const absoluteRef = useRef<HTMLDivElement>(null);

    const size = useParallaxEffect(parallaxStrength, containerRef, fixedRef, absoluteRef);

    return (
        <>
            <div
                className={classes.root}
                style={{
                    left: `${size?.left}px`,
                    width: `${size?.width}px`,
                    height: `${size?.height}px`,
                }}
                ref={fixedRef}
            >
                <div className={classes.absoluteContainer}>
                    <div
                        ref={absoluteRef}
                        className={className}
                    >
                        { children }
                    </div>
                </div>
            </div>
            <div
                ref={containerRef}
                style={{
                width: `${size?.width}px`,
                height: `${size?.height}px`
                }}
            >

            </div>
        </>
    )
};

export default ParallaxWrapper
