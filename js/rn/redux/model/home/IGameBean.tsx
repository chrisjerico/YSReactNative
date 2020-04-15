//   "addTime":"2020-02-22 22:08:32"
// "id":"63",
//   "":"https://cdn01.mayihong.cn/upload/t060/customise/picture/system/mobileIcon/25cf79f115afdb2b3d8ecfa3c1753449.png",
//   "":"",
//   "":"",
//   "":"33",
//   "":"1",
//   "":"0",
//   "":"1",
//   "":"70",
//   "":"0",
//   "":"0",
//   "":"",
//   "":"",
//   "":"70",
//   "":"",
//   "":"0",
//   "":"0",
//   "":"1",
//   "":"",
//   "":"
/**
 * 单个彩票、游戏
 */
export interface IGameIconListItem {
  id: string; // 游戏ID
  icon: string; // 资料logo
  name: string; // 资料标题
  url: string; // 外部链接
  category: string; // 图标分类
  levelType: string; // 分类层级：1 无子类 2 有子类一级分类 3 子类
  sort: string; // 排序（数字小排前面）
  seriesId: string; // 系列ID：1 普通彩票 2 真人视讯 3 捕鱼游戏 4 电子游戏 5 棋牌游戏 6 体育赛事 7导航链接
  subId: string; // 1存取款 2APP下载 3聊天室 4在线客服 5长龙助手 6推广收益 7开奖网 8利息宝 9优惠活动 10游戏记录 11QQ客服 13任务大厅 14站内信 15站内信 16投诉中心
  tipFlag: string; // 标记：0 无 1 热门 2 活动 3 大奖
  openWay: string; // 打开方式：0 本窗口 1 新窗口
  hotIcon: string; // 热门图标url
  gameCode: string; // 第三级游戏ID
  gameId: string; // 游戏ID
  title: string; // 游戏名称
  isInstant: string; // 是否是即开彩：1=是，0=否
  isSeal: string; // 是否封盘:1=是，0=否
  isClose: string;
  gameType: string; // 彩种类型，例：gd11x5（广东11选5）
  logo: string; // 游戏LOGO
  docType: string; // 是否是资料。1=是；0=否
}
/**
 * 彩票、游戏公告
 */
export interface IGameIcon {
  id: string; // 分类ID
  name: string; // 分类标题
  style: string; // 分类样式
  logo: string; // 分类图标
  list: Array<IGameIconListItem>; // 游戏列表
}

/**
 * 彩票、游戏等等
 */
export default interface IGameBean {
  icons: Array<IGameIcon>; // 游戏分类
  navs: Array<IGameIconListItem>; // 导航按钮
}
