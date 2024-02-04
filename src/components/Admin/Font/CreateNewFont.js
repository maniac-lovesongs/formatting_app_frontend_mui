import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useEditableDataGridRows } from '../../../utils/hooks/useEditableDataGridRows.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { Box, Grid, Paper, TextField, Select, MenuItem, Button} from "@mui/material";
import Title from "../Title/Title.js";
import "./Font.scss";

/***************************************************************/
const CreateNewFont = (input) => {
    const ref = useRef(null);
    const [styles, setStyles] = useState(null);
    const [style, setStyle] = useState("normal");
    const [addedStyles, setAddedStyles] = useState([]);
    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (styles === null) {
            const uri = "/api/styles/all";
            apiCall(uri, {}, (args, d) => {
                if (d) {
                    setStyles(d.styles);
                }
            });
        }
    }, []);
    /***************************************************************/
    const makeStyleMenuItems = (styles) => {
        const menuItems = styles.map((s) => {
            return <MenuItem value={s.name}>{s.name}</MenuItem>
        });

        return menuItems; 
    };
    /***************************************************************/
    const handleSelectStyle = (e) => {
        setStyle(e.target.value);
    }
    /***************************************************************/
    const handleAddStyle = (e) => {
        if (!addedStyles.includes(style)) {
            const temp = [...addedStyles];
            temp.push(style);

            const stylesTemp = styles.filter((s) => {
                const name = s.name;
                return !temp.includes(s.name);
            });

            setAddedStyles(temp);
            setStyles(stylesTemp);

            if (stylesTemp.length > 0)
                setStyle(stylesTemp[0].name);
        }
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
                <Title className="fonts-title">Create New Font</Title>
                <Grid container className="fonts-create-new" spacing={2}>
                    <Grid item container xs={12}  spacing={2}>
                        <Grid item xs={6}>Name</Grid>
                        <Grid item xs={6}>
                                <TextField id="outlined-basic" name="fontName" fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>Style</Grid>
                        <Grid item xs={6}>
                            <Select
                                value={style}
                                label="Styles"
                                fullWidth
                                sx={{
                                    marginBottom: "0.5em"
                                }}
                                onChange={handleSelectStyle}
                            >
                                {styles && makeStyleMenuItems(styles)}
                            </Select>
                            <Button
                                onClick={handleAddStyle}
                                variant="contained"
                                name="addStyle">
                                Add Style
                            </Button>
                        </Grid>                            
                    </Grid>
                    <Grid item container xs={12} spacing={2}>

                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default CreateNewFont;
/**************************************************************/