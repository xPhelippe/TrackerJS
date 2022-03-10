import React from 'react';
import './header.css';

function Header(props) {

    return (
        <React.Fragment>
            <div className="header">
                <h1>Tracker.js</h1>
                <p>Welcome to Tracker.js. A simple way for you to keep track of things.</p>
            </div>
        </React.Fragment>
    )

}


export default Header;