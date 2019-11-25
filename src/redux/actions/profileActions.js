import { SET_PROFILE } from "../actionTypes";

export const setProfile = user => ({
    type: SET_PROFILE,
    user: user
});
