import {
  FlatList, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback, TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as React from 'react'
import FastImage from 'react-native-fast-image'
import WebView from 'react-native-webview'
import Modal from 'react-native-modal'
import { useContext, useEffect, useState } from 'react'
import { BaseScreen } from '../../../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { pop } from '../../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { ugLog } from '../../../../public/tools/UgLog'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcZM from './UseLhcZM'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryBall, { BallType } from '../../../../public/components/view/LotteryBall'
import { BallStyles } from '../../../hall/new/games/HallGameListComponent'
import BetLotteryContext from '../../BetLotteryContext'
import EBall from '../../../../public/components/view/lottery/EBall'
import { arrayLength } from '../../../../public/tools/Ext'
import ERect from '../../../../public/components/view/lottery/ERect'
import LotteryEBall from '../../widget/LotteryEBall'
import LotteryERect from '../../widget/LotteryERect'

interface IRouteParams {
}

/**
 * 六合彩正码
 *
 * @param navigation
 * @constructor
 */
const LhcZMComponent = ({}: IRouteParams) => {


  // const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const {
    dataZM,
    setDataZM,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcZM()

  /**
   * 绘制 方格式
   * @param item
   */
  const renderERect = (item?: PlayData) => <LotteryERect key={item?.id}
                                                         item={item}
                                                         selectedBalls={selectedBalls}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 球
   * @param item
   */
  const renderEBall = (item?: PlayData) => <LotteryEBall key={item?.id}
                                                         item={item}
                                                         selectedBalls={selectedBalls}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 正码
   * @param groupData
   */
  const renderTM = (groupData?: PlayGroupData) => <View key={groupData?.id}
                                                        style={CommStyles.flex}>

    <View style={_styles.sub_title_container}>
      <Text style={_styles.sub_title_text}>{groupData?.alias}</Text>
    </View>

    <View style={_styles.ball_container}>
      {
        groupData?.plays?.map((item) => renderEBall(item))
      }
    </View>
  </View>


  /**
   * 绘制 连码B/A
   * @param groupData
   */
  const renderLM = (groupData?: PlayGroupData) => <View key={groupData?.id}
                                                        style={CommStyles.flex}>

    <View style={_styles.sub_title_container}>
      <Text style={_styles.sub_title_text}>{groupData?.alias}</Text>
    </View>

    <View style={_styles.ball_container}>
      {
        groupData?.plays?.map((item) => renderERect(item))
      }
    </View>
  </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <ScrollView style={CommStyles.flex}
                                          showsVerticalScrollIndicator={false}>
    {arrayLength(dataZM) > 0 && renderTM(dataZM[0])}
    {arrayLength(dataZM) > 1 && renderLM(dataZM[1])}
  </ScrollView>

  return (
    <View style={CommStyles.flex}>
      {renderAllBall()}
    </View>

  )
}

const _styles = StyleSheet.create({
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
  ball_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
})

export default LhcZMComponent
