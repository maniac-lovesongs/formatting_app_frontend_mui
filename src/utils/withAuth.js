import React, { useState, useEffect, useRef } from 'react';
import {apiCallPost} from './apiFunctions';
import {appManager} from "../models/AppManager/managers.js";
import constants from "./constants.js";
import Cookies from 'js-cookie';

const useAuth = (input) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    if(!appManager.userLoggedIn()){
        const token = Cookies.get("instastylr"); 
        const user = Cookies.get("instastylr_user");


        if(token === undefined || user === undefined ){
            appManager.setCurrentUser(null);
            //navigate(constants.SIGN_IN_ROUTE);
        }
        else if(token !== undefined && user !== undefined){
            /*console.log("We found an access token for instastylr");
            console.log(token);
            console.log(user);*/
            // Check to make sure this is valid on the server
            const uri = "/validateCookie";
            const postData = {"username": user, "token": token};
            apiCallPost(uri, {}, postData, (args,d) => {
                if(d && d.logged_in){
                    user = {...d.user};
                    const loggedInUser = appManager.getCurrentUser();
                    if(loggedInUser === null || loggedInUser.username !== user.username)
                        appManager.setCurrentUser(user);
                    
                }
                else{
                    // if the token is invalid, then navigate to the login route
                    //navigate(constants.SIGN_IN_ROUTE);
                }
            });
        }
    }    
};

const doAuth = (navigate) => {
    if(!appManager.userLoggedIn()){
        const token = Cookies.get("instastylr"); 
        const user = Cookies.get("instastylr_user");


        if(token === undefined || user === undefined ){
            appManager.setCurrentUser(null);
            //navigate(constants.SIGN_IN_ROUTE);
        }
        else if(token !== undefined && user !== undefined){
            /*console.log("We found an access token for instastylr");
            console.log(token);
            console.log(user);*/
            // Check to make sure this is valid on the server
            const uri = "/validateCookie";
            const postData = {"username": user, "token": token};
            apiCallPost(uri, {}, postData, (args,d) => {
                if(d && d.logged_in){
                    user = {...d.user};
                    const loggedInUser = appManager.getCurrentUser();
                    if(loggedInUser === null || loggedInUser.username !== user.username)
                        appManager.setCurrentUser(user);
                    
                }
                else{
                    // if the token is invalid, then navigate to the login route
                   // navigate(constants.SIGN_IN_ROUTE);
                }
            });
        }
    }
}

const logout = () => {
    appManager.setCurrentUser(null);
    Cookies.remove("instastylr");
    Cookies.remove("instastylr_user");
    //navigate(constants.SIGN_IN_ROUTE);
}

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
        }
    });
}

const handleProtectedContent = (Component, isLoggedIn) => {
    /*const validCredentials = input.protected && isLoggedIn;
    if(!input.protected || validCredentials){
        return <Component/>
    }
    else{
        //navigate(constants.SIGN_IN_ROUTE);
    } */
}

export {attemptLogin, doAuth, logout, handleProtectedContent};