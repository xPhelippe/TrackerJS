import { useContext, useState } from "react";
import {
    XAxis,
    YAxis,
    BarChart,
    Bar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import "./weeklyChartView.scss";
import React from "react";
import { HabitContext } from "../../utils/habit-context";

function WeeklyChartView(props) {
    const habitCtx = useContext(HabitContext);
    const primColor = habitCtx.habits[habitCtx.habitIdx].color;

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
                        <Tooltip />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default WeeklyChartView;
