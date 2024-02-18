import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../../utils/hooks/useObserver.js';
import { Grid } from "@mui/material";
import Title from "../../Title/Title.js"
import {appManager} from "../../../../models/AppManager/managers.js";
import CreateNewSetTop from './CreateNewSetTop.js';
import { characterSet } from '../displayTableMisc.js';
import DisplayTable from '../../../DisplayTable/DisplayTable.js';
import SaveReset from './SaveReset.js';
import DeleteAll from '../../DeleteAll/DeleteAll.js';
import { getCharacterSetHelper } from '../../../../utils/apiFunctions.js';
import ChangeManager from "../../../../models/ChangeManager/ChangeManager.js"
import { makePathName } from "../../../DisplayTable/utils.js";
import { initCharacterSet, uriFriendlyString, makeTitle } from './utils.js';
import { processFontName } from '../../../../utils/utils.js';
import { handleAvailableStylesChange, handleReset, handleSave, handleDelete} from "./handlers.js";


/***************************************************************/
const CharacterSetTab = (input) => {
    console.log('The new character set tab that we just created launched')
    const ref = useRef(null);
    const [usingBase, setUsingBase] = useState(null);
    const [pairs, setPairs] = useState(null);
    const [existingCharSet, setExistingCharSet] = useState(false);
    const [changes, setChanges] = useState(new ChangeManager());
    const [rowModesModel, setRowModesModel] = useState({});

    /***************************************************************/
    const deleteHelper = {
        "makeSuccessMessage": (s,f) => {
            return (<span> You are about to delete all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. Are you sure you 
            want to do this?</span>)
        },
        "makeMesssage": (s,f) => {
            return (
            <span>
                You are about to delete all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. Are you sure you 
                want to do this?
            </span>);
        },
        "onClickHandler": (e,setOpen, handleSuccess) => {
            handleDelete(e,input,setOpen,handleSuccess);
        },
        "handleAvailableStylesChange": (styles) => {
            handleAvailableStylesChange(styles, input, setExistingCharSet);
        }
    };
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
        const tempDataChanged = makePathName(["characterSet", input.style, "editableRows"]);
        const tempDataChangedRowModesModel =  makePathName(["characterSet", input.style, "rowModesModel"]);
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
            const tempName = uriFriendlyString(input.fontName);
            const tempStyle = uriFriendlyString(input.style);

            getCharacterSetHelper(tempStyle, tempName, (d,extra) => {
                initCharacterSet(d, extra.chs, input, setExistingCharSet, setUsingBase);
            });
        };
    }, []);
    /***************************************************************/
    const makeTopPart = (usingBase) => {
        if(!existingCharSet){
            return(<CreateNewSetTop 
                        setUsingBase={setUsingBase}
                        usingBase={usingBase}
                        setPairs={setPairs}
                        changes={changes}
                        setAvailableStyles={input.setAvailableStyles}
                        availableStyles={input.availableStyles}
                        setChanges={setChanges}
                        fontName={input.fontName}
                        pairs={pairs}
                        style={input.style}/>);
        }
        return (
            <DeleteAll 
                handleAvailableStylesChange={deleteHelper.handleAvailableStylesChange}
                fontName={input.fontName}
                successMessage={deleteHelper.makeSuccessMessage(input.style,input.fontName)}
                setAvailableStyles={input.setAvailableStyles}
                onClickHandler={deleteHelper.onClickHandler}
                message={deleteHelper.makeMesssage(input.style,input.fontName)}
                style={input.style}
            />        
        ); 
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
                <Title>{makeTitle(input.style)}</Title>
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
                            updater={(tempChars) => {
                                const tempStyle = uriFriendlyString(input.style);
                                changes.addChange({
                                    "change": "update",
                                    "data": {
                                        "font": input.fontName,
                                        "style": tempStyle,
                                        "pairs": tempChars,
                                    }
                                });
                                console.log(changes);
                                setChanges(changes.clone());
                            }}
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
                    <SaveReset
                        resetHandler={() => {handleReset(input)}}
                        saveHandler={() => {handleSave(input,changes,setExistingCharSet, setUsingBase)}}
                        style={input.style} 
                        setAvailableStyles={input.setAvailableStyles}
                        availableStyles={input.availableStyles}
                        changes={changes}
                        setChanges={setChanges}
                        fontName={input.fontName} 
                    />
            </Grid>
        </Grid>
    );
}
export default CharacterSetTab;
/**************************************************************/