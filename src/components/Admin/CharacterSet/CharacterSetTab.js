import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { Grid, Button, ButtonGroup } from "@mui/material";
import Title from "../Title/Title.js";
import {appManager} from "../../../models/AppManager/managers.js";
import CharacterSetBases from '../CharacterSet/CharacterSetBases.js';
import CharacterSetGenerator from '../CharacterSet/CharacterSetGenerator.js';
import DisplayTable from '../CharacterSet/DisplayTable.js';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog.js';
import { apiCall } from '../../../utils/apiFunctions.js';
import {processFontName,capitalize} from "./utils.js";

/***************************************************************/
const ButtonWithIcon = (Icon, sx) => {
    return (props) => {
        return(
            <Button 
                {...props}
                sx={sx}
                variant="contained" 
                startIcon={<Icon />}>
                {props.inner}
            </Button>
        );

    };
}
/***************************************************************/
const CharacterSetTab = (input) => {
    const ref = useRef(null);
    const [usingBase, setUsingBase] = useState(null);
    const [pairs, setPairs] = useState(null);
    const [existingCharSet, setExistingCharSet] = useState(false);
    const [rowModesModel, setRowModesModel] = useState({});

    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {}});
    /*****************************************************************/
    const getCharacterSetHelper = async (s,f) => {
        const uri = "/api/fonts/character_sets/font/" + f + "/style/" + s;
        apiCall(uri, {}, (args, d) => {
            console.log("style: " + input.style);
            console.log(d);
            if (d.characters) {
                const chs = [];
                Object.keys(d.characters).forEach((v) => {
                    chs.push(d.characters[v]); 
                });
            
            if(!input.availableStyles){
                input.setAvailableStyles(d.availableStyles);
            }

            setExistingCharSet(d.availableStyles.includes(input.style));
            setUsingBase(null);
            setPairs(chs);
        } 
    });}
  /***************************************************************/
    useEffect(() => {
        if(input.fontName && input.fontName !== ''){
            const tempName = input.fontName.toLowerCase().split(" ").join("_");
            const tempStyle = input.style.toLowerCase().split(" ").join("_");

            getCharacterSetHelper(tempStyle, tempName);
        };
    }, []);
    /***************************************************************/
    const makeTopPart = (usingBase) => {
        if(!existingCharSet){
            return(                
            <React.Fragment>
                <CharacterSetBases
                    setUsingBase={setUsingBase}
                    usingBase={usingBase}
                />
               {usingBase && <CharacterSetGenerator
                    usingBase={usingBase}
                    setUsingBase={setUsingBase}
                    setPairs={setPairs}
                    pairs={pairs}
                    style={input.style}
                />}
            </React.Fragment>);
        }
        return (
        <React.Fragment>
            <ConfirmationDialog 
                inner="Delete"
                title="Delete?"
                onClickHandler={(e,setOpen) => {setOpen(false); }} 
                props={{"variant": "contained"}}
                triggerComponent={ButtonWithIcon(DeleteIcon, {marginBottom: "1em"})}>
                <span>
                    You are about to delete all of the <i>{input.style}</i> characters of the font <i>{processFontName(input.fontName)}</i>. Are you sure you 
                    want to do this?
                </span>
            </ConfirmationDialog> 
        </React.Fragment>

        ); 
    }
    /***************************************************************/
    const makeTitle = () => {
        return input.style.split(" ").map((c) => {
            return capitalize(c);
        }).join(" ");
    }
    /***************************************************************/
    return (
        <Grid
            sx={{
                display: input.display, 
                marginTop: "0.5em"
            }}
            container>
            <Grid item xs={12}>
                <Title>{makeTitle()}</Title>
            </Grid>
            <Grid
                justifyContent="flex-start"
                item 
                container 
                xs={12}>
                    {makeTopPart(usingBase)}
            </Grid>
            <Grid
                justifyContent="flex-start"
                item 
                container 
                xs={12}>
                  {pairs &&  
                        <DisplayTable
                            usingBase={usingBase}
                            usingStyle={input.style}
                            setPairs={setPairs}
                            pairs={pairs}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                        />}
            </Grid>
            <Grid
                justifyContent="flex-star"
                item 
                container 
                xs={12}>
                    <ButtonGroup>
                        <ConfirmationDialog 
                            inner="Save"
                            title="Save?"
                            onClickHandler={(e,setOpen) => {setOpen(false); }} 
                            props={{"variant": "contained"}}
                            triggerComponent={ButtonWithIcon(SaveIcon, {marginTop: "1em"})}>
                            <span>
                                You are about to delete all of the <i>{input.style}</i> characters of the font <i>{processFontName(input.fontName)}</i>. Are you sure you 
                                want to do this?
                            </span>
                        </ConfirmationDialog> 
                        <ConfirmationDialog 
                            inner="Reset"
                            title="Reset?"
                            onClickHandler={(e,setOpen) => {setOpen(false); }} 
                            props={{"variant": "contained"}}
                            triggerComponent={ButtonWithIcon(RotateLeftIcon, {marginTop: "1em"})}>
                            <span>
                                You are about to delete all of the <i>{input.style}</i> characters of the font <i>{processFontName(input.fontName)}</i>. Are you sure you 
                                want to do this?
                            </span>
                        </ConfirmationDialog> 
                    </ButtonGroup>
            </Grid>
        </Grid>
    );
}
export default CharacterSetTab;
/**************************************************************/