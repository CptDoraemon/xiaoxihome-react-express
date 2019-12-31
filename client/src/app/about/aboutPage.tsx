import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import './aboutPage.css';
import { MdRadioButtonUnchecked, MdRadioButtonChecked, MdPowerSettingsNew , MdDone, MdError} from "react-icons/md";
import { setTitle } from "../../tools/set-title";
import { myScrollTo } from "../../tools/myScrollTo";
import { Link } from "react-router-dom";
import useLoadAboutPageData from "./use-load-about-page-data";
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core";

const IS_MOBILE = window.innerWidth <= 800;

interface PageData {
    title: string,
    content: Array<string>,
    imageUrl: string
}

function ActiveButton () {
    return (
        <div className='about-nav-button-wrapper'>
            <MdRadioButtonChecked size='15px' color='black'/>
        </div>
        )
}
interface InActiveButtonProps{
    setCurrentAtPage: Dispatch<SetStateAction<number>>,
    index: number
}
function InActiveButton (props: InActiveButtonProps) {
    return (
        <div className='about-nav-button-wrapper' onClick={() => props.setCurrentAtPage(props.index)}>
            <MdRadioButtonUnchecked size='15px' color='rgba(0,0,0,0.2)'/>
        </div>
    )
}

interface NavBarProps {
    currentAtPage: number,
    length: number,
    setCurrentAtPage: Dispatch<SetStateAction<number>>
}

function NavBar(props: NavBarProps) {
    const buttons = [];
    for (let i=0; i<props.length; i++) {
        i === props.currentAtPage ?
            buttons.push(<ActiveButton key={i} />) :
            buttons.push(<InActiveButton key={i} setCurrentAtPage={props.setCurrentAtPage} index={i}/>)
    }
    return (
        <div className='about-nav-wrapper'>
            { buttons }
        </div>
    )
}

interface PageProps extends PageData {
    currentAtPage: number,
    id: number,
}

function Page(props: PageProps) {
    return (
        <>
            <div className={'about-page-text-wrapper'} style={IS_MOBILE ? {} : {opacity: props.currentAtPage === props.id ? 1 : 0}}>
                <h2>{ props.title }</h2>
                { props.content.map((p, i) => <p key={i}>{p}</p>) }
            </div>

            { !IS_MOBILE && <div className={'about-page-text-placehoder'}> </div> }

            <div className='about-page-image-wrapper'>
                <img src={props.imageUrl} alt={'image'} />
            </div>
        </>
    )
}

function useOnePageScroll(initialValue: number, pageCount: number) {
    const [currentAtPage, setCurrentAtPage] = useState(initialValue);
    const [isScrolling, setIsScrolling] = useState(false);
    const DEBOUNCE_TIMER = 2000;
    let timeoutId: any;

    function scrollHandler(e: WheelEvent) {
        if (isScrolling) return;

        setIsScrolling(true);
        timeoutId = setTimeout(() => {
            setIsScrolling(false);
        }, DEBOUNCE_TIMER);

        if (e.deltaY > 0) {
            // scrolling down
            if (currentAtPage + 1 <= pageCount - 1) {
                setCurrentAtPage(currentAtPage + 1)
            }
        } else if (e.deltaY < 0) {
            // scrolling up
            if (currentAtPage - 1 >= 0) {
                setCurrentAtPage(currentAtPage - 1)
            }
        }
    }

    useEffect(() => {
        document.addEventListener('wheel', scrollHandler);
        return () => {
            document.removeEventListener('wheel', scrollHandler);
        }
    });

    useEffect(() => {
        return () => clearTimeout(timeoutId)
    }, []);

    return {
        currentAtPage,
        setCurrentAtPage
    }
}


interface AboutPageLoadedProps {
    pageData: Array<PageData>,
}

function AboutPageLoaded(props: AboutPageLoadedProps) {

    const pageRefs = props.pageData.map(() => useRef<HTMLDivElement>(document.createElement("div")));

    const {currentAtPage, setCurrentAtPage} = useOnePageScroll(0, props.pageData.length);

    if (!IS_MOBILE) {
        useEffect(() => {
            myScrollTo(pageRefs[currentAtPage].current.offsetTop)
        }, [currentAtPage]);

        useEffect(() => {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            return () => {
                document.body.style.overflow = '';
                document.body.style.height = '';
            }
        }, [])
    }

    return (
        <div className={'about-page-wrapper'}>
            {
                props.pageData.map((i, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Page title={i.title} content={i.content} currentAtPage={currentAtPage} imageUrl={i.imageUrl} id={index}/>
                            <div ref={pageRefs[index]}> </div>
                        </React.Fragment>
                    )
                })
            }
            <NavBar currentAtPage={currentAtPage} length={props.pageData.length} setCurrentAtPage={setCurrentAtPage}/>
            <Link to='/'>
                <div className='about-return-wrapper'>
                    <MdPowerSettingsNew size='25px' />
                </div>
            </Link>
        </div>
    )
}
interface AboutPageLoadingStatusRowProps {
    text: string,
    isFinished: boolean,
    isError: boolean
}
function AboutPageLoadingStatusRow(props: AboutPageLoadingStatusRowProps) {
    return (
        <Grid container direction={"row"} spacing={2} alignContent={"flex-start"} justify={"flex-start"}>
            <Grid item>
                <Box fontSize={'fontSize'}>
                    { props.text }
                </Box>
            </Grid>
            <Grid item>
                { props.isFinished && <MdDone/> }
                { props.isError && <MdError/> }
            </Grid>
        </Grid>
    )
}

