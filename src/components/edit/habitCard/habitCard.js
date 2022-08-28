import "./habitCard.scss";
import useLocalStorage from "use-local-storage";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function HabitCard(props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const dlt = props.delete;
    const data = props.data;
    const isaCardOpen = props.isaCardOpen;
    const setIsaCardOpen = props.setIsaCardOpen;

    // props.delete(props.data)

    const removeHabit = () => {
        dlt(data);
        endDel();
    };

    const startDel = () => {
        if (!isaCardOpen) {
            setIsDeleting(true);
            setIsaCardOpen(true);
        }
    };

    const endDel = () => {
        setIsDeleting(false);
        setIsaCardOpen(false);
    };

    // TODO, add "A habit you've been building since..." to the card

    return (
        <>
            <Stack direction="row" spacing={1}>
                <p> {data}</p>
                {isDeleting ? (
                    <Stack direction="row" spacing={2}>
                        <p> are you sure?</p>
                        <ButtonGroup variant="contained">
                            <Button onClick={() => removeHabit()}>Yes</Button>
                            <Button onClick={() => endDel()}>No</Button>
                        </ButtonGroup>
                    </Stack>
                ) : (
                    <div>
                        <IconButton onClick={() => startDel()}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => startDel()}>
                            <EditIcon />
                        </IconButton>
                    </div>
                )}
            </Stack>
        </>
    );
}
export default HabitCard;
