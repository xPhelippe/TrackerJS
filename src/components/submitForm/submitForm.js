import React from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Button from "@mui/material/Button";
import "./submitForm.scss";

function SubmitForm(props) {
    const [date, setDate] = React.useState(Date.now());

    const handleChange = (newValue) => {
        setDate(newValue);
    };
    const [newVal, setNewVal] = useState("");

    const click = () => {
        props.submit(newVal);
        setNewVal("");
    };

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="textBoxContainer">
                    <p>Input New Entry: </p>
                    <TextField
                        label="Amount"
                        value={newVal}
                        onChange={(evt) => setNewVal(evt.target.value)}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                    />
                    {/* <DateTimePicker
                        label="Time"
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}
                    <Button
                        className="button"
                        variant="contained"
                        onClick={click}
                    >
                        Add
                    </Button>
                </div>
            </LocalizationProvider>
        </React.Fragment>
    );
}

export default SubmitForm;
