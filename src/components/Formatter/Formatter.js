import React, { useState, useEffect, useRef } from 'react';
import {useObserver} from "../../utils/hooks/useObserver.js";
import {Grid, Box, Paper} from "@mui/material";
import InputBox from "./InputBox/InputBox.js";
import HeaderBar from './HeaderBar/HeaderBar.js';
import FooterBar from "./FooterBar/FooterBar.js";
import {appManager} from "../../models/AppManager/managers.js";
import { prepareFont, prepareCurrentData } from './utils.js';

/***************************************************************/
const Formatter = (input) => {
    const ref = useRef(null);
    const [fontLookup, setFontLookup] = useState(null);
    /***************************************************************/
    const observerId = useObserver({
        "caller": "Formatter",
        "callback": (dataChanged) => {
        if(dataChanged === "currentData"){
            setFontLookup(appManager.getCurrentData());
        }
    }});
    /***************************************************************/
    useEffect(() => {
        if (fontLookup === null) {
            prepareCurrentData();
        }
    }, []);    
    /***************************************************************/
    return (
        <Box sx={{
            flexGrow: 1,
            position: "fixed",
            top: 0,
            width: "100%"
        }}>
            <Grid container
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
                height="100vh"
                spacing={0}>
                <HeaderBar/>
                <Grid
                    sx={{"textAlign": "left"}}
                    item
                    xs={10}>
                    <Paper
                        elevation={2}
                        sx={{
                            "height": "93%",
                            "padding": "0.5em",
                            "margin": "1em"
                        }}>
                        <InputBox
                            wrapper={"div"}
                         />
                    </Paper>
                </Grid>
                <FooterBar/>
           </Grid>
        </Box>
    );
    /***************************************************************/
}

export default Formatter;
/**************************************************************/