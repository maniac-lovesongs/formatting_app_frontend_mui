import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { Box, Grid, Paper, TextField, Tab, Tabs,Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import Title from "../Title/Title.js";
import "./Font.scss";
import { processFontName, capitalize} from '../CharacterSet/utils.js';
import CharacterSetTab from '../CharacterSet/CharacterSetTab.js';
import { apiCall } from '../../../utils/apiFunctions.js';

/***************************************************************/
const CreateNewFont = (input) => {
    const ref = useRef(null);
    const [tempFontName, setTempFontName] = useState('');
    const { id, fontName, styles } = useParams();
    const [openedTab, setOpenedTab] = useState(0);
    const [availableStyles, setAvailableStyles] = useState(null);
    const allStyles = ["normal", "bold", "italic", "bold italic"];
    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
    }, []);
    /***************************************************************/
    const makeFontName = () => {
        if (fontName) {
            return processFontName(fontName);
        }
        return (<TextField 
            value={tempFontName}
            onChange={(e) => {
                setTempFontName(e.target.value);
            }}
            id="outlined-basic" 
            fullWidth 
            variant="outlined" />);
    }
    /***************************************************************/
    const handleTabChange = (e,nv) => {
        setOpenedTab(nv);
    }
    /***************************************************************/
    const determineOpenedTab = (n) => {
        return n === openedTab ? "block" : "none";
    }
    /***************************************************************/
    const makeCharacterSetTabPanels = () => {
        const characterSetTaPanels = allStyles.map((s,i) => {
            return (<CharacterSetTab 
                style={s}
                tabId={i}
                availableStyles={availableStyles}
                setAvailableStyles={setAvailableStyles}
                display={determineOpenedTab(i)}
                fontName={fontName? fontName : tempFontName}
            />);
        });

        return characterSetTaPanels;
    }
    /***************************************************************/
    const makeTabs = () => {
        return allStyles.map((s) => {
            return (<Tab data-name={s} label={s}></Tab>)
        });
    }
    /***************************************************************/
    const makeTitle = () => {
        if(fontName)
            return "View/Edit Font " + fontName.split("_").map((c) => {
            return capitalize(c);
        }).join(" ");

        return "Create New Font";
    }
    /***************************************************************/
    const makeAvailableStyles = () => {
        return ( availableStyles && availableStyles.map((s) => {
            return (<Chip 
                sx={{marginRight: "1em"}}
                label={s} 
                variant="outlined" />)
        }));
    }
    /***************************************************************/
    return (
        <Box
            sx={{
                display: 'flex',
                width: "100vw",
                flexWrap: 'wrap'
            }}
        >
            <Paper
                sx={{ 
                    width: "100%", 
                    padding: "1em" 
                }}
                elevation={1}>
                <Title className="fonts-title">{makeTitle()}</Title>
                <Grid container className="fonts-create-new" spacing={2}>
                    <Grid
                        container
                        item
                        xs={12} >
                        <Grid item container xs={12}  spacing={2}>
                            <Grid item xs={1}>Name</Grid>
                            <Grid item xs={11}>
                                {makeFontName()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12} >
                        <Grid item container xs={12}  spacing={2}>
                            <Grid item xs={1}>Styles</Grid>
                            <Grid item xs={11}>
                                {makeAvailableStyles()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper
                sx={{
                    marginTop: "1.5em",
                    width: "100%",
                    padding: "1em"
                }}
                elevation={1}>
                <Tabs 
                value={openedTab} 
                onChange={handleTabChange}>
                    {makeTabs()}
                </Tabs>
                {makeCharacterSetTabPanels()}
            </Paper>
        </Box>
    );
}

export default CreateNewFont;
/**************************************************************/