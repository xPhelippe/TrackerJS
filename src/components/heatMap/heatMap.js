import React from 'react';
import './heatMap.css';
import {useEffect,useState} from 'react';

function HeatMap(props) {

    const widthStyle = {
        width:'100%'
    }

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]


    const [data, setData] = useState(props.data)

    useEffect(() => {

        console.log("Updating data for heat map")

        let newData = []

        //find max value
        let max = 0;

        for(let i = 0; i < props.data.length; i++) {
            if (props.data[i].value > max) {
                
                max = props.data[i].value
            }
        }

        if (max === 0 ) return;

        // calculate color value

        for (let i = 0; i < props.data.length; i++ ) {
            if( props.data[i].value/max <0.25) {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 1
                })
            } else if (props.data[i].value/max < 0.5) {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 2
                })
            } else if (props.data[i].value/max <0.75) {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 3
                })
            } else {
                newData.push({
                    time: props.data[i].time,
                    value: props.data[i].value,
                    color: 4
                })
            }
        }


        setData(newData);


    },[props.data])


    return (
        <React.Fragment>
            <div style={widthStyle} className={"yearContainer " + widthStyle}>
                <div className="monthContainer">
                    {
                        months.map((obj, monthKey) => {
                            return (
                                <React.Fragment>
                                    <div className="month">
                                        {obj}
                                    </div>
                                    <div className="dayContainer">
                                    {data && data.map( (obj, key) => {
                                        if(obj.time.getMonth() !== monthKey)  return (null)

                                        return (
                                            <div key={key} className={"day color-scale-" + obj.color}>
                                            </div>
                                        )
                                    })}
                                    
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                
                </div>
            </div>

        </React.Fragment>
    )
}


export default HeatMap;