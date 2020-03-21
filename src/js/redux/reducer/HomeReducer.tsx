import IReducerState, {initialReducerState, ReducerStatus} from "../inter/IReducerState";
import {
  HomeActionType_LOAD_ERROR,
  HomeActionType_LOAD_SUCCESS,
  HomeActionType_LOADING
} from "../action/type/ActionTypes";
import IHomeBean from "../inter/bean/home/IHomeBean";

/**
 * 初始数据结构
 */
const _initialState: IReducerState<IHomeBean> = {
  ...initialReducerState,
  // data: null, //数据
  bLoading: true, //默认一进入打开 loading
};

/**
 *
 * 处理返回数据，重新包装数据
 *
 * @param state   初始状态
 * @param action  返回数据
 */
export default function homeReducer(state = _initialState, action) {
  switch(action.type){
    case HomeActionType_LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case HomeActionType_LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case HomeActionType_LOAD_ERROR:
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
