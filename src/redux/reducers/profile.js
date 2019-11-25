import { SET_PROFILE } from "../actionTypes";

const initialState = {
    user: null
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};

export default profile;
