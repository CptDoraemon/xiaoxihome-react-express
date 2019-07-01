import React from 'react';

function withFlyInAnimation(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isAnimationTriggered: false,
            };
            this.setUp = this.setUp.bind(this);
            this.scrollEventListener = this.scrollEventListener.bind(this);
            this.directionPossibleValues = ['left', 'right', 'up', 'down'];
            // some set up need to be done before rendering
            this.offsetPixel = (this.props.flyInDirection === 'left' || this.props.flyInDirection === 'right') ? 0.5 * window.innerWidth : 200;
            this.translateCSS = [`translate(-${this.offsetPixel}px,0)`, `translate(${this.offsetPixel}px,0)`, `translate(0,-${this.offsetPixel}px)`, `translate(0,${this.offsetPixel}px)`];
            this.beforeCSS = {
                opacity: 0,
                transform: this.translateCSS[this.directionPossibleValues.indexOf(this.props.flyInDirection)],
            };
            //
        }
        setUp() {
            this.flyInDelay = this.props.flyInDelay;

            const transitionProperty = `transform 1s ease ${this.flyInDelay}s, opacity 1s linear ${this.flyInDelay}s`;
            this.afterCSS = {
                opacity: 1,
                transform: 'translate(0,0)',
                transition: transitionProperty,
            };
        }
        scrollEventListener() {
            const myScrolled = 0.7 * window.innerHeight + window.scrollY;
            if (myScrolled > this.props.animationTriggerPoint) {
                document.removeEventListener('scroll', this.scrollEventListener);
                this.setState({isAnimationTriggered: true})
            }
        }
        componentDidMount() {
            this.setUp();
            document.addEventListener('scroll', this.scrollEventListener)
        }
        componentWillUnmount() {
            document.removeEventListener('scroll', this.scrollEventListener)
        }
        render() {
            return (
                <div
                    className={this.props.wrapperClassName === undefined ? null : this.props.wrapperClassName}
                    style={this.state.isAnimationTriggered ? this.afterCSS : this.beforeCSS}
                >
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}


export { withFlyInAnimation };