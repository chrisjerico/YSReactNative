import IReducerState, {initialReducerState, ReducerStatus} from "../inter/IReducerState";
import IDemo2Bean from "../inter/bean/IDemo2Bean";
import {Demo2ActionType} from "../action/type/ActionTypes";

/**
 * 初始数据结构
 */
const _initialState: IReducerState<IDemo2Bean> = {
  ...initialReducerState,
  // data: null, //数据
};

export default function demo2Reducer(state = _initialState, action) {
  switch(action.type){
    case Demo2ActionType.LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case Demo2ActionType.LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case Demo2ActionType.LOAD_ERROR:
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
