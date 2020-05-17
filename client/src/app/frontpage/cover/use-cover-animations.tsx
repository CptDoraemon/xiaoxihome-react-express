import React, {useEffect, useState} from "react";

const useCoverAnimations = (targetRef: React.RefObject<any>, containerID: string, backgroundImageID: string, titleID: string, progressBarID: string) => {
    const [halfWay, setHalfWay] = useState(false);

    useEffect(() => {
        /**
         * returns the percentage (in range [-0.5, 1.5] of scrolled of the ref element
         * 0 -> when the top of the element reaches the bottom of the viewport
         * 1 -> when the bottom of the element reaches the top of the viewport
         * a little extra padding helps edge cases (eg: when element is at top of the document)
         */
        let percentage = 0;
        /**
         * percentage remapped with start point at 0.5 since the cover is at the top of the document
         */
        let coverPercentage = 0;

        const scrollHandler = () => {
            if (!targetRef.current) return;

            const rect = targetRef.current.getBoundingClientRect();
            const totalDistance = rect.height + window.innerHeight;
            const travelled = window.innerHeight - rect.top;
            let newPercentage =  travelled / totalDistance;
            newPercentage = Math.min(1, newPercentage);
            newPercentage = Math.max(0, newPercentage);

            if (percentage === newPercentage) return;
            percentage = newPercentage;

            const start = window.innerHeight / totalDistance;
            const newCoverPercentage = (percentage - start) / (1 - start);

            if (coverPercentage === newCoverPercentage) return;
            coverPercentage = newCoverPercentage;

            // update styles
            const container = document.getElementById(containerID);
            const backgroundImage = document.getElementById(backgroundImageID);
            const title = document.getElementById(titleID);
            const progressBar = document.getElementById(progressBarID);
            if (container) {
                container.style.top = `${-coverPercentage * rect.height}px`;
            }
            if (backgroundImage) {
                backgroundImage.style.top = `${0.75 * coverPercentage * rect.height}px`;
            }
            if (title) {
                title.style.top = `${0.5 * coverPercentage * rect.height}px`;
                title.style.opacity = `${1 - coverPercentage}`;
            }
            if (progressBar) {
                progressBar.style.width = `${(coverPercentage - 0.5) / 0.5 * 100}%`;
            }

            if (coverPercentage >= 0.5 && !halfWay) {
                setHalfWay(true)
            } else if (coverPercentage < 0.5 && halfWay) {
                setHalfWay(false)
            }
        };

        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [halfWay]);

    return halfWay
};

export default useCoverAnimations
