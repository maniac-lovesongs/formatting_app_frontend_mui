import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../../utils/hooks/useObserver.js';
import { apiCall, apiCallPost } from "../../../../utils/apiFunctions.js";
import CharacterSetInputBox from './CharacterSetInputBox.js';
import CharacterSetBases from "./CharacterSetBases.js";

/***************************************************************/
const CharacterSetGenerator = (input) => {
    const ref = useRef(null);
    const [value, setValue] = useState("");
    const [changeId, setChangeId] = useState(null);

    /***************************************************************/
    const observerId = useObserver({ "callback": (dataChanged) => { } });
    /***************************************************************/
    useEffect(() => {
    }, []);
    /***************************************************************/
    return (
        <React.Fragment>
            <CharacterSetBases
                setUsingBase={input.setUsingBase}
                usingBase={input.usingBase}
            />
            {input.usingBase && <CharacterSetInputBox
                usingBase={input.usingBase}
                setUsingBase={input.setUsingBase}
                setPairs={input.setPairs}
                changes={input.changes}
                setChanges={input.setChanges}
                fontName={input.fontName}
                pairs={input.pairs}
                style={input.style}
            />}
        </React.Fragment>
    );
}

export default CharacterSetGenerator;
/**************************************************************/