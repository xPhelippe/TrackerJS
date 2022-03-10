import React from 'react';
import { XAxis, YAxis, BarChart, Bar} from 'recharts';
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