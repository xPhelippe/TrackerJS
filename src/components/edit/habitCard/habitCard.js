import "./habitCard.scss";
import useLocalStorage from "use-local-storage";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import { HabitContext } from "../../../utils/habit-context";

function HabitCard(props) {
    // bring in context
    const habitCtx = useContext(HabitContext);
    const habits = habitCtx.habits;
    const setHabits = habitCtx.setHabits;
    const timeSeriesData = habitCtx.habitData;
    const setTimeSeriesData = habitCtx.setHabitData;

    const [modStatus, setModStatus] = useState("view");

    const dlt = props.delete;
    const [data, setData] = useState(props.data);
    const [newHabit, setNewHabit] = useState(props.data);
    const isaCardOpen = props.isaCardOpen;
    const setIsaCardOpen = props.setIsaCardOpen;

    // props.delete(props.data)

    const removeHabit = () => {
        dlt(data);
        endHabitChange();
    };

    const startHabitChange = (change) => {
        if (!isaCardOpen) {
            setModStatus(change);
            setIsaCardOpen(true);
        }
    };

    const endHabitChange = () => {
        setModStatus("view");
        setIsaCardOpen(false);
    };

    const cancelChangeHabitName = () => {
        setNewHabit(data);
        endHabitChange();
    };

    const changeHabitName = () => {
        const newHabitName = newHabit;

        // set the new name in local storage
        const newHabits = [];

        for (let i = 0; i < habits.length; i++) {
            if (habits[i].name === data) {
                newHabits.push({
                    name: newHabitName,
                    color: habits[i].color,
                });
            } else {
                newHabits.push(habits[i]);
            }
        }
        // console.log(newHabits);

        setHabits(newHabits);
        setData(newHabitName);

        // go through all the data and rename the habits

        const newData = [];

        for (let i = 0; i < timeSeriesData.length; i++) {
            if (timeSeriesData[i].habit === data) {
                newData.push({
                    ...timeSeriesData[i],
                    habit: newHabitName,
                });
            } else {
                newData.push(timeSeriesData[i]);
            }
        }

        // console.log(newData);

        setTimeSeriesData(newData);

        endHabitChange();
    };

    const getComponent = () => {
        switch (modStatus) {
            case "view":
                return (
                    <>
                        <p> {data}</p>
                        <Stack direction="row" spacing={2}>
                            <IconButton
                                onClick={() => startHabitChange("delete")}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => setModStatus("edit")}>
                                <EditIcon />
                            </IconButton>
                        </Stack>
                    </>
                );
            case "delete":
                return (
                    <>
                        <p> {data}</p>
                        <Stack direction="row" spacing={2}>
                            <IconButton onClick={() => removeHabit()}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton onClick={() => endHabitChange()}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </>
                );
            case "edit":
                return (
                    <>
                        <TextField
                            name="value"
                            label=""
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            sx={{ height: "100%" }}
                        />
                        <IconButton onClick={changeHabitName}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={cancelChangeHabitName}>
                            <CloseIcon />
                        </IconButton>
                    </>
                );
        }
    };

    return (
        <>
            <Stack direction="row" spacing={1}>
                {getComponent()}
            </Stack>
        </>
    );
}
export default HabitCard;
