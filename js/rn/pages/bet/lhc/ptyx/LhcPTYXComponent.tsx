import {
  FlatList, Platform,
  ScrollView, StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback, TouchableOpacity,
  TouchableWithoutFeedback,
  View, ViewStyle,
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
import UseLhcPTYX from './UseLhcPTYX'
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
import { anyEmpty, arrayEmpty, arrayLength } from '../../../../public/tools/Ext'
import ERect from '../../../../public/components/view/lottery/ERect'
import LotteryEBall from '../../widget/LotteryEBall'
import LotteryERect from '../../widget/LotteryERect'
import LotteryLineEBall from '../../widget/LotteryLineEBall'

interface IRouteParams {
  lotteryCode?: string, //当前的彩票CODE，是平特一肖 还是 平特尾数 等等
  style?: StyleProp<ViewStyle>
}

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 *
 * @param navigation
 * @constructor
 */
const LhcPTYXComponent = ({ lotteryCode, style }: IRouteParams) => {


  // const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const {
    setLotteryCode,
    dataPTYX,
    setDataPTYX,
    zodiacData,
    setZodiacData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcPTYX()

  useEffect(()=>{
    setLotteryCode(lotteryCode)
  }, [])

  /**
   * 绘制 生肖和球
   * @param item
   */
  const renderEBall = (item?: PlayData) => !anyEmpty(zodiacData) &&  <LotteryLineEBall key={item?.id + item?.name}
                                                         item={{
                                                           ...item,
                                                           zodiacData
                                                         }}
                                                         selectedBalls={selectedBalls}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 方格式
   * @param item
   */
  const renderERect = (item?: PlayData) => <LotteryERect key={item?.id}
                                                         item={item}
                                                         selectedBalls={selectedBalls}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制全部的格子
   * @param groupData
   */
  const renderAllRect = (groupData?: PlayGroupData) => !anyEmpty(groupData) && <View key={groupData?.id + groupData?.alias}
                                    style={CommStyles.flex}>

    <View key={groupData?.alias}
          style={_styles.sub_title_container}>
      <Text key={groupData?.alias}
            style={_styles.sub_title_text}>{groupData?.alias}</Text>
    </View>

    <View style={_styles.rect_container}>
      {
        groupData?.plays?.map((item) => renderERect(item))
      }
    </View>

  </View>

  /**
   * 绘制 一行球
   * @param groupData
   */
  const renderLineBall = (groupData?: PlayGroupData) => !anyEmpty(groupData) && <View key={groupData?.id + groupData?.alias}
                                                        style={CommStyles.flex}>

    <View key={groupData?.alias}
          style={_styles.sub_title_container}>
      <Text key={groupData?.alias}
            style={_styles.sub_title_text}>{groupData?.alias}</Text>
    </View>

    <View style={_styles.ball_container}>
      {
        groupData?.plays?.map((item) => <View>
          {
            renderEBall(item)
          }
        </View>)
      }
    </View>
  </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <ScrollView style={CommStyles.flex}
                                          showsVerticalScrollIndicator={false}>
    {arrayLength(dataPTYX) > 0 && renderAllRect(dataPTYX[0])}
    {arrayLength(dataPTYX) > 1 && renderLineBall(dataPTYX[1])}
  </ScrollView>

  return (
    <View style={[CommStyles.flex, style]}>
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
    padding: scale(4),
  },
  rect_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
    flex: 1,
  },
})

export default LhcPTYXComponent
