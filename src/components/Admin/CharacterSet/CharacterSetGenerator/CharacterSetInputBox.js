import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../../utils/apiFunctions.js";
import { Grid, TextField, Button } from "@mui/material";

/***************************************************************/
const CharacterSetInputBox = (input) => {
    const ref = useRef(null);
    const [value, setValue] = useState("");
    const [changeId, setChangeId] = useState(null);

    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
    }, []);
    /***************************************************************/
    const handleInput = (e) => {
        setValue(e.target.value);
    }
    /***************************************************************/
    const generateFont = () => {
        const tempStyle = input.style.toLowerCase().split(" ").join("_");
        const postData = {
            "alpha": value,
            "baseset": input.usingBase.baseset,
            "fontName": input.fontName,
            "style": tempStyle,
            "name": input.usingBase.name
        };

        const uri = "/api/fonts/character_sets/generate";

        apiCallPost(uri, {}, postData, ({ }, d) => {
            if (d && d.success) {
                const chs = [];
                Object.keys(d.pairs).forEach((v, i) => {
                    d.pairs[v]["id"] = i;
                    chs.push(d.pairs[v]);
                });
                input.setPairs(chs);

                const tempId = input.changes.addChange({
                    "change": "create new character set",
                    "data": {
                        "font": input.fontName,
                        "style": tempStyle,
                        "pairs": chs,
                    }
                });

                setChangeId(tempId);
                input.setChanges(input.changes.clone());
            }
            else if (!d.success) {
                input.setPairs(null);
            }
        });
    }
    /***************************************************************/
    return (
        <React.Fragment>
            <Grid item container xs={12}>
                {input.usingBase && <div className="using-base">
                    Using {input.usingBase.name}
                </div>}
            </Grid>
            <Grid item container xs={12}>
                <TextField
                    fullWidth
                    name="fontGenerator"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={handleInput}
                    value={value}
                />
                <Button
                    sx={{
                        marginTop: "1em",
                        marginBottom: "1em"
                    }}
                    onClick={generateFont}
                    variant="contained">
                    Generate
                </Button>
            </Grid>
        </React.Fragment>
    );
}

export default CharacterSetInputBox;
/**************************************************************/