import { combineReducers } from 'redux';

import app from './app'
import profile from './profile'
import cart from './cart'

const rootReducer = combineReducers({
    app,
    profile,
    cart
})

export default rootReducer;
