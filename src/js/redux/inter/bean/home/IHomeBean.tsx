import {object, string} from "prop-types";
import BaseBean from "../base/BaseBean";

/**
 * Home的Reducer数据结构
 */

export interface IHomeBeanMovies {
  id?: string, //id
  title?: string, //标题
  releaseYear?: string, //发布年月
}

export interface BannerDataItem {
  id: string,
  url: string,  //跳转栏目
  linkCategory: string, //跳转分类
  linkPosition: string, //跳转位置
  pic: string,  //图片
  lotteryGameType: string,  //彩种，如 六合彩
  realIsPopup: string,  //是否弹出
  realSupportTrial: string, //支持试玩
}

export interface BannerData {
  list: Array<BannerDataItem>,
}

export default interface IHomeBean {
  banner: BaseBean<BannerData>,
  movie: {
    title?: string, //标题
    description?: string, //描述
    movies?: Array<IHomeBeanMovies>, //电影
  }
}
