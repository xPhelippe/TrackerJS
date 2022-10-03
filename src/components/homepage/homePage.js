import React from "react";
import SubmitForm from "../submitForm/submitForm";
import DailyChartView from "../dailyChartView/dailyChartView";
import { useState, useEffect, useContext } from "react";
import RadioOptions from "../radioOptions/radioOptions";
import { Paper } from "@mui/material";
import DataTransformer from "../../utils/dataTransformer";
import HeatMap from "../heatMap/heatMap";
import WeeklyChartView from "../weeklyChartView/weeklyChartView";
import MonthHeatMap from "../monthHeatMap/monthHeatMap";
import "./homePage.scss";
import useLocalStorage from "use-local-storage";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import { HabitContext } from "../../utils/habit-context";

function HomePage(props) {
    const habitCtx = useContext(HabitContext);
    const habits = habitCtx.habits;
    const [selectedhabit, setSelectedHabit] = useState(
        habits[habitCtx.habitIdx].name
    );
    const [ctxData, setCtxData] = useState(habitCtx.habitData);
    const [rawData, setRawData] = useState([]);

    const [dailyData, setDailyData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [yearData, setYearData] = useState([]);

    const [graphSelection, setGraphSelection] = useState("");

    useEffect(() => {
        let newData = [];

        for (let i = 0; i < ctxData.length; i++) {
            newData.push({
                id: ctxData[i].id,
                time: new Date(ctxData[i].time),
                value: ctxData[i].value,
                habit: ctxData[i].habit,
            });
        }
        setRawData(newData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // create the array for data throughout the day
    useEffect(() => {
        //filter rawdata
        const filteredData = rawData.filter((el) => {
            return el.habit === selectedhabit;
        });

        // create data for graphs
        setDailyData(DataTransformer.createDayData(filteredData));
        setWeekData(DataTransformer.createWeekData(filteredData));
        setMonthData(DataTransformer.createMonthData(filteredData));
        setYearData(DataTransformer.createYeardata(filteredData));
    }, [rawData, selectedhabit]);

    function addData(obj) {
        const time = obj.time;
        const val = obj.value;
        const id = rawData.length > 0 ? rawData[rawData.length - 1].id + 1 : 0;

        setRawData([
            ...rawData,
            {
                id: id,
                time: time,
                value: parseFloat(val),
                habit: selectedhabit,
            },
        ]);
        habitCtx.setHabitData([
            ...rawData,
            {
                id: id,
                time: time,
                value: parseFloat(val),
                habit: selectedhabit,
            },
        ]);
    }

    // update local and global state to the new habit
    function changeSelectedHabit(e) {
        const newHabitIdx = habits.findIndex((x) => x.name === e.target.value);
        habitCtx.setHabitIdx(newHabitIdx);
        setSelectedHabit(e.target.value);
    }

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
            <div className="habitSelector">
                <h2>Habit Select:</h2>
                <Select
                    sx={{ marginTop: "10px" }}
                    value={selectedhabit}
                    fullWidth
                    label=""
                    onChange={changeSelectedHabit}
                    size="small"
                >
                    {habits &&
                        habits.map((hab, key) => {
                            return (
                                <MenuItem value={hab.name} key={key}>
                                    {hab.name}
                                </MenuItem>
                            );
                        })}
                </Select>
            </div>

            <SubmitForm submit={addData} />

            <div className="chartandOptions">
                <div className="options">
                    <RadioOptions setOption={setGraphSelection} />
                </div>
                <div className="chart">{renderGraph()}</div>
            </div>
        </React.Fragment>
    );
}

export default HomePage;
