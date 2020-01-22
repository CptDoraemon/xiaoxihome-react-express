import React, {CSSProperties} from 'react';

interface StickyEffectProps {
    stickyStartHeight: number,
    zIndex: number
}

interface StickyEffectStates {
    isFixed: boolean,
    placeholderHeight: number
}


class StickyEffect extends React.Component<StickyEffectProps, StickyEffectStates> {

    stickyStartHeight: number = this.props.stickyStartHeight;
    isFixedStyle: CSSProperties;
    isNotFixedStyle: CSSProperties;
    containerEl: React.RefObject<HTMLInputElement>;

    constructor(props: StickyEffectProps) {
        super(props);
        this.state = {
            isFixed: false,
            placeholderHeight: 0
        };
        this.containerEl = React.createRef();
        this.isFixedStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: this.props.zIndex,
        };
        this.isNotFixedStyle = {
            position: 'relative',
            width: '100%'
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
        this.setState({
            placeholderHeight: this.containerEl && this.containerEl.current ? this.containerEl.current.getBoundingClientRect().height : 0
        })
    };

    componentWillUnmount(){
        document.removeEventListener('scroll', this.scrollHandler);
    };

    render() {
        // return (
        //     <div style={this.state.isFixed ? {...this.isFixedStyle} : {...this.isNotFixedStyle}}>
        //         { this.props.children }
        //     </div>
        // )
        return this.state.isFixed ? (
            <>
                <div style={{...this.isFixedStyle}} ref={this.containerEl}>
                    { this.props.children }
                </div>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: `${this.state.placeholderHeight}px`
                }}>
                </div>
            </>
        ) : (
            <div style={{...this.isNotFixedStyle}} ref={this.containerEl}>
                { this.props.children }
            </div>
        );
    }
}

export default StickyEffect;