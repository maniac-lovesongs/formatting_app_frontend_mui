import React, { useState, useEffect, useRef } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {appManager, observerManager} from "../../models/AppManager/managers.js";
import utils from "../../utils/utils.js";
import "./Pagination.scss";
  
/***************************************************************/
const MyPagination = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [counts, setCounts] = useState(null);

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
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        const link = utils.make_backend("/api/all");
        fetch(link).then((res) =>
            res.json().then((data) => {
                setCounts(data);
            })
        );
    }, []);
    /***************************************************************/
    return (<Pagination count={22} variant="outlined" shape="rounded" />);
    /***************************************************************/
}

export default MyPagination;
/**************************************************************/