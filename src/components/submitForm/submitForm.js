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
                <p>Input New Entry: </p>
                <TextField 
                    value = {newVal}
                    onChange={evt => setNewVal(evt.target.value)}
                    id="outlined-basic" variant="outlined"
                    size="small"
                    placeholder="Please Enter a Number"/>
                <Button 
                    className="button"
                    
                    variant="contained"
                    onClick={click}>Add</Button>
            </div>
        </React.Fragment>
    );

}


export default SubmitForm;