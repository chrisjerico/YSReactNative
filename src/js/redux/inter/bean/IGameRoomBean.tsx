import {object, string} from "prop-types";

/**
 * Game的Reducer数据结构
 */

export interface IGameRoomBeanMovies {
  id?: string, //id
  title?: string, //标题
  releaseYear?: string, //发布年月
}

export default interface IGameRoomBean {
  title?: string, //标题
  description?: string, //描述
  movies?: Array<IGameRoomBean>, //电影
}
