import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Size {
    width: number,
    left: number,
    height: number
}

const useStyles = makeStyles({
    root: {
        position: 'fixed'
    },
    placeholder: {

    }
});

interface ParallaxWrapperProps {
    className: string
}

/**
 * @param className Classname will be applied to the wrapper
 */
const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({children, className}) => {
    const classes = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<null | Size>(null);
    const [top, setTop] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setSize({
            width: rect.width,
            left: rect.left,
            height: rect.height
        });
        setTop(rect.top)
    }, []);

    useEffect(() => {
        if (!size) return;
        const scrollHandler = () => {
            if (!containerRef.current) return;
            setTop(containerRef.current.getBoundingClientRect().top)
        };

        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }

    }, [size]);

    if (!size) {
        return (
            <div className={className} ref={containerRef}>
                { children }
            </div>
        )
    } else {
        return (
            <>
                <div
                    className={classes.root}
                    style={{
                        top: `${top}px`
                    }}
                >
                    <div className={className}>
                        { children }
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
    }
};

export default ParallaxWrapper
