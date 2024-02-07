import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useEditableDataGridRows } from '../../../utils/hooks/useEditableDataGridRows.js';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import {appManager} from "../../../models/AppManager/managers.js";
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { DataGrid, GridRowModes } from '@mui/x-data-grid';
import {Box, Grid, Paper} from "@mui/material";
import Title from "../Title/Title.js";
import "./Fonts.scss";

/***************************************************************/
const FontsInner = (input) => {
    const ref = useRef(null);
    const [fonts, setFonts] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    /***************************************************************/
    const {actionsColumn, editFunctions} = useEditableDataGridRows({
      "deleteConfirmationTitle": "Delete Font",
      "saveConfirmationTitle": "Save Font",
      "makeSaveConfirmationMessage": (params) => {
          return `Would you like to save font ${params.row.name}?`;
      },
      "makeDeleteConfirmationMessage": (params) => {
          return `Would you like to delete font ${params.row.name}?`;
      },
      "rowModesModel": rowModesModel, 
      "rows": fonts});
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
      if(dataChanged === "temp.editableRows"){
        setFonts(appManager.getTemp().editableRows);
      }
      else if(dataChanged === "temp.rowModesModel"){
        setRowModesModel(appManager.getTemp().rowModesModel);
      }
     }});
     /***************************************************************/
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
          width: 200,        
          editable: false,
          renderCell: (params) => {
            return <span>{params.row.styles.join(", ")}</span>;
          }
        },
        {
            field: "view",
            headerName: "View/Edit",
            width: 100,
            renderCell: (params) => {
              const tempName = params.row.name.toLowerCase().split(" ").join("_"); 
              return <a href={params.id +"/name/" + tempName}>View/Edit</a>
            },
          },
          actionsColumn
    ];

  /*****************************************************************/
  useEffect(() => {
          if (fonts === null) {
              const uri = "/api/fonts/all";
              apiCall(uri, {}, (args, d) => {
                handleFontsChanged(d.fonts);
              });
          }
      }, []);
  /***************************************************************/
  const updateFonts = (updatedRow) => {
    const uri = "/api/fonts/edit/" + updatedRow.id;
    apiCallPost(uri, {}, updatedRow, (args, d) => {
      console.log(d);
    });
  };
  /*****************************************************************/
  const handleFontsChanged = (changedFonts) => {
    let temp = appManager.getTemp(); 
    temp = temp === null? {"editableRows": changedFonts} : {...temp, "editableRows": changedFonts};
    appManager.setTemp(temp, "temp.editableRows");
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
        sx={{width: "100%", padding: "1em"}}
        elevation={1}>
            <Title className="fonts-title">Fonts</Title>
            <h3>View All</h3>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                        {fonts && <DataGrid
                            rows={fonts}
                            columns={columns}
                            onRowModesModelChange={(temp) => {
                              editFunctions.handleRowModesModelChange(temp);
                            }}
                            rowModesModel={rowModesModel}
                            onProcessRowUpdateError={(error) => {
                                console.log("The error made was");
                                console.log(error);
                            }}
                            processRowUpdate={(newRow) => {
                              const updatedRow = { ...newRow, isNew: false };
                              const temp = fonts.map((row) => (row.id === newRow.id ? updatedRow : row));
                              handleFontsChanged(temp);
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

const Fonts = FontsInner;
export default Fonts;
/**************************************************************/