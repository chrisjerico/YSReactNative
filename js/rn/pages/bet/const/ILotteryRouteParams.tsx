import { PlayOddData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { StyleProp, ViewStyle } from 'react-native'

/**
 * 彩票界面入参
 */
interface ILotteryRouteParams {
  playOddData?: PlayOddData, //当前的彩票对象，正码, 正特, 平特一肖, 平特尾数 等等
  style?: StyleProp<ViewStyle>
}

export { ILotteryRouteParams }
