import React, { useState, useEffect, useRef } from 'react';
import { appManager, observerManager } from "../../../models/AppManager/managers.js";
import utils from '../../../utils/utils.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid version 1
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Title from "../Title/Title.js";
import CharacterSet from '../CharacterSet/CharacterSet.js';
import { useParams } from "react-router-dom";
import "./Font.scss";

/***************************************************************/
const Fonts = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [font, setFont] = useState([]);
    const [characterSet, setCharacterSet] = useState(null);
    const {id} = useParams();
    
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                //console.log("Something interesting happened to the app, and as a listener I need to update ");
                if(dataChanged === "style"){
                    const tempStyle = appManager.getStyle();
                    setCharacterSet(tempStyle);
                }
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
        const link = utils.make_backend("/api/fonts/by_id/" + id);
        fetch(link).then((res) =>
            res.json().then((data) => {
                setFont(data.font);
                const charSet = data.font.styles.includes("normal")? "normal" : data.font.styles[0];
                setCharacterSet(characterSet);
                appManager.setFont(data.font.name);
                appManager.setStyle(charSet);
            })
        );
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
        sx={{width: "100%", padding: "1em"}}
        elevation={1}>
            <Title className="fonts-title">{font && font.name}</Title>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                    <Grid item xs={6}>Styles</Grid>
                    <Grid item xs={6}> 
                        <Select
                            value={characterSet}
                            label="Styles"
                            onChange={(e) => {
                                appManager.setStyle(e.target.value);
                            }}
                        >
                            {font.styles && font.styles.map((s) => {
                                return <MenuItem value={s}>{s}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                </Grid>
                <Grid item container>
                    {font.name && characterSet && <CharacterSet characerSet={characterSet} fontName={font.name} />}
                </Grid>
            </Grid>
        </Paper>
      </Box>
    );
}

export default Fonts;
/**************************************************************/