import React from 'react';
//import CalendarHeatmap from '@freecodecamp/react-calendar-heatmap';
import '@freecodecamp/react-calendar-heatmap/dist/styles.css';
import { CalendarHeatmap } from 'reaviz';
import { useEffect,useState } from 'react';

const data = [
    {
        "key": new Date("03-01-2021"),
        "data": 3
      }
];

function HeatMap(props) {

    const [monthData, setMonthData] = useState([
        {
            "key": new Date("03-01-2021"),
            "data": 3
          }
    ]);

    useEffect(() => {
        if (!props.data) return;

        let newMonthData = []

        for (let i = 0; i < props.data.length; i++) {
            newMonthData.push(
                {
                    "key": props.data[i].time,
                    "data": props.data[i].value
                }
            )
        }

        setMonthData(newMonthData)
        
    })


    return (
        <React.Fragment>
           <CalendarHeatmap
                height={350}
                width={350}
                view={props.view}
                data={monthData}
                margins={20}
            />
        </React.Fragment>
    )

}


export default HeatMap;