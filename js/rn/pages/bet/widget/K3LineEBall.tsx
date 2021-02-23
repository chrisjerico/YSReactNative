import { PlayData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { IEBall } from '../../../public/components/view/lottery/EBall'
import * as React from 'react'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { isSelectedBallOnId } from './it/ISelBall'
import LotteryEBall from './LotteryEBall'
import CommStyles from '../../base/CommStyles'
import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface IK3EBall {
  item?: IK3LineEBallItem // 要绘制的数据
  ballProps?: IEBall //球的属性
  selectedBalls?: Array<PlayData | ZodiacNum> // 已选中的数据
  ballStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  callback?: () => void // 按压回调
}

/**
 * 和 PlayData 结构类似
 */
interface IK3LineEBallItem {
  id?: string; //708501
  name?: string; //01
  alias?: string;//特码A"
  code?: string;//01
  odds?: string;//42.5500
  enable?: string//1 //彩种是否开启
}

/**
 * 平肖一行彩票球+点击回调
 * @param item 条目数据
 * @param ballProps 球的类型
 * @param selectedBalls 选中的球列表
 * @param ballStyle 球的风格
 * @param containerStyle 窗口的风格
 * @param callback 点击回调
 * @constructor
 */
const K3LineEBall = ({
                       item,
                       ballProps,
                       selectedBalls,
                       ballStyle,
                       containerStyle,
                       callback,
                     }: IK3EBall) => {

  let isSel = isSelectedBallOnId(selectedBalls, item)

  let ballNameArr = anyEmpty(item?.name) && item?.name?.includes('_') ? null : item?.name?.split('_')
  return (
    <TouchableWithoutFeedback key={'LotteryLineEBall' + item?.id}
                              style={CommStyles.flex}
                              onPress={() => callback && callback()}>
      <View key={'LotteryLineEBall' + item?.id}
            style={[
              _styles.ball_item_tm,
              containerStyle,
              isSel ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
            ]}>
        <View style={_styles.ball_item_container}>
          {
            !anyEmpty(ballNameArr) &&
            ballNameArr?.map((ball, index) =>
              <LotteryEBall key={item?.id + ball + index}
                            ballProps={ballProps}
                            containerStyle={{ width: null }}
                            ballStyle={ballStyle}
                            item={{
                              id: item?.id + ball,
                              name: ball,
                              enable: item?.enable,
                            }}/>)
          }
        </View>
        <UGText key={item?.odds}
              style={[
                _styles.sub_title_text_odds,
                isSel ? { color: 'white' } : null,
              ]}>{item?.odds}</UGText>
      </View>
    </TouchableWithoutFeedback>
  )
}

const _styles = StyleSheet.create({
  ball_item_tm: {
    width: scale(195),
    alignItems: 'center',
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    // borderBottomRightRadius: scale(32),
    // borderTopLeftRadius: scale(32),
    // borderTopRightRadius: scale(24),
    // borderBottomLeftRadius: scale(24),
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
  },
  ball_item_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    paddingHorizontal: scale(8),
  },
  sub_title_text_odds: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(2),
  },
})

export default K3LineEBall
export { IK3LineEBallItem }

