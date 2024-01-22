import React, { useState, useEffect, useRef } from 'react';
import { appManager, observerManager } from "../../models/AppManager/managers.js";
import Dashboard from "./Dashboard/Dashboard.js";
import Main from "./Main/Main.js";
import Fonts from "./Fonts/Fonts.js";
import CharacterSet from './CharacterSet/CharacterSet.js';
import Font from "./Font/Font.js";
import "./Admin.scss";

/***************************************************************/
const Admin = (input) => {
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
    /***************************************************************/
    const contentFactory = () => {
        if(input.content === "admin.main")
            return <Main />
        else if(input.content === "admin.fonts.all")
            return <Fonts />
        else if(input.content === "admin.fonts.id")
            return <Font/>
        else if(input.content === "admin.fonts.chars")
            return <CharacterSet/>
        return null;
    }
    /***************************************************************/
    return (
        <div id="admin-wrapper">
            <Dashboard>
                {contentFactory()}
            </Dashboard>
        </div>
    );
    /***************************************************************/
}

export default Admin;
/**************************************************************/