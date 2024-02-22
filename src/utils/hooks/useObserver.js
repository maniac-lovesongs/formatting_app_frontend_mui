import React, { useState, useEffect } from 'react';
import {appManager, observerManager} from "../../models/AppManager/managers.js";

const withObserver = (callback, observerId, setObserverId) => {
    if(observerId === null){
        const id = observerManager.registerListener(callback);
        setObserverId(id);
    }

    return () => {
        observerManager.unregisterListener(observerId);
        setObserverId(null);
    };   
}

const useObserver = (input) => {
    const [observerId,setObserverId] = useState(null);

    useEffect(() => {
        // register a listener 
        if(observerId === null){
            const id = observerManager.registerListener(input.callback);
            setObserverId(id);
        }
    }, []);
    return [observerId, setObserverId];
};

export {withObserver, useObserver, observerManager};