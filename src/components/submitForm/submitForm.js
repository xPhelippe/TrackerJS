import React from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Button from "@mui/material/Button";
import "./submitForm.scss";
import { Snackbar, Alert } from "@mui/material";

function SubmitForm(props) {
    const [time, setTime] = React.useState(Date.now());

    const changeTime = (newValue) => {
        setTime(new Date(newValue));
    };

    const [newVal, setNewVal] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const click = () => {
        // some input validation

        if (isNaN(newVal)) {
            setAlertMsg("Please input a positive number");
            setAlert(true);

            return;
        }

        if (newVal <= 0) {
            setAlertMsg("Please input a positive number");
            setAlert(true);

            return;
        }

        const inTime = new Date(time);

        if (inTime > new Date(Date.now())) {
            setAlertMsg("Time cannot be in the future");
            setAlert(true);

            return;
        }

        props.submit({
            value: newVal,
            time: new Date(time),
        });
        setNewVal("");
    };

    const handleClose = () => {
        setAlert(false);
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
                    />
                    <DateTimePicker
                        label="Time"
                        value={time}
                        onChange={changeTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button
                        className="button"
                        variant="contained"
                        onClick={click}
                    >
                        Add
                    </Button>
                </div>
            </LocalizationProvider>
            <Snackbar
                open={alert}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="warning"
                    variant="filled"
                >
                    {alertMsg}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default SubmitForm;
