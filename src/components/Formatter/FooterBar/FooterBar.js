import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup, Grid, Paper} from '@mui/material';
import {FontDownloadIcon, FormatBoldIcon, FormatItalicIcon, ContentPasteIcon, DeleteIcon} from "@mui/icons-material";
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
                if (dataChanged === "panels") {
                    setFontPickerOpen(appManager.getPanel("font picker"));
                }
                if (dataChanged === "clipboard") {
                    const temp = appManager.getClipboard();
                    setClipboard(temp);
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
    const handleOpenFontPicker = (e) => {
        appManager.setPanelOpen("font picker");
        e.stopPropagation();
    }
    /***************************************************************/
    const handleMakeBold = (e) => {
        if (!disableBold) 
            // if we can make this font bolds
            appManager.setStyle(!usingBold, usingItalic, "bold");
        
        e.stopPropagation();

    }
    /***************************************************************/
    const handlePaste = () => {
        const temp = appManager.getClipboard();
        appManager.insertFromPaste(temp);
    }
    /***************************************************************/
    const handleDelete = () => {
        appManager.deleteAll();
    };
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
                        onClick={handleOpenFontPicker}>
                            <FontDownloadIcon/>
                        </Button>
                    <Button
                        variant={usingBold? "contained" : "outlined"}
                        onClick={handleMakeBold}
                        disabled={disableBold}>
                            <FormatBoldIcon/>
                        </Button>
                    <Button
                        variant={usingItalic? "contained" : "outlined"}
                        onClick={handleMakeItalic}
                        disabled={disableItalic}>
                            <FormatItalicIcon />
                    </Button>
                    <Button
                        onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                    <Button
                        variant={clipboard === null ? "outlined" : "contained"}
                        disabled={clipboard === null}
                        onClick={handlePaste}
                    >
                        <ContentPasteIcon/>
                    </Button>
                </ButtonGroup>
                <FontPicker
                    open={fontPickerOpen}
                    setOpen={setFontPickerOpen}
                />
            </Paper>
        </Grid>
    );
}

export default FooterBar;
/***************************************************************/