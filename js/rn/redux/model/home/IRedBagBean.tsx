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

// "name":"红包",
//   "start":"1584115200",
//   "end":"1585583999",
//   "show_time":"1584115200",
//   "redBagLogo":"https://cdn01.tianmeilai.com.cn/images/pig.png",
//   "isHideAmount":false,
//   "isHideCount":false,
//   "leftAmount":"￥11111093.49",
//   "leftCount":"999个",
//   "id":"34",
//   "intro":"嗷嗷",
//   "username":"游客",
//   "hasLogin":false,
//   "attendedTimes":0,
//   "attendTimesLimit":0,
//   "canGet":0


/**
 * 彩票、游戏等等
 */
export default interface IRedBagBean {
  name: string,
  start: string,
  end: string,
  show_time: string,
  redBagLogo: string,
  isHideAmount: boolean,
  isHideCount: boolean,
  leftAmount: string,
  leftCount: string,
  id: string,
  intro: string,
  username: string,
  hasLogin: boolean,
  attendedTimes: number,
  attendTimesLimit: number,
  canGet: number,
}
