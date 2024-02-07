import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../../models/AppManager/managers.js";
import { apiCall } from "../../../utils/apiFunctions.js";
import { useObserver} from '../../../utils/hooks/useObserver.js';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog.js';
import { Button, ButtonGroup, MenuItem, Paper, Grid, Box } from '@mui/material';
import Select from '@mui/material/Select';
import Title from "../Title/Title.js";
import InputBox from '../../Formatter/InputBox/InputBox.js';
import CharacterSet from '../CharacterSet/CharacterSet.js';
import { useParams } from "react-router-dom";
import "./Font.scss";

/***************************************************************/
const Font = (input) => {
    const [font, setFont] = useState([]);
    const [characterSet, setCharacterSet] = useState(null);
    const {id} = useParams();
    const observerId = useObserver({"callback": (dataChanged) => {
        if(dataChanged === "style"){
            const tempStyle = appManager.getStyle();
            setCharacterSet(tempStyle);
        }
    }});
    /***************************************************************/
    useEffect(() => {
        const uri = "/api/fonts/by_id/" + id; 
        apiCall(uri,{}, (args, d) => {
            setFont(d.font);
            const charSet = d.font.styles.includes("normal") ? "normal" : d.font.styles[0];
            setCharacterSet(charSet);
            appManager.setFontBasic(d.font.name);
            appManager.setStyleBasic(charSet);
        });

    }, []);
    /***************************************************************/
    const handleSelectChange = (e) => {
        setCharacterSet(e.target.value);        
    }
    /***************************************************************/
    const handleViewButtonClick = (e) => {
        appManager.setStyleBasic(characterSet);
    }
    /***************************************************************/
    const makeSelectMenuItems = (font) => {      
      const menuItems = font.styles.map((s) => {
        return <MenuItem value={s}>{s}</MenuItem>
      });

      return menuItems; 
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
        sx={{width: "100%", padding: "1em"}}
        elevation={1}>
            <Title className="fonts-title">{font && font.name}</Title>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                    <Grid item xs={6}>Styles</Grid>
                    <Grid item xs={6}> 
                            {characterSet && 
                            <React.Fragment>
                                <Select
                                    value={characterSet}
                                    label="Styles"
                                    onChange={handleSelectChange}
                                >
                                    {font.styles && makeSelectMenuItems(font)}
                                </Select>
                                <div className="style-select-buttons">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button onClick={handleViewButtonClick}>View</Button>
                                        <ConfirmationDialog 
                                            inner="Delete"
                                            title="Delete?"
                                            onClickHandler={(e,setOpen) => {
                                                console.log(e);
                                                setOpen(false);
                                            }} 
                                            props={{"variant": "contained"}}
                                            triggerComponent={Button}>
                                        <span>
                                            You are about to delete all of the <i>{characterSet}</i> characters of the font <i>{font.name}</i>. Are you sure you 
                                            want to do this?
                                        </span>
                                        </ConfirmationDialog>
                                    </ButtonGroup>
                                </div>

                            </React.Fragment>

                            }
                    </Grid>
                </Grid>
                <Grid item container>
                    {font.name && characterSet && <CharacterSet characterSet={characterSet} fontName={font.name} />}
                </Grid>
                <Grid item container>
                    <Grid item xs={12}>Test Input Box</Grid>
                    <Grid item xs={12}>{font && characterSet && <div className="admin-input-box"><InputBox/></div>}</Grid>
                </Grid>
            </Grid>
        </Paper>
      </Box>
    );
}

export default Font;
/**************************************************************/