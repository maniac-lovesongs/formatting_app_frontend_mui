import React, { useState, useEffect, useRef } from 'react';
import { observerManager } from "../../../models/AppManager/managers.js";
import utils from '../../../utils/utils.js';
import constants from '../../../utils/constants.js';
import { apiCall } from "../../../utils/apiFunctions.js";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid version 1
import Paper from '@mui/material/Paper';
import Title from "../Title/Title.js";
import "./Fonts.scss";

/***************************************************************/
const Fonts = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [fonts, setFonts] = useState(null);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
          field: 'styles',
          headerName: 'Styles',
          width: 300,
          editable: false,
          renderCell: (params) => {
            console.log(params);
            return <span>{params.row.styles.join(", ")}</span>;
          }
        },
        {
            field: "view",
            headerName: "View",
            width: 400,
            renderCell: (params) => {
                return <a href={params.id}>View</a>
            },
        }
      ];
      
    
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                //console.log("Something interesting happened to the app, and as a listener I need to update ");
            });
            setObserverId(id);
        }

        if (fonts === null) {
            const uri = "/api/fonts/all";
            apiCall(uri, {}, (args, d) => {
                setFonts(d.fonts);
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
            <Title className="fonts-title">Fonts</Title>
            <h3>View All</h3>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                        {fonts && <DataGrid
                            rows={fonts}
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
                        />}
                </Grid>
            </Grid>
        </Paper>
      </Box>
    );
}

export default Fonts;
/**************************************************************/