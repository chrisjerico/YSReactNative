import IBaseBean from "../base/IBaseBean";
import IBannerAdvBean from "./IBannerAdvBean";
import INoticeBean from "./INoticeBean";
import IGameBean from "./IGameBean";

export interface IHomeBeanMovies {
  id?: string, //id
  title?: string, //标题
  releaseYear?: string, //发布年月
}

/**
 * Home的Reducer数据结构
 */
export default interface IHomeBean {
  banner: IBaseBean<IBannerAdvBean>, //广告
  notice: IBaseBean<INoticeBean>, //公告
  game: IBaseBean<IGameBean>, //公告
  movie: {
    title?: string, //标题
    description?: string, //描述
    movies?: Array<IHomeBeanMovies>, //电影
  }
}
