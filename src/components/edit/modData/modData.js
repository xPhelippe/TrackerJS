import "./modData.scss";
import useLocalStorage from "use-local-storage";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import DataCard from "./DataCard/DataCard";
import { useContext } from "react";
import { HabitContext } from "../../../utils/habit-context";

function ModData(props) {
    const habitCtx = useContext(HabitContext);
    const data = habitCtx.habitData;
    const setData = habitCtx.setHabitData;

    const changeRow = (id, time, value, habit) => {
        const idtochange = data.findIndex((el) => el.id === id);

        const newState = {
            id: id,
            time: new Date(time),
            value: parseFloat(value),
            habit: habit,
        };

        // idk why but this works and nothing else does
        setData((prevState) => [
            ...prevState.slice(0, idtochange),
            newState,
            ...prevState.slice(idtochange + 1),
        ]);
    };

    const deleteRow = (id) => {
        setData((prevValue) => prevValue.filter((el) => el.id != id));
    };

    const colSizes = {
        xs: [3, 3, 2, 4],
        sm: [2, 5, 2, 3],
    };

    return (
        <>
            <div className="modifyData">
                <h2>Modify Data</h2>
                <Container>
                    <div className="header">
                        <Grid container maxWidth={500} className="grid">
                            <Grid
                                item
                                xs={colSizes["xs"][0]}
                                sm={colSizes["sm"][0]}
                            ></Grid>
                            <Grid
                                item
                                xs={colSizes["xs"][1]}
                                sm={colSizes["sm"][1]}
                            >
                                Time
                            </Grid>
                            <Grid
                                item
                                xs={colSizes["xs"][2]}
                                sm={colSizes["sm"][2]}
                            >
                                Value
                            </Grid>
                            <Grid
                                item
                                xs={colSizes["xs"][3]}
                                sm={colSizes["sm"][3]}
                            >
                                Habit
                            </Grid>
                        </Grid>
                    </div>
                    <div className="row">
                        <Grid container maxWidth={500}>
                            {data &&
                                data.map((obj, key) => {
                                    return (
                                        <DataCard
                                            data={obj}
                                            colSizes={colSizes}
                                            key={key}
                                            row={key}
                                            changeRow={changeRow}
                                            deleteRow={deleteRow}
                                        />
                                    );
                                })}
                        </Grid>
                    </div>
                </Container>
            </div>
            <br />
        </>
    );
}

export default ModData;
