import {object, string} from "prop-types";

/**
 * Demo2的Reducer数据结构
 */

export interface IDemo2BeanMovies {
  id?: string, //id
  title?: string, //标题
  releaseYear?: string, //发布年月
}

export default interface IDemo2Bean {
  title?: string, //标题
  description?: string, //描述
  movies?: Array<IDemo2BeanMovies>, //电影
}
