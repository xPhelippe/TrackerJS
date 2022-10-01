import "./modHabits.scss";
import useLocalStorage from "use-local-storage";
import HabitCard from "../habitCard/habitCard";
import { Button, TextField } from "@mui/material";
import { useState, useContext } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { HabitContext } from "../../../utils/habit-context";

function ModHabits(props) {
    const habitCtx = useContext(HabitContext);
    const habits = habitCtx.habits;
    const setHabits = habitCtx.setHabits;

    const habitsData = habitCtx.habitData;
    const setHabitsData = habitCtx.setHabitData;

    const [isAdding, setIsAdding] = useState(false);
    const [newHabit, setNewHabit] = useState("");

    // to make it so you can only delete one habit at a time
    const [isaCardOpen, setIsaCardOpen] = useState(false);

    const addNewHabit = () => {
        if (newHabit.length !== 0) {
            setHabits([
                ...habits,
                {
                    name: newHabit,
                    color: "#285238",
                },
            ]);
            setNewHabit("");
        }
        setIsAdding(false);
    };

    const removeHabit = (habit) => {
        // add the new habit to the array in local storage
        const newHabits = habits.filter((h) => {
            return h.name !== habit;
        });

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
        const newHabitsData = habitsData.filter((h) => {
            return h.habit != habit;
        });

        setHabitsData(newHabitsData);
    };

    const cancelHabit = () => {
        setIsAdding(false);
        setNewHabit("");
    };

    return (
        <>
            {habits &&
                habits.map((habit, key) => {
                    return (
                        <HabitCard
                            data={habit.name}
                            key={key}
                            delete={removeHabit}
                            isaCardOpen={isaCardOpen}
                            setIsaCardOpen={setIsaCardOpen}
                        />
                    );
                })}

            {isAdding ? (
                <>
                    <TextField
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                    ></TextField>

                    <ButtonGroup variant="contained">
                        <Button onClick={() => addNewHabit()}>Submit</Button>
                        <Button onClick={() => cancelHabit()}>Cancel</Button>
                    </ButtonGroup>
                </>
            ) : (
                <Button
                    variant="contained"
                    onClick={() => setIsAdding(!isAdding)}
                >
                    New Habit
                </Button>
            )}
        </>
    );
}

export default ModHabits;
