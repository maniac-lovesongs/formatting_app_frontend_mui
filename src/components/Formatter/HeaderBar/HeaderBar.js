import React, { useState, useEffect, useRef } from 'react';
import { ButtonGroup, Button,Grid,Paper } from '@mui/material';
import {Redo, Undo, ContentCopy, Share} from '@mui/icons-material';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import {appManager} from "../../../models/AppManager/managers.js";
import "./HeaderBar.scss";

/***************************************************************/
const HeaderBar = (input) => {
    const ref = useRef(null);
    const [undo, setUndo] = useState(true);
    const [redo, setRedo] = useState(true);
    const observerId = useObserver({
        "caller": "HeaderBar",
        "callback": (dataChanged) => {
            if (dataChanged === "history") {
                determineActiveButtons();
            }
        }
    });

    /***************************************************************/
    useEffect(() => {
        determineActiveButtons();
    }, []);
    /***************************************************************/
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(makeString(appManager.string.getString()));
            appManager.setClipboard(appManager.string.getString());
            alert("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };
    /***************************************************************/
    const determineActiveButtons = () => {
        const canUndo = appManager.canUndo();
        const canRedo = appManager.canRedo();
        setUndo(!canUndo);
        setRedo(!canRedo);
    }

    /***************************************************************/
    const makeString = (str) => {
        console.log(str);
        return str.map((v) => {
            return v.symbol;
        }).join('');
    }
    /***************************************************************/
    const handleUndo = (e) => {
        appManager.doUndo();
        e.stopPropagation();
    }
    /***************************************************************/
    const handleRedo = (e) => {
        appManager.doRedo();
        e.stopPropagation();
    }
    /***************************************************************/
    return (
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
                        onClick={handleUndo}
                        disabled={undo}>
                            <Undo/>
                        </Button>
                    <Button
                        onClick={handleRedo}
                        disabled={redo}>
                            <Redo/>
                        </Button>
                        <Button onClick={handleCopyClick}>
                            <ContentCopy/>
                        </Button>
                        <Button>
                            <Share/>
                        </Button>
                    </ButtonGroup>
                </Paper>
        </Grid>
    );
}

export default HeaderBar;
/***************************************************************/