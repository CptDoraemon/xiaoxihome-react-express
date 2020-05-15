import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";

const DURATION = {
    fill: 500,
    scale: 800
};

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 1000,
        transition: `width ${DURATION.fill}ms, height ${DURATION.fill}ms, top ${DURATION.fill}ms, left ${DURATION.fill}ms, transform ${DURATION.scale}ms`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: 'auto',
            height: '100%',
            objectFit: 'cover'
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
    const [scaled, setScaled] = useState(false);
    const initialStyle = {
        width,
        height,
        left,
        top,
        transform: 'scale(1)',
    };
    const filledStyle = {
        width: '100vw',
        height: '100vh',
        left: 0,
        top: 0,
        transform: 'scale(1)',
    };
    const scaledStyle = {
        ...filledStyle,
        transform: 'scale(3)',
    };
    let rootStyle: any = initialStyle;
    if (filled) {
        rootStyle = filledStyle
    }
    if (scaled) {
        rootStyle = scaledStyle
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
                setScaled(true)
            }, DURATION.fill);
        }
    }, [filled]);

    useEffect(() => {
        // redirect to target page after zoom animation
        if (scaled) {
            setTimeout(() => {
                history.push(link)
            }, DURATION.scale)
        }
    }, [scaled]);

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
