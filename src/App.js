import "./App.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/navbar";
import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import Paper from "@mui/material/Paper";

function App() {
    const localColor = useLocalStorage("Color", "#285238")[0];
    const [primColor, setPrimColor] = useState(
        getComputedStyle(document.querySelector(":root"))
            .getPropertyValue("--back-color")
            .trim()
    );

    const params = useSearchParams()[0];

    useEffect(() => {
        console.log("serach params");
        if (params.get("color")) setPrimColor(params.get("color").trim());
    }, [params]);

    useEffect(() => {
        console.log("local color activated");

        // set color to local color
        document
            .querySelector(":root")
            .style.setProperty("--back-color", localColor);

        setPrimColor(
            getComputedStyle(document.querySelector(":root")).getPropertyValue(
                "--back-color"
            )
        );
    }, [localColor]);
    // TODO Find more efficient way to change theme than query string

    let theme = createTheme({
        palette: {
            primary: {
                main: primColor,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="App-header">
                    <Header />
                    <Navbar />
                    <Paper>
                        <Outlet />
                    </Paper>
                    <Footer />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
