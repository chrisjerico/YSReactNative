import { PlayData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import ERect from '../../../public/components/view/lottery/ERect'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { isSelectedBallOnId } from './it/ISelBall'

interface ILotteryERect {
  item?: PlayData // 要绘制的数据
  selectedBalls?: Array<PlayData | ZodiacNum> // 已选中的数据
  containerStyle?: StyleProp<ViewStyle> //容器风格
  callback?: () => void // 按压回调
}

/**
 * 彩票球，一个球、一个文字+点击回调
 * @param item 条目数据
 * @param ballProps 球的类型
 * @param selectedBalls 选中的球列表
 * @param callback 点击回调
 * @constructor
 */
const LotteryERect = ({
                        item,
                        selectedBalls,
                        containerStyle,
                        callback,
                      }: ILotteryERect) => {

  const key = 'LotteryERect'
  let isSel = isSelectedBallOnId(selectedBalls, item) //优先使用本地生成的唯一识别ID
  return (
    <TouchableWithoutFeedback key={`${key}-lottery erect-${item?.exId}-${item?.id}`}
                              onPress={() => callback && callback()}>
      <View key={key + item?.id}
            style={[
              _styles.ball_item_lm,
              { backgroundColor: isSel ? `${Skin1.themeColor}dd` : null },
            ]}>
        <ERect key={key + item?.id}
               title={item?.name}
               containerStyle={containerStyle}
               titleStyle={{ color: isSel ? UGColor.TextColor6 : UGColor.TextColor7 }}
               odds={item?.enable != '0' ? item?.odds : '- -'}
               oddsStyle={{ color: isSel ? UGColor.TextColor6 : UGColor.TextColor7 }}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

const _styles = StyleSheet.create({
  ball_item_lm: {
    width: scale(195),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(16),
    // borderBottomRightRadius: scale(32),
    // borderTopLeftRadius: scale(32),
    // borderTopRightRadius: scale(24),
    // borderBottomLeftRadius: scale(24),
    borderRadius: scale(4),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(0.5),
  },
})

export default LotteryERect

