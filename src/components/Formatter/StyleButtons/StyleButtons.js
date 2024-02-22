import React, { useState, useEffect } from 'react';
import {Button} from '@mui/material';
import {FormatBold, FormatItalic} from "@mui/icons-material";
import {useObserver,observerManager} from '../../../utils/hooks/useObserver.js';
import {appManager } from "../../../models/AppManager/managers.js";
import "./StyleButtons.scss";

/***************************************************************/
const StyleButtons = (input) => {
    const [disableBold, setDisableBold] = useState(false);
    const [disableItalic, setDisableItalic] = useState(false);
    const [usingBold, setUsingBold] = useState(false);
    const [usingItalic, setUsingItalic] = useState(false);
    /***************************************************************/
    const [observerId, setObserverId] = useObserver({
        "caller": "StyleButtons",
        "callback": (dataChanged) => {
            if(dataChanged === "state" ){
                determineActiveButtons();
                determineButtonsInUse();   
            }
        }
    });
    /***************************************************************/
    useEffect(() => {
        determineActiveButtons();
        determineButtonsInUse();

        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        }; 
    }, []);
    /***************************************************************/
    const determineActiveButtons = () => {
        //const d = appManager.getTemp("temp.styleButtons");
        const availableStyles = appManager.getAvailableStyles();
        const currentFont = appManager.getFont();

        if (currentFont === "Serif") {
            setDisableBold(true); // disable bold 
            setDisableItalic(false); // do not disable italic
        }
        else {
            setDisableBold(!availableStyles.bold);
            setDisableItalic(!availableStyles.italic);
        }
    }
    /***************************************************************/
    const determineButtonsInUse = () => {
      //  const d = appManager.getTemp("temp.styleButtons");
        const style = appManager.getStyle();
        if (style === "bold") {
            setUsingBold(true);
            setUsingItalic(false);
        }
        else if (style === "italic") {
            setUsingItalic(true);
            setUsingBold(false);
        }
        else if (style === "bold italic") {
            setUsingBold(true);
            setUsingItalic(true);
        }
        else if (style === "normal") {
            setUsingBold(false);
            setUsingItalic(false);
        }
    }
    /***************************************************************/
    const handleMakeBold = (e) => {
        if (!disableBold) {
            appManager.setStyle(!usingBold, usingItalic, "bold");    
        }           
        
        e.stopPropagation();

    }
    /***************************************************************/
    const handleMakeItalic = (e) => {
        if (!disableItalic){
            appManager.setStyle(usingBold, !usingItalic, "italic");
        }
        e.stopPropagation();
    }
    /***************************************************************/
    const Wrapper=input.wrapper;
    /***************************************************************/
    return(
        <Wrapper sx={input.sx}>
            <Button
                variant={usingBold? "contained" : "outlined"}
                onClick={handleMakeBold}
                disabled={disableBold}>
                <FormatBold/>
            </Button>
            <Button
                variant={usingItalic? "contained" : "outlined"}
                onClick={handleMakeItalic}
                disabled={disableItalic}>
                <FormatItalic />
            </Button>
        </Wrapper>
    );
}

export default StyleButtons;
/***************************************************************/