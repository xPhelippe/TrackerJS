import React from "react";
import {
    XAxis,
    YAxis,
    BarChart,
    Bar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import "./dailyChartView.scss";
import { useContext } from "react";
import { HabitContext } from "../../utils/habit-context";

function DailyChartView(props) {
    const habitCtx = useContext(HabitContext);
    const primColor = habitCtx.habits[habitCtx.habitIdx].color;

    const data = props.data;

    const now = new Date(Date.now());

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day =
        days[now.getDay()] +
        ", " +
        months[now.getMonth()] +
        " " +
        now.getDate() +
        ", " +
        now.getFullYear();

    return (
        <div className="dailyView">
            <h2>{day}</h2>
            <div className="barChart">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
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

export default DailyChartView;
