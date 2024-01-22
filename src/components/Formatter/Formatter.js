import React, { useState, useEffect, useRef } from 'react';
import {appManager, observerManager} from "../../models/AppManager/managers.js";

/***************************************************************/
const Formatter = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [fonts, setFonts] = useState(null);
    
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                //console.log("Something interesting happened to the app, and as a listener I need to update ");
            });
            setObserverId(id);
        }

        // once the component unmounts, remove the listener
        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        };

    }, []);    
    /***************************************************************/
    return null;
    /***************************************************************/
}

export default Formatter;
/**************************************************************/