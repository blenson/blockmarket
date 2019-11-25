import { ADD_TO_CART, DEC_CART_ITEM_COUNT, INC_CART_ITEM_COUNT, REMOVE_FROM_CART } from "../actionTypes";

const initialState = {
    allIds: [],
    items: {},
    totalItems: 0,
    totalPrice: 0
};

const cart = (state = initialState, action) => {
    const iditem = state.items[action.id];

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.item;
            const existingItem = state.items[item._id];
            const count = existingItem ? existingItem.count + 1 : 1;
            const newIds = existingItem ? [...state.allIds] : [...state.allIds, item._id];
            return {
                ...state,
                allIds: newIds,
                items: { ...state.items, [item._id]: { data: item, count: count } },
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + parseFloat(action.item.price.$numberDecimal)
            };
        case DEC_CART_ITEM_COUNT:
            if (!iditem || iditem.count === 0) {
                return state;
            }
            return {
                ...state,
                items: { ...state.items, [iditem.data._id]: { data: iditem.data, count: iditem.count - 1 } },
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - parseFloat(iditem.data.price.$numberDecimal)
            };
        case INC_CART_ITEM_COUNT:
            if (!iditem) {
                return state;
            }
            return {
                ...state,
                items: { ...state.items, [iditem.data._id]: { data: iditem.data, count: iditem.count + 1 } },
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + parseFloat(iditem.data.price.$numberDecimal)
            };
        case REMOVE_FROM_CART:
            if (!iditem) {
                return state;
            }
            return {
                ...state,
                totalItems: state.totalItems - iditem.count,
                totalPrice: state.totalPrice - (iditem.count * parseFloat(iditem.data.price.$numberDecimal)),
                allIds: state.allIds.filter(el => {
                    return el != action.id;
                }),
                items: state.items.filter(el => {
                    return state.items[el] != action.id;
                })
            };
        default:
            return state;
    }
};

export default cart;
