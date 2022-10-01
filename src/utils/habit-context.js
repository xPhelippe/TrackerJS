import React from "react";

const habit = {
    habits: [],
    habitidx: "",
    habitData: [],
    setHabitData: () => {},
    setHabitIdx: () => {},
    setHabits: () => {},
};

export const HabitContext = React.createContext(habit);
