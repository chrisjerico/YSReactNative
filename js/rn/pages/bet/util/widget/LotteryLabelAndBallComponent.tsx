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
import CommStyles from '../../../base/CommStyles'
import LotteryLineEBall from '../../widget/LotteryLineEBall'
import { findZodiacByName } from '../LotteryUtil'
import { ugLog } from '../../../../public/tools/UgLog'

interface IUseLotteryLabelAndBallParams {
  listData?: LotteryListData
}

/**
 * 绘制 一行彩球
 * @constructor
 */
const LotteryLabelAndBallComponent = ({ listData }: IUseLotteryLabelAndBallParams) => {

  const data = listData?.data as PlayData

  //ugLog('LotteryLabelAndBallComponent=', JSON.stringify(data))
  /**
   * 绘制 生肖和球
   * @param item
   * @param index
   */
  const renderEBall = (item?: PlayData, index?: number) => <LotteryLineEBall key={'LotteryLineEBall' + item?.id + index}
                      item={{
                        ...item,
                        zodiacItem: item?.exZodiac,
                      }}
                      //selectedBalls={selectedBalls}
                      //callback={() => addOrRemoveBall(item?.id)}
    />

  return (<View style={_styles.ball_container}>
    { renderEBall(data) }
  </View>)
}

const _styles = StyleSheet.create({
  ball_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
  sub_title_container: {
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
    padding: scale(6),
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    paddingHorizontal: scale(1),
  },
})


export default LotteryLabelAndBallComponent

