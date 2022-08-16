import React from "react";
import DailyChartView from "../dailyChartView/dailyChartView";
import { useState, useEffect } from "react";
import RadioOptions from "../radioOptions/radioOptions";
import { Paper } from "@mui/material";
import DataTransformer from "../../utils/dataTransformer";
import HeatMap from "../heatMap/heatMap";
import WeeklyChartView from "../weeklyChartView/weeklyChartView";
import MonthHeatMap from "../monthHeatMap/monthHeatMap";
import "./demo.css";
import DemoButtons from "../demoButtons/demoButtons";

function Demo(props) {
    const [rawData, setRawData] = useState([]);

    const [dailyData, setDailyData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [yearData, setYearData] = useState([]);

    const [graphSelection, setGraphSelection] = useState("");

    // helper function for random number generation
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Create some random data for now
    useEffect(() => {
        var n = 1500; //number of data instances to create

        var randomData = [];

        for (var i = 0; i < n; i++) {
            // get a random value
            var value = getRandomArbitrary(0, 20);

            // random date and time for the past several months
            var day = getRandomArbitrary(1, 28);
            var month = getRandomArbitrary(0, 12);
            if (month === 12) month = 11;
            var year = 2022;
            var hour = getRandomArbitrary(0, 23);
            var minute = getRandomArbitrary(0, 60);
            var second = 0;

            var time = new Date(year, month, day, hour, minute, second);

            randomData.push({ time: time, value: value });
        }

        setRawData(randomData);
    }, []);

    // create the array for data throughout the day
    useEffect(() => {
        setDailyData(DataTransformer.createDayData(rawData));
        setWeekData(DataTransformer.createWeekData(rawData));
        setMonthData(DataTransformer.createMonthData(rawData));
        setYearData(DataTransformer.createYeardata(rawData));
    }, [rawData]);

    function renderGraph() {
        switch (graphSelection) {
            case "Day":
                return <DailyChartView data={dailyData} />;
            case "Week":
                return <WeeklyChartView data={weekData} />;
            case "Month":
                return <MonthHeatMap data={monthData} />;
            case "Year":
                return <HeatMap data={yearData} />;
            default:
                return <DailyChartView data={dailyData} />;
        }
    }

    return (
        <React.Fragment>
            <DemoButtons setData={setRawData} />

            <div className="chartandOptions">
                <div className="options">
                    <RadioOptions setOption={setGraphSelection} />
                </div>
                <div className="chart">{renderGraph()}</div>
            </div>
        </React.Fragment>
    );
}

export default Demo;
