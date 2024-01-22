import React, { useState, useEffect, useRef } from 'react';
import { observerManager } from "../../models/AppManager/managers.js";
import Admin from '../Admin/Admin.js';
import "./AppContainer.scss";

/***************************************************************/
const AppContainer = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
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
    /**************************************************************/
    const contentFactory = () => {
        if(input.parent === "admin"){
            return <Admin content={input.content}/>
        }
        return null; 
    }
    /***************************************************************/
    return (
        <div id="main-wrapper">
            {contentFactory()}
        </div>
    );
}

export default AppContainer;
/**************************************************************/