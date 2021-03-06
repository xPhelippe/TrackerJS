import React from 'react';
import SubmitForm from '../submitForm/submitForm';
import DailyChartView from '../dailyChartView/dailyChartView';
import { useState, useEffect } from 'react';
import RadioOptions from '../radioOptions/radioOptions';
import { Paper } from '@mui/material';
import DataTransformer from '../../utils/dataTransformer';
import HeatMap from '../heatMap/heatMap';
import WeeklyChartView from '../weeklyChartView/weeklyChartView';
import MonthHeatMap from '../monthHeatMap/monthHeatMap';
import './homePage.css'
import useLocalStorage from 'use-local-storage';

function HomePage(props) {
    const [localData, setLocalData] = useLocalStorage('data',[])
    const [rawData, setRawData] = useState('');

    const [dailyData, setDailyData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [yearData, setYearData] = useState([]);

    const [graphSelection, setGraphSelection] = useState('');

    useEffect(() => {

        let newData = []

        for(let i = 0; i < localData.length; i++) {
            newData.push({
                time: new Date(localData[i].time),
                value: localData[i].value
            })
        }

        setRawData(newData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    // create the array for data throughout the day
    useEffect (() => {
        setDailyData(DataTransformer.createDayData(rawData));
        setWeekData(DataTransformer.createWeekData(rawData));
        setMonthData(DataTransformer.createMonthData(rawData));
        setYearData(DataTransformer.createYeardata(rawData));
    },[rawData])


    function addData(num) {
        setRawData([...rawData, {time: new Date(Date.now()), value: parseInt(num)}])
        setLocalData([...rawData, {time: new Date(Date.now()), value: parseInt(num)}])
    }

    function renderGraph() {
        switch(graphSelection){
        case 'Day':
            return <DailyChartView
                    data={dailyData}
                    />
        case 'Week':
            return <WeeklyChartView data={weekData} />
        case 'Month':
            return <MonthHeatMap data={monthData} />
        case 'Year':
            return <HeatMap data={yearData} />
        default:
            return <DailyChartView
                    data={dailyData}
                    />
        }

    }

    return (
        <React.Fragment>
            <Paper>
                <SubmitForm submit={addData} />
            
                <div className="chartandOptions">
                    <div className="options">
                    <RadioOptions 
                        setOption={setGraphSelection}/>

                    </div>
                    <div className="chart">
                    {renderGraph()}
                    </div>
                    
                </div>
          </Paper>
        </React.Fragment>
    )

}


export default HomePage;