import {useEffect, useState} from "react";
import * as React from 'react';

interface Debouncer {
    lastCalledAt: number | null,
    timeoutID: number | null
}

const debouncer: Debouncer = {
    lastCalledAt: null,
    timeoutID: null
};
const DEFAULT_DELAY = 300;


function useIsResized(callback: () => void, userDelay?: number | null) {
    const now = Date.now();
    const DELAY = userDelay || DEFAULT_DELAY;

    const [resizeCounter, setResizeCounter] = useState(0);

    const updateDebouncer = () => {
        debouncer.lastCalledAt = now;
        debouncer.timeoutID = window.setTimeout(updateResizeCounter, DELAY);
    };

    const resizeHandler = () => {
        if (debouncer.lastCalledAt && now - debouncer.lastCalledAt < DELAY) {
            if (debouncer.timeoutID) window.clearTimeout(debouncer.timeoutID);
        }
        updateDebouncer();
    };

    const updateResizeCounter = () => {
        setResizeCounter((state) => state + 1)
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    });

    useEffect(() => {
        if (resizeCounter) {
            callback();
        }
    }, [resizeCounter]);

    return resizeCounter;
}

interface withCallBackOnResizedProps {
    delay?: number,
    callback: () => void
}

interface withCallBackOnResizedStates {
    resizeCounter: number
}

class WithCallBackOnResized extends React.Component<withCallBackOnResizedProps, withCallBackOnResizedStates> {
    private lastCalledAt: null | number;
    private timeoutID: null | number;
    private readonly DELAY: number;

    constructor(props: withCallBackOnResizedProps) {
        super(props);
        this.state = {
            resizeCounter: 0
        };
        this.lastCalledAt = null;
        this.timeoutID = null;
        this.DELAY = this.props.delay || 300;
        this.updateResizeCounter = this.updateResizeCounter.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
    }

    resizeHandler() {
        if (debouncer.lastCalledAt && Date.now() - debouncer.lastCalledAt < this.DELAY) {
            if (debouncer.timeoutID) window.clearTimeout(debouncer.timeoutID);
        }
        this.updateResizeCounter();
    }

    updateResizeCounter() {
        this.setState((state) => ({
            resizeCounter: state.resizeCounter + 1
        }))
    };

    componentDidUpdate(prevProps: Readonly<withCallBackOnResizedProps>, prevState: Readonly<withCallBackOnResizedStates>, snapshot?: any): void {
        if (prevState.resizeCounter !== this.state.resizeCounter) {
            this.props.callback();
        }
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.resizeHandler);
    }

    render() {
        return (
            <>
                { this.props.children }
            </>
        )
    }
}

export default useIsResized;
export { WithCallBackOnResized };