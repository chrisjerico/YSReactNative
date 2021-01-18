import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayData, PlayGroupData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import LotteryEBall from '../../widget/LotteryEBall'

interface IUseLotteryBallParams {
  listData?: LotteryListData
}

/**
 * 绘制 彩球
 * @constructor
 */
const UseLotteryBall = ({ listData }: IUseLotteryBallParams) => {
  /**
   * 绘制 球
   * @param item
   * @param index
   */
  const renderEBall = (item?: PlayData, index?: number) => <LotteryEBall item={item}
                                                                         //selectedBalls={selectedBalls}
                                                                         //callback={() => addOrRemoveBall(item?.id)}
  />

  return (<View style={_styles.ball_container}>
    { (listData?.data as Array<PlayData>)?.map(renderEBall) }
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


export default UseLotteryBall

