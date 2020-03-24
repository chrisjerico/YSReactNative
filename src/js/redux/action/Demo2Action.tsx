import {Demo2ActionType} from "./type/ActionTypes";

export function requestUserInfo(name: string) {
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
