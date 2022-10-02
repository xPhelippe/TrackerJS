import React from "react";
import "./heatMap.scss";
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

function HeatMap(props) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const [data, setData] = useState(props.data);

    useEffect(() => {
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
            <h2>{props.data[0].time.getFullYear()}</h2>
            <div className="yearContainer">
                <div className="monthContainer">
                    {months.map((obj, monthKey) => {
                        return (
                            <React.Fragment key={monthKey}>
                                <div className="month">{obj}</div>
                                <div className="dayContainer">
                                    {data &&
                                        data.map((obj, key) => {
                                            if (
                                                obj.time.getMonth() !== monthKey
                                            )
                                                return null;

                                            return (
                                                <Tooltip
                                                    title={obj.value.toString()}
                                                    arrow
                                                    followCursor
                                                >
                                                    <div
                                                        key={key}
                                                        className={
                                                            "day color-scale-" +
                                                            obj.color
                                                        }
                                                    ></div>
                                                </Tooltip>
                                            );
                                        })}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}

export default HeatMap;
