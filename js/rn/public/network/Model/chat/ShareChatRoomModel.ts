import { IMiddleMenuItem } from '../../../components/menu/MiddleMenu'
import { IBetLotteryParams } from '../../it/bet/IBetLotteryParams'
import { LotteryResultData } from '../lottery/result/LotteryResultModel'

/**
 * 分享数据状态
 */
export enum Share2ChatStatus {
  READY,//准备分享
  STARTING,//开始分享
}

/**
 * 分享信息
 */
export interface ShareChatRoomModel {
  betData?: LotteryResultData  //下注信息
  shareStatus?: Share2ChatStatus //该数据需要分享
}
