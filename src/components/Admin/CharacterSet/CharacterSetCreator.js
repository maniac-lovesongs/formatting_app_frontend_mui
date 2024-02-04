import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import CharacterSetBases from './CharacterSetBases.js';
import { Grid, Select, MenuItem, Button, ButtonGroup, Chip } from "@mui/material";
import "./CharacterSet.scss";

/***************************************************************/
const CharacterSetCreator = (input) => {
    const ref = useRef(null);
    const [bases, setBases] = useState(null);
    const [selectedBase, setSelectedBase] = useState(null);

    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (bases === null) {
            const uri = "/api/fonts/character_sets/bases/all"
            apiCall(uri, {}, (args, d) => {
                if (d) {
                    console.log(d);
                    setBases(d.bases)
                    setSelectedBase(d.bases[0]);
                }
            });

        }
    }, []);
    /***************************************************************/
    const handleSelectBase = (e) => {
        const dataset = Object.keys(e.explicitOriginalTarget.dataset);
        const temp = { "value": e.target.value };
        dataset.forEach((k) => {
            temp[k] = e.explicitOriginalTarget.dataset[k];
        });
        setSelectedBase(temp);
    }
    /***************************************************************/
    const makeBaseMenuItems = () => {
        return bases.map((b) => {
            return (<MenuItem
                data-baseset={b.baseset}
                data-id={b.id}
                value={b.name}>
                <Chip
                    sx={{marginRight: "1em"}} 
                    label={b.name}/>
                <span className="base">{b.baseset}</span>
            </MenuItem>)
        });
    }
    /***************************************************************/
    return (
    <React.Fragment> 
            <CharacterSetBases/>
    </React.Fragment>
    );
}

export default CharacterSetCreator;
/**************************************************************/