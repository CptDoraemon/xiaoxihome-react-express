import {useState} from "react";
import useIsResized from "./use-is-resized";

function getIsMobile() {
    return window.innerWidth < 800;
}

function useIsMobile(
    resizeEndDelay?: null | number,
    callbackOnResized?: () => void | null,
    callbackOnChanged?: () => void | null
) {
    const [isMobile, setIsMobile] = useState(getIsMobile());
    useIsResized(setIsMobileIfNeeded, resizeEndDelay);

    function setIsMobileIfNeeded() {
        if (callbackOnResized) callbackOnResized();
        if (isMobile !== getIsMobile()) {
            if (callbackOnChanged) callbackOnChanged();
            setIsMobile(getIsMobile());
        }
    }

    return isMobile
}

export default useIsMobile;