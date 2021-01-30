import { PlayData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { StyleProp, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import EBall, { IEBall } from '../../../public/components/view/lottery/EBall'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import ISelBall, { isSelectedBallOnId } from '../const/ISelBall'
import { anyEmpty } from '../../../public/tools/Ext'
import { ugLog } from '../../../public/tools/UgLog'
import { BallStyles } from '../const/LotteryConst'

interface ILotteryEBall {
  item?: ILotteryEBallItem // 要绘制的数据
  ballProps?: IEBall //球的属性
  selectedBalls?: Array<string> // 已选中的数据
  containerStyle?: StyleProp<ViewStyle>
  ballStyle?: StyleProp<ViewStyle>
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
                         callback,
                       }: ILotteryEBall) => {
  let isSel = isSelectedBallOnId(selectedBalls, item?.exId ?? item?.id) //优先使用本地生成的唯一识别ID

  return (
    <View key={'e ball content' + item?.id}
          style={[
            _styles.ball_item_tm,
            {
              backgroundColor:
                isSel ?
                  `${Skin1.themeColor}dd` :
                  null,
            },
            containerStyle,
          ]}>
      <EBall key={'e ball content e' + item?.id}
             ballType={{
               type: BallStyles.lhc,
               ballNumber: item?.name,
             }}
             oddsStyle={{
               color: isSel ?
                 UGColor.TextColor6 :
                 UGColor.TextColor7,
             }}
             odds={item?.odds}
             {...ballProps}
             style={ballStyle}/>
    </View>
  )
}

/**
 * 彩票球，一个球、一个文字+点击回调
 * @param item 条目数据
 * @param ballProps 球的类型
 * @param selectedBalls 选中的球列表
 * @param containerStyle 球的容器风格
 * @param ballStyle 球的风格
 * @param callback 点击回调
 * @constructor
 */
const LotteryEBall = (iBall: ILotteryEBall) => {
  const { item, callback } = iBall

  return (
    callback != null ? <TouchableWithoutFeedback key={'LotteryEBall' + item?.id}
                                         onPress={() => callback && callback()}>
        {renderContent(iBall)}
      </TouchableWithoutFeedback> :
      renderContent(iBall)
  )
}

const _styles = StyleSheet.create({
  ball_item_tm: {
    width: scale(126),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(8),
    marginVertical: scale(2),
    borderBottomRightRadius: scale(32),
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(16),
    borderBottomLeftRadius: scale(16),
  },
})

/**
 * 球的数据 和 PlayData 结构类似
 */
interface ILotteryEBallItem {
  id?: string; //708501
  exId?: string // 部分彩种的ID不是唯一的，就生成本地唯一识别ID, TM,特码B,708550
  name?: string; //01
  alias?: string;//特码A"
  code?: string;//01
  odds?: string;//42.5500
}

export default LotteryEBall
export { ILotteryEBallItem }

