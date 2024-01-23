import React, { useState, useEffect, useRef } from 'react';
import { appManager, observerManager } from "../../models/AppManager/managers.js";
import "./DebugBox.scss";

/***************************************************************/
const DebugBox = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [appState, setAppState] = useState({});
    const [string, setString] = useState({string: null, cursor: [0,0]});
    const [selectionMade, setSelectionMade] = useState(false);

    /***************************************************************/
    useEffect(() => {
        // register a listener 
        setString(appManager.string);
        setAppState(appManager.getState());
        setSelectionMade(appManager.getSelectionMade());

        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                if (dataChanged === "string") {
                    setString(appManager.string.snapshot());
                }
            
                if (dataChanged === "state") {
                    setAppState(appManager.getState());
                }

                if (dataChanged === "selectionMade") {
                    setSelectionMade(appManager.getSelectionMade());
                }
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
    return (
        <div
            ref={ref}
            className='debug-box'>
            <ul>
                <li>
                    <span className='name'>Font</span>
                    <span className='value'>{appState.font}</span>
                </li>
                <li>
                    <span className='name'>Style</span>
                    <span className='value'>{appState.style}</span>
                </li>
                <li>
                    <span className='name'>Selection Made</span>
                    <span className='value'>{selectionMade? "true" : "false"}</span>
                </li>
                <li>
                    <span className='name'>Cursor</span>
                    <span className='value'>({string.cursor[0]},{string.cursor[1]})</span>
                </li>
            </ul>
        </div>
    );
}

export default DebugBox;
/***************************************************************/