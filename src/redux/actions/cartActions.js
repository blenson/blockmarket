import { ADD_TO_CART, DEC_CART_ITEM_COUNT, INC_CART_ITEM_COUNT, REMOVE_FROM_CART, CLEAR_CART } from "../actionTypes";

export const addToCart = item => ({
    type: ADD_TO_CART,
    item: item
});

export const removeFromCart = itemid => ({
    type: REMOVE_FROM_CART,
    id: itemid
});

export const decCartItemCount = itemid => ({
    type: DEC_CART_ITEM_COUNT,
    id: itemid
});

export const incCartItemCount = itemid => ({
    type: INC_CART_ITEM_COUNT,
    id: itemid
});

export const clearCart = () => ({
    type: CLEAR_CART
});
