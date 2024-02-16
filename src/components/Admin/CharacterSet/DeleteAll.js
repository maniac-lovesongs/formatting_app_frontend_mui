import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import {appManager} from "../../../models/AppManager/managers.js";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog.js';
import { apiCall } from '../../../utils/apiFunctions.js';
import ButtonWithIcon from './ButtonWithIcon.js';
import {processFontName} from "./utils.js";

/***************************************************************/
const DeleteAll = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {}});
    /***************************************************************/
    const makeSuccessMessage = (s, f) => {
        return (
            <span>You have successfully deleted all of the <i>{s}</i> characters of the font <i>{f}</i></span>
        );
    }
    /***************************************************************/
    const handleDelete = (e,setOpen,handleSuccess) => {
        setOpen(false);
        const s = input.style.toLowerCase().split(" ").join("_");
        const uri = "/api/fonts/character_sets/delete/font/" + input.fontName + "/style/" + s;
        apiCall(uri, {}, (args, d) => {
             if(d && d.success){
                 input.handleAvailableStylesChange(d.availableStyles);
                 handleSuccess(true)();
             }
        });
    }
    /***************************************************************/
    return (
    <ConfirmationDialog 
        inner="Delete"
        successMessage={makeSuccessMessage(input.style, processFontName(input.fontName))}    
        title="Delete?"
        onClickHandler={handleDelete} 
        props={{"variant": "contained"}}
        triggerComponent={ButtonWithIcon(DeleteIcon, {marginBottom: "1em"})}>
        <span>
            You are about to delete all of the <i>{input.style}</i> characters of the font <i>{processFontName(input.fontName)}</i>. Are you sure you 
            want to do this?
        </span>
    </ConfirmationDialog> 
    );
}
export default DeleteAll;
/**************************************************************/