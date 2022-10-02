import "./dataCard.scss";
import Chip from "@mui/material/Chip";
import { useContext, useEffect, useState } from "react";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { id } from "date-fns/locale";
import { HabitContext } from "../../../../utils/habit-context";

var cn = require("classnames");

function DataCard(props) {
    const habitCtx = useContext(HabitContext);
    const habits = habitCtx.habits;
    const [time, setTime] = useState(props.data.time);
    const [value, setValue] = useState(props.data.value);
    const [selectedHabit, setSelectedHabit] = useState(props.data.habit);

    const [curValues, setCurValues] = useState(props.data);
    const [newValues, setNewValues] = useState(props.data);

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const colSizes = props.colSizes;

    const isGrey = props.row % 2 === 1;

    const changeNewTime = (newTime) => {
        setNewValues((prevState) => ({
            ...prevState,
            time: new Date(newTime),
        }));
    };

    const changeNewValues = (e) => {
        setNewValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const formatTime = (inTime) => {
        const time = new Date(inTime);
        const day = time.getDate().toString();
        const month = (time.getMonth() + 1).toString();
        const year = time.getFullYear().toString();
        const hours = time.getHours().toString();
        const minutes = time.getMinutes().toString();
        const seconds = time.getSeconds().toString();

        const timeStr =
            month +
            "-" +
            day +
            "-" +
            year +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;

        return timeStr;
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setNewValues(curValues);
    };

    const editRow = () => {
        props.changeRow(
            props.data.id,
            newValues.time,
            newValues.value,
            newValues.habit
        );

        setCurValues(newValues);
        setIsEditing(false);
    };

    const deleteRow = () => {
        props.deleteRow(props.data.id);
        setIsDeleting(false);
        setIsEditing(false);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {isEditing ? (
                    <>
                        <Grid
                            item
                            xs={colSizes["xs"][0]}
                            sm={colSizes["sm"][0]}
                            className={cn({ grey: isGrey })}
                        >
                            <IconButton onClick={() => editRow()}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton onClick={() => cancelEdit()}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            xs={colSizes["xs"][1]}
                            sm={colSizes["sm"][1]}
                            className={cn({ grey: isGrey })}
                        >
                            <DateTimePicker
                                label=""
                                value={newValues.time}
                                onChange={changeNewTime}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        mane="time"
                                        fullWidth
                                        size="small"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={colSizes["xs"][2]}
                            sm={colSizes["sm"][2]}
                            className={cn({ grey: isGrey })}
                        >
                            <TextField
                                name="value"
                                label=""
                                value={newValues.value}
                                onChange={changeNewValues}
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{ height: "100%" }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={colSizes["xs"][3]}
                            sm={colSizes["sm"][3]}
                            className={cn({ grey: isGrey })}
                        >
                            <Select
                                // sx={{ marginTop: "10px" }}
                                // value={newValues.habit}
                                value={newValues.habit}
                                fullWidth
                                label=""
                                onChange={changeNewValues}
                                size="small"
                                name="habit"
                            >
                                {habits &&
                                    habits.map((hab, key) => {
                                        return (
                                            <MenuItem
                                                value={hab.name}
                                                key={key}
                                            >
                                                {hab.name}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid
                            item
                            xs={colSizes["xs"][0]}
                            sm={colSizes["sm"][0]}
                            className={cn({ grey: isGrey })}
                        >
                            {isDeleting ? (
                                <>
                                    <IconButton onClick={() => deleteRow()}>
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setIsDeleting(false)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setIsDeleting(true)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={colSizes["xs"][1]}
                            sm={colSizes["sm"][1]}
                            className={cn({ grey: isGrey }, "topPadding")}
                        >
                            {formatTime(curValues.time)}
                        </Grid>
                        <Grid
                            item
                            xs={colSizes["xs"][2]}
                            sm={colSizes["sm"][2]}
                            className={cn({ grey: isGrey }, "topPadding")}
                        >
                            {curValues.value}
                        </Grid>
                        <Grid
                            item
                            xs={colSizes["xs"][3]}
                            sm={colSizes["sm"][3]}
                            className={cn({ grey: isGrey }, "topPadding")}
                        >
                            <Chip label={curValues.habit}></Chip>
                        </Grid>
                    </>
                )}
            </LocalizationProvider>
        </>
    );
}

export default DataCard;
