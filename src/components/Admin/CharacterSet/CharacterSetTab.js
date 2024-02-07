import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { Grid } from "@mui/material";
import Title from "../Title/Title.js";
import {appManager} from "../../../models/AppManager/managers.js";
import CharacterSetBases from '../CharacterSet/CharacterSetBases.js';
import CharacterSetGenerator from '../CharacterSet/CharacterSetGenerator.js';
import DisplayTable from '../CharacterSet/DisplayTable.js';
import { apiCall } from '../../../utils/apiFunctions.js';
import {capitalize} from "./utils.js";

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
            if (d.characters) {
                const chs = [];
                Object.keys(d.characters).forEach((v) => {
                    chs.push(d.characters[v]); 
                });
            setUsingBase(null);
            setPairs(chs);
        } 
    });}
  /***************************************************************/
    useEffect(() => {
        if(input.fontName !== ''){
            const tempName = input.fontName.toLowerCase().split(" ").join("_");
            const uri = "/api/fonts/" + tempName + "/exists";

            apiCall(uri, {}, (args, d) => {
                setExistingCharSet(d.font && d.font.styles.includes(input.style));

                if(d && d.exists && d.font.styles.includes(input.style)){
                    const tempStyle = input.style.toLowerCase().split(" ").join("_");
                    getCharacterSetHelper(tempStyle, tempName);
                }
            });
        };
    }, []);
    /***************************************************************/
    const makeTopPart = () => {
        if(!existingCharSet){
            return(                
            <React.Fragment>
                <CharacterSetBases
                    setUsingBase={setUsingBase}
                    usingBase={usingBase}
                />
                <CharacterSetGenerator
                    usingBase={usingBase}
                    setUsingBase={setUsingBase}
                    setPairs={setPairs}
                    pairs={pairs}
                    style={input.style}
                />
            </React.Fragment>);
        }
        return null; 
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
                    {makeTopPart()}
            </Grid>
            <Grid
                justifyContent="flex-start"
                item 
                container 
                xs={12}>
                  {pairs &&  <DisplayTable
                        usingBase={usingBase}
                        usingStyle={input.style}
                        setPairs={setPairs}
                        pairs={pairs}
                        rowModesModel={rowModesModel}
                        setRowModesModel={setRowModesModel}
                    />}
            </Grid>
        </Grid>
    );
}
export default CharacterSetTab;
/**************************************************************/