import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { Box, Grid, Paper, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import Title from "../Title/Title.js";
import "./Font.scss";
import { processFontName } from '../CharacterSet/utils.js';
import StyleSelector from '../CharacterSet/StyleSelector.js';
import CharacterSetBases from '../CharacterSet/CharacterSetBases.js';
import CharacterSetGenerator from '../CharacterSet/CharacterSetGenerator.js';
import DisplayTable from '../CharacterSet/DisplayTable.js';

/***************************************************************/
const CreateNewFont = (input) => {
    const ref = useRef(null);
    const [usingStyle, setUsingStyle] = useState(null);
    const [usingBase, setUsingBase] = useState(null);
    const [pairs, setPairs] = useState({
        "normal": null, 
        "bold": null, 
        "italic": null, 
        "bold italic": null});
    const { id,fontName,styles } = useParams();
    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
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
                    <Grid container item className="slide" xs={12} data-slide={0}>
                        <Grid item container xs={12}  spacing={2}>
                            <Grid item xs={1}>Name</Grid>
                            <Grid item xs={11}>
                                {makeFontName()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} className='slide' data-slide={1}>
                        <StyleSelector 
                            setUsingStyle={setUsingStyle} 
                            setUsingBase={setUsingBase}
                            usingStyle={usingStyle} 
                            styles={styles} 
                            uri="/api/styles/all"
                        />
                    </Grid>
                    <Grid item container xs={12} className="slide" data-slide={2}>
                        {usingStyle && 
                        <React.Fragment>
                            <Grid item container xs={12}>
                                <Title>Creating Character Set: {usingStyle.name}</Title>
                            </Grid>
                            <CharacterSetBases 
                                setUsingBase={setUsingBase} 
                                usingBase={usingBase}
                            />
                            {usingBase && <CharacterSetGenerator 
                                setUsingBase={setUsingBase}
                                setPairs={setPairs}
                                usingBase={usingBase}
                            />}
                        </React.Fragment>}                        
                    </Grid>
                    <Grid item container xs={12} className="slide" data-slide={3}>
                        {usingBase && pairs[usingStyle.name] && 
                        <React.Fragment>
                            <Grid item container xs={12}>
                                <Title>Pairs</Title>
                            </Grid>
                            <Grid item container xs={12}>
                                <DisplayTable 
                                    usingBase={usingBase}
                                    usingStyle={usingStyle}
                                    setPairs={setPairs}
                                    pairs={pairs}
                                />
                            </Grid>
                        </React.Fragment>}                        
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default CreateNewFont;
/**************************************************************/