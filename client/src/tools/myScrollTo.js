function myScrollTo(targetY, targetElement) {
    // edge has problem using scrollTo()
    const scrolled = targetElement === undefined ? window.scrollY : targetElement.scrollTop;
    if (targetElement === undefined) targetElement = window;

    const diff = Math.abs(targetY - scrolled);
    const time = 0.3;
    let speed = diff/(60*time);
    speed = scrolled >= targetY ? -speed : speed;
    let step = scrolled + speed;

    function scrollLoop() {
        if (scrolled > targetY) {
            // scroll up
            if (step > targetY) {
                // targetElement.scrollTo(0, step);
                targetElement.scrollTop = step;
                step += speed;
                requestAnimationFrame(scrollLoop);
            } else {
                // targetElement.scrollTo(0, targetY);
                targetElement.scrollTop = targetY;
            }
        } else if (scrolled < targetY) {
            // scroll down
            if (step < targetY) {
                // targetElement.scrollTo(0, step);
                targetElement.scrollTop = step;
                step += speed;
                requestAnimationFrame(scrollLoop);
            } else {
                // targetElement.scrollTo(0, targetY);
                targetElement.scrollTop = targetY;
            }
        }
    }
    requestAnimationFrame(scrollLoop);
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