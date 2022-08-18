import React from "react";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./radioOptions.css";

function RadioOptions(props) {
    const handlChange = (event) => {
        props.setOption(event.target.value);
    };

    return (
        <React.Fragment>
            <div className="radios">
                <Paper className="radio">
                    <FormControl>
                        <FormLabel>Timespan</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Day"
                            name="radio-buttons-group"
                            onChange={handlChange}
                        >
                            <FormControlLabel
                                value="Day"
                                control={<Radio />}
                                label="Day"
                            />
                            <FormControlLabel
                                value="Week"
                                control={<Radio />}
                                label="Week"
                            />
                            <FormControlLabel
                                value="Month"
                                control={<Radio />}
                                label="Month"
                            />
                            <FormControlLabel
                                value="Year"
                                control={<Radio />}
                                label="Year"
                            />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </div>
        </React.Fragment>
    );
}

export default RadioOptions;
