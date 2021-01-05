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

interface IRouteParams {
}

/**
 * 开奖时间显示
 *
 * @param navigation
 * @constructor
 */
const TimeComponent = ({}: IRouteParams) => {

  const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)


  const {
  } = UseTime()


  return (
    <View style={{
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
    }}>
      <Text>{`${nextIssueData().displayNumber}期`}</Text>
      <Text>{'封盘'}</Text>
      <Text>{'封盘'}</Text>
      <Text>{'封盘'}</Text>
    </View>

  )
}

const _styles = StyleSheet.create({


})

export default TimeComponent
