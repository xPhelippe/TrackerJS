import React from 'react';
import { Paper } from '@mui/material';
import './about.css'
import Main from './MainIntro.png'
import Enter from './EnterValue.png'
import Bars from './Bars.png'
import Year from './Year.png'

function About(props) {

    const headerStyle = {
        margin: '1.5rem 2rem'
    }

    const row = {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'start',
        justifyItems: 'start'
    }


    const imageStyle= {
        width: 'min(30vw,300px)', 
        margin: '0 1rem'
    }

    return (
        <React.Fragment>
            <Paper>
                <div className="aboutContainer">
                    <h2 style={headerStyle}>Welcome!</h2>
                    <div style={row}>
                        <p>Welcome to Tracker.js! This project was inspired to help anyone track a key habit that they want to develop. Feel free to shop around, check out the pretty charts, and maybe even start tracking a habit of your own!</p>
                        <img src={Year} style={imageStyle} alt="main view" />
                    </div>
                    
                    <h2 style={headerStyle}>How to Use</h2>
                    <div style={row}>
                        <p>After deciding on a habit to watch, pick a way to measure it. This could be glasses of water drank, number of pushups pushed, or number of pages read. Whenever you have an update, enter the number in the text box. Tracker.js will keep track of things over time.</p>
                        <img src={Enter} style={imageStyle} alt="enter data here"/>
                    </div>
                    <br />
                    <div style={row}>
                        <p>As data is entered, the daily, weekly, monthly, and yearly views are updated. You may not be able to see your biceps grow, but you most certainly can watch these bars get taller.</p>
                        <img src={Bars} style={imageStyle} alt="bar graph"/>
                    </div>

                    <h2 style={headerStyle}>And There's More</h2>
                    <div style={row}>
                        <p>In addition, feel free to visit the other tabs where you can see a demo of a full board, change the color of the site, and view the source code.</p>
                        <img src={Main} style={imageStyle} alt="main page" />
                    </div>
                    <br />
                </div>
            </Paper>
            
        </React.Fragment>
    )

}


export default About;