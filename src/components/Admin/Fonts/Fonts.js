import React, { useState, useEffect, useRef } from 'react';
import { observerManager } from "../../../models/AppManager/managers.js";
import utils from '../../../utils/utils.js';
import constants from '../../../utils/constants.js';
import { apiCall } from "../../../utils/apiFunctions.js";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';
import {Edit, Delete, Save, Cancel } from '@mui/icons-material';
import {Box, Grid, Paper} from "@mui/material";
import Title from "../Title/Title.js";
import "./Fonts.scss";

/***************************************************************/
const Fonts = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [fonts, setFonts] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});

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
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<Save />}
                    label="Save"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<Cancel />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }
      
              return [
                <GridActionsCellItem
                  icon={<Edit />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<Delete />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
          },
      ];
      
    
  /***************************************************************/
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
/***************************************************************/
const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
/***************************************************************/
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
/***************************************************************/
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
/***************************************************************/
  const handleDeleteClick = (id) => () => {
    const rows = [...fonts];
    setFonts(rows.filter((row) => row.id !== id));
  };
/***************************************************************/
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const rows = [...fonts];
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setFonts(rows.filter((row) => row.id !== id));
    }
  };
/***************************************************************/
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const rows = [...fonts];
    setFonts(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
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