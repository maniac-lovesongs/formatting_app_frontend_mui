import React, { useState, useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { Grid, Button, ButtonGroup, Tabs, Tab } from "@mui/material";
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
                "title": "Save?",
                "triggerComponent": ButtonWithIcon(SaveIcon, {marginTop: "1em"}),
                "message": (s,f) => {
                    return (<span> You are about to delete all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. 
                    Are you sure you want to do this?</span>)
                }},
            {
                "inner": "Reset",
                "title": "Reset?",
                "triggerComponent": ButtonWithIcon(RotateLeftIcon, {marginTop: "1em"}),
                "message": (s,f) => {
                    return (<span> You are about to delete all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. 
                    Are you sure you want to do this?</span>)
                }
            }];
        
        return buttons.map((b) => {
            const Component = b.triggerComponent;
            return (
                <ConfirmationDialog
                    inner={b.inner}
                    title={b.title}
                    onClickHandler={(e,setOpen) => {setOpen(false); }} 
                    props={{"variant": "contained"}}
                    triggerComponent={Component}
                >
                    {b.message(s, f)}
                </ConfirmationDialog>
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