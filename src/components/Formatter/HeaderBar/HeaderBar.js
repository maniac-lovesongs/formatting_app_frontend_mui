import React, { useState, useEffect, useRef } from 'react';
import { ButtonGroup, Button,Grid,Paper } from '@mui/material';
import {Redo, Undo, ContentCopy, Share} from '@mui/icons-material';
import {appManager, observerManager} from "../../../models/AppManager/managers.js";
import "./HeaderBar.scss";

/***************************************************************/
const HeaderBar = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [undo, setUndo] = useState(true);
    const [redo, setRedo] = useState(true);

    /***************************************************************/
    useEffect(() => {
        determineActiveButtons();

        // register a listener 
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                if (dataChanged === "history") {
                    determineActiveButtons();
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
        const canUndo = appManager.history.canUndo();
        const canRedo = appManager.history.canRedo();
        setUndo(!canUndo);
        setRedo(!canRedo);
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
                        <Button>
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