import React, { useState, useEffect, useRef } from 'react';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import { apiCall } from '../../../utils/apiFunctions.js';
import {Select, MenuItem, Chip, Button, Box, Grid, ButtonGroup} from "@mui/material/";
import StyleButtons from '../StyleButtons/StyleButtons.js';
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
        else if(dataChanged === "string.cursor"){
            if(appManager.string.getSelectionMade()){
                const cursor = appManager.string.getCursor();
                setExample(appManager.string.getSubstring(cursor));
            }
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
    const writeString = (string, font, style) => {
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
    const makeFonts = (data, example) => {
        const fontNames = Object.keys(data.chs);
        return fontNames.map((font_name) => {
            const font = data.chs[font_name];
            const tempExample = example.length === 0? font_name : example;
            const st = font_name === "Serif"? "bold" : "normal";
            return (
                <MenuItem value={font_name}>
                    <Chip 
                        sx={{"marginRight": "1em" }}
                        label={font_name}/>
                    <span className="font-example">{writeString(tempExample, font, st)}</span>
                </MenuItem>
            );
        });
    }
    /***************************************************************/
    const handleUseFont = (e) => {
        console.log(data["allFonts"])
        appManager.setFont(selectedFont, data["allFonts"][selectedFont].styles);
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
                                {data && makeFonts(data, example)}
                            </Select>
                        </Grid>
                        <Grid container item xs={12}>
                            <ButtonGroup 
                                sx={{"marginTop": "1em"}}>
                                <Button
                                    onClick={handleUseFont}
                                    fullWidth
                                    variant="contained">
                                        Use
                                </Button>
                                <StyleButtons
                                    wrapper={React.Fragment}
                                />
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>}
        </React.Fragment>
    );
}

export default FontPicker;
/***************************************************************/