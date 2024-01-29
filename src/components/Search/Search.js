import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../utils/withObserver.js';
import TextField from '@mui/material/TextField';
import "./Search.scss";

/***************************************************************/
const Search = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {}});
    /***************************************************************/
    useEffect(() => {
        // register a listener
    }, []);    
    /***************************************************************/
    const handleChange = (e) => {
        if(e.target.value.trim() === ""){
            input.setSearchValue("");
            input.handleFilter(null);
        }
        else{
            const temp = input.data.filter((d) => {
                const v = e.target.value.trim().toLowerCase();
                return input.filter(d, v);
            });
            input.setSearchValue(e.target.value.trim().toLowerCase());
            input.handleFilter(temp);
        }
    }
    /***************************************************************/
    return (
        <TextField                 
            onChange={handleChange}
            id="outlined-basic" label="Search" variant="outlined" />
    );
    /***************************************************************/
}

export default Search;
/**************************************************************/