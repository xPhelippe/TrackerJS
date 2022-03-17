import React from 'react';
import Button from '@mui/material/Button';
import './navbar.css'
import { Link } from 'react-router-dom';

function Navbar(props) {

    const links = [
        'Home',
        'About',
        'Github',
        'Demo',
        'Edit'
    ]

    return (
        <React.Fragment>
            <div className="navbarContainer">
                {links.map((obj,key) => {
                    return (
                        <Link 
                        key={key}
                        to={"/" + obj.toLowerCase()}
                        style={{textDecoration:'inherit', color:'inherit'}}
                        ><Button variant="Text">{obj}</Button>
                        </Link>

                    )
                    
                })}
            </div>
        </React.Fragment>
    )

}


export default Navbar;