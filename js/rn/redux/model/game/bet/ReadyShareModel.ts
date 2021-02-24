import { BetLotteryData } from '../../../../public/network/it/bet/IBetLotteryParams'
import { PlayNameArray } from './BetShareModel'

/**
 * 准备分享的数据模型
 */
export interface ReadyShareModel {
  activeReturnCoinRatio?: string //"1.50", 拉条
  code?: string //"Q1",  下注的彩种编号，如果 特码 两面
  displayNumber?: string //"46722", 期号
  ftime?: string //"1612616575", 封盘时间
  gameId?: string //"232", 彩种ID
  gameName?: string //"三分七星彩",
  turnNum?: string //"2102060422", issue号
  totalNums?: string //"4",  总共选中的数量
  totalMoney?: string //"44.00", 总共下注金额
  specialPlay?: string //"",
  betFollowFlag?: string //"1", 是不是跟注
  roomId?: string //"0",
  playNameArray?: Array<PlayNameArray> // 下注彩种条目名字 如特码B
  betParams?: Array<BetLotteryData> //下注数据
}
