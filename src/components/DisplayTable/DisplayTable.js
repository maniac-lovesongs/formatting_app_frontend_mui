import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import constants from '../../utils/constants.js';
import {DataGrid, GridRowModes} from '@mui/x-data-grid';
import {useEditableDataGridRows} from "../../utils/hooks/useEditableDataGridRows.js"
import {useObserver} from '../../utils/hooks/useObserver.js';
import { apiCall, getCharacterSetHelper } from '../../utils/apiFunctions.js';
import { makePathName } from './utils.js';
import "./DisplayTable.scss";

/***************************************************************/
const DisplayTable = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({
        "callback": (dataChanged) => {
            const tempDataChangedEditableRows = makePathName([...input.dataName.split("."), "editableRows"]);
            const tempDataChangedRowModesModel = makePathName([...input.dataName.split("."), "rowModesModel"]);
            
            // These callbacks only work if another component isn't maganaging this display table
            if(dataChanged === tempDataChangedEditableRows && !input.managed){
                const temp = appManager.getTemp(tempDataChangedEditableRows);
                input.setPairs(temp);
            }
            else if (dataChanged === tempDataChangedRowModesModel && !input.managed) {
                const temp = appManager.getTemp(tempDataChangedRowModesModel);
                input.setRowModesModel(temp);
            }
        }
    });
    /***************************************************************/
    const {actionsColumn, editFunctions} = useEditableDataGridRows({
        "deleteConfirmationTitle": input.deleteTitle,
        "saveConfirmationTitle": input.saveTitle,
        "makeSaveConfirmationMessage": input.saveMessage,
        "makeDeleteConfirmationMessage": input.deleteMessage,
        "makeSuccessMessageSave": input.successMessageSave,
        "makeSuccessMessageDelete": input.successMessageDelete,
        "setRowModesModel": input.setRowModesModel,
        "rowModesModel": input.rowModesModel, 
        "dataName": input.dataName,
        "rows": input.pairs});
    /***************************************************************/
    const columns = [...input.columns, actionsColumn];
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
                              //if(input.updater) input.updater(updatedRow);   
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