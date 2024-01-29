import React, { useState, useEffect, useRef } from 'react';
import { appManager, observerManager } from "../../../models/AppManager/managers.js";
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall } from '../../../utils/apiFunctions.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid version 1
import utils from "../../../utils/utils.js";
import Paper from '@mui/material/Paper';
import Title from "../Title/Title.js";
import "./Main.scss";
  
/***************************************************************/
const Main = (input) => {
    const ref = useRef(null);
    //const [observerId, setObserverId] = useState(null);
    const observerId = useObserver({"callback": (dataChanged) => {}});
    const [counts, setCounts] = useState(null);

    /***************************************************************/
    useEffect(() => {
        if (counts === null) {
            const uri = "/api/all";
            apiCall(uri, {}, (args, d) => {
                setCounts(d);
            });
        }

    }, []);
    /***************************************************************/
    const makeCounts = (counts) => {
        return Object.keys(counts).map((countNames) => {
            return (<Grid item container>
                <Grid className="name" item xs={6}>Number of {countNames}</Grid>
                <Grid item xs={6}>{counts[countNames]}</Grid>
            </Grid>)
        });
    }
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
        className='admin-main'
        sx={{width: "100%", padding: "1em"}}
        elevation={1}>
            <Title className="main-title">Main</Title>
            <Grid className="main" container spacing={2}>
                {counts && makeCounts(counts)}
            </Grid>
        </Paper>
      </Box>
    );
    /***************************************************************/
}

export default Main;
/**************************************************************/