function AboutPageLoadingStatus(props: AboutPageLoadingProps) {
    const LOADING_STATUS = {
        startLoading: !props.isGraphQLDataLoaded && !props.isImageLoaded && !props.isGraphQLDataError && !props.isImageLoadingError,
        graphQLLoaded: props.isGraphQLDataLoaded && !props.isImageLoaded && !props.isGraphQLDataError && !props.isImageLoadingError,
        graphQLError: !props.isGraphQLDataLoaded && !props.isImageLoaded && !props.isGraphQLDataError && !props.isImageLoadingError,
        imageLoaded: props.isGraphQLDataLoaded && props.isImageLoaded && !props.isGraphQLDataError && !props.isImageLoadingError,
        imageError: props.isGraphQLDataLoaded && !props.isImageLoaded && !props.isGraphQLDataError && props.isImageLoadingError,
    };

    if (LOADING_STATUS.startLoading) {
        // start loading graphQL
        return (
            <AboutPageLoadingStatusRow text={'Pulling Data from GraphQL API'} isFinished={false} isError={false}/>
        )
    } else if (LOADING_STATUS.graphQLLoaded) {
        return (
            <>
                <AboutPageLoadingStatusRow text={'Pulled Data From GraphQL API'} isFinished={true} isError={false}/>
                <AboutPageLoadingStatusRow text={'Loading Images'} isFinished={false} isError={false}/>
            </>
        )
    } else if (LOADING_STATUS.imageLoaded) {
        return (
            <>
                <AboutPageLoadingStatusRow text={'Pulled Data From GraphQL API'} isFinished={true} isError={false}/>
                <AboutPageLoadingStatusRow text={'Loaded Images'} isFinished={true} isError={false}/>
            </>
        )
    } else if (LOADING_STATUS.graphQLError) {
        return (
            <>
                <AboutPageLoadingStatusRow text={'GraphQL Server Not Available'} isFinished={false} isError={true}/>
            </>
        )
    } else if (LOADING_STATUS.imageError) {
        return (
            <>
                <AboutPageLoadingStatusRow text={'Pulled Data From GraphQL API'} isFinished={true} isError={false}/>
                <AboutPageLoadingStatusRow text={'Unable to Pre-Fetch Images'} isFinished={false} isError={true}/>
            </>
        )
    } else return null;
}

interface AboutPageLoadingProps {
    isGraphQLDataLoaded: boolean,
    isImageLoaded: boolean,
    isGraphQLDataError: boolean,
    isImageLoadingError: boolean
}
function AboutPageLoading(props: AboutPageLoadingProps) {
    return (
        <div className={'about-page-wrapper'}>
            <div className={'about-page-text-wrapper-loading'}>
                <Box my={2} width={'50%'}>
                    <Skeleton variant={'text'} height={40}/>
                </Box>
                { [...Array(6)].map((_, i) => {
                    return (
                        <Box my={0.5} width={'50%'} key={i}>
                            <Skeleton variant={'text'}/>
                        </Box>
                    )
                })}
            </div>
            <div className={'about-page-image-wrapper'}>
                <Skeleton variant={'rect'} width={'100%'} height={'100%'}/>
            </div>

            <Box position={'fixed'} top={10} left={10} zIndex={20} width={1}>
                <AboutPageLoadingStatus isGraphQLDataLoaded={props.isGraphQLDataLoaded} isImageLoaded={props.isImageLoaded} isGraphQLDataError={props.isGraphQLDataError} isImageLoadingError={props.isImageLoadingError}/>
            </Box>
        </div>
    )
}

function AboutPage() {

    const {isGraphQLDataLoaded, isImageLoaded, isReady, isGraphQLDataError, isImageLoadingError, data} = useLoadAboutPageData();

    useEffect(() => {
        setTitle('About me', false);
    }, []);

    if (isReady) {
        return (
            <AboutPageLoaded pageData={data}/>
        )
    } else {
        return (
            <AboutPageLoading isGraphQLDataLoaded={isGraphQLDataLoaded} isImageLoaded={isImageLoaded} isGraphQLDataError={isGraphQLDataError} isImageLoadingError={isImageLoadingError}/>
        )
    }
}

export default AboutPage;