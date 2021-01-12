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
import * as Animatable from 'react-native-animatable'
import UseTime from './UseTime'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import { PlayOddDetailData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import CommStyles from '../../base/CommStyles'
import BetLotteryContext from '../BetLotteryContext'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'

interface IRouteParams {
}

/**
 * 开奖时间显示
 *
 * @param navigation
 * @constructor
 */
const TimeComponent = ({}: IRouteParams) => {

  const { nextIssueData, playOddDetailData, curPlayOddData } = useContext(BetLotteryContext)


  const {
    displayCloseTime,
    displayOpenTime,
  } = UseTime()


  return (
    <View style={_styles.container}>
      <Text style={_styles.issue_text}>{`${nextIssueData()?.displayNumber}期`}</Text>
      <Text style={_styles.close_text}>{'封盘:'}</Text>
      <Text style={_styles.close_time}>{displayCloseTime}</Text>
      <Text style={_styles.close_text}>{'开盘:'}</Text>
      <Text style={_styles.open_time}>{displayOpenTime}</Text>
    </View>

  )
}

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  issue_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(8),
  },
  close_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingHorizontal: scale(4),
  },
  close_time: {
    color: UGColor.RedColor2,
    fontSize: scale(22),
  },
  open_time: {
    color: UGColor.WarnningColor1,
    fontSize: scale(22),
  },

})

export default TimeComponent
