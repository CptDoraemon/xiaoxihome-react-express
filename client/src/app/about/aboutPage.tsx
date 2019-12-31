import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import './aboutPage.css';
import { MdRadioButtonUnchecked, MdRadioButtonChecked, MdPowerSettingsNew , MdDone} from "react-icons/md";
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
    isFinished: boolean
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
            </Grid>
        </Grid>
    )
}

function AboutPageLoadingStatus(props: AboutPageLoadingProps) {
    if (!props.isGraphQLDataLoaded && !props.isImageLoaded) {
        return (
            <AboutPageLoadingStatusRow text={'Pulling Data from GraphQL API'} isFinished={false} />
        )
    } else if (props.isGraphQLDataLoaded && !props.isImageLoaded) {
        return (
            <>
                <AboutPageLoadingStatusRow text={'Pulled Data From GraphQL API'} isFinished={true} />
                <AboutPageLoadingStatusRow text={'Loading Images'} isFinished={false} />
            </>
        )
    } else if (props.isGraphQLDataLoaded && props.isImageLoaded) {
        return (
            <>
                <AboutPageLoadingStatusRow text={'Pulled Data From GraphQL API'} isFinished={true} />
                <AboutPageLoadingStatusRow text={'Loaded Images'} isFinished={true} />
            </>
        )
    } else return null;
}

interface AboutPageLoadingProps {
    isGraphQLDataLoaded: boolean,
    isImageLoaded: boolean
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

            <Box position={'fixed'} top={10} left={10} zIndex={20} minWidth={.5}>
                <AboutPageLoadingStatus isGraphQLDataLoaded={props.isGraphQLDataLoaded} isImageLoaded={props.isImageLoaded} />
            </Box>
        </div>
    )
}

function AboutPage() {

    const {isGraphQLDataLoaded, isImageLoaded, isReady, data} = useLoadAboutPageData();

    useEffect(() => {
        setTitle('About me', false);
    }, []);

    if (isReady) {
        return (
            <AboutPageLoaded pageData={data}/>
        )
    } else {
        return (
            <AboutPageLoading isGraphQLDataLoaded={isGraphQLDataLoaded} isImageLoaded={isImageLoaded}/>
        )
    }
}

export default AboutPage;