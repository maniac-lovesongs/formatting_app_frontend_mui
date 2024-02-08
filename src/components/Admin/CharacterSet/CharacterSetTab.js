import React, { useState, useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { Grid, Button, ButtonGroup, Tabs, Tab } from "@mui/material";
import Title from "../Title/Title.js";
import {appManager} from "../../../models/AppManager/managers.js";
import CharacterSetBases from '../CharacterSet/CharacterSetBases.js';
import CharacterSetGenerator from '../CharacterSet/CharacterSetGenerator.js';
import { characterSet } from './displayTableMisc.js';
import DisplayTable from '../../DisplayTable/DisplayTable.js';
import SaveReset from './SaveReset.js';
import DeleteAll from './DeleteAll.js';
import { apiCall, getCharacterSetHelper } from '../../../utils/apiFunctions.js';
import {processFontName,capitalize} from "./utils.js";


/***************************************************************/
const CharacterSetTab = (input) => {
    const ref = useRef(null);
    const [usingBase, setUsingBase] = useState(null);
    const [pairs, setPairs] = useState(null);
    const [existingCharSet, setExistingCharSet] = useState(false);
    const [rowModesModel, setRowModesModel] = useState({});
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
        const tempDataChanged = "temp.characterSet." + input.style + ".editableRows";
        if(dataChanged === tempDataChanged){
            const temp = appManager.getTemp(tempDataChanged);
            setPairs(temp);
        }
    }});
  /***************************************************************/
    useEffect(() => {
        if(input.fontName && input.fontName !== '' && !pairs){
            const tempName = input.fontName.toLowerCase().split(" ").join("_");
            const tempStyle = input.style.toLowerCase().split(" ").join("_");

            getCharacterSetHelper(tempStyle, tempName, (d,extra) => {
                if(!input.availableStyles){
                    input.setAvailableStyles(d.availableStyles);
                }

                setExistingCharSet(d.availableStyles.includes(input.style));
                setUsingBase(null);
                handleCharactersChanged(extra["chs"]);
                appManager.setCurrentData(d);
            });
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
            <DeleteAll 
                fontName={input.fontName}
                style={input.style}
            />
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
    const handleCharactersChanged = (changedCharacters) => {
        const changed = "temp.characterSet." + input.style + ".editableRows";
        appManager.setTemp(changedCharacters, changed);
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
                            columns={characterSet.columns}
                            pairs={pairs}
                            dataName={input.dataName + "." + input.style}
                            deleteTitle="Delete Character Pair"
                            saveTitle="Save Character Pair"
                            saveMessage={characterSet.saveMessage}
                            deleteMessage={characterSet.deleteMessage}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                        />}
            </Grid>
            <Grid
                justifyContent="flex-start"
                item 
                container 
                xs={12}>
                    <ButtonGroup>
                       <SaveReset
                            style={input.style} 
                            fontName={input.fontName} 
                       />
                    </ButtonGroup>
            </Grid>
        </Grid>
    );
}
export default CharacterSetTab;
/**************************************************************/