import {Link} from "react-router-dom";
import React, {useMemo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core/styles";
import {CreateCSSProperties} from "@material-ui/core/styles/withStyles";

const SMALLER_SCREEN = '@media only screen and (max-width: 800px)';
const tileCommons = createStyles({
    root: {
        height: 192,
        backgroundColor: 'rgba(255,255,255,0.2)',
        margin: 5,
        transition: 'background-color 0.3s',
        textTransform: 'capitalize',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& h3': {
            wordSpacing: '100vw',
            color: '#fff',
            textAlign: 'center',
        },
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s',
            cursor: 'pointer'
        },
        [SMALLER_SCREEN]: {
            height: 'auto',
            margin: '5px 0',
            padding: '15px 0',
            transition: 0,
            width: '100%',
            '& h3': {
                fontSize: '16px'
            },
            '&:hover': {
                transition: 0,
            }
        }
    }
});
const useStyles = makeStyles({
    root: {

    },
    big: {
        ...tileCommons.root,
        width: 385,
    },
    small: {
        ...tileCommons.root,
        width: 192,
    },
    ribbon: {
        position: 'relative',
        '&::after': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: -45,
            width: 100,
            height: 35,
            transform: 'rotate(-45deg)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            transition: '0.3s',
        },
        '&:hover::after': {
            left: -65,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        [SMALLER_SCREEN]: {
            '&::after': {
                left: -25,
                width: 60,
                height: 25,
            },
            '&:hover::after': {
                left: -40
            },
        }
    }
});

interface TextTileProps {
    link: string,
    title: string,
    size: 'big' | 'small',
    variant?: 'ribbon' | null,
}

const TextTile: React.FC<TextTileProps> = ({link, title, size, variant}) => {
    const classes = useStyles();

    const rootStyle = useMemo(() => {
        let rootStyle = classes.root;
        rootStyle += ' ';
        rootStyle += size === 'big' ? classes.big : classes.small;
        if (variant === 'ribbon') {
            rootStyle += ` ${classes.ribbon}`;
        }

        return rootStyle
    }, [size, variant]);

    return (
        <Link to={link} className={rootStyle}>
            <div>
                <h3> { title } </h3>
            </div>
        </Link>
    )
};

export default TextTile
