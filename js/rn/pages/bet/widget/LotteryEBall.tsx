import { PlayData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import EBall, { IEBall } from '../../../public/components/view/lottery/EBall'
import { BallStyles } from '../../hall/new/games/HallGameListComponent'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'

interface ILotteryEBall {
  item?: PlayData // 要绘制的数据
  ballProps?: IEBall //球的属性
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
const LotteryEBall = ({
                        item,
                        ballProps,
                        selectedBalls,
                        callback,
                      }: ILotteryEBall) => {

  return (
    <TouchableOpacity key={item?.id}
                      onPress={() => callback && callback()}>
      <View style={[
        _styles.ball_item_tm,
        {
          backgroundColor:
            selectedBalls?.includes(item?.name) ?
              `${Skin1.themeColor}dd` :
              null,
        },
      ]}>
        <EBall ballType={{
          type: BallStyles.lhc,
          ballNumber: item?.name,
        }}
               oddsStyle={{
                 color: selectedBalls?.includes(item?.name) ?
                   UGColor.TextColor6 :
                   UGColor.TextColor7,
               }}
               odds={item?.odds}
               {...ballProps}/>
      </View>
    </TouchableOpacity>
  )
}

const _styles = StyleSheet.create({
  ball_item_tm: {
    width: scale(126),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(8),
    marginVertical: scale(2),
    borderBottomRightRadius: scale(32),
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(16),
    borderBottomLeftRadius: scale(16),
  },
})

export default LotteryEBall

