import {
  FlatList, Platform,
  ScrollView, StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback, TouchableOpacity,
  TouchableWithoutFeedback,
  View, ViewProps, ViewStyle,
} from 'react-native'
import * as React from 'react'
import FastImage from 'react-native-fast-image'
import WebView from 'react-native-webview'
import Modal from 'react-native-modal'
import { useContext, useEffect, useState } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { pop } from '../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/AntDesign'
import CommStyles from '../../base/CommStyles'
import { ugLog } from '../../../public/tools/UgLog'
import { UGColor } from '../../../public/theme/UGThemeColor'
import UseLhcBoard, { ILMABallArray } from './UseLhcBoard'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryBall, { BallType } from '../../../public/components/view/LotteryBall'
import { BallStyles } from '../../hall/new/games/HallGameListComponent'
import BetLotteryContext from '../BetLotteryContext'
import EBall from '../../../public/components/view/lottery/EBall'
import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import ERect from '../../../public/components/view/lottery/ERect'
import LotteryEBall from '../widget/LotteryEBall'
import LotteryERect from '../widget/LotteryERect'
import { IBetBoardParams, ILotteryRouteParams } from '../const/LotteryConst'
import { doc } from 'prettier'


/**
 * 彩票下注 功能面板
 *
 * @param navigation
 * @constructor
 */
const BetBoardComponent = ({ style }: IBetBoardParams) => {

  const {
    sliderValue,
    setSliderValue,
    inputMoney,
    setInputMoney,
    showChip,
    setShowChip,
  } = UseLhcBoard()

  useEffect(() => {

  }, [])

  const renderSliderArea = () => <View style={_styles.slider_container}>

    <Text style={_styles.sub_title_text}>{'退水: 0%'}</Text>

    <Icon size={scale(36)}
          color={Skin1.themeColor}
          name={'minuscircleo'}/>

    <Icon size={scale(36)}
          color={Skin1.themeColor}
          name={'pluscircleo'}/>

  </View>
  return (
    <View style={style}>
      {renderSliderArea()}
    </View>

  )
}

const _styles = StyleSheet.create({
  slider_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
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
  ball_odds: {
    width: scale(76),
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
  },
  tab_title_tb: {
    width: '100%',
    alignItems: 'center',
  },
  tab_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    padding: scale(6),
  },
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  sv_container: {
    flex: 1,
  },
  tab_title_content: {
    flexDirection: 'row',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },


})

export default BetBoardComponent
