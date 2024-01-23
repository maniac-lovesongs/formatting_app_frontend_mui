import React, { useState, useEffect, useRef } from 'react';
import { apiCall} from '../../utils/apiFunctions.js';
import {Grid, Box} from "@mui/material";
import FooterBar from "./FooterBar/FooterBar.js";
import {appManager, observerManager} from "../../models/AppManager/managers.js";

/***************************************************************/
const Formatter = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [fontLookup, setFontLookup] = useState(null);
    
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                if(dataChanged === "currentData"){
                    setFontLookup(appManager.getCurrentData());
                }
            });
            setObserverId(id);
        }

        if (fontLookup === null) {
            const s = appManager.getUriFriendlyStyle();
            const f = appManager.getUriFriendlyFont();
            const uri = "/api/fonts/character_sets/font/" + f + "/style/" + s;
            apiCall(uri, {}, (args, d) => {
                if (d && d.characters) {
                    appManager.setCurrentData(d);
                }
            });
        }


        // once the component unmounts, remove the listener
        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        };

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
                    <FooterBar/>
           </Grid>
        </Box>
    );
    /***************************************************************/
}

export default Formatter;
/**************************************************************/