import {HomeActionType_LOAD_ERROR, HomeActionType_LOAD_SUCCESS, HomeActionType_LOADING} from "./type/ActionTypes";
import {ugLog} from "../../utils/UgLog";
import AppDefine from "../../../../js/rn/公共类/AppDefine";
import {ServerApi} from "../../net/ServerApi";

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
  ugLog(`actionHomeData params=${JSON.stringify(params)}`);
  return dispatch => {
    dispatch({
      type: HomeActionType_LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    _requestMovies()
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
async function _requestMovies() {
  try {
    //模拟 4个接口请求数据
    let response1 = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );

    // let params = await AppDefine.ocHelper.performSelectors(JSON.stringify({
    //   type: 'ASK_FOR_TOKEN_AND_RSA',
    // }));
    // let tokenRsa = JSON.parse(params)?.tokenRsa;
    //
    // let response2 = await fetch(
    //   ServerApi.HOMEADS + '$' +  tokenRsa,
    // );
    // let response3 = await fetch(
    //   'https://facebook.github.io/react-native/movies.json',
    // );
    // let response4 = await fetch(
    //   'https://facebook.github.io/react-native/movies.json',
    // );
    let responseJson1 = await response1.json();
    // let responseJson2 = await response2.json();
    // let responseJson3 = await response3.json();
    // let responseJson4 = await response4.json();

    return {...responseJson1};
    // return {
    //   responseJson1: responseJson1,
    //   responseJson2: responseJson2,
    //   responseJson3: responseJson3,
    //   responseJson4: responseJson4,
    // };
  } catch (error) {
    ugLog(error);
    throw error;
  }
}
