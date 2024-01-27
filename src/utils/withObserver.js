import React, { useState, useEffect, useRef, useCallback } from 'react';
import {appManager, observerManager} from "../models/AppManager/managers.js";

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

export default withObserver;