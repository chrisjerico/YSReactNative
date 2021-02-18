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
import { anyEmpty } from '../../../public/tools/Ext'

interface IPXEBall {
  item?: IPXLineEBallItem // 要绘制的数据
  ballProps?: IEBall //球的属性
  selectedBalls?: Array<PlayData | ZodiacNum> // 已选中的数据
  ballStyle?: StyleProp<ViewStyle>
  callback?: () => void // 按压回调
}

/**
 * 和 PlayData 结构类似
 */
interface IPXLineEBallItem {
  id?: string; //708501
  name?: string; //01
  alias?: string;//特码A"
  code?: string;//01
  odds?: string;//42.5500
  enable?: string//1 //彩种是否开启
  zodiacItem: ZodiacNum,
}

/**
 * 平肖一行彩票球+点击回调
 * @param item 条目数据
 * @param ballProps 球的类型
 * @param selectedBalls 选中的球列表
 * @param ballStyle 球的风格
 * @param callback 点击回调
 * @constructor
 */
const PXLineEBall = ({
                            item,
                            ballProps,
                            selectedBalls,
                            ballStyle,
                            callback,
                          }: IPXEBall) => {

  let isSel = isSelectedBallOnId(selectedBalls, item)

  let showName = anyEmpty(item?.alias) ? item?.name : item?.alias
  return (
    <TouchableWithoutFeedback key={'LotteryLineEBall' + item?.id}
                              style={CommStyles.flex}
                              onPress={() => callback && callback()}>
      <View key={'LotteryLineEBall' + item?.id}
            style={[
              _styles.ball_item_tm,
              {
                backgroundColor: isSel ? `${Skin1.themeColor}dd` : null,
              },
            ]}>
        <Text key={showName}
              style={[
                _styles.sub_title_text,
                isSel ? { color: 'white' } : null,
              ]}>{showName}</Text>
        <Text key={item?.odds}
              style={[
                _styles.sub_title_text_odds,
                isSel ? { color: 'white' } : null,
              ]}>{item?.odds}</Text>
        <View style={CommStyles.flex}/>
        {
          !anyEmpty(item?.zodiacItem) &&
          item?.zodiacItem?.nums?.map((zodiacNumber) =>
            <LotteryEBall key={item?.id + zodiacNumber}
                          ballProps={ballProps}
                          containerStyle={{ width: null }}
                          ballStyle={ballStyle}
                          item={{
                            id: item?.id + zodiacNumber,
                            name: zodiacNumber,
                            enable: item?.enable,
                          }}/>)
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

const _styles = StyleSheet.create({
  ball_item_tm: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(2),
    // borderBottomRightRadius: scale(32),
    // borderTopLeftRadius: scale(32),
    // borderTopRightRadius: scale(24),
    // borderBottomLeftRadius: scale(24),
    borderRadius: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.LineColor4,
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    paddingHorizontal: scale(8),
  },
  sub_title_text_odds: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
  },
})

export default PXLineEBall
export { IPXLineEBallItem }

