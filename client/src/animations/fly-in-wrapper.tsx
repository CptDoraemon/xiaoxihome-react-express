import React, {useMemo, useRef} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {

    }
});

interface FlyInWrapperProps {
    isActive: boolean,
    delay?: number,
    direction: 'top' | 'right' | 'bottom' | 'left',
    offset?: string
}

/**
 * @param triggerPoint {number} In range [0, 1]
 * @param delay {number} Unit is ms
 */
const FlyInWrapper: React.FC<FlyInWrapperProps> = ({children, isActive, direction, delay = 0, offset}) => {
    const classes = useStyles();

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
        <div className={classes.root} style={isActive ? activeStyle : inactiveStyle}>
            { children }
        </div>
    )
};

export default FlyInWrapper
