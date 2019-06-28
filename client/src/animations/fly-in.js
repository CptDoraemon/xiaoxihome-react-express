import React from 'react';

function withFlyInAnimation(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isAnimationTriggered: false,
                beforeCSS: {
                    opacity: 0,
                    transition: 0
                }
            };
            this.setUp = this.setUp.bind(this);
            this.scrollEventListener = this.scrollEventListener.bind(this);
            this.directionPossibleValues = ['left', 'right', 'up', 'down'];
        }
        setUp() {
            this.flyInDirection = this.checkValidation(this.props.flyInDirection, this.directionPossibleValues, 'left');
            this.flyInDelay = this.props.flyInDelay;
            this.offsetPixel = (this.flyInDirection === 'left' || this.flyInDirection === 'right') ? `${0.5 * window.innerWidth}px` : '200px';
            this.translateCSS = [`translate(-${this.offsetPixel},0)`, `translate(${this.offsetPixel},0)`, `translate(0,-${this.offsetPixel})`, `translate(0,${this.offsetPixel})`];

            const translateCSSIndex = this.directionPossibleValues.indexOf(this.flyInDirection);
            const transitionProperty = `transform 1s ${this.flyInDelay}s, opacity 1s ${this.flyInDelay}s`;
            const beforeCSS = {
                opacity: 0,
                // transition: transitionProperty,
                transform: this.translateCSS[translateCSSIndex],
            };
            const afterCSS = {
                opacity: 1,
                transform: 'translate(0,0)',
                transition: transitionProperty,
            };
            this.setState({
                beforeCSS: beforeCSS,
                afterCSS: afterCSS
            })
        }
        checkValidation(input, possibleValuesInArray, defaultValueInString) {
            input = input.toString();

            if (input === undefined) {
                return defaultValueInString
            } else if (possibleValuesInArray.indexOf(input) === -1) {
                return defaultValueInString
            } else {
                return input
            }
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
                    style={this.state.isAnimationTriggered ? this.state.afterCSS : this.state.beforeCSS}
                >
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}


export { withFlyInAnimation };