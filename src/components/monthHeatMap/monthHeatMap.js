import React from "react";
import "./monthHeatMap.scss";
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

function MonthHeatMap(props) {
    const months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "Sepember",
        "October",
        "November",
        "December",
    ];

    const month = months[props.data[0].time.getMonth()];

    const [repeatDivsStart, setRepeatDivsStart] = useState([]);
    const [repeatDivsEnd, setRepeatDivsEnd] = useState([]);

    const [data, setData] = useState(props.data);

    useEffect(() => {
        setRepeatDivsStart([...Array(props.data[0].time.getDay()).keys()]);
        setRepeatDivsEnd([
            ...Array(
                6 - props.data[props.data.length - 1].time.getDay()
            ).keys(),
        ]);

        let newData = [];

        //find max value
        let max = 0;

        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].value > max) {
                max = props.data[i].value;
            }
        }

        if (max === 0) max = 1;

        // calculate color value

        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].value / max < 0.25) {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 1,
                });
            } else if (props.data[i].value / max < 0.5) {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 2,
                });
            } else if (props.data[i].value / max < 0.75) {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 3,
                });
            } else {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 4,
                });
            }
        }

        setData(newData);
    }, [props.data]);

    return (
        <React.Fragment>
            <h2>{month}</h2>
            <div className="container">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>

                {repeatDivsStart &&
                    repeatDivsStart.map((obj, key) => {
                        return <div className="emptyDay" key={key} />;
                    })}

                {data &&
                    data.map((obj, key) => {
                        return (
                            <Tooltip
                                title={obj.value.toString()}
                                arrow
                                followCursor
                                key={key}
                            >
                                <div
                                    className={
                                        "MviewDay color-scale-" + obj.color
                                    }
                                />
                            </Tooltip>
                        );
                    })}

                {repeatDivsEnd &&
                    repeatDivsEnd.map((obj, key) => {
                        return <div className="emptyDay" key={key} />;
                    })}
            </div>
        </React.Fragment>
    );
}

export default MonthHeatMap;
