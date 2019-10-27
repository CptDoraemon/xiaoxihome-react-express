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
    const time = 2;
    const alpha = 0.2; // % of accelerate.
    const beta = 0.6; // % of decelerating.
    // acceleration and deceleration per second
    const aPerS = (2 * distance) / (time * time * (-alpha * alpha + 2 * alpha - alpha * beta));
    const dPerS = alpha / beta * aPerS;
    // per tick
    const a = aPerS / 3600;
    const d = dPerS / 3600; // unsigned!

    const tick1 = time * 60 * alpha; // decelerating
    const tick2 = (1 - alpha - beta) * time * 60; // constant v, tick 3 is decelerating and omitted here.
    const totalTick = time * 60;

    let tick = 0;
    let v = 0;
    let s = scrolled;
    function scrolling() {
        let step;
        if (0 <= tick && tick < tick1) {
            step = v + 0.5 * a;
            v += a;
        } else if (tick1 <= tick && tick < (tick1 + tick2)) {
            step = v;
        } else if ((tick1 + tick2) <= tick && tick <= totalTick) {
            step = v - 0.5 * d;
            v -= d;
        }
        s += step;
        tick++;
        targetElement.scrollTop = s;
        if (tick <= totalTick) {
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