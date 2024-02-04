import React, { useState, useEffect, useRef } from 'react';
import {
    GridRowModes,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';
import { useObserver } from './useObserver';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog.js';
import { appManager } from "../../models/AppManager/managers.js";
import {Edit, Delete, Save, Cancel } from '@mui/icons-material';

const useEditableDataGridRows = (d) => {
    const [editableRows, setEditableRows] = useState(d.rows);
    const [rowModesModel, setRowModesModel] = useState(d.rowModesModel);
  /***************************************************************/
    const observerId = useObserver({
      "callback": (dataChanged) => {
        if(dataChanged === "temp.editableRows"){
          setEditableRows(appManager.getTemp().editableRows)
        }
        else if(dataChanged === "temp.rowModesModel"){
          setRowModesModel(appManager.getTemp().rowModesModel);
        }
      }
    });
  /***************************************************************/
    const handleEditableRowsChange = (value) => {
      let temp = appManager.getTemp();
      temp = temp === null? {"editableRows": value} : {...temp, "editableRows": value};
      appManager.setTemp(temp, "temp.editableRows");
    }
  /***************************************************************/
    const actionsColumn = {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        const id = params.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const makeDelete = () =>{
          return (<ConfirmationDialog 
          icon={<Delete/>}
          inner="Delete?"
          title={d.deleteConfirmationTitle}
          label="Delete"
          color="inherit"
          onClickHandler={(event,setOpen) => {
            handleDeleteClick(id,editableRows,setEditableRows)();
            setOpen(false);
          }}
          triggerComponent={GridActionsCellItem}>
            <span>{d.makeDeleteConfirmationMessage(params)}</span>
          </ConfirmationDialog>  
          );
        };

        const makeSave = () =>{
          return (<ConfirmationDialog 
          icon={<Save/>}
          inner="Save?"
          title={d.saveConfirmationTitle}
          label="Save"
          sx={{
            color: 'primary.main',
          }}
          onClickHandler={(event,setOpen) => {
            handleSaveClick(id, rowModesModel, handleRowModesModelChange)();
            setOpen(false);
          }}
          triggerComponent={GridActionsCellItem}>
            <span>{d.makeSaveConfirmationMessage(params)}</span>
          </ConfirmationDialog>  
          );
        };


        if (isInEditMode) {
          return [
            makeSave(),
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id, rowModesModel, editableRows, handleEditableRowsChange, handleRowModesModelChange)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, rowModesModel, handleRowModesModelChange)}
            color="inherit"
          />,
          makeDelete()
        ];
      },
  };
      /***************************************************************/
      const handleRowModesModelChange = (newRowModesModel) => {
        let temp = appManager.getTemp();
        temp = temp === null? {"rowModesModel": newRowModesModel} : {...temp, "rowModesModel": newRowModesModel};
        appManager.setTemp(temp, "temp.rowModesModel");
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
  const handleSaveClick = (id, rowModesModel, setRowModesModel, ) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    /***************************************************************/
    const handleDeleteClick = (id,rows,setRows) => () => {
       // console.log(params);
        //setRows(rows.filter((row) => row.id !== id));
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
    const editFunctions = {
      handleRowEditStop: handleRowEditStop,
      handleRowModesModelChange: handleRowModesModelChange,
    };

  return {actionsColumn, editFunctions};
}

export {useEditableDataGridRows};