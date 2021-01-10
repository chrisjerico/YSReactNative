import { BallType } from '../../../public/components/view/LotteryBall'
import { StyleProp, ViewStyle } from 'react-native'


/**
 * 彩种
 */
const LotteryConst = {
  TM: 'TM', //特码
  LM: 'LM', //两面
  ZM: 'ZM', //正码
  ZM1_6: 'ZM1-6', //正码1T6
  ZT: 'ZT', //正特
  LMA: 'LMA', //连码
  SB: 'SB', //色波
  YX: 'YX', //平特一肖
  WS: 'WS', //平特尾数
  TWS: 'TWS', //头尾数
  ZOX: 'ZOX', //总肖
  TX: 'TX', //特肖
  LX: 'LX', //连肖
  HX: 'HX', //合肖
  LW: 'LW', //连尾
  ZX: 'ZX', //正肖
  WX: 'WX', //五行
  ZXBZ: 'ZXBZ', //自选不中
}

/**
 * 彩票界面入参
 */
interface ILotteryRouteParams {
  lotteryCode?: string, //当前的彩票CODE，正码, 正特, 平特一肖, 平特尾数 等等
  style?: StyleProp<ViewStyle>
}

export default LotteryConst
export { ILotteryRouteParams }
