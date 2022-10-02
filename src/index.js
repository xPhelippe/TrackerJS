import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/homepage/homePage";
import About from "./components/about/about";
import Edit from "./components/edit/edit";
import Github from "./components/github/github";
import Demo from "./components/demo/demo";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="*" element={<HomePage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="about" element={<About />} />
                    <Route path="edit" element={<Edit />} />
                    <Route path="github" element={<Github />} />
                    <Route path="demo" element={<Demo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
