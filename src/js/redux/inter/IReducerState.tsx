import {object, string} from "prop-types";
export enum ReducerStatus { NONE, LOADING, SUCCESS, FAILED, NO_DATA}

/**
 * Reducer数据结构
 */
export default interface IReducerState<T> {
  bLoading: boolean,  //是否加载中，普通加载界面

  bRefreshing: boolean, //是否顶部刷新中，list加载界面使用
  bLoadMore: boolean, //是否底部加载中，list加载界面使用
  bNoMore: boolean, //是否还有更多数据，list加载界面使用

  status: ReducerStatus, //状态
  type?: string, //action 操作的类型
  msg?: string, //信息
  error?: object, //原始错误
  data?: T, //数据
}

/**
 * Reducer 初始数据结构
 */
export const initialReducerState: IReducerState<any> = {
  bLoading: false,

  bRefreshing: false,
  bLoadMore: false,
  bNoMore: false,

  status: ReducerStatus.NONE,
  // type: null,
  // msg: null,
  // error: null,
  // data: null,
};
