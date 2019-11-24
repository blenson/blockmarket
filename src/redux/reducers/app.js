import { SET_LOCALE, SET_LOGGEDINSTATUS } from "../actionTypes";

const initialState = {
    loggedIn: false,
    locale: "en"
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALE:
            return {
                ...state,
                locale: action.locale
            };
        case SET_LOGGEDINSTATUS:
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        default:
            return state;
    }
};

export default app;
