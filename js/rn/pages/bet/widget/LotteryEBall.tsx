import { StyleProp, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import EBall, { IEBall } from '../../../public/components/view/lottery/EBall'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { isSelectedBallOnId } from './it/ISelBall'
import { ILotteryBall } from '../../../public/components/view/LotteryBall'
import { PlayData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { UGStore } from '../../../redux/store/UGStore'
import { calculateSliderValue } from '../util/ArithUtil'
import { BallType, lotteryBallStyle } from '../const/LotteryConst'

interface ILotteryEBall {
  item?: PlayData // 要绘制的数据
  ballProps?: IEBall //球的属性
  selectedBalls?: Array<PlayData | ZodiacNum> // 已选中的数据
  containerStyle?: StyleProp<ViewStyle> //球的容器风格
  ballStyle?: StyleProp<ViewStyle> //球的风格
  ballType?: ILotteryBall //球风格
  oddsStyle?: StyleProp<TextStyle>, //赔率风格
  callback?: () => void // 按压回调
}

/**
 * 绘制内容
 */
const renderContent = ({
                         item,
                         ballProps,
                         selectedBalls,
                         containerStyle,
                         ballStyle,
                         ballType,
                         oddsStyle,
                         callback,
                       }: ILotteryEBall) => {
  let isSel = isSelectedBallOnId(selectedBalls, item) //优先使用本地生成的唯一识别ID
  const sliderValue = UGStore.globalProps?.sliderValue //退水拉条数据
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩

  return (
    <View key={'e ball content' + item?.id}
          style={[
            _styles.ball_item_tm,
            { backgroundColor: isSel ? `${Skin1.themeColor}dd` : null },
            containerStyle,
          ]}>
      <EBall key={'e ball content e' + item?.id}
             ballType={{
               type: lotteryBallStyle(gameType),
               ballNumber: item?.name,
               ...ballType,
             }}
             oddsStyle={[
               { color: isSel ? UGColor.TextColor6 : UGColor.TextColor7 },
               oddsStyle,
             ]}
             odds={item?.enable != '0' ? calculateSliderValue(item?.odds, sliderValue) : '- -'}
             {...ballProps}
             style={ballStyle}/>
    </View>
  )
}

/**
 * 彩票球，一个球、一个文字+点击回调
 * @param iBall
 */
const LotteryEBall = (iBall: ILotteryEBall) => {
  const { item, callback } = iBall

  return (
    callback != null ? <TouchableWithoutFeedback key={`LotteryEBall-${item?.exId}-${item?.id}`}
                                                 onPress={() => callback && callback()}>
        {renderContent(iBall)}
      </TouchableWithoutFeedback> :
      renderContent(iBall)
  )
}

const _styles = StyleSheet.create({
  ball_item_tm: {
    width: scale(130),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(8),
    marginVertical: scale(0.4),
    // borderBottomRightRadius: scale(32),
    // borderTopLeftRadius: scale(32),
    // borderTopRightRadius: scale(24),
    // borderBottomLeftRadius: scale(24),
    borderRadius: scale(4),
  },
})

export default LotteryEBall

