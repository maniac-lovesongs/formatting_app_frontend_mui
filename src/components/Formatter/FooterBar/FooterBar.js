import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup, Grid, Paper, Drawer} from '@mui/material';
import {FontDownload, FormatBold, FormatItalic, ContentPaste, Delete} from "@mui/icons-material";
import FontPicker from '../FontPicker/FontPicker.js';
import {apiCall} from "../../../utils/apiFunctions.js";
import {useObserver} from '../../../utils/hooks/useObserver.js';
import {appManager } from "../../../models/AppManager/managers.js";
import "./FooterBar.scss";

/***************************************************************/
const FooterBar = (input) => {
    const [fontPickerOpen, setFontPickerOpen] = useState(false);
    const [disableBold, setDisableBold] = useState(false);
    const [disableItalic, setDisableItalic] = useState(false);
    const [usingBold, setUsingBold] = useState(false);
    const [usingItalic, setUsingItalic] = useState(false);
    const [clipboard, setClipboard] = useState(null);
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
        if (dataChanged === "state") {
            const s = appManager.getUriFriendlyStyle();
            const f = appManager.getUriFriendlyFont();
            const uri = "/api/fonts/character_sets/font/" + f + "/style/" + s;
            apiCall(uri, {}, (args, d) => {
                if (d && d.characters) {
                    appManager.setCurrentData(d);
                    determineActiveButtons();
                    determineButtonsInUse();
                }
            });

        }
        else if(dataChanged === "currentData"){
            determineActiveButtons();
            determineButtonsInUse();   
        }
        else if(dataChanged === "clipboard"){
            setClipboard(appManager.getClipboard());
        }
    }});
    /***************************************************************/
    useEffect(() => {
        determineActiveButtons();
        determineButtonsInUse();
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
    const handlePaste = () => {
        const temp = appManager.getClipboard();
        appManager.insertFromPaste(temp);
    }
    /***************************************************************/
    const handleDelete = () => {
        appManager.deleteAll();
    };
    /***************************************************************/
    const handleFontPickerOpen = () => {
        setFontPickerOpen(!fontPickerOpen);
    }
    /***************************************************************/
    const handleToggleFontPickerOpen = (e) => {
        e.stopPropagation();
        handleFontPickerOpen();
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
                        onClick={handleFontPickerOpen}>
                            <FontDownload/>
                        {fontPickerOpen && 
                            <Drawer
                                anchor="bottom"
                                open={fontPickerOpen}
                                onClose={handleToggleFontPickerOpen}>
                                <FontPicker
                                    location="bottom"
                                />
                             </Drawer>
                        }
                    </Button>
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
                    <Button
                        onClick={handleDelete}>
                        <Delete/>
                    </Button>
                    <Button
                        variant={clipboard === null ? "outlined" : "contained"}
                        disabled={clipboard === null}
                        onClick={handlePaste}
                    >
                        <ContentPaste/>
                    </Button>
                </ButtonGroup>
            </Paper>
        </Grid>
    );
}

export default FooterBar;
/***************************************************************/