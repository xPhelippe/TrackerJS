import React from 'react';
import CalendarHeatmap from '@freecodecamp/react-calendar-heatmap';
import '@freecodecamp/react-calendar-heatmap/dist/styles.css';
//import { CalendarHeatmap } from 'reaviz';
import { useEffect,useState } from 'react';


function FreeCodeHeatMap(props) {

    const [monthData, setMonthData] = useState([]);

    useEffect(() => {
        if (!props.data) return;

        let newMonthData = []

        for (let i = 0; i < props.data.length; i++) {
            newMonthData.push(
                {
                    date: props.data[i].time,
                    count: props.data[i].value
                }
            )
        }

        setMonthData(newMonthData)
        
    },[props.data])


    return (
        <React.Fragment>
           <CalendarHeatmap
                startDate="01-01-22"
                endDate="12-31-22"
                view={props.view}
                values={monthData}
            />
        </React.Fragment>
    )

}


export default FreeCodeHeatMap;