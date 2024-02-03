import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useEditableDataGridRows } from '../../../utils/hooks/useEditableDataGridRows.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { DataGrid, GridRowModes } from '@mui/x-data-grid';
import { Box, Grid, Paper } from "@mui/material";
import Title from "../Title/Title.js";
import "./Fonts.scss";

/***************************************************************/
const CreateNewFonts = (input) => {
    const ref = useRef(null);
    const [fonts, setFonts] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});


    /***************************************************************/
    const { actionsColumn, editFunctions } = useEditableDataGridRows({
        "rowModesModel": rowModesModel,
        "rows": fonts,
        "setRows": setFonts,
        "setRowModesModel": setRowModesModel
    });
    const observerId = useObserver({ "callback": (dataChanged) => { } });

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
    const updateFonts = (updatedRow) => {
        const uri = "/api/fonts/edit/" + updatedRow.id;
        apiCallPost(uri, {}, updatedRow, (args, d) => {
            console.log(d);
        });
    };
    /*****************************************************************/
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
                sx={{ width: "100%", padding: "1em" }}
                elevation={1}>
                <Title className="fonts-title">Fonts</Title>
                <h3>View All</h3>
                <Grid container className="fonts-display" spacing={2}>
                    <Grid item container>
                        {fonts && <DataGrid
                            rows={fonts}
                            columns={columns}
                            onRowModesModelChange={(temp) => {
                                editFunctions.handleRowModesModelChange(temp, setRowModesModel);
                            }}
                            rowModesModel={rowModesModel}
                            onProcessRowUpdateError={(error) => {
                                console.log("The error made was");
                                console.log(error);
                            }}
                            processRowUpdate={(newRow) => {
                                const updatedRow = { ...newRow, isNew: false };
                                const temp = fonts.map((row) => (row.id === newRow.id ? updatedRow : row));
                                setFonts(temp);
                                if (rowModesModel[updatedRow.id]?.mode !== GridRowModes.Edit) {
                                    updateFonts(updatedRow);
                                }
                                return updatedRow;
                            }}
                            onRowEditStop={editFunctions.handleRowEditStop}
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

export default CreateNewFonts;
/**************************************************************/