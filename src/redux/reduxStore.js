import { createStore } from "redux";
import rootReducer from "./reducers";
import store from 'store';

const STATENAME = 'HVS_State';
const persistedState = store.get(STATENAME);
const reduxStore = createStore(rootReducer, persistedState);

reduxStore.subscribe(() => {
    store.set(STATENAME, reduxStore.getState());
})

export default reduxStore;
