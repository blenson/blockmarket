import { combineReducers } from 'redux';

import app from './app'
import profile from './profile'
import cart from './cart'
import inventory from './inventory'
import order from './order'

const rootReducer = combineReducers({
    app,
    profile,
    cart,
    inventory,
    order
})

export default rootReducer;
