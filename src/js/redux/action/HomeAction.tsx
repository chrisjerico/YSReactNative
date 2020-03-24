import {ugLog} from "../../utils/UgLog";
import {requestHome} from "../../net/HttpUtils";
import {HomeActionType} from "./type/ActionTypes";

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
      type: HomeActionType.LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    requestHome()
      .then((value => {
        dispatch({
          type: HomeActionType.LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: HomeActionType.LOAD_ERROR,
          msg: '请求失败',
          // data: {
          //
          // },
          error: error
        })
      });
  }
}
