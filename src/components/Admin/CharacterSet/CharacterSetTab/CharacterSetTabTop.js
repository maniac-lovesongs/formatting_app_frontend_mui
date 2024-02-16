import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../../utils/hooks/useObserver.js';
import { Grid } from "@mui/material";
import CharacterSetGenerator from '../CharacterSetGenerator/CharacterSetGenerator.js';
import DeleteAll from '../DeleteAll.js';
import {  handleAvailableStylesChange } from '../characterSetTabUtils.js';

/***************************************************************/
const CharacterSetTabTop = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver();
    console.log(input)
    /***************************************************************/
    useEffect(() => {
    }, []);
    /***************************************************************/
    return (
            <Grid
                justifyContent="flex-start"
                item
                container
                xs={12}>
            </Grid>
    );
}
export default CharacterSetTabTop;
/**************************************************************/