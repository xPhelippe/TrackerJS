import React from "react";
import { useState, useContext, useEffect } from "react";
import "./edit.scss";
import ModHabits from "./modHabtis/modHabits";
import ModData from "./modData/modData";
import { HabitContext } from "../../utils/habit-context";

function Edit(props) {
    return (
        <React.Fragment>
            <div className="editContainer">
                <ModHabits />
                <ModData />
            </div>
        </React.Fragment>
    );
}

export default Edit;
