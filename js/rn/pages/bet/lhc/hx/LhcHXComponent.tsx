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
import UseLhcHX from './UseLhcHX'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData, ZodiacNum,
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
import { ILotteryRouteParams, LEFT_ITEM_HEIGHT } from '../../const/LotteryConst'
import { findZodiacByName } from '../../util/LotteryUtil'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 *
 * @param navigation
 * @constructor
 */
const LhcHXComponent = ({ lotteryCode, style }: ILotteryRouteParams) => {

  const key = 'lottery page' + lotteryCode


  // const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    setLotteryCode,
    zodiacData,
    setZodiacData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcHX()

  useEffect(() => {
    setLotteryCode(lotteryCode)
  }, [])

  /**
   * 绘制 生肖和球
   * @param item
   * @param index
   */
  const renderEBall = (item?: ZodiacNum, index?: number) =>
    !anyEmpty(zodiacData) && <LotteryLineEBall key={key + 'renderEBall' + item?.id}
                                               item={{
                                                 id: item?.id,
                                                 name: item?.name,
                                                 zodiacItem: findZodiacByName(zodiacData, { name: item?.name }),
                                               }}
                                               selectedBalls={selectedBalls}
                                               callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 一行球
   * @param groupData
   */
  const renderLineBall = (groupData?: PlayGroupData) =>
    !anyEmpty(groupData) && <View key={key + groupData?.id}
                                  style={CommStyles.flex}>

      <View key={key + 'renderLineBall' + groupData?.id}
            style={_styles.sub_title_container}>
        <Text key={key + 'renderLineBall text' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</Text>
      </View>

      <View key={key + 'renderLineBall sub' + groupData?.id}
            style={_styles.ball_container}>
        {
          zodiacData?.map(renderEBall)
        }
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {arrayLength(curData) > 0 && renderLineBall(curData[0])}
  </View>

  return (
    <View key={key}
          style={[CommStyles.flex, style]}>
      {renderAllBall()}
    </View>

  )
}

const _styles = StyleSheet.create({
  content_container: {

    flex: 1,
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

export default LhcHXComponent