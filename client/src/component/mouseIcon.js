import React from 'react';
import './mouseIcon.css';

function MouseIcon(props) {
    // It receives prop onClickMouseIcon={this.scrollToWorkRef}
    return (
        <div className='mouse-icon-wrapper' onClick={props.onClickMouseIcon}>
            <div className={'mouse-icon-mouse'}> </div>
        </div>
    )
}

export { MouseIcon };
