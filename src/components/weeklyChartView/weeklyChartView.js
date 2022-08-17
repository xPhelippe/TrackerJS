import { useState } from "react";
import { XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from "recharts";
import "./weeklyChartView.css";
import React from "react";

function WeeklyChartView(props) {
    const primColor = useState(
        getComputedStyle(document.querySelector(":root"))
            .getPropertyValue("--back-color")
            .trim()
    )[0];

    const data = props.data;

    const title =
        props.data[0].time + " to " + props.data[props.data.length - 1].time;

    return (
        <div className="weeklyView">
            <h2>{title}</h2>
            <div className="barChart">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        // width={800}
                        // height={400}
                        data={data}
                        // className="barChart"
                    >
                        <Bar type="monotone" dataKey="value" fill={primColor} />
                        <XAxis
                            dataKey="time"
                            type="category"
                            className="barChart"
                        />
                        <YAxis />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default WeeklyChartView;
