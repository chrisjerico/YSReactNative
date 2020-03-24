import IReducerState, {initialReducerState, ReducerStatus} from "../inter/IReducerState";
import {
  GameRoomActionType,
} from "../action/type/ActionTypes";
import IGameRoomBean from "../inter/bean/IGameRoomBean";
import {ugError, ugLog} from "../../utils/UgLog";

/**
 * 初始数据结构
 */
const _initialState: IReducerState<IGameRoomBean> = {
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
export default function gameRoomReducer(state = _initialState, action) {
  switch(action.type){
    case GameRoomActionType.LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case GameRoomActionType.LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case GameRoomActionType.LOAD_ERROR:
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
 * 处理游戏大厅数据
 *
 * @param params
 */
export interface RequestGameDataParams {
  type: string; //模拟参数
}

/**
 * 触发 游戏大厅请求数据
 *
 * @param params
 */
export function requestGameData(params: RequestGameDataParams) {
  ugLog(`requestGameData params=${JSON.stringify(params)}`);
  return dispatch => {
    dispatch({
      type: GameRoomActionType.LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    _requestMovies()
      .then((value => {
        dispatch({
          type: GameRoomActionType.LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: GameRoomActionType.LOAD_ERROR,
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
 * 测试，正式接口写在 HttpUtils 里面
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
