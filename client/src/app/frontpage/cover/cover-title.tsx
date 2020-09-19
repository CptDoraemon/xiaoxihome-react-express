import React, {useMemo} from "react";
import FlyInWrapper from "../../../animations/fly-in-wrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";

const MD_SCREEN = '@media only screen and (max-width: 1280px)';
const SM_SCREEN = '@media only screen and (max-width: 800px)';
const FONT_SIZES = {
    title: {
        lg: 72,
        md: 54,
        sm: 36
    },
    subtitle: {
        lg: 24,
        md: 20,
        sm: 16
    }
};
const FONT_SPACING = 0.3;
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
            lineHeight: 1,
            ...getFontStyle(FONT_SIZES.title.sm),
        },
    }
});

interface CoverTitle {
    isActive: boolean,
    title: string,
    subtitle: string,
    maxDuration: number
}

const CoverTitle: React.FC<CoverTitle> = ({isActive, title, subtitle, maxDuration}) => {
    const classes = useStyles();
    const {
        titleWords,
        subtitleWords,
        wordsCount
    } = useMemo(() => {
        const titleWords = title.split(' ');
        const subtitleWords = subtitle.split(' ');
        const wordsCount = titleWords.length + subtitleWords.length;
        return {titleWords, subtitleWords, wordsCount}
    }, [title, subtitle]);

    const animationDuration = maxDuration / 2;
    const animationGap = maxDuration / 2 / wordsCount;

    return (
        <div className={classes.root}>
            <h1 className={classes.subtitle}>
                {
                    subtitleWords.map((word, i) => {
                        return (
                            <FlyInWrapper isActive={isActive} direction={'bottom'} delay={i*animationGap} key={i} element='span' duration={animationDuration}>
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
                            <FlyInWrapper isActive={isActive} direction={'bottom'} delay={i*animationGap} key={i} element='span'>
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
