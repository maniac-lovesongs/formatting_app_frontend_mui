import React, { useState, useEffect, useRef } from 'react';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import Drawer from '@mui/material/Drawer';
import { apiCall } from '../../../utils/apiFunctions.js';
import {Select, MenuItem, FormControl, Chip, Button, Box, Grid} from "@mui/material/";
import {appManager} from "../../../models/AppManager/managers.js";
import "./FontPicker.scss";
/***************************************************************/
const FontPicker = (input) => {
    const ref = useRef(null);
    const [data,setData] = useState(null);
    const [selectedFont, setSelectedFont] = useState(null);
    const [example, setExample] = useState('');
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
        if(dataChanged === "state"){
            setSelectedFont(appManager.getFont());
        }
    }});
    /***************************************************************/
    useEffect(() => {
        const uri = "/api/fonts/character_sets/all_sets";
        const fontDatabase = localStorage.getItem("fontDatabase");
        setSelectedFont(appManager.getFont());

        if(!fontDatabase){        
            apiCall(uri, {}, (args, d) => {
                if(d && d.success){
                    localStorage.setItem("fontDatabase", JSON.stringify(d));
                    setData(d);
                }
            });
        }
        else{
            setData(JSON.parse(fontDatabase))
        }
    }, []);
    /***************************************************************/
    const writeString = (string, font, font_name) => {
        const style = font_name === "Serif"? "bold" : "normal";
        const characterSet = font[style];

        const tempString = [];
        for(let i = 0; i < string.length; i++){
            const c = string.charAt(i);
            if(c in characterSet)
                tempString.push(characterSet[c].symbol);
            else
                tempString.push(c);
            
        }

        return tempString.join('');
    }
    /****************************************************************/
    const makeFonts = (data) => {
        const fontNames = Object.keys(data.chs);
        return fontNames.map((font_name) => {
            const font = data.chs[font_name];
            const tempExample = example.length === 0? font_name : example;
            const tempString = writeString(tempExample, font, font_name);
            return (
            <MenuItem value={font_name}>
                <Chip 
                    sx={{"marginRight": "1em" }}
                    label={font_name}/>
                <span className="font-example">{tempString}</span>
            </MenuItem>)
        });
    }
    /***************************************************************/
    const handleUseFont = (e) => {
        appManager.setFont(selectedFont);
    }
    /***************************************************************/
    const handleSelect = (e) => {
      setSelectedFont(e.target.value);
    }
    /***************************************************************/
    return (
        <React.Fragment>
            {data && 
                <Box
                    sx={{"padding": "1em"}}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Select
                                value={selectedFont}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                fullWidth
                                onChange={handleSelect}>
                                {data && makeFonts(data)}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleUseFont}
                                fullWidth 
                                sx={{"marginTop": "1em"}}
                                variant="contained">
                                    Use
                            </Button>
                        </Grid>
                    </Grid>
                </Box>}
        </React.Fragment>
    );
}

export default FontPicker;
/***************************************************************/