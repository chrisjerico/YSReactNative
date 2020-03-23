import {HomeActionType_LOAD_ERROR, HomeActionType_LOAD_SUCCESS, HomeActionType_LOADING} from "./type/ActionTypes";
import {ugLog} from "../../utils/UgLog";
import AppDefine from "../../../../js/rn/公共类/AppDefine";
import {ServerApi} from "../../net/ServerApi";
import ServerHttp from "../../net/ServerHttp";

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

    _requesHometData()
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

/**
 * 请求接口数据
 *
 * @private
 */
async function _requesHometData() {
  //模拟 4个接口请求数据
  let response1 = await fetch(
    'https://facebook.github.io/react-native/movies.json',
  );

  let banner = await ServerHttp({}, ServerApi.HOME_BANNER, false);
  let notice = await ServerHttp({}, ServerApi.HOME_NOTICE, false);
  let game = await ServerHttp({}, ServerApi.HOME_GAME, false);
  let coupon = await ServerHttp({}, ServerApi.HOME_COUPON, false);
  let userInfo = await ServerHttp({}, ServerApi.USER_INFO, false);
  let responseJson1 = await response1.json();

  return {
    banner: banner,
    notice: notice,
    game: game,
    coupon: coupon,
    userInfo: userInfo,
    movie: responseJson1,
  };
  // return {
  //   responseJson1: responseJson1,
  //   responseJson2: responseJson2,
  //   responseJson3: responseJson3,
  //   responseJson4: responseJson4,
  // };
}
