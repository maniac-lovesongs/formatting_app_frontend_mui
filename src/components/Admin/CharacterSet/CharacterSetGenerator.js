import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { Grid, TextField, Button } from "@mui/material";
import "./CharacterSet.scss";

/***************************************************************/
const CharacterSetGenerator = (input) => {
    const ref = useRef(null);
    const [value,setValue] = useState("");

    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
    }, []);
    /***************************************************************/
    const handleInput = (e) => {
        setValue(e.target.value);
    }
    /***************************************************************/
    const generateFont = () => {        
        const postData = {
            "alpha": value,
            "baseset": input.usingBase.baseset, 
            "name": input.usingBase.name};

        const uri = "/api/fonts/character_sets/generate";
        
        apiCallPost(uri, {}, postData, ({}, d) => {
            if(d && d.success){
                const chs = [];
                Object.keys(d.pairs).forEach((v,i) => {
                    d.pairs[v]["id"] = i;
                    chs.push(d.pairs[v]); 
                });                
                input.setPairs(chs);
            }
        });
    }
    /***************************************************************/
    return (
    <React.Fragment> 
            <Grid item container xs={12}>
                {input.usingBase && <div className="using-base">
                    Using {input.usingBase.name}
                </div>}
            </Grid>
            <Grid item container xs={12}>
                <TextField 
                    fullWidth
                    name="fontGenerator"
                    id="outlined-basic" 
                    variant="outlined" 
                    onChange={handleInput}
                    value={value}
                />
                <Button
                    sx={{
                        marginTop: "1em",
                        marginBottom: "1em"
                    }}
                    onClick={generateFont}
                    variant="contained">
                        Generate
                </Button>
            </Grid>
    </React.Fragment>
    );
}

export default CharacterSetGenerator;
/**************************************************************/