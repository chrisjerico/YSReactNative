import { PlayData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import LCF from '../config/LCF'
import EBall, { IEBall } from '../../../public/components/view/lottery/EBall'
import { BallStyles } from '../../hall/new/games/HallGameListComponent'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import ERect from '../../../public/components/view/lottery/ERect'

interface ILotteryERect {
  item?: PlayData // 要绘制的数据
  selectedBalls?: Array<string> // 已选中的数据
  callback?: () => void // 按压回调
}

/**
 * 彩票球，一个球、一个文字+点击回调
 * @param item
 * @param selectedBalls
 * @param callback
 * @constructor
 */
const LotteryERect = ({
                        item,
                        selectedBalls,
                        callback,
                      }: ILotteryERect) => {

  return (
    <TouchableOpacity key={item?.id}
                      onPress={() => callback && callback()}>
      <View style={[
        _styles.ball_item_lm,
        {
          backgroundColor:
            selectedBalls?.includes(item?.name) ?
              LCF.pressedColor : null,
        },
      ]}>
        <ERect title={item?.name}
               titleStyle={{
                 color: selectedBalls?.includes(item?.name) ?
                   LCF.pressedTextColor :
                   LCF.unpressedTextColor,
               }}
               odds={item?.odds}
               oddsStyle={{
                 color: selectedBalls?.includes(item?.name) ?
                   LCF.pressedTextColor :
                   LCF.unpressedTextColor,
               }}/>
      </View>
    </TouchableOpacity>
  )
}

const _styles = StyleSheet.create({
  ball_item_lm: {
    width: LCF.react_container_width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(16),
    borderBottomRightRadius: scale(32),
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(16),
    borderBottomLeftRadius: scale(16),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(0.5),
  },
})

export default LotteryERect

