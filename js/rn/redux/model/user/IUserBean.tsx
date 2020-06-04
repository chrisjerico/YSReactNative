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

// "uid":"1046",
//   "usr":"arc123",
//   "fullName":"看看",
//   "avatar":"",
//   "balance":"19989.8000",
//   "qq":"",
//   "wx":"",
//   "email":"",
//   "phone":"",
//   "isTest":false,
//   "isAgent":false,
//   "hasBankCard":false,
//   "hasFundPwd":true,
//   "unreadFaq":0,
//   "unreadMsg":0,
//   "curLevelTitle":"初行者",
//   "curLevelGrade":"VIP1",
//   "curLevelInt":"0",
//   "nextLevelTitle":"2",
//   "nextLevelGrade":"vip2",
//   "nextLevelInt":"1000",
//   "taskReward":"0.0000",
//   "taskRewardTitle":"阿西",
//   "taskRewardTotal":"0.0000",
//   "playedRealGames":[
//
// ],
//   "yuebaoSwitch":true,
//   "chatRoomSwitch":true,
//   "todayWinAmount":"0.00",
//   "unsettleAmount":"0.00",
//   "isLhcdocVip":"0",
//   "googleVerifier":true,
//   "isBindGoogleVerifier":false,
//   "chatRoomNickname":"****",
//   "hasActLottery":true,
//   "allowMemberCancelBet":true,
//   "clientIp":"111.125.94.240"

/**
 * 个人数据
 */
export default interface IUserBean {
  uid: string,
  usr: string,
  fullName: string,
  avatar: string,
  balance: string,
  qq: string,
  wx: string,
  email: string,
  phone: string,
  isTest: boolean,
  isAgent: boolean,
  hasBankCard: boolean,
  hasFundPwd: boolean,
  unreadFaq: number,
  unreadMsg: number,
  curLevelTitle: string,
  curLevelGrade: string,
  curLevelInt: string,
  nextLevelTitle: string,
  nextLevelGrade: string,
  nextLevelInt: string,
  taskReward: string,
  taskRewardTitle: string,
  taskRewardTotal: string,
  yuebaoSwitch: boolean,
  chatRoomSwitch: boolean,
  todayWinAmount: string,
  unsettleAmount: string,
  isLhcdocVip: string,
  googleVerifier: boolean,
  isBindGoogleVerifier: boolean,
  chatRoomNickname: string,
  hasActLottery: boolean,
  allowMemberCancelBet: boolean,
  clientIp: string,
}