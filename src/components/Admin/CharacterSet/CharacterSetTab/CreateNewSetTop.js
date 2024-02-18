import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../../utils/hooks/useObserver.js';
import CharacterSetBases from '../old/CharacterSetBases.js';
import CharacterSetGenerator from '../old/CharacterSetGenerator.js';

/***************************************************************/
const CreateNewSetTop = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {}});
  /***************************************************************/
    useEffect(() => {}, []);
    /***************************************************************/
    return(                
        <React.Fragment>
            <CharacterSetBases
                setUsingBase={input.setUsingBase}
                usingBase={input.usingBase}
            />
           {input.usingBase && <CharacterSetGenerator
                usingBase={input.usingBase}
                setUsingBase={input.setUsingBase}
                setPairs={input.setPairs}
                changes={input.changes}
                setChanges={input.setChanges}
                fontName={input.fontName}
                pairs={input.pairs}
                style={input.style}
            />}
        </React.Fragment>);
}
export default CreateNewSetTop;
/**************************************************************/