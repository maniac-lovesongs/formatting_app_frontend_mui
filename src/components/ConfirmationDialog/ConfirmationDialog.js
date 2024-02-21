import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import { useObserver } from '../../utils/hooks/useObserver.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Snackbar } from "@mui/material";
import "./ConfirmationDialog.scss";

/***************************************************************/
const ConfirmationDialog = (input) => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const TriggerComponent = input.triggerComponent; 
    /***************************************************************/
    const observerId = useObserver({
        "caller": "ConfirmationDialog",
        "callback": (dataChanged) => { }});
    /**************************************************************/
    useEffect(() => {
    }, []);
    /**************************************************************/
    const handleClickOpen = () => {
        setOpen(true);
    };
    /**************************************************************/
    const handleClose = (choice) => {
        if(choice === "yes"){
            return (event) => {
                input.onClickHandler(event, setOpen, handleSuccess);
            }
        }
        return () => {
            setOpen(false);
        }
    };
    /**************************************************************/
    const handleSuccess = (v) => {
        return () => {
            setSuccessful(v);
        }
    };
    /**************************************************************/
    return (
        <React.Fragment>
            <TriggerComponent {...input.props} {...input} onClick={handleClickOpen}>
                {input.inner}
            </TriggerComponent>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle 
                id="alert-dialog-title">
                    {input.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText 
                    id="alert-dialog-description">
                        {input.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose("no")}>No</Button>
                    <Button onClick={handleClose("yes")} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar 
                open={successful} 
                autoHideDuration={6000} 
                onClose={handleSuccess(false)}>
                    <Alert
                        onClose={handleSuccess(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}>
                        {input.successMessage}
                    </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default ConfirmationDialog;
/**************************************************************/