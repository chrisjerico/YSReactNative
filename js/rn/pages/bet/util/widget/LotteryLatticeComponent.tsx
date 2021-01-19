import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayData, PlayGroupData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import LotteryEBall from '../../widget/LotteryEBall'
import LotteryERect from '../../widget/LotteryERect'

interface IUseLotteryLatticeParams {
  listData?: LotteryListData
  style?: StyleProp<ViewStyle>
}

/**
 * 绘制 彩格子
 * @constructor
 */
const LotteryLatticeComponent = ({ listData, style }: IUseLotteryLatticeParams) => {
  /**
   * 绘制 方格式
   * @param item
   * @param index
   */
  const renderERect = (item?: PlayData, index?: number) => <LotteryERect key={'renderERect=' + item?.id + index}
                                                                         item={item}
                                                                         //selectedBalls={selectedBalls}
                                                                         //callback={() => addOrRemoveBall(item?.id)}
  />

  return (<View style={[_styles.ball_container, style]}>
    { (listData?.data as Array<PlayData>)?.map(renderERect) }
  </View>)
}

const _styles = StyleSheet.create({
  ball_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
})


export default LotteryLatticeComponent

