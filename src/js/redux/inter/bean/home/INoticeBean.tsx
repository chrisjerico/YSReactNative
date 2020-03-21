//   "addTime":"2020-02-22 22:08:32"
/**
 * banner公告
 */
export interface INoticeScroll {
  id: string,
  nodeId: string,
  type: string,
  content: string,  //<p><img src
  title: string,  //极速赛车
}

/**
 * banner公告
 */
export interface INoticePop {
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
export default interface INoticeBean {
  scroll: Array<INoticeScroll>,
  popup: Array<INoticePop>,
  popupSwitch: string,  //2
  popupInterval: string,  //0.1
}
