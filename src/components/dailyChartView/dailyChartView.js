import React from 'react';
import { XAxis, YAxis, BarChart, Bar} from 'recharts';
import './dailyChartView.css'

function DailyChartView(props) {

    const data = props.data

    const now = new Date(Date.now())

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const day =
        days[now.getDay()]
        + ", "
        + months[now.getMonth()]
        + " "
        + now.getDate()
        + ", "
        + now.getFullYear()

    return (
        <React.Fragment>
        <h2>{day}</h2>
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