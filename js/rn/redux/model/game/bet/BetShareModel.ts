import { BetLotteryData } from '../../../../public/network/it/bet/IBetLotteryParams'

/**
 * 分享的数据模型
 */
export interface BetShareModel {
  isInstant?: string//：是否是即开彩：1=是，0=否
  ftime?: string //"1612616575", 封盘时间
  gameId?: string //"232", 彩种ID
  turnNum?: string //"2102060422", issue号
  issue_displayNumber?: string //"46722", 期号
  totalNums?: string //"4",  总共选中的数量
  totalMoney?: string //"44.00", 总共下注金额
  betSrc?: string //"0",
  singleAmount?: string //"11", 单项目金额
  specialPlay?: string //"",
  paneCode?: string //"Q1",  下注的彩种编号，如果 特码 两面
  playNameArray?: Array<PlayNameArray> // 下注彩种条目名字 如特码B
  activeReturnCoinRatio?: string //"1.50", 拉条
// x-session-token?: string //"b458ccfb545d293b0ddaaddfbc317734",
  betFollowFlag?: string //"1", 是不是跟注
  gameName?: string //"三分七星彩",
  followUid?: string //"1115",
  roomId?: string //"0",
  betBean?: Array<BetLotteryData> //下注数据
  tag?: string //3
}

export interface PlayNameArray {
  playName1?: string // 下注彩种名字 如特码B
  playName2?: string // 下注彩种名字 如特码B

  exFlag?: string //本地使用，该条目唯一识别标识
}
