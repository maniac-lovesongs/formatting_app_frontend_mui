import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { ButtonGroup } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog.js';
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon.js";
/***************************************************************/
const SaveReset = (input) => {
    const ref = useRef(null);

    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {}});
    /*****************************************************************/
    const makeButtons = (s,f) => {
        const buttons = [{
                "inner": "Save",
                "type": "save",
                "title": "Save?",
                "handler": input.saveHandler,
                "successMessage": input.saveSuccessMessage,
                "triggerComponent": ButtonWithIcon(SaveIcon, {marginTop: "1em"}),
                "message": input.saveMessage},{
                "inner": "Reset",
                "type": "reset",
                "title": "Reset?",
                "handler": input.resetHandler,
                "successMessage": input.resetSuccessMessage,
                "triggerComponent": ButtonWithIcon(RotateLeftIcon, {marginTop: "1em"}, input.resetSet),
                "message": input.resetMessage
            }];
        
        return buttons.map((b) => {
            const Component = b.triggerComponent;
            return (
                <React.Fragment>
                    <ConfirmationDialog
                        inner={b.inner}
                        title={b.title}
                        successMessage={b.successMessage}
                        onClickHandler={(e, setOpen, handleSuccess) => {
                            b.handler();
                            setOpen(false); 
                            handleSuccess(true)();
                        }} 
                        props={{"variant": "contained"}}
                        triggerComponent={Component}
                    >
                        {b.message}
                    </ConfirmationDialog>
                </React.Fragment>
            );
        })
    }
    /***************************************************************/
    return (
        <ButtonGroup>
            {makeButtons()}
        </ButtonGroup>
    );
}
export default SaveReset;
/**************************************************************/