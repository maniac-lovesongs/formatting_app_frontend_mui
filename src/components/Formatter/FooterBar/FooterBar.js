import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup, Grid, Paper, Drawer} from '@mui/material';
import {FontDownload, FormatBold, FormatItalic, ContentPaste, Delete} from "@mui/icons-material";
import FontPicker from '../FontPicker/FontPicker.js';
import StyleButtons from '../StyleButtons/StyleButtons.js';
import {apiCall} from "../../../utils/apiFunctions.js";
import {useObserver} from '../../../utils/hooks/useObserver.js';
import {appManager } from "../../../models/AppManager/managers.js";
import { prepareCurrentData } from '../utils.js';
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
            prepareCurrentData();
        }
        else if(dataChanged === "clipboard"){
            setClipboard(appManager.getClipboard());
        }
    }});
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
                    <StyleButtons wrapper={React.Fragment}/>
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