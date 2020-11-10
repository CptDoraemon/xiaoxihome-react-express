import {useEffect, useState} from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 800)
    }, []);

    return isMobile
};

export default useIsMobile
