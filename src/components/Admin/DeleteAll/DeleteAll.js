import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog.js';
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon.js";

/***************************************************************/
const DeleteAll = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {}});
    /***************************************************************/
    return (
    <ConfirmationDialog 
        inner="Delete"
        successMessage={input.successMessage}    
        title="Delete?"
        onClickHandler={input.onClickHandler} 
        props={{"variant": "contained"}}
        triggerComponent={ButtonWithIcon(DeleteIcon, {marginBottom: "1em"})}>
        {input.message}
    </ConfirmationDialog> 
    );
}
export default DeleteAll;
/**************************************************************/