import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../../models/AppManager/managers.js";
import constants from '../../../utils/constants.js';
import {DataGrid, GridRowModes} from '@mui/x-data-grid';
import {useEditableDataGridRows} from '../../../utils/hooks/useEditableDataGridRows.js';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import { apiCall } from '../../../utils/apiFunctions.js';

import "./CharacterSet.scss";

/***************************************************************/
const DisplayTable = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({});
    /***************************************************************/
    const {actionsColumn, editFunctions} = useEditableDataGridRows({
        "deleteConfirmationTitle": "Delete Character Pair",
        "saveConfirmationTitle": "Save Character Pair",
        "makeSaveConfirmationMessage": (params) => {
            return `Would you like to save (${params.row.symbol}, ${params.row.value}) pair?`
        },
        "makeDeleteConfirmationMessage": (params) => {
            return `Would you like to delete (${params.row.symbol}, ${params.row.value}) pair?`;
        },
        "rowModesModel": input.rowModesModel, 
        "rows": input.pairs});
    /***************************************************************/
    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 90 },
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
        actionsColumn
      ];
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