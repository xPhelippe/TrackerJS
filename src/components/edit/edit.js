import React from "react";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import "./edit.css";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";

function Edit(props) {
    const [localColor, setLocalColor] = useLocalStorage("Color", "#285238");
    const setParams = useSearchParams()[1];
    const [color, setColor] = useState(localColor);

    function saveColor(color) {
        // set the root query selector
        document
            .querySelector(":root")
            .style.setProperty("--back-color", color);

        setLocalColor(color);

        setParams({ color });
    }

    return (
        <React.Fragment>
            <div className="editContainer">
                <h2>Color Customization</h2>
                <HexColorPicker color={color} onChange={setColor} />
                <Button variant="contained" onClick={(e) => saveColor(color)}>
                    Save
                </Button>
            </div>
        </React.Fragment>
    );
}

export default Edit;
