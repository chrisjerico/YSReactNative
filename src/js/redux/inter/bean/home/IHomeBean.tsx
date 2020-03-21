import {object, string} from "prop-types";
import BaseBean from "../base/BaseBean";

export interface IHomeBeanMovies {
  id?: string, //id
  title?: string, //标题
  releaseYear?: string, //发布年月
}

/**
 * banner广告
 */
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

/**
 * banner广告
 */
export interface BannerData {
  list: Array<BannerDataItem>,
}

// "scroll":[
//   {
//     "id":"1",
//     "nodeId":"1",
//     "type":"1",
//     "content":"<p>独乐乐不如众乐乐</p>",
//     "title":"独乐乐不如众乐乐",
//     "addTime":"2020-02-22 22:08:32"
//   }
// ],
//   "popup":[
//   {
//     "id":"3",
//     "nodeId":"2",
//     "type":"1",
//     "content":"<p><img src="http://test60b.fhptcdn.com/upload/t060/customise/ueditor/php/upload/20200314/15841840544645.jpg"/></p>",
//       "title":"极速赛车",
//   "addTime":"2020-03-12 14:37:07"
// }
// ],
// "popupSwitch":"2",
//   "popupInterval":"0.1"

// "id":"1",
//   "nodeId":"1",
//   "type":"1",
//   "content":"<p>独乐乐不如众乐乐</p>",
//   "title":"独乐乐不如众乐乐",
//   "addTime":"2020-02-22 22:08:32"
/**
 * banner公告
 */
export interface BannerNoticeScroll {
  id: string,
  nodeId: string,
  type: string,
  content: string,  //<p><img src
  title: string,  //极速赛车
}
/**
 * banner公告
 */
export interface BannerNoticePop {
  id: string,
  nodeId: string,
  type: string,
  content: string,  //<p><img src
  title: string,  //极速赛车
  addTime: string,  //2020-03-12 14:37:07
}
/**
 * banner公告
 */
export interface BannerNotice {
  scroll: Array<BannerNoticeScroll>,
  popup: Array<BannerNoticePop>,
  popupSwitch: string,  //2
  popupInterval: string,  //0.1
}



/**
 * Home的Reducer数据结构
 */
export default interface IHomeBean {
  banner: BaseBean<BannerData>, //广告
  notice: BaseBean<BannerNotice>, //公告
  movie: {
    title?: string, //标题
    description?: string, //描述
    movies?: Array<IHomeBeanMovies>, //电影
  }
}
