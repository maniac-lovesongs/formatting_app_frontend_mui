import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useEditableDataGridRows } from '../../../utils/hooks/useEditableDataGridRows.js';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import { apiCall } from "../../../utils/apiFunctions.js";
import {DataGrid } from '@mui/x-data-grid';
import {Box, Grid, Paper} from "@mui/material";
import Title from "../Title/Title.js";
import "./Fonts.scss";

/***************************************************************/
const FontsInner = (input) => {
    const ref = useRef(null);
    const [fonts, setFonts] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    const actionsColumn = useEditableDataGridRows({"rowModesModel": rowModesModel, 
    "rows": fonts, 
    "setRows": setFonts, 
    "setRowModesModel": setRowModesModel});
    const observerId = useObserver({"callback": (dataChanged) => {}});

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
        },
        actionsColumn
      ];
/***************************************************************/    
useEffect(() => {
        // register a listener 
        if (fonts === null) {
            const uri = "/api/fonts/all";
            apiCall(uri, {}, (args, d) => {
                setFonts(d.fonts);
            });
        }
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

const Fonts = FontsInner;
export default Fonts;
/**************************************************************/