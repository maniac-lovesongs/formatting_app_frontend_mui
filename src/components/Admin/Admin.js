import React, { useState, useEffect, useRef } from 'react';
import { appManager, observerManager } from "../../models/AppManager/managers.js";
import { useObserver } from '../../utils/hooks/useObserver.js';
import Dashboard from "./Dashboard/Dashboard.js";
import CreateNewFont from './Font/CreateNewFont.js';
import Main from "./Main/Main.js";
import Fonts from "./Fonts/Fonts.js";
import Font from "./Font/Font.js";
import ViewAllRoles from './Role/ViewAllRoles.js';
import ViewAllUsers from './User/ViewAllUsers.js';
import "./Admin.scss";

/***************************************************************/
const Admin = (input) => {
    const ref = useRef(null);
    /***************************************************************/
    const [observerId, setObserverId] = useObserver({"callback": (dataChanged) => {}});
    /***************************************************************/
    useEffect(() => {
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
        else if(input.content === "admin.fonts.create")
            return <CreateNewFont/>
        else if(input.content === "admin.roles.all")
            return <ViewAllRoles/>
        else if(input.content === "admin.users.all")
            return <ViewAllUsers/>
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