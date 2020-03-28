function workerCode () {
    /* eslint-disable-next-line no-restricted-globals */
    addEventListener('message', function(event) {
        const frames = []; // array of snowFlakes to render, pre render 10 seconds (600 frames)
        const totalFrames = 600;
        let snowFlakes = event.data.snowFlakes;
        const width = event.data.width;
        const height = event.data.height;

        const createSnowFlake = (width, height) => {
            const radius = Math.random() * 3 + 3;
            return {
                height,
                x: Math.floor(Math.random() * width),
                y: 0,
                radius,
                speed: radius / 6,
                isBottom: false
            }
        };

        const updateSnowFlake = (obj) => {
            const newY = obj.y < obj.height ? obj.y + obj.speed : obj.y;
            const newIsBottom = obj.y >= obj.height;
            return Object.assign({}, obj, {y: newY, isBottom: newIsBottom})
        };

        frames.push(snowFlakes.slice());

        for (let i=1; i<totalFrames; i++) {
            if (snowFlakes.length > 0) {
                snowFlakes = snowFlakes.map(obj => updateSnowFlake(obj));
            }
            if (Math.random() > 0.95 && snowFlakes.length <= 100) {
                snowFlakes.push(createSnowFlake(width, height))
            }
            if (snowFlakes.length > 100 && snowFlakes[0].isBottom) {
                snowFlakes.shift();
            }
            frames.push(snowFlakes.slice());
        }

        postMessage(frames)
    });
}

let code = workerCode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const snowWorkerScript = URL.createObjectURL(blob);

export default snowWorkerScript

