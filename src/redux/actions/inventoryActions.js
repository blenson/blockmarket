import { ADD_TO_INVENTORY, SET_INV_ITEM_COUNT, SET_INV_ITEM, REMOVE_FROM_INVENTORY, SELECT_INV_ITEM } from "../actionTypes";

export const addToInventory = item => ({
    type: ADD_TO_INVENTORY,
    item: item
});

export const selectInvItem = payload => ({
    type: SELECT_INV_ITEM,
    payload: payload
});

export const setInvItemCount = payload => ({
    type: SET_INV_ITEM_COUNT,
    payload: payload
});

export const setInvItem = item => ({
    type: SET_INV_ITEM,
    item: item
});

export const removeFromInventory = itemid => ({
    type: REMOVE_FROM_INVENTORY,
    itemid: itemid
});


