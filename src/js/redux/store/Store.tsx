import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from "../reducer";

/**
 * 创建store
 */
export const configureStore = createStore(rootReducer, applyMiddleware(thunk));
