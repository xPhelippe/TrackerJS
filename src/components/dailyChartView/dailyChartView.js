import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar,Cell } from 'recharts';
import { Paper } from '@mui/material';
import './dailyChartView.css'

function DailyChartView(props) {

    const data = props.data

    return (
        <React.Fragment>
        <div className="barChart">
            <BarChart width={800} height={400} data={data} className="barChart" >
                <Bar type="monotone" dataKey="value" fill="#285238"/>
                <XAxis 
                    dataKey="time"
                    type="category"
                    className="barChart"
                    stroke="#285238"/>
                <YAxis 
                    stroke="#285238"/>
                
            </BarChart>
        </div>
        </React.Fragment>
    )

}

export default DailyChartView;