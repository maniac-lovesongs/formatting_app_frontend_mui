import React, { useState, useEffect, useRef  } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import Admin from '../Admin/Admin.js';
import Formatter from '../Formatter/Formatter.js';
import SignUp from "../Auth/SignUp/SignUp.js";
import SignIn from "../Auth/SignIn/SignIn.js";
import { useObserver } from '../../utils/hooks/useObserver.js';
import useAuth from '../../utils/hooks/useAuth.js';
import "./AppContainer.scss";

/***************************************************************/
const AppContainer = (input) => {
    const ref = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const authHandlers = useAuth();
    /***************************************************************/
    const observerId = useObserver({
        "caller": "AppContainer",
        "callback": (dataChanged) => {
                if(dataChanged === "current_user"){
                    const temp = appManager.userLoggedIn()? {...appManager.getCurrentUser()} : null;
                    setCurrentUser(temp);
                    setIsLoggedIn(appManager.userLoggedIn());
                }  
            }
    });
    /**************************************************************/
    useEffect(() => {
        // register a listener 
        if (input.protected) {
            authHandlers.handleAuthentication(); 
        }
    }, []);
    /**************************************************************/
    const contentFactory = (isLoggedIn, currentUser) => {
        const shouldDisplayComponent = authHandlers.handleProtectedContent(input, isLoggedIn, currentUser);
        if(shouldDisplayComponent){
            if(input.parent === "admin"){
                return <Admin 
                content={input.content} 
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}/>
            }
            else if(input.parent === null){
                return <Formatter 
                isLoggedIn={isLoggedIn} 
                currentUser={currentUser}/>
            }
            else if(input.content === "auth.signup"){
                return <SignUp 
                isLoggedIn={isLoggedIn} 
                currentUser={currentUser} />
            }
            else if(input.content === "auth.signin"){
                return <SignIn
                isLoggedIn={isLoggedIn}
                currentUser={currentUser} />
            }    
            
            return null; 
        }
    }
    /***************************************************************/
    const displayContent = (isLoggedIn, currentUser) =>{
        if (input.protected) {
            // If the content is protected, wait 
            const content = isLoggedIn && contentFactory(isLoggedIn, currentUser);
            return content;
        }
        return contentFactory(isLoggedIn, currentUser);

    }
    /***************************************************************/
    return (
    <div id="main-wrapper">
        {displayContent(isLoggedIn, currentUser)}
    </div>
    );
}

export default AppContainer;
/**************************************************************/