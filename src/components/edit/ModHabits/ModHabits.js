import "./modHabits.scss";
import useLocalStorage from "use-local-storage";
import HabitCard from "../habitCard/habitCard";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";

function ModHabits(props) {
    const [habits, setHabits] = useLocalStorage("habits", []);
    const [habitsData, setHabitsData] = useLocalStorage("data", []);

    const [isAdding, setIsAdding] = useState(false);

    const [newHabit, setNewHabit] = useState("");

    // to make it so you can only delete one habit at a time
    const [isaCardOpen, setIsaCardOpen] = useState(false);

    const addNewHabit = () => {
        if (newHabit.length !== 0) {
            setHabits([...habits, newHabit]);
            setNewHabit("");
        }
        setIsAdding(false);
    };

    const removeHabit = (habit) => {
        const newHabits = habits.filter((h) => {
            return h !== habit;
        });

        if (newHabits.length === 0) {
            setHabits(["default"]);
        } else {
            setHabits(newHabits);
        }
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
                            data={habit}
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
