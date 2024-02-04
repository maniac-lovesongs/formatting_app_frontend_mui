import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { Grid, Select, MenuItem, Button, ButtonGroup } from "@mui/material";
import { Clear } from '@mui/icons-material';
import Title from "../Title/Title.js";
import "./CharacterSet.scss";

/***************************************************************/
const CharacterSetAdder = (input) => {
    const ref = useRef(null);
    const [availableStyles, setAvailableStyles] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [addedStyles, setAddedStyles] = useState({
        "italic": null,
        "bold": null,
        "normal": null,
        "bold italic": null
    });
    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (availableStyles === null) {
            const uri = "/api/styles/all";
            apiCall(uri, {}, (args, d) => {
                if (d) {
                    setAvailableStyles(d.styles);
                    const temp = { ...d.styles[0], "value": d.styles[0].name };
                    setSelectedStyle(temp);
                }
            });
        }
    }, []);
    /***************************************************************/
    const makeStyleMenuItems = (styles) => {
        const menuItems = styles.map((s) => {
            return <MenuItem
                data-name={s.name}
                data-isbold={s.isBold}
                data-isitalic={s.isItalic}
                data-id={s.id}
                value={s.name}>
                {s.name}
            </MenuItem>
        });

        return menuItems;
    };
    /***************************************************************/
    const handleSelectStyle = (e) => {
        const dataset = Object.keys(e.explicitOriginalTarget.dataset);
        const temp = { "value": e.target.value };
        dataset.forEach((k) => {
            temp[k] = e.explicitOriginalTarget.dataset[k];
        });
        setSelectedStyle(temp);
    }
    /***************************************************************/
    const handleAddStyle = (e) => {
        const styleNotAdded = addedStyles[selectedStyle.name] === null; 
        if (styleNotAdded) {
            const temp = { ...addedStyles };
            temp[selectedStyle.name] = selectedStyle;
            const stylesTemp = availableStyles.filter((s) => {
                return temp[s.name] === null;
            });
            setAddedStyles(temp);
            setAvailableStyles(stylesTemp);

            if (stylesTemp.length > 0) {
                setSelectedStyle(stylesTemp[0]);
            }
        }
    }
    /***************************************************************/
    const makeAddedStyles = () => {
        const keys = Object.keys(addedStyles);
        return keys.map((k) => {
            const s = addedStyles[k];
            if (s !== null) {
                return (
                    <ButtonGroup sx={{
                        marginRight: "0.5em"
                    }}>
                        <Button>{s.name}</Button>
                        <Button
                            onClick={(e) => {
                                console.log(e);
                            }}
                            data-d={s.id}
                            data-name={s.name}><Clear /></Button>
                    </ButtonGroup>
                )
            }

            return null; 
        });
    }
    /***************************************************************/
    return (
    <React.Fragment>
            <Grid item xs={6}>Style</Grid>
            <Grid item xs={6}>
                {selectedStyle && <Select
                    value={selectedStyle.value}
                    label="Styles"
                    fullWidth
                    sx={{
                        marginBottom: "0.5em"
                    }}
                    onChange={handleSelectStyle}
                >
                    {availableStyles && makeStyleMenuItems(availableStyles)}
                </Select>}
                    <Button
                        onClick={handleAddStyle}
                        variant="contained"
                        name="addStyle">
                        Add Style
                    </Button>
            </Grid> 
            <Grid item container xs={12} spacing={2}>
                <ButtonGroup
                    sx={{
                        marginLeft: "1em",
                        marginTop: "1em"
                    }}
                >
                    {makeAddedStyles()}
                </ButtonGroup>
            </Grid>    
    </React.Fragment>
    );
}

export default CharacterSetAdder;
/**************************************************************/