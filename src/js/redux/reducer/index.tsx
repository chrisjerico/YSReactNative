import {combineReducers} from 'redux'
import demo2Reducer from "./Demo2Reducer";
import homeReducer from "./HomeReducer";
import gameRoomReducer from "./GameRoomReducer";

/**
 * 整合项目的所有reducer
 */
export const rootReducer = combineReducers({
  demo2Reducer,
  homeReducer,
  gameRoomReducer,
});
