import "./modHabits.scss";
import {
    Grid,
    MenuList,
    Paper,
    MenuItem,
    ListItemText,
    Divider,
    ListItemIcon,
    Container,
    Snackbar,
    Alert,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { HabitContext } from "../../../utils/habit-context";
import { Button } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function ModHabits(props) {
    const habitCtx = useContext(HabitContext);
    const habits = habitCtx.habits;
    const setHabits = habitCtx.setHabits;
    const selectedhabit = habits[habitCtx.habitIdx];
    const setSelectedHabit = habitCtx.setHabitIdx;

    const [color, setColor] = useState(selectedhabit.color);
    const [habitName, setHabitName] = useState(selectedhabit.name);

    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setHabitName(selectedhabit.name);
    }, [selectedhabit]);

    useEffect(() => {
        setColor(selectedhabit.color);
    }, [selectedhabit]);

    function saveColor(newColor) {
        let newHabitData = structuredClone(habits);

        for (let i = 0; i < newHabitData.length; i++) {
            if (newHabitData[i].name === selectedhabit.name) {
                newHabitData[i].color = newColor;
                break;
            }
        }

        habitCtx.setHabits(newHabitData);
    }

    const addNewHabit = () => {
        setHabits([
            ...habits,
            {
                name: "New Habit",
                color: "#285238",
            },
        ]);

        setSelectedHabit(habits.length);
    };

    const changeHabit = () => {
        const newName = habitName;
        const newColor = color;

        const newHabitData = {
            name: newName,
            color: newColor,
        };

        console.log("new habit data: ");
        console.log(newHabitData);
        // set the new name in local storage
        const newHabits = [];

        for (let i = 0; i < habits.length; i++) {
            if (habits[i].name === selectedhabit.name) {
                newHabits.push(newHabitData);
            } else {
                newHabits.push(habits[i]);
            }
        }

        console.log("New habits:");
        console.log(newHabits);

        setHabits(newHabits);

        setAlertMsg("Habit Modified Successfully!");
        setAlert(true);
    };

    const removeHabit = () => {
        // add the new habit to the array in local storage
        const newHabits = habits.filter((h) => {
            return h.name !== selectedhabit.name;
        });

        // if the habit being removed is the current habit selected,
        // change the current habit selected to the first
        if (selectedhabit.name === habits[habitCtx.habitIdx].name) {
            habitCtx.setHabitIdx(0);
        }

        if (newHabits.length === 0) {
            setHabits([
                {
                    name: "Default",
                    color: "#285239",
                },
            ]);
        } else {
            setHabits(newHabits);
        }

        // remove the data for the habit from habitsData
        const habitsData = habitCtx.habitData;
        const newHabitsData = habitsData.filter((h) => {
            return h.habit != selectedhabit.name;
        });

        habitCtx.setHabitData(newHabitsData);
        setIsDeleting(false);

        setAlertMsg("Habit Deleted Successfully!");
        setAlert(true);
    };

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const handleClose = () => {
        setAlert(false);
        setTimeout(() => {
            setAlertMsg("");
        }, 500);
    };

    return (
        <>
            <h2>Habit Customization</h2>
            <Container>
                <Grid
                    // component={Container}
                    spacing={2}
                    container
                    className="ModifyHabits"
                >
                    <Grid item xs={12} sm={3}>
                        <h3>Habit Select</h3>
                        <MenuList>
                            {habits &&
                                habits.map((hab, key) => (
                                    <MenuItem
                                        key={key}
                                        onClick={() => setSelectedHabit(key)}
                                    >
                                        <ListItemText>{hab.name}</ListItemText>
                                    </MenuItem>
                                ))}

                            <Divider />
                            <MenuItem onClick={() => addNewHabit()}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText>New Habit</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <h3>Name</h3>
                        <TextField
                            value={habitName}
                            fullWidth
                            onChange={(e) => setHabitName(e.target.value)}
                            variant="outlined"
                        ></TextField>
                        <h3>Color Customization</h3>
                        <div className="colorPicker">
                            <HexColorPicker color={color} onChange={setColor} />
                        </div>
                        <div className="saveButtons">
                            {isDeleting ? (
                                <>
                                    <p>Are you Sure?</p>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<CheckIcon />}
                                        onClick={() => removeHabit()}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<CloseIcon />}
                                        onClick={() => setIsDeleting(false)}
                                    >
                                        No
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        startIcon={<CheckIcon />}
                                        onClick={() => changeHabit()}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<DeleteIcon />}
                                        color="error"
                                        onClick={() => setIsDeleting(true)}
                                    >
                                        Delete Habit
                                    </Button>
                                </>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={alert}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                >
                    {alertMsg}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ModHabits;
