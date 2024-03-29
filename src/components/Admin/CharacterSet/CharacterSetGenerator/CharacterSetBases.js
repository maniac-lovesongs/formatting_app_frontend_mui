import React, { useState, useEffect, useRef } from 'react';
import { useObserver, observerManager } from '../../../../utils/hooks/useObserver.js';
import { apiCall } from '../../../../utils/apiFunctions.js';
import { Grid, Select, MenuItem, Button, Chip } from "@mui/material";

/***************************************************************/
const CharacterSetBases = (input) => {
    const ref = useRef(null);
    const [bases, setBases] = useState(null);
    const [selectedBase, setSelectedBase] = useState(null);

    /***************************************************************/
    const [observerId, setObserverId] = useObserver({ 
        "caller": "CharacterSetBases",
        "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (bases === null) {
            const uri = "/api/fonts/character_sets/bases/all"
            apiCall(uri, {}, (args, d) => {
                if (d) {
                    const b = d.bases.map((b, i) => {
                        b["value"] = b.name;
                        return b;
                    });
                    setBases(b)
                    setSelectedBase(b[0]);
                }
            });
        }

        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        }; 
    }, []);
    /***************************************************************/
    const handleSelectBase = (e) => {
        const temp = bases.filter((b) => {
            return b.name === e.target.value;
        })[0];

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
                    sx={{ marginRight: "1em" }}
                    label={b.name} />
                <span className="base">{b.baseset}</span>
            </MenuItem>)
        });
    }
    /***************************************************************/
    const handleUseBase = () => {
        input.setUsingBase(selectedBase);
    }
    /***************************************************************/
    return (
        <React.Fragment>
            <Grid
                sx={{ textAlign: "left" }}
                item
                xs={12}>Base</Grid>
            <Grid
                justifyContent="flex-start"
                item
                sx={{ marginBottom: "0.5em" }}
                container
                xs={12}>
                {selectedBase && <Select
                    value={selectedBase.value}
                    label="Bases"
                    fullWidth
                    sx={{
                        marginBottom: "0.5em"
                    }}
                    onChange={handleSelectBase}
                >
                    {bases && makeBaseMenuItems()}
                </Select>}
                <Button
                    onClick={handleUseBase}
                    variant="contained"
                    name="useBase">
                    Use Base
                </Button>
            </Grid>
        </React.Fragment>
    );
}

export default CharacterSetBases;
/**************************************************************/