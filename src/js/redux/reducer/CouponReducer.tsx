import IReducerState, {initialReducerState, ReducerStatus} from "../inter/IReducerState";
import {
  CouponActionType_LOAD_ERROR,
  CouponActionType_LOAD_SUCCESS,
  CouponActionType_LOADING
} from "../action/type/ActionTypes";
import ICouponBean from "../inter/bean/home/ICouponBean";

/**
 * 初始数据结构
 */
const _initialState: IReducerState<ICouponBean> = {
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
export default function couponReducer(state = _initialState, action) {
  switch(action.type){
    case CouponActionType_LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case CouponActionType_LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case CouponActionType_LOAD_ERROR:
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
