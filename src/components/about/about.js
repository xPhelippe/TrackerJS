import React from "react";
import { Paper } from "@mui/material";
import "./about.scss";
import Main from "./MainIntro.png";
import Enter from "./EnterValue.png";
import Bars from "./Bars.png";
import Year from "./Year.png";
import data from "./aboutData.js";

function About(props) {
    return (
        <React.Fragment>
            <Paper>
                {data.map((data) => {
                    return (
                        <div className="aboutGrid">
                            <h2 className="header">{data.title}</h2>
                            <p className="content">{data.content}</p>
                            <img
                                src={data.image}
                                className="image"
                                alt={data.alt}
                            ></img>
                        </div>
                    );
                })}
                <div className="about-end"></div>
            </Paper>
        </React.Fragment>
    );
}

export default About;
