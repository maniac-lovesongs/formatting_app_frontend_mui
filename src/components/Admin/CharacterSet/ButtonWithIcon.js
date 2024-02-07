import React, { useState, useEffect, useRef } from 'react';
import { Grid, Button, ButtonGroup, Tabs, Tab } from "@mui/material";

const ButtonWithIcon = (Icon, sx) => {
    return (props) => {
        return(
            <Button 
                {...props}
                sx={sx}
                variant="contained" 
                startIcon={<Icon />}>
                {props.inner}
            </Button>
        );

    };
}

export default ButtonWithIcon;