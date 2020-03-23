import {HomeActionType_LOAD_ERROR, HomeActionType_LOAD_SUCCESS, HomeActionType_LOADING} from "./type/ActionTypes";
import {ugLog} from "../../utils/UgLog";
import {requestHome} from "../../net/HttpUtils";

/**
 * 处理主页数据
 *
 * @param params
 */
export interface requestHomeDataParams {
  type: string; //模拟参数
}

/**
 * 触发 home请求数据
 *
 * @param params
 */
export function requestHomeData(params: requestHomeDataParams) {
  ugLog(`requestHomeData params=${JSON.stringify(params)}`);
  return dispatch => {
    dispatch({
      type: HomeActionType_LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    requestHome()
      .then((value => {
        dispatch({
          type: HomeActionType_LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: HomeActionType_LOAD_ERROR,
          msg: '请求失败',
          // data: {
          //
          // },
          error: error
        })
      });
  }
}
