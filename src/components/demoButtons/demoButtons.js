import React from "react";
import Button from "@mui/material/Button";
import "./demoButtons.css";
import DataGenerator from "../../utils/createData";

function DemoButtons(props) {
    function randomClicked(evt) {
        let newData = DataGenerator.random();

        props.setData(newData);
    }

    function zigZagClicked(evt) {
        let newData = DataGenerator.zigZag();

        props.setData(newData);
    }

    function strongClicked(evt) {
        let newData = DataGenerator.strongSoFar();

        props.setData(newData);
    }

    return (
        <React.Fragment>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <p>Click a button to see what the charts look like when full</p>
                <div className="divButContainer">
                    <Button variant="contained" onClick={randomClicked}>
                        Random
                    </Button>
                    <Button variant="contained" onClick={zigZagClicked}>
                        Zig Zag
                    </Button>
                    <Button variant="contained" onClick={strongClicked}>
                        Strong so far
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DemoButtons;
