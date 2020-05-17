import React, {useMemo} from "react";
import FlyInWrapper from "../../animations/fly-in-wrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";

const GAP = 100;
const SMALLER_SCREEN = '@media only screen and (max-width: 800px)';
const titleCommons = createStyles({
    titleCommons: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});
const useStyles = makeStyles({
    root: {
        width: '80%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: '"Open Sans", sans-serif',
        '& h1': {
            margin: 0
        },
    },
    subtitle: {
        ...titleCommons.titleCommons,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontWeight: 600,
        fontSize: '24px',
        '& span': {
            marginRight: '8px'
        },
        [SMALLER_SCREEN]: {
            width: '100%',
            fontSize: '16px',
            '& span': {
                marginRight: '4px'
            },
        }
    },
    title: {
        ...titleCommons.titleCommons,
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 800,
        fontSize: '72px',
        lineHeight: 1.25,
        '& span': {
            marginRight: '15px'
        },
        [SMALLER_SCREEN]: {
            width: '100%',
            lineHeight: 1,
            fontSize: '36px',
            '& span': {
                marginRight: '8px'
            },
        }
    }
});

interface CoverTitle {
    isActive: boolean,
    title: string,
    subtitle: string
}

const CoverTitle: React.FC<CoverTitle> = ({isActive, title, subtitle}) => {
    const classes = useStyles();
    const {
        titleWords,
        subtitleWords,
    } = useMemo(() => {
        const titleWords = title.split(' ');
        const subtitleWords = subtitle.split(' ');
        return {titleWords, subtitleWords}
    }, [title, subtitle]);

    return (
        <div className={classes.root}>
            <h1 className={classes.subtitle}>
                {
                    subtitleWords.map((word, i) => {
                        return (
                            <FlyInWrapper isActive={isActive} direction={'bottom'} delay={i*GAP} key={i}>
                                <span>
                                    { word }
                                </span>
                            </FlyInWrapper>
                        )
                    })
                }
            </h1>
            <h1 className={classes.title}>
                {
                    titleWords.map((word, i) => {
                        return (
                            <FlyInWrapper isActive={isActive} direction={'bottom'} delay={i*GAP} key={i}>
                                <span>
                                    { word }
                                </span>
                            </FlyInWrapper>
                        )
                    })
                }
            </h1>
        </div>
    )
};

export default CoverTitle
