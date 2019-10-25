import React from 'react';
import './spin-loader.css'

function SpinLoader(props) {
    return (
        <div className='spin-loader'
             style={{
                 width: `${props.size}px`,
                 height: `${props.size}px`,
                 borderRadius: `${0.5 * props.size + 4}px`
             }}>
            <div>
            </div>
        </div>
    )
}

export { SpinLoader };