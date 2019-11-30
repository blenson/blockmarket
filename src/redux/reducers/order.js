import { SELECT_ORDER_ITEM } from "../actionTypes";

const initialState = {
    selected: null
};

const inventory = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ORDER_ITEM:
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
};

export default inventory;
