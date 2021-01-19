import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { LotteryListData } from '../../../../redux/model/game/LotteryListModel'
import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { scale } from '../../../../public/tools/Scale'
import { PlayData, PlayGroupData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import LotteryEBall from '../../widget/LotteryEBall'

interface IUseLotteryBallParams {
  listData?: LotteryListData
  style?: StyleProp<ViewStyle>
}

/**
 * 绘制 彩球
 * @constructor
 */
const LotteryBallComponent = ({ listData, style }: IUseLotteryBallParams) => {

  const data = listData?.data as Array<PlayData>

  /**
   * 绘制 球
   * @param item
   * @param index
   */
  const renderEBall = (item?: PlayData, index?: number) => {
    const itemData: PlayData = {
      ...item,
      odds: listData?.code == 'ZXBZ' ? '' : item?.odds, //自选不中 不需要显示赔率
    }

    return (<LotteryEBall key={'renderEBall=' + item?.id + index}
                          item={itemData}
                          ballStyle={listData?.code == 'LMA' ? { flexDirection: 'column' } : null} //连码竖向排列
                          containerStyle={arrayLength(data) > 3 ? { width: scale(78) } : null}
      //selectedBalls={selectedBalls}
      //callback={() => addOrRemoveBall(item?.id)}
    />)
  }


  return (<View style={[_styles.ball_container, style]}>
    {data?.map(renderEBall)}
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


export default LotteryBallComponent

