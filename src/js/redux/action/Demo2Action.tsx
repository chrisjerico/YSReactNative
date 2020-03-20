import {
  Demo2ActionType_LOAD_ERROR,
  Demo2ActionType_LOAD_SUCCESS,
  Demo2ActionType_LOADING
} from "./type/ActionTypes";

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
      type: Demo2ActionType_LOADING,
      msg: '请稍等...',
      // data: {
      //   name
      // }
    });

    _getMoviesFromApi()
      .then((value => {
        dispatch({
          type: Demo2ActionType_LOAD_SUCCESS,
          msg: '',
          data: {
            ...value
          }
        })
      }))
      .catch((error) => {
        dispatch({
          type: Demo2ActionType_LOAD_ERROR,
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
