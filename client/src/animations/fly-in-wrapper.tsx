import React, {useEffect, useMemo, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useDelayedActive = (isActive: boolean) => {
    const [isActiveStyle, setIsActiveStyle] = useState(false);
    const delay = 20;

    useEffect(() => {
        if (isActive) {
            if (!isActiveStyle) {
                setTimeout(() => {
                    setIsActiveStyle(true)
                }, delay)
            }
        } else {
            setTimeout(() => {
                setIsActiveStyle(false)
            }, delay)
        }
    }, [isActive]);

    return isActiveStyle
};

const useStyles = makeStyles({
    root: {

    }
});

interface FlyInWrapperProps {
    isActive: boolean,
    delay?: number,
    direction: 'top' | 'right' | 'bottom' | 'left',
    offset?: string,
    className?: string,
}

/**
 * @param triggerPoint {number} In range [0, 1]
 * @param delay {number} Unit is ms
 * @param className {string} Will be applied to root element if provided
 */
const FlyInWrapper: React.FC<FlyInWrapperProps> = ({children, isActive, direction, delay = 0, offset, className}) => {
    const classes = useStyles();
    /**
     * a little delay between isActive and internal isActiveStyle make sure there will still be animation if isActive is set to be true from the beginning
     */
    const isActiveStyle = useDelayedActive(isActive);

    const {
        inactiveStyle,
        activeStyle
    } = useMemo(() => {
        const TRANSLATE_DEFAULT = offset ?? '100%';
        const TRANSLATES = {
            top: `translate(0, -${TRANSLATE_DEFAULT})`,
            right: `translate(${TRANSLATE_DEFAULT}, 0)`,
            bottom: `translate(0, ${TRANSLATE_DEFAULT})`,
            left: `translate(-${TRANSLATE_DEFAULT}, 0)`,
        };
        const inactiveStyle = {
            opacity: 0,
            transform: TRANSLATES[direction],
            transition: `transform ${1000}ms, opacity ${1000}ms`
        };
        const activeStyle = {
            opacity: 1,
            transform: 'translate(0, 0)',
            transition: `transform ${1000}ms ${delay}ms, opacity ${1000}ms ${delay}ms`
        };

        return {
            inactiveStyle,
            activeStyle
        }
    }, [offset]);

    return (
        <div
            className={className ? `${classes.root} ${className}` : classes.root}
            style={isActiveStyle ? activeStyle : inactiveStyle}
        >
            { children }
        </div>
    )
};

export default FlyInWrapper
