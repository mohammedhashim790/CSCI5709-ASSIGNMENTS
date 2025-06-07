import {applyMiddleware, createStore} from 'redux';
import { reducer } from './reducer';
import {thunk} from "redux-thunk";

export const datastore = createStore(
    reducer,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
