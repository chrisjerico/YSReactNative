import {GameRoomActionType_LOAD_ERROR, GameRoomActionType_LOAD_SUCCESS, GameRoomActionType_LOADING} from "./type/ActionTypes";
import {ugError, ugLog} from "../../utils/UgLog";

/**
 * 处理游戏大厅数据
 *
 * @param params
 */
export interface RequestCouponDataParams {
  type: string; //模拟参数
}

/**
 * 触发 游戏大厅请求数据
 *
 * @param params
 */
export function requestCouponData(params: RequestCouponDataParams) {
  ugLog(`actGameGame params=${JSON.stringify(params)}`);
  return dispatch => {
    dispatch({
      type: GameRoomActionType_LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    _requestMovies()
      .then((value => {
        dispatch({
          type: GameRoomActionType_LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: GameRoomActionType_LOAD_ERROR,
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
async function _requestMovies() {
  try {
    //模拟 4个接口请求数据
    let response1 = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let response2 = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let response3 = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let response4 = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let responseJson1 = await response1.json();
    let responseJson2 = await response2.json();
    let responseJson3 = await response3.json();
    let responseJson4 = await response4.json();

    return {...responseJson1};
    // return {
    //   responseJson1: responseJson1,
    //   responseJson2: responseJson2,
    //   responseJson3: responseJson3,
    //   responseJson4: responseJson4,
    // };
  } catch (error) {
    ugError(error);
    throw error;
  }
}
