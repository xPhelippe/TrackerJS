import React from "react";
import SubmitForm from "../submitForm/submitForm";
import DailyChartView from "../dailyChartView/dailyChartView";
import { useState, useEffect } from "react";
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

function HomePage(props) {
    const [habits, setHabits] = useLocalStorage("habits", []);
    const [selectedhabit, setSelectedHabit] = useState(habits[0]);
    const [localData, setLocalData] = useLocalStorage("data", []);
    const [rawData, setRawData] = useState([]);

    const [dailyData, setDailyData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [yearData, setYearData] = useState([]);

    const [graphSelection, setGraphSelection] = useState("");

    useEffect(() => {
        let newData = [];

        for (let i = 0; i < localData.length; i++) {
            newData.push({
                time: new Date(localData[i].time),
                value: localData[i].value,
                habit: localData[i].habit,
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

    function addData(num) {
        setRawData([
            ...rawData,
            {
                time: new Date(Date.now()),
                value: parseInt(num),
                habit: selectedhabit,
            },
        ]);
        setLocalData([
            ...rawData,
            {
                time: new Date(Date.now()),
                value: parseInt(num),
                habit: selectedhabit,
            },
        ]);
    }

    function changeSelectedHabit(e) {
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
                <p>Habit Select:</p>
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
                                <MenuItem value={hab} key={key}>
                                    {hab}
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
