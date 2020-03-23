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
  id: string,
  icon: string,
  name: string,//香港六合彩
  url: string,
  category: string,
  levelType: string,
  sort: string,
  seriesId: string,
  subId: string,
  tipFlag: string,
  openWay: string,
  hotIcon: string,
  gameCode: string,
  gameId: string,
  title: string,//香港六合彩
  isInstant: string,
  isSeal: string,
  isClose: string,
  gameType: string,//lhc
  logo: string,//lhc
}
/**
 * 彩票、游戏公告
 */
export interface IGameIcon {
  id: string,
  name: string,//彩票
  style: string,
  logo: string,
  list: Array<IGameIconListItem>,
}

/**
 * 导航
 */
export interface IGameNav {
  id: string,
  icon: string,
  name: string,//存款
  url: string,
  category: string,
  levelType: string,
  sort: string,
  seriesId: string,
  subId: string,
  tipFlag: string,
  openWay: string,
  hotIcon: string,
  gameCode: string,
  title: string,//存取款
  gameId: string,
}

/**
 * 彩票、游戏等等
 */
export default interface IGameBean {
  icons: Array<IGameIcon>,
  navs: Array<IGameNav>,
}
