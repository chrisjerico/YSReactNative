import IReducerState, {initialReducerState, ReducerStatus} from "../inter/IReducerState";
import {
  GameRoomActionType_LOAD_ERROR,
  GameRoomActionType_LOAD_SUCCESS,
  GameRoomActionType_LOADING
} from "../action/type/ActionTypes";
import IGameRoomBean from "../inter/bean/IGameRoomBean";

/**
 * 初始数据结构
 */
const _initialState: IReducerState<IGameRoomBean> = {
  ...initialReducerState,
  // data: null, //数据
};

/**
 *
 * 处理返回数据，重新包装数据
 *
 * @param state   初始状态
 * @param action  返回数据
 */
export default function gameRoomReducer(state = _initialState, action) {
  switch(action.type){
    case GameRoomActionType_LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case GameRoomActionType_LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case GameRoomActionType_LOAD_ERROR:
      return {
        ...state,
        ...action,

        //重置状态为失败
        bLoading: false,
        status: ReducerStatus.FAILED,
      };
    default:
      return state;
  }
}
