import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import Title from "../Title/Title.js";
import "./Font.scss";
import { processFontName } from '../CharacterSet/utils.js';
import StyleSelector from '../CharacterSet/StyleSelector.js';
import CharacterSetBases from '../CharacterSet/CharacterSetBases.js';

/***************************************************************/
const CreateNewFont = (input) => {
    const ref = useRef(null);
    const [usingStyle, setUsingStyle] = useState(null);
    const [usingBase, setUsingBase] = useState(null);
    const { id,fontName,styles } = useParams();
    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        /*if (styles === null) {
            const uri = "/api/styles/all";
            apiCall(uri, {}, (args, d) => {
                if (d) {
                    setStyles(d.styles);
                }
            });
        }*/
    }, []);
    /***************************************************************/
    const makeFontName = () => {
        if (fontName) 
            return processFontName(fontName);

        return (<TextField id="outlined-basic" name="fontName" fullWidth variant="outlined" />);
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
                sx={{ width: "100%", padding: "1em" }}
                elevation={1}>
                <Title className="fonts-title">Create New Character Set</Title>
                <Grid container className="fonts-create-new" spacing={2}>
                    <Grid item container xs={12}  spacing={2}>
                        <Grid item xs={1}>Name</Grid>
                        <Grid item xs={11}>
                            {makeFontName()}
                        </Grid>
                    </Grid>
                    <StyleSelector 
                        setUsingStyle={setUsingStyle} 
                        setUsingBase={setUsingBase}
                        usingStyle={usingStyle} 
                        styles={styles} 
                        uri="/api/styles/all"
                    />
                    {usingStyle && 
                    <React.Fragment>
                        <Grid item container xs={12}>
                            <Title>Creating Character Set: {usingStyle.name}</Title>
                        </Grid>
                        <CharacterSetBases 
                            setUsingBase={setUsingBase} 
                            usingBase={usingBase}
                        />
                        <Grid item container xs={12}>
                            {usingBase && <div className="using-base">
                                Using {usingBase.name}
                            </div>}
                        </Grid>
                    </React.Fragment>}
                </Grid>
            </Paper>
        </Box>
    );
}

export default CreateNewFont;
/**************************************************************/