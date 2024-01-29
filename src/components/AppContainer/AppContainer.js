import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import Admin from '../Admin/Admin.js';
import Formatter from '../Formatter/Formatter.js';
import SignUp from "../Auth/SignUp/SignUp.js";
import SignIn from "../Auth/SignIn/SignIn.js";
import { useObserver } from '../../utils/hooks/useObserver.js';
import "./AppContainer.scss";

/***************************************************************/
const AppContainer = (input) => {
    const ref = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged)=>{
        if(dataChanged === "current_user"){
            const temp = appManager.userLoggedIn()? {...appManager.getCurrentUser()} : null;
            setCurrentUser(temp);
            setIsLoggedIn(appManager.userLoggedIn());
        }
    }});
    /***************************************************************/
    useEffect(() => {
        //
    }, []);
    /**************************************************************/
    const contentFactory = () => {
        if(input.parent === "admin"){
            return <Admin content={input.content}/>
        }
        else if(input.parent === null){
            return <Formatter/>
        }
        else if(input.content === "auth.signup"){
            return <SignUp />
        }
        else if(input.content === "auth.signin"){
            return <SignIn/>
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