import IReducerState, {initialReducerState, ReducerStatus} from '../inter/IReducerState';
import IHomeBean from '../inter/bean/home/IHomeBean';
import {HomeActionType} from '../action/type/ActionTypes';
import {ugLog} from '../../utils/UgLog';
import NetworkRequest1 from '../../../../js/rn/public/network/NetworkRequest1';

/**
 * 初始数据结构
 */
const _initialState: IReducerState<IHomeBean> = {
  ...initialReducerState,
  // data: null, //数据
  bLoading: true, //默认一进入打开 loading
};

/**
 *
 * 处理返回数据，重新包装数据
 *
 * @param state   初始状态
 * @param action  返回数据
 */
export default function homeReducer(state = _initialState, action) {
  switch (action.type) {
    case HomeActionType.LOADING:
      return {
        ...state,
        ...action,

        //重置状态为加载中
        bLoading: true,
        status: ReducerStatus.LOADING,
      };
    case HomeActionType.LOAD_SUCCESS:
      return {
        ...state,
        ...action,

        //重置状态为成功
        bLoading: false,
        status: ReducerStatus.SUCCESS,
      };
    case HomeActionType.LOAD_ERROR:
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

    NetworkRequest1.homeInfo()
      .then(value => {
        dispatch({
          type: HomeActionType.LOAD_SUCCESS,
          msg: '',
          data: {
            ...value,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: HomeActionType.LOAD_ERROR,
          msg: '请求失败',
          // data: {
          //
          // },
          error: error,
        });
      });
  };
}
