import "./App.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/navbar";
import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import useLocalStorage from "use-local-storage";
import Paper from "@mui/material/Paper";
import { HabitContext } from "./utils/habit-context";

function App() {
    // const localColor = useLocalStorage("colors", "#285238")[0];
    // const [primColor, setPrimColor] = useState(
    //     getComputedStyle(document.querySelector(":root"))
    //         .getPropertyValue("--back-color")
    //         .trim()
    // );

    //    / const params = useSearchParams()[0];

    const [habits, setHabits] = useLocalStorage("habits", [
        { name: "Default", color: "#285238" },
    ]);
    const [habitIdx, setHabitIdx] = useLocalStorage("selectedHabitIdx", "0");
    const [habitData, setHabitData] = useLocalStorage("data", []);

    const habitContext = useMemo(
        () => ({
            habits,
            setHabits,
            habitIdx,
            setHabitIdx,
            habitData,
            setHabitData,
        }),
        [habitIdx, habitData, habits]
    );

    // update colors when the habits change
    useEffect(() => {
        // set the root query selector
        document
            .querySelector(":root")
            .style.setProperty("--back-color", habits[habitIdx].color);
    }, [habitIdx, habits]);

    useEffect(() => {
        console.log(habitContext);
    }, [habitContext]);

    let theme = createTheme({
        palette: {
            primary: {
                main: habits[habitIdx].color,
            },
        },
    });

    return (
        <HabitContext.Provider value={habitContext}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <div className="App-header">
                        <Header />
                        <Navbar />
                        <Paper sx={{ width: "100%" }}>
                            <Outlet />
                        </Paper>
                        <Footer />
                    </div>
                </div>
            </ThemeProvider>
        </HabitContext.Provider>
    );
}

export default App;
