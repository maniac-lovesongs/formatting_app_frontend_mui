import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import { useObserver } from '../../utils/hooks/useObserver.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./DeleteDialog.scss";

/***************************************************************/
const DeleteDialog = (input) => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const TriggerComponent = input.triggerComponent; 
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => { }});
    /**************************************************************/
    useEffect(() => {
    }, []);
    /**************************************************************/
    const handleClickOpen = () => {
        setOpen(true);
    };
    /**************************************************************/
    const handleClose = () => {
        setOpen(false);
    };
    /**************************************************************/
    return (
        <React.Fragment>
            <TriggerComponent variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </TriggerComponent>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Would you like to delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Yes</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteDialog;
/**************************************************************/