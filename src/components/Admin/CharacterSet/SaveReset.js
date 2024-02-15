import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { ButtonGroup, Alert, Snackbar} from "@mui/material";
import {appManager} from "../../../models/AppManager/managers.js";
import SaveIcon from '@mui/icons-material/Save';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog.js';
import ButtonWithIcon from './ButtonWithIcon.js';
import {processFontName} from "./utils.js";

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
                "handler": input.resetHandler,
                "successMessage": (s,f) => {
                    return (<span> You have successfully saved changes to the the data for the <i>{s}</i> character set of the font <i>{processFontName(f)}</i></span>)},
                "triggerComponent": ButtonWithIcon(SaveIcon, {marginTop: "1em"}),
                "message": (s,f) => {
                    return (<span> You are about to delete all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. 
                    Are you sure you want to do this?</span>)
                }},
            {
                "inner": "Reset",
                "type": "reset",
                "title": "Reset?",
                "handler": input.resetHandler,
                "successMessage": (s,f) => {
                    return (<span> You have successfully reset the data for the <i>{s}</i> character set of the font <i>{processFontName(f)}</i></span>)},
                "triggerComponent": ButtonWithIcon(RotateLeftIcon, {marginTop: "1em"}),
                "message": (s,f) => {
                    return (<span> You are about to reset the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. 
                    Are you sure you want to do this?</span>)
                }
            }];
        
        return buttons.map((b) => {
            const Component = b.triggerComponent;
            return (
                <React.Fragment>
                    <ConfirmationDialog
                        inner={b.inner}
                        title={b.title}
                        successMessage={b.successMessage && b.successMessage(s,f)}
                        onClickHandler={(e, setOpen, handleSuccess) => {
                            b.handler();
                            setOpen(false); 
                            handleSuccess(true)();
                        }} 
                        props={{"variant": "contained"}}
                        triggerComponent={Component}
                    >
                        {b.message(s, f)}
                    </ConfirmationDialog>
                </React.Fragment>
            );
        })
    }
    /***************************************************************/
    return (
        <ButtonGroup>
            {makeButtons(input.style, input.fontName)}
        </ButtonGroup>
    );
}
export default SaveReset;
/**************************************************************/