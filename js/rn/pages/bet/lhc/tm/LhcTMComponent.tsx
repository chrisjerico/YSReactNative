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
import { useEffect, useState } from 'react'
import { BaseScreen } from '../../../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { pop } from '../../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { ugLog } from '../../../../public/tools/UgLog'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcTM from './UseLhcTM'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import { PlayOddData, PlayOddDetailData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryBall from '../../../../public/components/view/LotteryBall'
import { BallStyles } from '../../../hall/new/games/HallGameListComponent'

interface IRouteParams {
  nextIssueData?: NextIssueData //下期数据
  playOddDetailData?: PlayOddDetailData //当前彩种信息
  playOddData?: PlayOddData //当前数据列表
}

/**
 * 六合彩特码
 *
 * @param navigation
 * @constructor
 */
const LhcTMComponent = ({
                          nextIssueData,
                          playOddDetailData,
                          playOddData,
                        }: IRouteParams) => {


  const {
    setNextIssueData,
    setPlayOddDetailData,
    setPlayOddData,
    playGroupData,
    setPlayGroupData,
  } = UseLhcTM()

  useEffect(() => {
    // ugLog('playOddData=', playOddData)
    setNextIssueData(nextIssueData)
    setPlayOddDetailData(playOddDetailData)
    setPlayOddData(playOddData)
  }, [])

  return (
    <View style={CommStyles.flex}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          playGroupData?.map((groupData) => {
            return <View style={CommStyles.flex}>

              <View style={_styles.sub_title_container}>
                <Text style={_styles.sub_title_text}>{groupData?.alias}</Text>
              </View>

              <View style={_styles.ball_container}>
                {
                  groupData?.plays?.map((item) =>
                    <View style={_styles.ball_item}>
                      <LotteryBall type={BallStyles.lhc}
                                   ballNumber={item?.name}/>
                      <Text numberOfLines={1}
                            style={_styles.ball_odds}>{item.odds}</Text>
                    </View>)
                }
              </View>

            </View>
          })
        }
      </ScrollView>
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
    fontSize: scale(24),
    paddingHorizontal: scale(1),
  },
  ball_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
  ball_item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(2),
    paddingVertical: scale(10),
  },
  ball_odds: {
    width: scale(76),
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
  },


})

export default LhcTMComponent
