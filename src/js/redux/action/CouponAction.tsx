import {ugLog} from "../../utils/UgLog";
import {requestCoupon} from "../../net/HttpUtils";
import {CouponActionType} from "./type/ActionTypes";

// /**
//  * 处理优惠券数据
//  *
//  * @param params
//  */
// export interface RequestCouponDataParams {
//   type: string; //模拟参数
// }

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

    requestCoupon()
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
