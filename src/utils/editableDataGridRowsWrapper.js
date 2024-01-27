import React, { useState, useEffect, useRef } from 'react';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';
import {Edit, Delete, Save, Cancel } from '@mui/icons-material';
const editableDataGridRowsWrapper = (WrappedComponent) => {

    /***************************************************************/
    const EditableDisplayGrid = (input) => {
        const makeActionsColumn = (d) => {
          console.log(d);
            const actionsColumn = {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 100,
                cellClassName: 'actions',
                getActions: ({id}) => {
                  console.log("In getActions, and the id is: ");
                  console.log(id);
                  const isInEditMode = d.rowModesModel[id]?.mode === GridRowModes.Edit;
          
                  if (isInEditMode) {
                    return [
                      <GridActionsCellItem
                        icon={<Save />}
                        label="Save"
                        sx={{
                          color: 'primary.main',
                        }}
                        onClick={d.handleSaveClick(id, d.rowModesModel, d.setRowModesModel)}
                      />,
                      <GridActionsCellItem
                        icon={<Cancel />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={d.handleCancelClick(id, d.rowModesModel, d.rows, d.setRows, d.setRowModesMode)}
                        color="inherit"
                      />,
                    ];
                  }
          
                  return [
                    <GridActionsCellItem
                      icon={<Edit />}
                      label="Edit"
                      className="textPrimary"
                      onClick={d.handleEditClick(id, d.rowModesModel, d.setRowModesModel)}
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      icon={<Delete />}
                      label="Delete"
                      onClick={d.handleDeleteClick(id, d.rows, d.setRows)}
                      color="inherit"
                    />,
                  ];
                },
            };

            return actionsColumn; 
        };
        /***************************************************************/
        const handleRowModesModelChange = (newRowModesModel, setRowModesModel) => {
            setRowModesModel(newRowModesModel);
        };
        /***************************************************************/
        const handleRowEditStop = (params, event) => {
            if (params.reason === GridRowEditStopReasons.rowFocusOut) {
                event.defaultMuiPrevented = true;
            }
        };
        /***************************************************************/
        const handleEditClick = (id, rowModesModel, setRowModesModel) => () => {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        };
        /***************************************************************/
        const handleSaveClick = (id, rowModesModel, setRowModesModel) => () => {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        };
        /***************************************************************/
        const handleDeleteClick = (id, rows, setRows) => () => {
            setRows(rows.filter((row) => row.id !== id));
        };
        /***************************************************************/
        const handleCancelClick = (id, rowModesModel,rows, setRows, setRowModesModel) => () => {
            setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
            });
            const editedRow = rows.find((row) => row.id === id);
            if (editedRow.isNew) {
                setRows(rows.filter((row) => row.id !== id));
            }
        };
        /***************************************************************/
        const processRowUpdate = (newRow, rows, setRows) => {
            const updatedRow = { ...newRow, isNew: false };
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
        };
        /***************************************************************/    
        const inputFunctions = {
            "handleRowModesModelChange": handleRowModesModelChange,
            "handleRowEditStop": handleRowEditStop,
            "handleEditClick": handleEditClick,
            "handleSaveClick": handleSaveClick,
            "handleDeleteClick": handleDeleteClick,
            "handleCancelClick": handleCancelClick,
            "processRowUpdate": processRowUpdate, 
        };
        /***************************************************************/
        return (
            <WrappedComponent {...input} inputFunctions={inputFunctions} makeActionsColumn={makeActionsColumn} />
        );
    }

    return EditableDisplayGrid;
}

export default editableDataGridRowsWrapper;