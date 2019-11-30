import { ADD_TO_INVENTORY, SET_INV_ITEM_COUNT, SET_INV_ITEM, REMOVE_FROM_INVENTORY, SELECT_INV_ITEM } from "../actionTypes";

const initialState = {
    allIds: [],
    items: {},
    selected: null
};

const inventory = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_INVENTORY:
            const item = action.item;
            const existingItem = state.items[item._id];
            const count = existingItem ? existingItem.count + 1 : 1;
            const newIds = existingItem ? [...state.allIds] : [...state.allIds, item._id];
            return {
                ...state,
                allIds: newIds,
                items: { ...state.items, [item._id]: { data: item, count: count } }
            };
        case SELECT_INV_ITEM:
            return {
                ...state,
                selected: action.payload
            };
        case SET_INV_ITEM_COUNT:
            const payload = action.payload; // id, count

            const iditem = state.items[payload.id];

            if (!iditem || iditem.count === 0) {
                return state;
            }
            return {
                ...state,
                items: { ...state.items, [iditem.data._id]: { data: iditem.data, count: payload.count } }
            };
        case SET_INV_ITEM:
            const invItem = state.items[action.item._id];

            if (!invItem) {
                return state;
            }
            return {
                ...state,
                items: { ...state.items, [invItem.data._id]: { data: item.data, count: invItem.count } }
            };
        case REMOVE_FROM_INVENTORY:
            if (!action.id) {
                return state;
            }
            return {
                ...state,
                allIds: state.allIds.filter(el => {
                    return el !== action.id;
                }),
                items: state.items.filter(el => {
                    return state.items[el] !== action.id;
                })
            };
        default:
            return state;
    }
};

export default inventory;
