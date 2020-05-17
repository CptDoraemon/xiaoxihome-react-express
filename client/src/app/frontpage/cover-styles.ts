import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";

const fullscreenWrapper = createStyles({
    fullscreenWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    }
});
const toolbarTransition = 1000;
const toolbarCommons = createStyles({
    toolbarCommons: {
        position: 'absolute',
        bottom: 0,
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '25px',
        transition: `transform 300ms, background-color 300ms, left ${toolbarTransition}ms, width ${toolbarTransition}ms`,
        color: '#fff',
    }
});

const useCoverStyles = makeStyles({
    root: {
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
    },
    background: {
        ...fullscreenWrapper.fullscreenWrapper,
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }
    },
    title: {
        ...fullscreenWrapper.fullscreenWrapper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& h1': {
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 800,
            color: '#fff',
            fontSize: '72px',
            lineHeight: '144px',
            textAlign: 'center',
            margin: 0,
        }
    },
    toolbarActive: {
        ...toolbarCommons.toolbarCommons,
        width: '50%',
        left: '25%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        transform: 'translateY(85px)',
        // animationName: '$scroll-down-indicator-roll-in',
        // animationDuration: '1s',
        '&:hover': {
            transform: 'translateY(25px)',
            backgroundColor: 'rgba(37, 41, 45, 1)',
        }
    },
    toolbarInactive: {
        ...toolbarCommons.toolbarCommons,
        width: '0%',
        left: '50%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transform: 'translateY(100px)',
    },
    // '@keyframes scroll-down-indicator-roll-in': {
    //     '0%': {
    //         width: '0%',
    //         left: '50%',
    //         backgroundColor: 'rgba(255, 255, 255, 1)',
    //         transform: 'translateY(100px)',
    //     },
    //     '100%': {
    //         width: '50%',
    //         left: '25%',
    //         backgroundColor: 'rgba(255, 255, 255, 0.3)',
    //         transform: 'translateY(85px)',
    //     }
    // },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '5px',
        backgroundColor: '#fff'
    },
    loader: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    mouseIcon: {
        margin: '0 0 20px 0',
    },
    githubButton: {
        width: '100px',
        height: '30px',
        transform: 'scale(0.8)',
        borderRadius: '10px',
        cursor: 'pointer',
        color:' #fff',
        fontSize: '20px',
        border: '3px solid #fff',
        opacity: 0.5,
        margin: '0 20px 20px 20px',
        textAlign: 'center',
        fontWeight: 'bold',
        userSelect: 'none',
        '& span': {
            fontSize: '18px',
            lineHeight: '30px',
        },
        '&:hover': {
            opacity: 1,
            color: 'rgb(37, 41, 45)',
            backgroundColor: '#fff',
        }
    }
});

export default useCoverStyles
