import {useState} from 'react';
import { XAxis, YAxis, BarChart, Bar} from 'recharts';
import './weeklyChartView.css'
import React from 'react';

function WeeklyChartView(props) {

    const primColor = useState(
        getComputedStyle(document.querySelector(':root'))
        .getPropertyValue('--back-color').trim()
    )[0]



    const data = props.data

    const title = 
        props.data[0].time
        + " to "
        + props.data[props.data.length - 1].time


    return (
        <React.Fragment>
            <h2>{title}</h2>
        <div className="barChart">
            <BarChart width={800} height={400} data={data} className="barChart" >
                <Bar type="monotone" dataKey="value" fill={primColor}/>
                <XAxis 
                    dataKey="time"
                    type="category"
                    className="barChart"
                    />
                <YAxis 
                    />
                
            </BarChart>
        </div>
        </React.Fragment>
    )

}

export default WeeklyChartView;