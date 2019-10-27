function myScrollTo(targetY, targetElement) {
    // edge has problem using scrollTo()
    // LINEAR
    // const scrolled = targetElement === undefined ? window.scrollY : targetElement.scrollTop;
    // if (targetElement === undefined) targetElement = window;
    //
    // const diff = Math.abs(targetY - scrolled);
    // const time = 1.5;
    // let speed = diff/(60*time);
    // speed = scrolled >= targetY ? -speed : speed;
    // let step = scrolled + speed;
    //
    // function scrollLoop() {
    //     if (scrolled > targetY) {
    //         // scroll up
    //         if (step > targetY) {
    //             // targetElement.scrollTo(0, step);
    //             targetElement.scrollTop = step;
    //             step += speed;
    //             requestAnimationFrame(scrollLoop);
    //         } else {
    //             // targetElement.scrollTo(0, targetY);
    //             targetElement.scrollTop = targetY;
    //         }
    //     } else if (scrolled < targetY) {
    //         // scroll down
    //         if (step < targetY) {
    //             // targetElement.scrollTo(0, step);
    //             targetElement.scrollTop = step;
    //             step += speed;
    //             requestAnimationFrame(scrollLoop);
    //         } else {
    //             // targetElement.scrollTo(0, targetY);
    //             targetElement.scrollTop = targetY;
    //         }
    //     }
    // }
    // requestAnimationFrame(scrollLoop);
    //
    // FADE IN FADE OUT
    const scrolled = targetElement === undefined ? window.scrollY : targetElement.scrollTop;
    if (targetElement === undefined) targetElement = window;

    const distance = targetY - scrolled;
    const isScrollingDown = distance >= 0;
    const time = 2;
    const alpha = 0.2; // % of accelerate.
    const beta = 0.6; // % of decelerating.
    // acceleration and deceleration per second
    const a = (2 * distance) / (time * time * (-alpha * alpha + 2 * alpha - alpha * beta));
    const d = alpha / beta * a;
    //
    const t1 = time * alpha; // decelerating
    const t2 = (1 - alpha - beta) * time; // constant v, tick 3 is decelerating and omitted here.

    let v = 0;
    let s = scrolled;
    let lastTimeStamp = Date.now();
    const startTimeStamp = Date.now();
    let isFinished = false;
    function scrolling() {
        const currentTimeStamp = Date.now();
        const accumT = (currentTimeStamp - startTimeStamp) / 1000;
        const deltaT = (currentTimeStamp - lastTimeStamp) / 1000;
        let step = 0;
        if (0 <= accumT && accumT < t1) {
            step = v * deltaT + 0.5 * a * deltaT * deltaT;
            v += a * deltaT;
        } else if (t1 <= accumT && accumT < (t1 + t2)) {
            step = v * deltaT;
        } else {
            // need update calculation in real time otherwise error in distance may occur due to rounding and framerate.
            isFinished = (isScrollingDown && (s >= targetY)) || (!isScrollingDown && (s <= targetY));
            const remainingDistance = isFinished ? 0 : targetY - s;
            if (!isFinished) {
                const remainingTime = time - accumT;
                const updatedD = (2 * v * remainingTime - 2 * remainingDistance) / (remainingTime * remainingTime);
                step = v * deltaT - 0.5 * updatedD * deltaT * deltaT;
                v -= updatedD * deltaT;
            }

            // step = v * deltaT - 0.5 * d * deltaT * deltaT;
            // v -= d * deltaT;
        }
        // clean up
        lastTimeStamp = currentTimeStamp;
        step = Math.round(step);
        s += step;
        targetElement.scrollTop = s;
        if (!isFinished) {
            requestAnimationFrame(scrolling);
        }
    }
    requestAnimationFrame(scrolling);
}

function myWheelTo(from, to) {
    const scrolled = from;
    const diff = Math.abs(to - scrolled);
    const time = 0.3;
    let speed = diff/(60*time);
    speed = scrolled >= to ? -speed : speed;
    let step = scrolled + speed;

    function scrollLoop() {
        if (scrolled > to) {
            // scroll up
            if (step > to) {
                window.scrollTo(0, step);
                step += speed;
                requestAnimationFrame(scrollLoop);
            } else {
                window.scrollTo(0, to);
            }
        } else if (scrolled < to) {
            // scroll down
            if (step < to) {
                window.scrollTo(0, step);
                step += speed;
                requestAnimationFrame(scrollLoop);
            } else {
                window.scrollTo(0, to);
            }
        }
    }
    requestAnimationFrame(scrollLoop);
}

export { myScrollTo, myWheelTo };