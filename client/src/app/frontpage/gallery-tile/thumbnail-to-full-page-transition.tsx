import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";

const DURATION = {
    fill: 500,
    bgChange: 1000
};
const SMALLER_SCREEN = '@media only screen and (max-width: 800px)';

const useFullHeight = () => {
    const [fullHeight, _setFullHeight] = useState(0);

    const setFullHeight = () => {
        _setFullHeight(window.innerHeight)
    };

    useEffect(() => {
        setFullHeight()
    }, []);

    useEffect(() => {
        document.addEventListener('resize', setFullHeight);
        return () => {
            document.removeEventListener('resize', setFullHeight);
        }
    }, [_setFullHeight]);

    return fullHeight
};

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 1000,
        transition: `width ${DURATION.fill}ms, height ${DURATION.fill}ms, top ${DURATION.fill}ms, left ${DURATION.fill}ms, background-color ${DURATION.bgChange}ms`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: 'auto',
            height: '100%',
            // objectFit: 'contain'
        }
    }
});

interface ThumbnailToFullPageTransitionProps {
    width: number,
    height: number,
    top: number,
    left: number,
    imageUrl: string,
    link: string
}

const ThumbnailToFullPageTransition: React.FC<ThumbnailToFullPageTransitionProps> = (
    {
        width,
        height,
        left,
        top,
        imageUrl,
        link
    }) => {
    const classes = useStyles();
    const history = useHistory();
    const [filled, setFilled] = useState(false);
    const [bgChanged, setBgChanged] = useState(false);
    const fullHeight = useFullHeight();

    const initialStyle = {
        width,
        height,
        left,
        top,
        backgroundColor: 'rgba(0,0,0,0)',
    };
    const filledStyle = {
        width: '100vw',
        height: fullHeight,
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0)',
    };
    const bgChangedStyle = {
        ...filledStyle,
        backgroundColor: 'rgba(0,0,0,1)',
    };
    let rootStyle: any = initialStyle;
    if (filled) {
        rootStyle = filledStyle
    }
    if (bgChanged) {
        rootStyle = bgChangedStyle
    }

    useEffect(() => {
        // start fill animation
        setTimeout(() => {
            setFilled(true)
        }, 50);
    }, []);

    useEffect(() => {
        // start scale animation
        if (filled) {
            setTimeout(() => {
                setBgChanged(true)
            }, DURATION.fill);
        }
    }, [filled]);

    useEffect(() => {
        // redirect to target page after zoom animation
        if (bgChanged) {
            setTimeout(() => {
                history.push(link)
            }, DURATION.bgChange)
        }
    }, [bgChanged]);

    return (
        <PortalWrapper>
            <div
                className={classes.root}
                style={rootStyle}
            >
                <img
                    alt=""
                    src={imageUrl}
                />
            </div>
        </PortalWrapper>
    )
};

const PortalWrapper: React.FC = ({children}) => {
    const [container, setContainer] = useState<null | HTMLDivElement>(null);

    useEffect(() => {
        let container: HTMLDivElement | null = document.createElement('div');
        document.body.appendChild(container);
        setContainer(container);

        return () => {
            container?.remove();
            container = null;
        }
    }, []);

    return container && ReactDOM.createPortal(
        children,
        container
    )
};

export default ThumbnailToFullPageTransition
