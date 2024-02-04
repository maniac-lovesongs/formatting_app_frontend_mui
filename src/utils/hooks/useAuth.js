import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../models/AppManager/managers.js";
import { apiCallPost } from '../apiFunctions.js';
import constants from '../constants.js';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

/***************************************************************/
const useAuth = (input) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userKey = constants.APP_NAME + "_user";
    const loggedInKey = constants.APP_NAME + "_logged_in";
    /***************************************************************/
    const handleAuthentication = (input) => {    
        if(!appManager.userLoggedIn()){
            const token = Cookies.get(constants.APP_NAME); 
            const user = Cookies.get(userKey);
            const sessionKey = sessionStorage.getItem(loggedInKey);

            if(sessionKey){
                const userData = JSON.parse(sessionKey);
                appManager.setCurrentUser(userData);
                return true;    
            }
            else if(token === undefined || user === undefined ){
                navigate(constants.SIGN_IN_ROUTE);
            }
            else if(token !== undefined && user !== undefined){
                // Check to make sure this is valid on the server
                const uri = "/api/auth/validateCookie";
                const postData = { "username": user, "token": token };
                
                apiCallPost(uri, {}, postData, (args,d) => {
                    if(d && d.logged_in){
                        const tempUser = {...d.user};
                        appManager.setCurrentUser(tempUser);
                    }
                    else{
                        // if the token is invalid, then navigate to the login route
                        if(d && d.actions){
                            appManager.setCurrentUser(null);
                            Cookies.remove(constants.APP_NAME);
                            Cookies.remove(userKey);
                            sessionStorage.removeItem(loggedInKey);
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
        Cookies.remove(constants.APP_NAME);
        Cookies.remove(userKey);
        sessionStorage.removeItem(loggedInKey);
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
                    Cookies.set(cookie.key, cookie.value, { expires: cookie.expiration });
                });
                sessionStorage.setItem(loggedInKey, JSON.stringify(d.user));
                appManager.setCurrentUser(d.user);
                navigate(constants.DASHBOARD_ROUTE);
            }
        });
    }
    /**************************************************************/
    const handleProtectedContent = (input, isLoggedIn, currentUser) => {
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