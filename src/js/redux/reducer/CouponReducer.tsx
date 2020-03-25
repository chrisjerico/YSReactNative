import IReducerState, {initialReducerState, ReducerStatus} from "../inter/IReducerState";
import ICouponBean from "../inter/bean/home/ICouponBean";
import {CouponActionType} from "../action/type/ActionTypes";
import {ugLog} from "../../utils/UgLog";
import {requestCoupon} from "../../net/HttpUtils";
import NetworkRequest1 from "../../../../js/rn/公共类/网络/NetworkRequest1";

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
    case CouponActionType.LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case CouponActionType.LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case CouponActionType.LOAD_ERROR:
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


/**
 * 触发 游戏大厅请求数据
 *
 * @param params
 */
export function requestCouponData() {
  ugLog(`requestCouponData`);
  return dispatch => {
    dispatch({
      type: CouponActionType.LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    NetworkRequest1.couponList()
      .then((value => {
        dispatch({
          type: CouponActionType.LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: CouponActionType.LOAD_ERROR,
          msg: '请求失败',
          // data: {
          //
          // },
          error: error
        })
      });
  }
}

