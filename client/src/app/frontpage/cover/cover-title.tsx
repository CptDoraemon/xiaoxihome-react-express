import React, {useMemo} from "react";
import FlyInWrapper from "../../../animations/fly-in-wrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";

const GAP = 100; // the gap between slide up animation
const MD_SCREEN = '@media only screen and (max-width: 1280px)';
const SM_SCREEN = '@media only screen and (max-width: 800px)';
const FONT_SIZES = {
    title: {
        lg: 72,
        md: 54,
        sm: 36
    },
    subtitle: {
        lg: 32,
        md: 24,
        sm: 16
    }
};
const FONT_SPACING = 0.35;
const getFontStyle = (fontSize: number) => ({
    fontSize,
    '& span': {
        marginRight: fontSize * FONT_SPACING,
        display: 'inline-block'
    },
});
const titleCommons = createStyles({
    titleCommons: {
        width: '60%',
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
        ...getFontStyle(FONT_SIZES.subtitle.lg),
        [MD_SCREEN]: {
            ...getFontStyle(FONT_SIZES.subtitle.md),
        },
        [SM_SCREEN]: {
            width: '100%',
            ...getFontStyle(FONT_SIZES.subtitle.sm),
        },
    },
    title: {
        ...titleCommons.titleCommons,
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 800,
        lineHeight: 1.25,
        ...getFontStyle(FONT_SIZES.title.lg),
        [MD_SCREEN]: {
            ...getFontStyle(FONT_SIZES.title.md),
        },
        [SM_SCREEN]: {
            width: '100%',
            ...getFontStyle(FONT_SIZES.title.sm),
        },
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
                            <FlyInWrapper isActive={isActive} direction={'bottom'} delay={i*GAP} key={i} element='span'>
                                { word }
                            </FlyInWrapper>
                        )
                    })
                }
            </h1>
            <h1 className={classes.title}>
                {
                    titleWords.map((word, i) => {
                        return (
                            <FlyInWrapper isActive={isActive} direction={'bottom'} delay={i*GAP} key={i} element='span'>
                                { word }
                            </FlyInWrapper>
                        )
                    })
                }
            </h1>
        </div>
    )
};

export default CoverTitle
