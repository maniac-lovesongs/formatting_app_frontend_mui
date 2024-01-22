import React, { useState, useEffect, useRef } from 'react';
import { appManager, observerManager } from "../../../models/AppManager/managers.js";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid version 1
import utils from "../../../utils/utils.js";
import Paper from '@mui/material/Paper';
import "./Main.scss";
  
/***************************************************************/
const Main = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [counts, setCounts] = useState(null);

    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                //console.log("Something interesting happened to the app, and as a listener I need to update ");
            });
            setObserverId(id);
        }

        // once the component unmounts, remove the listener
        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        };

    }, []);
    /***************************************************************/
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        const link = utils.make_backend("/api/all");
        fetch(link).then((res) =>
            res.json().then((data) => {
                setCounts(data);
            })
        );
    }, []);
    /***************************************************************/
    const makeCounts = (counts) => {
        return Object.keys(counts).map((countNames) => {
            return (<Grid item container>
                <Grid item xs={6}>Number of {countNames}</Grid>
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