import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup, Grid, Paper} from '@mui/material';
import {FontDownloadIcon, FormatBold, FormatItalic, ContentPasteIcon, DeleteIcon} from "@mui/icons-material";
import {appManager, observerManager} from "../../../models/AppManager/managers.js";
import "./FooterBar.scss";

/***************************************************************/
const FooterBar = (input) => {
    const [observerId, setObserverId] = useState(null);
    const [fontPickerOpen, setFontPickerOpen] = useState(false);
    const [disableBold, setDisableBold] = useState(false);
    const [disableItalic, setDisableItalic] = useState(false);
    const [usingBold, setUsingBold] = useState(false);
    const [usingItalic, setUsingItalic] = useState(false);
    const [clipboard, setClipboard] = useState(null);

    /***************************************************************/
    useEffect(() => {
        determineActiveButtons();
        determineButtonsInUse();
        
        // register a listener 
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                if (dataChanged === "state") {
                    determineActiveButtons();
                    determineButtonsInUse();
                }
            });
            setObserverId(id);
        }

        // once the component unmounts, remove the listener
        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        };
    }, []);
    /***************************************************************/
    const determineActiveButtons = () => {
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
        if (!disableBold) 
            // if we can make this font bolds
            appManager.setStyle(!usingBold, usingItalic, "bold");
        
        e.stopPropagation();

    }
    /***************************************************************/
    const handleMakeItalic = (e) => {
        if (!disableItalic)
            // if we can make this font bold
            appManager.setStyle(usingBold, !usingItalic, "italic");
        e.stopPropagation();
    }
    /***************************************************************/
    return(
        <Grid
            item
            xs>
                <Paper sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    height: "100%"
                }} elevation={2}>
                    <ButtonGroup>
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
                </ButtonGroup>
            </Paper>
        </Grid>
    );
}

export default FooterBar;
/***************************************************************/