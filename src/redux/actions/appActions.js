import { SET_LOCALE, SET_LOGGEDINSTATUS } from "../actionTypes";

export const setLocale = content => ({
    type: SET_LOCALE,
    locale: content
});

export const setLoggedInStatus = loggedIn => ({
    type: SET_LOGGEDINSTATUS,
    loggedIn: loggedIn
});

