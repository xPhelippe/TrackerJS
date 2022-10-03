import React from "react";
import "./about.scss";
import data from "./aboutData.js";

function About(props) {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

export default About;
