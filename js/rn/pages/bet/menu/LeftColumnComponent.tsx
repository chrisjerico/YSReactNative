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
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { pop } from '../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../base/CommStyles'
import { ugLog } from '../../../public/tools/UgLog'
import { UGColor } from '../../../public/theme/UGThemeColor'
import UseLeftComponent from './UseLeftComponent'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData, ZodiacNum,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryBall, { BallType } from '../../../public/components/view/LotteryBall'
import { BallStyles } from '../../hall/new/games/HallGameListComponent'
import BetLotteryContext from '../BetLotteryContext'
import EBall from '../../../public/components/view/lottery/EBall'
import { anyEmpty, arrayEmpty, arrayLength } from '../../../public/tools/Ext'
import ERect from '../../../public/components/view/lottery/ERect'
import LotteryEBall from '../widget/LotteryEBall'
import LotteryERect from '../widget/LotteryERect'
import LotteryLineEBall from '../widget/LotteryLineEBall'
import { BALL_CONTENT_HEIGHT, ILotteryRouteParams, LEFT_ITEM_HEIGHT } from '../const/LotteryConst'
import { findZodiacByName } from '../util/LotteryUtil'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 *
 * @param navigation
 * @constructor
 */
const LeftColumnComponent = ({ style }: ILotteryRouteParams) => {

  const {
    leftColumnIndex,
    setLeftColumnIndex,
    playOddDetailData,
  } = UseLeftComponent()

  /**
   * 绘制左边列表 特码 双面 正码 等等
   */
  const renderLeftColumn = () => <View style={_styles.left_column_container}>
    <ScrollView nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
      <View style={_styles.left_column_content}>
        {
          playOddDetailData()?.playOdds?.map((item, index) => {
            return <TouchableOpacity key={'renderLeftColumn=' + item?.code}
                                     onPress={() => setLeftColumnIndex(index)}>
              <View key={'renderLeftColumn' + item?.code}
                    style={[
                      _styles.left_column_item,
                      {
                        borderWidth: leftColumnIndex == index ? scale(3) : scale(1),
                        borderColor: leftColumnIndex == index ? Skin1.themeColor : UGColor.LineColor4,
                      },
                    ]}>
                <Text key={'renderLeftColumn' + item?.code}
                      style={_styles.left_column_text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          })
        }
      </View>
    </ScrollView>
  </View>

  return (<View style={style}>
      {renderLeftColumn()}
    </View>)
}

const _styles = StyleSheet.create({
  left_column_container: {
    height: BALL_CONTENT_HEIGHT,
  },
  left_column_content: {

  },
  left_column_text: {
    color: UGColor.TextColor7,
    fontSize: scale(22),
  },
  left_column_item: {
    width: scale(140),
    alignItems: 'center',
    justifyContent: 'center',
    height: LEFT_ITEM_HEIGHT,
    borderRadius: scale(8),
  },
})

export default LeftColumnComponent
