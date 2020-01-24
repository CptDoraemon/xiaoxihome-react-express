import {useEffect, useState} from "react";

let lastResizedAt: number | null = null;
let timeOut: number | null = null;
const DEBOUNCER = 500;

function getIsMobile() {
    return window.innerWidth < 800;
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    const setIsMobileIfNeeded = () => {
        lastResizedAt = null;
        timeOut = null;

        if (isMobile !== getIsMobile()) {
            setIsMobile(getIsMobile());
        }
    };

    const resizeHandler = () => {
        const now = Date.now();
        if (!lastResizedAt || lastResizedAt - now < DEBOUNCER) {
            if (timeOut) {
                window.clearTimeout(timeOut);
                timeOut = null
            }
            lastResizedAt = now;
            timeOut = window.setTimeout(setIsMobileIfNeeded, DEBOUNCER);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    });

    return isMobile
}

export default useIsMobile;