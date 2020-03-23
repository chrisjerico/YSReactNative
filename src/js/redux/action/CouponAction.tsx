import {CouponActionType_LOAD_ERROR, CouponActionType_LOAD_SUCCESS, CouponActionType_LOADING} from "./type/ActionTypes";
import {ugError, ugLog} from "../../utils/UgLog";
import ServerHttp from "../../net/ServerHttp";
import {ServerApi} from "../../net/ServerApi";

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
      type: CouponActionType_LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    _requestCouponData()
      .then((value => {
        dispatch({
          type: CouponActionType_LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: CouponActionType_LOAD_ERROR,
          msg: '请求失败',
          // data: {
          //
          // },
          error: error
        })
      });
  }
}

/**
 * 请求接口数据
 *
 * @private
 */
async function _requestCouponData() {
  let coupon = await ServerHttp({}, ServerApi.HOME_COUPON, false);

  return coupon;
}
