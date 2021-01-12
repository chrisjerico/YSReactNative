import { PlayData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import EBall, { IEBall } from '../../../public/components/view/lottery/EBall'
import { BallStyles } from '../../hall/new/games/HallGameListComponent'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import ERect from '../../../public/components/view/lottery/ERect'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import ISelBall, { isSelectedBallOnId } from '../const/ISelBall'

interface ILotteryERect {
  item?: PlayData // 要绘制的数据
  selectedBalls?: Array<string> // 已选中的数据
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
                        callback,
                      }: ILotteryERect) => {

  let isSel = isSelectedBallOnId(selectedBalls, item?.id)
  return (
    <TouchableOpacity key={item?.id + item?.name}
                      onPress={() => callback && callback()}>
      <View key={item?.id + item?.name}
            style={[
              _styles.ball_item_lm,
              {
                backgroundColor:
                  isSel ?
                    `${Skin1.themeColor}dd` :
                    null,
              },
            ]}>
        <ERect key={item?.id + item?.name}
               title={item?.name}
               titleStyle={{
                 color: isSel ?
                   UGColor.TextColor6 :
                   UGColor.TextColor7,
               }}
               odds={item?.odds}
               oddsStyle={{
                 color: isSel ?
                   UGColor.TextColor6 :
                   UGColor.TextColor7,
               }}/>
      </View>
    </TouchableOpacity>
  )
}

const _styles = StyleSheet.create({
  ball_item_lm: {
    width: scale(196),
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

