import React, { useState, useEffect, useRef } from 'react';
import { observerManager } from "../../../models/AppManager/managers.js";
import utils from '../../../utils/utils.js';
import constants from '../../../utils/constants.js';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid version 1
import Paper from '@mui/material/Paper';
import Title from "../Title/Title.js";
import { processFontName,processStyleName } from './utils.js';
import { useParams } from "react-router-dom";
import "./CharacterSet.scss";

/***************************************************************/
const SingleFont = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [characters, setCharacters] = useState([]);
    const {fontName, style} = useParams();

  /***************************************************************/
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'value',
          headerName: 'Value',
          width: 150,
          editable: false,
        },
        {
          field: 'symbol',
          headerName: 'Symbol',
          width: 150,
          editable: true
        },
      ];
   /***************************************************************/
   const getCharacterSet = async (s,f) => {
        const link = "/api/fonts/character_sets/font/" + f + "/style/" + s; 
        fetch(utils.make_backend(link)).then((res) =>
            res.json().then((data) => {
                const chs = [];
                Object.keys(data.characters).forEach((v,i) => {
                    chs.push(data.characters[v]);
                });
                console.log(chs);
                setCharacters(chs);
            })
        );       
    }
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
      getCharacterSet(style,fontName);
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
            <Title className="fonts-title">{processFontName(fontName)}</Title>
            <h3>{processStyleName(style)}</h3>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                <DataGrid
                        rows={characters}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: constants.NUM_PER_PAGE,
                                },
                            },
                        }}
                        pageSizeOptions={[constants.NUM_PER_PAGE]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Grid>
            </Grid>
        </Paper>
      </Box>
    );
}

export default SingleFont;
/**************************************************************/