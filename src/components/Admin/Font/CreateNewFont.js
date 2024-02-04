import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { Box, Grid, Paper, TextField  } from "@mui/material";
import Title from "../Title/Title.js";
import "./Font.scss";
import CharacterSetAdder from '../CharacterSet/CharacterSetAdder.js';

/***************************************************************/
const CreateNewFont = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        /*if (styles === null) {
            const uri = "/api/styles/all";
            apiCall(uri, {}, (args, d) => {
                if (d) {
                    setStyles(d.styles);
                }
            });
        }*/
    }, []);
    /***************************************************************/
    return (
        <Box
            sx={{
                display: 'flex',
                width: "100vw",
                flexWrap: 'wrap'
            }}
        >
            <Paper
                sx={{ width: "100%", padding: "1em" }}
                elevation={1}>
                <Title className="fonts-title">Create New Font</Title>
                <Grid container className="fonts-create-new" spacing={2}>
                    <Grid item container xs={12}  spacing={2}>
                        <Grid item xs={1}>Name</Grid>
                        <Grid item xs={11}>
                                <TextField id="outlined-basic" name="fontName" fullWidth variant="outlined" />
                        </Grid>
                    </Grid>
                    <CharacterSetAdder/>
                </Grid>
            </Paper>
        </Box>
    );
}

export default CreateNewFont;
/**************************************************************/