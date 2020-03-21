/**
 * banner广告
 */
export interface IBannerDataItem {
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
export default interface IBannerAdvBean {
  list: Array<IBannerDataItem>,
}
