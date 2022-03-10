import './App.css';
import SubmitForm from './components/submitForm/submitForm';
import DailyChartView from './components/dailyChartView/dailyChartView';
import Header from './components/header/header';
import { useState, useEffect } from 'react';
import RadioOptions from './components/radioOptions/radioOptions';
import Footer from './components/footer/footer';
import { Paper } from '@mui/material';
import HeatMap from './components/heatMap/heatMap';
import DataTransformer from './utils/dataTransformer';
import FreeCodeHeatMap from './components/freeCodeHeatmap/freeCodeHeatMap';


function App() {

  const [rawData, setRawData] = useState([]);

  const [dailyData, setDailyData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);

  const [graphSelection, setGraphSelection] = useState('');

  // helper function for random number generation
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Create some random data for now
  useEffect(() => {
    var n = 1500; //number of data instances to create

    var randomData = []

    for(var i = 0; i < n; i++) {
      // get a random value
      var value = getRandomArbitrary(0,20);

      // random date and time for the past several months
      var day = getRandomArbitrary(1,28);
      var month = getRandomArbitrary(0,11);
      var year = 2022;
      var hour = getRandomArbitrary(0,23);
      var minute = getRandomArbitrary(0,60);
      var second = 0;

      var time = new Date(year, month, day, hour, minute, second);

      randomData.push({time:time, value:value})
    }

    setRawData(randomData);

    let rawDaily = DataTransformer.createDayData(randomData)
    console.log("raw Daily")
    console.log(rawDaily)

  },[])


  // create the array for data throughout the day
  useEffect (() => {
    
    setDailyData(DataTransformer.createDayData(rawData));
    setWeekData(DataTransformer.createWeekData(rawData));
    setMonthData(DataTransformer.createMonthData(rawData));
    setYearData(DataTransformer.createYeardata(rawData));


  },[rawData])

  useEffect(() => {
    
    console.log(dailyData)
    
  },[dailyData])

  useEffect(() => {
    
    console.log(yearData)
    
  },[yearData])

  useEffect(() => {
    
    console.log(monthData)
    
  },[monthData])

  useEffect(() => {
    
    console.log(yearData)
    
  },[yearData])

  function addData(num) {

    setRawData([...rawData, {time: new Date(Date.now()), value: parseInt(num)}])

    console.log("data added")
    console.log(rawData)
  }

  function renderGraph() {
    switch(graphSelection){
      case 'Day':
        return <DailyChartView
                data={dailyData}
                />
      case 'Week':
        return <p>{JSON.stringify(weekData)}</p>
      case 'Month':
        return <HeatMap data={monthData} view="month" />
      case 'Year':
        return <FreeCodeHeatMap data={yearData} view="year" />
      default:
        return <DailyChartView
                data={dailyData}
                />
    }

  }
  
  return (
    <div className="App">
      <header className="App-header">

        <Header />
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
        <Footer />
      </header>
    </div>
  );
}

export default App;
