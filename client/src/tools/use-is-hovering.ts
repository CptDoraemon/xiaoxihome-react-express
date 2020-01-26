import {MutableRefObject, useEffect, useState} from "react";

function useIsHovering(ref: MutableRefObject<HTMLElement | null>) {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        if (!isHovering) setIsHovering(true)
    };

    const handleMouseLeave = () => {
        if (isHovering) setIsHovering(false)
    };

    useEffect(() => {
        if (!ref) return;
        const el = ref.current;
        if (!el) return;

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        }
    }, [isHovering]);

    return isHovering;
}

export default useIsHovering;