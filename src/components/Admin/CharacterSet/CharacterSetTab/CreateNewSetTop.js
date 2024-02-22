import React, { useState, useEffect, useRef } from 'react';
import { useObserver, observerManager } from '../../../../utils/hooks/useObserver.js';
import CharacterSetBases from '../CharacterSetGenerator/CharacterSetBases.js';
import CharacterSetGenerator from '../CharacterSetGenerator/CharacterSetGenerator.js';
import appManager from '../../../../models/AppManager/AppManager.js';

/***************************************************************/
const CreateNewSetTop = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const [observerId, setObserverId] = useObserver({
        "caller": "CreateNewSetTop",
        "callback": (dataChanged) => {}}
    );
  /***************************************************************/
    useEffect(() => {
        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        }; 
    }, 
    []);
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