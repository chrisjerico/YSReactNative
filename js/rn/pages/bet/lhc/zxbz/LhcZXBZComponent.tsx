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
import { BaseScreen } from '../../../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { pop } from '../../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { ugLog } from '../../../../public/tools/UgLog'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcZXBZ, { ILMABallArray } from './UseLhcZXBZ'
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
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import ERect from '../../../../public/components/view/lottery/ERect'
import LotteryEBall from '../../widget/LotteryEBall'
import LotteryERect from '../../widget/LotteryERect'
import { ILotteryRouteParams, LEFT_ITEM_HEIGHT } from '../../const/LotteryConst'
import { doc } from 'prettier'


/**
 * 六合彩 自选不中
 *
 * @param navigation
 * @constructor
 */
const LhcZXBZComponent = ({ lotteryCode, style }: ILotteryRouteParams) => {

  const key = 'lottery page' + lotteryCode

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    setLotteryCode,
    ballArray,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcZXBZ()

  useEffect(() => {
    setLotteryCode(lotteryCode)
  }, [])

  /**
   * 绘制 球
   * @param item
   * @param ballInfo 手动生成的数据
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: ILMABallArray) => {

    return (
      <LotteryEBall key={key + 'renderEBall' + ballInfo?.id}
                    item={{
                      ...ballInfo,
                    }}
                    selectedBalls={selectedBalls}
                    containerStyle={{ width: scale(78) }}
                    callback={() => addOrRemoveBall(ballInfo?.id)}/>
    )
  }

  /**
   * 绘制 自选不中
   * @param groupData
   */
  const renderLMA = (groupData?: PlayGroupData) => {

    return (
      <View key={key + 'renderLMA' + groupData?.id}
            style={CommStyles.flex}>

        <View key={key + 'render LMA sub' + groupData?.id}
              style={_styles.sub_title_container}>
          <Text key={key + 'render LMA text' + groupData?.id}
                style={[
            _styles.sub_title_text,
            { color: Skin1.themeColor },
          ]}>{groupData?.alias}</Text>
        </View>

        <View key={key + 'render LMA sub2' + groupData?.id}
              style={_styles.ball_container}>
          {
            ballArray?.map((item, index) => renderEBall(groupData, item))
          }
        </View>
      </View>
    )
  }

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'render all ball'}
                                    style={_styles.content_container}>
    {!anyEmpty(curData) && renderLMA(curData[0])}
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

export default LhcZXBZComponent