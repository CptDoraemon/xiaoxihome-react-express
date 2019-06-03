import React from 'react';
import './missing404.css';
import { Link } from 'react-router-dom';

class Missing404 extends React.Component {
    render() {
        return (
            <div className='missing'>
                <h1>Ooops <br />404 NOT FOUND</h1>
                <p><Link to='/home'>HOME</Link></p>
            </div>
    )
    }
}


export { Missing404 as default };