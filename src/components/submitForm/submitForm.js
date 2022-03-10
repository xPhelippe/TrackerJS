import React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import './submitForm.css'

function SubmitForm(props) {


    const [newVal, setNewVal] = useState('');

    const click = () => {

        props.submit(newVal)
        setNewVal('');
    }


    return (
        <React.Fragment>
            <div className="textBoxContainer">
                <p>Input new entry: </p>
                <TextField 
                    value = {newVal}
                    onChange={evt => setNewVal(evt.target.value)}
                    id="outlined-basic" variant="outlined" 
                    size="small"/>
                <Button 
                    className="button"
                    style={{
                        backgroundColor: "#285238"
                    }}
                    variant="contained"
                    onClick={click}>Submit</Button>
            </div>
        </React.Fragment>
    );

}


export default SubmitForm;