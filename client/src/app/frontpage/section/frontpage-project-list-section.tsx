import React, {useEffect, useRef, useState} from "react";
import FlyInWrapper from "../../../animations/fly-in-wrapper";
import TextTile from "../text-tile/text-tile";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SectionTitle from "./section-title";
import GalleryTile from "../gallery-tile/gallery-tile";
import getScrolledPercentage from "../../../animations/get-scroll-percentage";

interface SectionParams {
    flyInDelayRemap: number[],
    flyInDirectionRemap: ('left' | 'right')[],
    size: ('big' | 'small')[],
    variant: ('ribbon' | null)[],
}
const WEB_PROJECT_SECTION_PARAMS: SectionParams = {
    flyInDelayRemap: [0, 100, 200, 300, 200, 100],
    flyInDirectionRemap: ['right', 'right', 'right', 'left', 'left', 'left'],
    size: ['big', 'small', 'small', 'small', 'small', 'big'],
    variant: ['ribbon', null, null, null, null, 'ribbon']
};
const ACADEMIC_PROJECT_SECTION_PARAMS: SectionParams = {
    flyInDelayRemap: [200, 100, 0, 100, 200, 300],
    flyInDirectionRemap: ['left', 'left', 'left', 'right', 'right', 'right'],
    size: ['small', 'big', 'small', 'big', 'small', 'small'],
    variant: [null, null, null, null, null, null]
};
const GALLERY_PROJECT_SECTION_PARAMS: SectionParams = {
    flyInDelayRemap: [200, 200, 100, 100, 0, 0],
    flyInDirectionRemap: ['left', 'right', 'left', 'right', 'left', 'right'],
    size: [],
    variant: []
};

const useFlyInTrigger = (ref: React.RefObject<HTMLDivElement>) => {
    const [isActive, setIsActive] = useState(false);
    const triggerPoint = 0.2;

    const scrollHandler = () => {
        const scrolled = getScrolledPercentage(ref);

        // setState with same value as old won't trigger update
        if (scrolled >= triggerPoint) {
            setIsActive(true)
        } else if (scrolled < triggerPoint) {
            setIsActive(false)
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    useEffect(() => {
        // parallax wrapper needs time to deal with layout
        setTimeout(() => scrollHandler(), 100);
    }, []);

    return isActive
};

const SMALLER_SCREEN = '@media only screen and (max-width: 800px)';
const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '100px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& h2': {
            width: '100%',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#fff',
            fontSize: '32px',
            wordSpacing: '5px',
            letterSpacing: '1px'
        },
        [SMALLER_SCREEN]: {
            padding: '20px 0',
            '& h2': {
                marginBottom: '20px',
                fontSize: '24px',
            }
        }
    },
    tilesWrapper: {
        width: '800px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        [SMALLER_SCREEN]: {
            width: 'calc(100% - 20px)',
            margin: '0 10px',
            flexDirection: 'column',
        }
    },
    flyInWrapper: {
        [SMALLER_SCREEN]: {
            width: '100%'
        }
    }
});

// TODO: make types generic

interface FrontpageProjectListSectionProps {
    sectionParams: SectionParams,
    type?: 'gallery' | null,
    sectionTitle: string,
    tileInfo: {
        title: string,
        link: string,
        imgUrl?: string
    }[],
}

const FrontpageProjectListSection: React.FC<FrontpageProjectListSectionProps> = ({sectionTitle, tileInfo, type, sectionParams}) => {
    const classes = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const isFlyInActive = useFlyInTrigger(containerRef);

    return (
        <div className={classes.root} ref={containerRef}>
            <FlyInWrapper
                isActive={isFlyInActive}
                direction={'bottom'}
            >
                <SectionTitle title={sectionTitle}/>
            </FlyInWrapper>

            <div className={classes.tilesWrapper}>
                { tileInfo.map((i, index) => {
                    return (
                        <FlyInWrapper
                            isActive={isFlyInActive}
                            direction={sectionParams.flyInDirectionRemap[index]}
                            delay={sectionParams.flyInDelayRemap[index]}
                            offset={'1000px'}
                            key={i.title}
                            className={classes.flyInWrapper}
                        >
                            {
                                type === 'gallery' ?
                                    <GalleryTile title={i.title} imgUrl={i.imgUrl || ''} link={i.link}/> :
                                    <TextTile link={i.link} title={i.title} size={sectionParams.size[index]} variant={sectionParams.variant[index]}/>
                            }
                        </FlyInWrapper>
                    );
                })}
            </div>
        </div>
    )
};

interface TextSectionProps {
    sectionTitle: string,
    tileInfo: {
        title: string,
        link: string,
    }[],
}

const FrontpageWebSection: React.FC<TextSectionProps> = ({sectionTitle, tileInfo}) => {
    return (
        <FrontpageProjectListSection
            sectionParams={WEB_PROJECT_SECTION_PARAMS}
            sectionTitle={sectionTitle}
            tileInfo={tileInfo}/>
    )
};

const FrontpageAcademicSection: React.FC<TextSectionProps> = ({sectionTitle, tileInfo}) => {
    return (
        <FrontpageProjectListSection
            sectionParams={ACADEMIC_PROJECT_SECTION_PARAMS}
            sectionTitle={sectionTitle}
            tileInfo={tileInfo}/>
    )
};

interface GallerySectionProps {
    sectionTitle: string,
    tileInfo: {
        title: string,
        link: string,
        imgUrl: string
    }[],
}

const FrontpageGallerySection: React.FC<GallerySectionProps> = ({sectionTitle, tileInfo}) => {
    return (
        <FrontpageProjectListSection
            sectionParams={GALLERY_PROJECT_SECTION_PARAMS}
            sectionTitle={sectionTitle}
            tileInfo={tileInfo}
            type='gallery'
        />
    )
};

export {
    FrontpageWebSection,
    FrontpageAcademicSection,
    FrontpageGallerySection
}
