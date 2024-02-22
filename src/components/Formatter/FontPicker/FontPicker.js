import React, { useState, useEffect, useRef } from 'react';
import {withObserver, useObserver, observerManager} from '../../../utils/hooks/useObserver.js';
import { apiCall } from '../../../utils/apiFunctions.js';
import {Select, MenuItem, Chip, Button, Box, Grid, ButtonGroup} from "@mui/material/";
import StyleButtons from '../StyleButtons/StyleButtons.js';
import {appManager} from "../../../models/AppManager/managers.js";
import "./FontPicker.scss";
import { makeSelectItems } from '../utils.js';
import { createString } from '../../../utils/utils.js';
/***************************************************************/
const FontPicker = (input) => {
    const ref = useRef(null);
    const [data,setData] = useState(null);
    const [selectedFont, setSelectedFont] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [fonts, setFonts] = useState(null);
    /***************************************************************/
    const [observerId, setObserverId] = useObserver({
        "caller": "FontPicker",
        "callback": (dataChanged) => {
            if(dataChanged === "state"){
                const temp = {...appManager.getTemp("temp.fonts")};
                temp[appManager.getFont()].style = appManager.getStyle();
                setSelectedFont(appManager.getFont());
                setSelectedStyle(appManager.getStyle());
                setFonts(temp);
            }
            else if(dataChanged === "temp.fonts"){
                const temp = {...appManager.getTemp("temp.fonts")};
                temp[appManager.getFont()].style = appManager.getStyle();
                setFonts(temp);
            }
            else if(dataChanged === "string.cursor"){
                if(appManager.string.getSelectionMade()){
                    const cursor = appManager.string.getCursor();
                   // setExample(appManager.string.getSubstring(cursor));
                }
            }
        }
    });
    /***************************************************************/
    useEffect(() => {
        const uri = "/api/fonts/character_sets/all_sets";
        const fontDatabase = localStorage.getItem("fontDatabase");
        setSelectedFont(appManager.getFont());
        setSelectedStyle(appManager.getStyle());

        if(!fontDatabase){        
            apiCall(uri, {}, (args, d) => {
                if(d && d.success){
                    localStorage.setItem("fontDatabase", JSON.stringify(d));
                    const temp = makeSelectItems(d);
                    setData(d);
                    appManager.setTemp(temp, "temp.fonts");
                }
            });
        }
        else{
            const d = JSON.parse(fontDatabase);
            const temp = makeSelectItems(d);
            setData(d);
            appManager.setTemp(temp, "temp.fonts");
        }

        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        }; 
    }, []);
    /***************************************************************/
    const writeString = (string, font, style) => {
        const characterSet = data.chs[font][style];
        return string.split('').reduce((prev, c) => {
            const tail = c in characterSet? characterSet[c].symbol : c; 
            return prev + tail; 
        });
    }
    /****************************************************************/
    const makeFonts = (fonts) => {
        const fontNames = Object.keys(fonts);
        const tempCursor = appManager.string.cursor; 
        let tempExample = '';
        if(tempCursor[0] !== tempCursor[1]){
            const tempSubstr = appManager.string.getSubstring(tempCursor);
            tempExample = createString(tempSubstr);
        }

        return fontNames.map((font_name) => {
            const font = fonts[font_name];
            const example = tempExample.length !== 0? tempExample : font_name;
            return (
                <MenuItem value={font_name}>
                    <Chip 
                        sx={{"marginRight": "1em" }}
                        label={font_name}/>
                    <span className="font-example">{writeString(example, font_name, font.style)}</span>
                </MenuItem>
            );
        });
    }
    /***************************************************************/
    const handleUseFont = (e) => {
        e.stopPropagation();
        appManager.setFont(selectedFont, data["allFonts"][selectedFont].styles);
    }
    /***************************************************************/
    const handleSelect = (e) => {
      appManager.setFont(e.target.value, data["allFonts"][e.target.value].styles);

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
                                {fonts && makeFonts(fonts)}
                            </Select>
                        </Grid>
                        <Grid container item xs={12}>
                            <ButtonGroup 
                                sx={{"marginTop": "1em"}}>
                                <StyleButtons
                                    managed={true}
                                    style={selectedStyle}
                                    font={selectedFont}
                                    data={data}
                                    wrapper={React.Fragment}
                                />
                                <Button
                                    onClick={handleUseFont}
                                    fullWidth
                                    variant="contained">
                                        Use
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        input.setFontPickerOpen(false);
                                    }}
                                    fullWidth
                                    variant="contained">
                                        Close
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>}
        </React.Fragment>
    );
}

export default FontPicker;
/***************************************************************/