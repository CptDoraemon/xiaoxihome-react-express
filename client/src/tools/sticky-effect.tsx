import React, {CSSProperties} from 'react';

interface StickyEffectProps {
    stickyStartHeight: number
}

interface StickyEffectStates {
    isFixed: boolean
}


class StickyEffect extends React.Component<StickyEffectProps, StickyEffectStates> {

    stickyStartHeight: number = this.props.stickyStartHeight;
    isFixedStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
    };
    isNotFixedStyle: CSSProperties = {
        position: 'relative',
        width: '100%'
    };

    constructor(props: StickyEffectProps) {
        super(props);
        this.state = {
            isFixed: false
        };
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    scrollHandler() {
        const scrolled = window.scrollY;
        if (scrolled >= this.stickyStartHeight && !this.state.isFixed) {
            this.setState({isFixed: true})
        } else if (scrolled < this.stickyStartHeight && this.state.isFixed) {
            this.setState({isFixed: false})
        }
    }

    componentDidMount(){
        document.addEventListener('scroll', this.scrollHandler);
    };

    componentWillUnmount(){
        document.removeEventListener('scroll', this.scrollHandler);
    };

    render() {
        return (
            <div style={this.state.isFixed ? {...this.isFixedStyle} : {...this.isNotFixedStyle}}>
                { this.props.children }
            </div>
        )
    }
}

export default StickyEffect;