
/*ChatRedBagSetting*/
import { LotteryResultData } from '../lottery/result/LotteryResultModel'

export class ChatRedBagSetting {
  isRedBag?: number //
  isRedBagPwd?: number //
  maxAmount?: string //
  minAmount?: string //
  maxQuantity?: string //
}

/*ChatAry*/
export class ChatRoomChatAry {
  roomId?: string // 聊天室ID
  roomName?: string // 聊天室名字
  password?: string // 聊天室密码
  isChatBan?: boolean //
  isShareBet?: boolean //
  isShareBill?: boolean //
  typeId?: string //
  sortId?: number //
  typeIds?: string[] //
  talkLevels?: string //
  talkGrade?: string //
  chatRedBagSetting?: ChatRedBagSetting //
  isMine?: string //
  minAmount?: string //
  maxAmount?: string //
  oddsRate?: string //
  quantity?: string //
  isTalk?: number //
  placeholder?: string // 您当前暂无发言等级。
}

/*Announce*/
export class ChatRoomAnnounce {
  title?: string // 欢迎来到UG平台
  content?: string // 暴富不是梦，成就你的梦想您好！欢迎莅临彩票集团“聊天室”每日计划大师24小时不间断为VIP客户提供精准计划，预祝斩获大奖，盈利多多！
}

/*Data*/
export class ChatRoomData {
  username?: string // 用户名
  nickname?: string // 昵称
  uid?: string //
  testFlag?: string //
  chatAry?: ChatRoomChatAry[] //
  announce?: ChatRoomAnnounce[] //
  ip?: string //
  token?: string //
  tokenImg?: string //
  tokenTxt?: string //
  level?: number //
  isManager?: boolean //
  isAllBan?: boolean //
  isPicBan?: string //
  isShareBill?: string //
  roomName?: string // 主房间
  placeholderFlag?: string //
  placeholder?: string //
  sendRedBagUserType?: string //
  showRedBagDetailConfig?: string //
  titleStatus?: string //
  redBagMineRule?: string //什么是扫雷红包
  redBagTotalAmountAllowFloat?: string //
  redBagMineTotalAmountAllowFloat?: string //
  chatOnlineMemberStatus?: string //
  chatOnlineMemberCount?: number //
  cronDataTopStatus?: number //
  cronDataTopType?: string //
  chatRoomRedirect?: number //
}

export interface ChatRoomModel {
  code?: number
  msg?: string
  data?: ChatRoomData
}
