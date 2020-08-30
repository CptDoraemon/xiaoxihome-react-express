import React, {useEffect, useRef} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useMagnifyingGlass = (
    containerRef: React.RefObject<HTMLElement>,
    maskRef: React.RefObject<HTMLElement>,
    contentRef: React.RefObject<HTMLElement>
) => {
    let hasLeft = false;

    const isHovering = (x: number, y: number) => {
        if (!containerRef.current) return false;

        const rect = containerRef.current.getBoundingClientRect();
        const refElRect = {
            x0: rect.x,
            x1: rect.x + rect.width,
            y0: rect.y,
            y1: rect.y + rect.height
        };
        return (
            x >= refElRect.x0 &&
            x <= refElRect.x1 &&
            y >= refElRect.y0 &&
            y <= refElRect.y1
        )
    };

    const mouseLeaveHandler = () => {
        if (hasLeft) return;
        if (!maskRef.current || !contentRef.current) return;
        maskRef.current.style.left = `${-9999}px`;
        maskRef.current.style.top = `${-9999}px`;
        contentRef.current.style.left = `${0}px`;
        contentRef.current.style.top = `${0}px`;

        hasLeft = true;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        if (!containerRef.current || !maskRef.current || !contentRef.current) return;
        const x = e.clientX;
        const y = e.clientY;

        if (isHovering(x, y)) {
            const xOffset = x - containerRef.current.getBoundingClientRect().left - 0.5 * size;
            const yOffset = y - containerRef.current.getBoundingClientRect().top - 0.5 * size;
            maskRef.current.style.left = `${xOffset}px`;
            maskRef.current.style.top = `${yOffset}px`;
            contentRef.current.style.left = `${-xOffset}px`;
            contentRef.current.style.top = `${-yOffset}px`;
            contentRef.current.style.transformOrigin = `${xOffset + 0.5 * size}px ${yOffset + 0.5 * size}px`;

            hasLeft = false;
        } else {
            mouseLeaveHandler();
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('scroll', mouseLeaveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('scroll', mouseLeaveHandler);
        }
    }, []);

    useEffect(() => {
        mouseLeaveHandler()
    }, []);
};

const size = 80;
const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'solid 2px #fff',
        overflow: 'hidden',
    },
    scale: {
        transform: 'scale(1.5)',
        position: 'absolute',
    }
});

interface MagnifyingGlassProps {
    containerRef: React.RefObject<HTMLElement>
    zIndex: number,
}

const MagnifyingGlass: React.FC<MagnifyingGlassProps> = ({children, containerRef, zIndex}) => {
    const classes = useStyles();
    const maskRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useMagnifyingGlass(containerRef, maskRef, contentRef);

    return (
        <div
            style={{zIndex: zIndex}}
            ref={maskRef}
            className={classes.root}
        >
            <div
                ref={contentRef}
                className={classes.scale}
            >
                { children }
            </div>
        </div>
    )
};

export default MagnifyingGlass
