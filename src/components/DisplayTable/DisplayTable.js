import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import constants from '../../utils/constants.js';
import {DataGrid, GridRowModes} from '@mui/x-data-grid';
import {useEditableDataGridRows} from "../../utils/hooks/useEditableDataGridRows.js"
import {useObserver} from '../../utils/hooks/useObserver.js';
import { apiCall, getCharacterSetHelper } from '../../utils/apiFunctions.js';
import "./DisplayTable.scss";

/***************************************************************/
const DisplayTable = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({
        "callback": (dataChanged) => {
            /*const tempDataChanged = "temp." + input.dataName + ".editableRows";
            const temp = appManager.getTemp(tempDataChanged);
            if(dataChanged === tempDataChanged){
                input.setPairs(temp);
            }
            if (dataChanged === "temp." + input.dataName + ".editableRows") {
                input.setPairs(temp[input.dataName].editableRows);
            }
            else if (dataChanged === "temp."+ input.dataName + ".rowModesModel") {
                input.setRowModesModel(temp[input.dataName].rowModesModel);
            }*/
        }
    });
    /***************************************************************/
    const {actionsColumn, editFunctions} = useEditableDataGridRows({
        "deleteConfirmationTitle": input.deleteTitle,
        "saveConfirmationTitle": input.saveTitle,
        "makeSaveConfirmationMessage": input.saveMessage,
        "makeDeleteConfirmationMessage": input.deleteMessage,
        "rowModesModel": input.rowModesModel, 
        "dataName": input.dataName,
        "rows": input.pairs});
    /***************************************************************/
    const columns = [...input.columns];
    columns.push(actionsColumn)
    /***************************************************************/
    return (
            <React.Fragment>
                {input.pairs && <DataGrid
                        rows={input.pairs}
                        columns={columns}
                        onRowModesModelChange={(temp) => {
                            editFunctions.handleRowModesModelChange(temp);
                          }}
                          rowModesModel={input.rowModesModel}
                          onProcessRowUpdateError={(error) => {
                              console.log("The error made was");
                              console.log(error);
                          }}
                          processRowUpdate={(newRow) => {
                            const updatedRow = { ...newRow, isNew: false };
                            const temp = input.pairs.map((row) => (row.id === newRow.id ? updatedRow : row));
                            input.handleCharactersChanged(temp);
                            if (input.rowModesModel[updatedRow.id]?.mode !== GridRowModes.Edit) {
                              //updateFonts(updatedRow);   
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
            </React.Fragment>
    );
}
export default DisplayTable;
/**************************************************************/