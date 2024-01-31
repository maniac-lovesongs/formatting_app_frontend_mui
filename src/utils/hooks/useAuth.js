import React, { useState, useEffect, useRef, Children } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import { apiCallPost } from '../apiFunctions.js';
import constants from '../constants.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

/***************************************************************/
const useAuth = (input) => {
    const navigate = useNavigate();

    /***************************************************************/
    const handleAuthentication = (input) => {    
        if(!appManager.userLoggedIn()){
            const token = Cookies.get("instastylr"); 
            const user = Cookies.get("instastylr_user");
            const sessionKey = sessionStorage.getItem("instastylr_logged_in");
            if(sessionKey === "true"){
                return true;    
            }
            else if(token === undefined || user === undefined ){
                appManager.setCurrentUser(null);
                navigate(constants.SIGN_IN_ROUTE);
            }
            else if(token !== undefined && user !== undefined){
                // Check to make sure this is valid on the server
                const uri = "/api/auth/validateCookie";
                const postData = {"username": user, "token": token};
                apiCallPost(uri, {}, postData, (args,d) => {
                    if(d && d.logged_in){
                        const tempUser = {...d.user};
                        const loggedInUser = appManager.getCurrentUser();
                        if(loggedInUser === null || loggedInUser.username !== tempUser.username)
                            appManager.setCurrentUser(tempUser);
                    }
                    else{
                        // if the token is invalid, then navigate to the login route
                        if(d && d.actions){
                            appManager.setCurrentUser(null);
                            Cookies.remove("instastylr");
                            Cookies.remove("instastylr_user");
                            sessionStorage.removeItem("instastylr_logged_in");
                        }

                        navigate(constants.SIGN_IN_ROUTE);
                    }
                });
            }
        }    
    };
    /**************************************************************/
    const logout = () => {
        appManager.setCurrentUser(null);
        Cookies.remove("instastylr");
        Cookies.remove("instastylr_user");
        sessionStorage.removeItem("instastylr_logged_in");
        navigate(constants.SIGN_IN_ROUTE);
    }
    /**************************************************************/
    const attemptLogin = (event) => {
        const data = new FormData(event.currentTarget);
        const postData = {
          username: data.get('username'),
          password: data.get('password')
        };
    
        apiCallPost("/api/auth/login", {}, postData,(args,d) => {
            if(d && d.login){
                d.cookies.forEach((cookie) => {
                    Cookies.set(cookie.key, cookie.value);
                });
                sessionStorage.setItem("instastylr_logged_in", "true");
                appManager.setCurrentUser(d.user);
                navigate(constants.DASHBOARD_ROUTE);
            }
        });
    }
    /**************************************************************/
    const handleProtectedContent = (input, isLoggedIn, currentUser) => 
    {
        const validCases = {};
        validCases["notProtected"] = !input.protected;
        validCases["protectedGeneral"] = input.protected && isLoggedIn; 
        validCases["protectedAdmin"] = validCases.protectedGeneral && currentUser.role_id === 1;
        return validCases.notProtected || validCases.protectedAdmin || validCases.protectedGeneral;
    }
    /***************************************************************/
    const handlers = {
        "handleProtectedContent": handleProtectedContent, 
        "logout": logout, 
        "attemptLogin": attemptLogin, 
        "handleAuthentication": handleAuthentication
    }
    /***************************************************************/
    return handlers;
}

export default useAuth;
/**************************************************************/