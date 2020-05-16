import React from 'react';

class FlyInWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnimationTriggered: false,
        };
        this.setUp = this.setUp.bind(this);
        this.scrollEventListener = this.scrollEventListener.bind(this);
        this.scrollEventListenerForCustomEvent = this.scrollEventListenerForCustomEvent.bind(this);
        this.directionPossibleValues = ['left', 'right', 'up', 'down'];
        // some set up need to be done before rendering
        this.offsetPixel = (this.props.propsForWrapper.flyInDirection === 'left' || this.props.propsForWrapper.flyInDirection === 'right') ? 0.5 * window.innerWidth : 200;
        this.translateCSS = [`translate(-${this.offsetPixel}px,0)`, `translate(${this.offsetPixel}px,0)`, `translate(0,-${this.offsetPixel}px)`, `translate(0,${this.offsetPixel}px)`];
        this.beforeCSS = {
            opacity: 0,
            transform: this.translateCSS[this.directionPossibleValues.indexOf(this.props.propsForWrapper.flyInDirection)],
        };
        // for parallax effect which body is not scrolling
        this.customScrollEvent = this.props.propsForWrapper.customScrollEvent ? this.props.propsForWrapper.customScrollEvent : '';
    }
    setUp() {
        this.flyInDelay = this.props.propsForWrapper.flyInDelay;

        const transitionProperty = `transform 1s ease ${this.flyInDelay}s, opacity 1s linear ${this.flyInDelay}s`;
        this.afterCSS = {
            opacity: 1,
            transform: 'translate(0,0)',
            transition: transitionProperty,
        };
    }
    scrollEventListener() {
        const myScrolled = 0.7 * window.innerHeight + window.scrollY;
        if (myScrolled > this.props.propsForWrapper.animationTriggerPoint) {
            document.removeEventListener('scroll', this.scrollEventListener);
            this.setState({isAnimationTriggered: true})
        }
    }
    scrollEventListenerForCustomEvent(e) {
        const myScrolled = 0.7 * window.innerHeight + e.detail.scrollTop;
        if (myScrolled > this.props.propsForWrapper.animationTriggerPoint) {
            document.removeEventListener(this.customScrollEvent, this.scrollEventListenerForCustomEvent);
            this.setState({isAnimationTriggered: true})
        }
    }
    componentDidMount() {
        this.setUp();
        if (this.customScrollEvent.length > 0) {
            document.addEventListener(this.customScrollEvent, this.scrollEventListenerForCustomEvent)
        } else {
            document.addEventListener('scroll', this.scrollEventListener)
        }
    }
    componentWillUnmount() {
        if (this.customScrollEvent.length > 0) {
            document.removeEventListener(this.customScrollEvent, this.scrollEventListenerForCustomEvent)
        } else {
            document.removeEventListener('scroll', this.scrollEventListener)
        }
    }
    render() {
        return (
            <div
                className={this.props.propsForWrapper.wrapperClassName === undefined ? null : this.props.propsForWrapper.wrapperClassName}
                style={this.state.isAnimationTriggered ? this.afterCSS : this.beforeCSS}
            >
                { this.props.children }
            </div>
        )
    }
}

export default FlyInWrapper;
