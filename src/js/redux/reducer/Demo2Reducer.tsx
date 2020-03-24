import IReducerState, {initialReducerState, ReducerStatus} from "../inter/IReducerState";
import IDemo2Bean from "../inter/bean/IDemo2Bean";
import {Demo2ActionType} from "../action/type/ActionTypes";

/**
 * 初始数据结构
 */
const _initialState: IReducerState<IDemo2Bean> = {
  ...initialReducerState,
  // data: null, //数据
};

export default function demo2Reducer(state = _initialState, action) {
  switch(action.type){
    case Demo2ActionType.LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case Demo2ActionType.LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case Demo2ActionType.LOAD_ERROR:
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

export function requestDemo2(name: string) {
  // return {
  //   type: Demo222Action.LOADING,
  //   data: {
  //     msg: '请稍等...',
  //     name
  //   }
  // }
  return dispatch => {
    dispatch({
      type: Demo2ActionType.LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    _getMoviesFromApi()
      .then((value => {
        dispatch({
          type: Demo2ActionType.LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: Demo2ActionType.LOAD_ERROR,
          msg: 'demo2 error',
          // data: {
          //
          // },
          error: error
        })
      });

    // setTimeout(()=>{
    //   dispatch({
    //     type: Demo222Action.LOAD_SUCCESS,
    //     data: {
    //       msg: 'demo2 success',
    //       name
    //     }
    //   })
    // }, 2000);
    //
    // setTimeout(()=>{
    //   dispatch({
    //     type: Demo222Action.LOAD_ERROR,
    //     data: {
    //       msg: 'demo2 error',
    //       name
    //     }
    //   })
    // }, 5000);
  }
}

/**
 * 测试，正式接口写在 HttpUtils 里面
 * @private
 */
async function _getMoviesFromApi() {
  try {
    // 注意这里的await语句，其所在的函数必须有async关键字声明
    let response = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let responseJson = await response.json();
    return {...responseJson};
  } catch (error) {
    console.error(error);
    throw error;
  }
}
