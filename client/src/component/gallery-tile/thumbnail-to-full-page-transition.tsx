import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";

const DURATION = {
    zoom: 500
};

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 1000,
        transition: `${DURATION.zoom}ms`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: 'auto',
            height: '100%',
            objectFit: 'cover',
            transition: `transform ${DURATION.zoom}ms`,
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
    const [zoom, setZoom] = useState(false);
    const initialStyle = {
        width,
        height,
        left,
        top,
        transform: 'scale(1)',
    };
    const zoomedStyle = {
        width: '100vw',
        height: '100vh',
        left: 0,
        top: 0,
        transform: 'scale(3)',
    };

    useEffect(() => {
        // start fadeIn animation
        setTimeout(() => {
            setZoom(true)
        }, 10);
    }, []);

    useEffect(() => {
        // redirect to target page after zoom animation
        if (zoom) {
            setTimeout(() => {
                history.push(link)
            }, DURATION.zoom)
        }
    }, [zoom]);

    return (
        <PortalWrapper>
            <div
                className={classes.root}
                style={zoom ? zoomedStyle : initialStyle}
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
