import {object, string} from "prop-types";

/**
 * Home的Reducer数据结构
 */

export interface IHomeBeanMovies {
  id?: string, //id
  title?: string, //标题
  releaseYear?: string, //发布年月
}

export default interface IHomeBean {
  title?: string, //标题
  description?: string, //描述
  movies?: Array<IHomeBeanMovies>, //电影
}
