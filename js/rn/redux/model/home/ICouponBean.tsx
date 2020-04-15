//   "addTime":"2020-02-22 22:08:32"
// "id":"120",
//   "":"3",
//   "":"",
//   "":"<p><strong><img src="https://cdn01.dalianshutong.cn/upload/c013/customise/ueditor/php/upload/20200115/15790613575453.jpg"/></strong><br/></p>",
//   "":"https://cdn01.tianmeilai.com.cn/upload/t060/customise/images/mb_promote_120.jpg?v=1584251296",
//   "":7,
//   "":20,
//   "":"https://www.baidu.com/"

/**
 * 优惠信息条目
 */
export interface ICouponListItem {
  id: string,
  category: string,
  title: string,//优惠活动一
  content: string,//<p><strong><img src="https:/
  pic: string,
  linkCategory: string,
  linkPosition: string,
  linkUrl: string,
}

/**
 * 优惠信息
 */
export default interface ICouponBean {
  list: Array<ICouponListItem>,
  style: string,  //优惠券展示风格 slide 内嵌入, popup 弹窗口, page 新界面
  showCategory: boolean,  //显示标签栏
  categories: {[key: string]: string},  //显示标签栏
}
