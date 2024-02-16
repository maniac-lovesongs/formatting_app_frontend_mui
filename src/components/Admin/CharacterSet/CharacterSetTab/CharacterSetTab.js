import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../../utils/hooks/useObserver.js';
import { Grid, ButtonGroup} from "@mui/material";
import Title from "../../Title/Title.js"
import {appManager} from "../../../../models/AppManager/managers.js";
import CharacterSetBases from '../old/CharacterSetBases.js';
import CharacterSetGenerator from '../old/CharacterSetGenerator.js';
import { characterSet } from '../displayTableMisc.js';
import DisplayTable from '../../../DisplayTable/DisplayTable.js';
import SaveReset from './SaveReset.js';
import DeleteAll from './DeleteAll.js';
import { apiCallPost, getCharacterSetHelper } from '../../../../utils/apiFunctions.js';
import ChangeManager from "../../../../models/ChangeManager/ChangeManager.js"
import { capitalize } from "../utils.js";
import { makePathName } from "../../../DisplayTable/utils.js";
import { initCharacterSet, handleReset, handleAvailableStylesChange, handleCharactersChanged } from './utils.js';


/***************************************************************/
const CharacterSetTab = (input) => {
    const ref = useRef(null);
    const [usingBase, setUsingBase] = useState(null);
    const [pairs, setPairs] = useState(null);
    const [existingCharSet, setExistingCharSet] = useState(false);
    const [changes, setChanges] = useState(new ChangeManager());
    const [rowModesModel, setRowModesModel] = useState({});
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
        const tempDataChanged = makePathName(["characterSet", 
        input.style, 
        "editableRows"]);
        const tempDataChangedRowModesModel =  makePathName(["characterSet", 
        input.style, 
        "rowModesModel"]);
        if(dataChanged === tempDataChanged){
            const temp = appManager.getTemp(tempDataChanged);
            setPairs(temp);
        }
        else if(dataChanged === tempDataChangedRowModesModel){
            const temp = appManager.getTemp(tempDataChangedRowModesModel);
            setRowModesModel(temp);
        }
    }});
  /***************************************************************/
    useEffect(() => {
        if(input.fontName && input.fontName !== '' && !pairs){
            const tempName = input.fontName.toLowerCase().split(" ").join("_");
            const tempStyle = input.style.toLowerCase().split(" ").join("_");

            getCharacterSetHelper(tempStyle, tempName, (d,extra) => {
                initCharacterSet(d, extra.chs, {
                    "availableStyles": input.availableStyles, 
                    "setAvailableStyles": input.setAvailableStyles,
                    "setExistingCharSet": setExistingCharSet,
                    "setUsingBase": setUsingBase,
                    "style": input.style, 
                });
            });
        };
    }, []);
    /***************************************************************/
    const handleSave = () => {
        const changeData = changes.getChanges();
        const sortedKeys = Object.keys(changeData).sort((a, b) => a - b).reverse();
        const tempName = input.fontName.toLowerCase().split(" ").join("_");
        const tempStyle = input.style.toLowerCase().split(" ").join("_");
        
        sortedKeys.forEach((k) => {
            if (changeData[k].change === "create new character set") {
                const uri = "/api/fonts/character_sets/create/font/" + tempName + "/style/" + tempStyle;
                const postData = { "pairs": changeData[k].data.pairs };
                apiCallPost(uri, {}, postData, (args, d) => {
                    if (d && d.success) {
                        console.log(d);
                        input.setAvailableStyles(d.availableStyles);

                        const chs = [];
                        Object.keys(d.chs).forEach((v) => {
                            chs.push(d.chs[v]);
                        });

                        setExistingCharSet(d.availableStyles.includes(input.style));
                        setUsingBase(null);

                        appManager.setReset(chs, makePathName(["characterSet",
                            input.style,
                            "editableRows"]));
                        handleCharactersChanged(chs);
                    }
                });

            }
        });
    }
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
                    changes={changes}
                    setChanges={setChanges}
                    fontName={input.fontName}
                    pairs={pairs}
                    style={input.style}
                />}
            </React.Fragment>);
        }
        return (
            <DeleteAll 
                handleAvailableStylesChange={(styles) => {
                    handleAvailableStylesChange(styles, {
                        "style": input.style, 
                        "setAvailableStyles": input.setAvailableStyles, 
                        "setExistingCharSet": setExistingCharSet
                    });
                }}
                fontName={input.fontName}
                style={input.style}
            />        
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
                            columns={characterSet.columns}
                            pairs={pairs}
                            dataName={input.dataName + "." + input.style}
                            deleteTitle="Delete Character Pair"
                            saveTitle="Save Character Pair"
                            saveMessage={characterSet.saveMessage}
                            managed={true}
                            successMessageDelete={characterSet.successMessageDelete}
                            successMessageSave={characterSet.successMessageSave}
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
                            resetHandler={() => {
                                handleReset({
                                    "style": input.style,
                                });
                            }}
                            saveHandler={handleSave}
                            style={input.style} 
                            changes={changes}
                            setChanges={setChanges}
                            fontName={input.fontName} 
                       />
                    </ButtonGroup>
            </Grid>
        </Grid>
    );
}
export default CharacterSetTab;
/**************************************************************/