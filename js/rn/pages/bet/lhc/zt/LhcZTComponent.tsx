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
import UseLhcZT from './UseLhcZT'
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
import { LEFT_ITEM_HEIGHT } from '../../const/LotteryConst'

interface ILotteryRouteParams {
  lotteryCode?: string, //当前的彩票CODE，正码、正特 等等
  style?: StyleProp<ViewStyle>
}

/**
 * 六合彩 正特 正码 等等
 *
 * @param navigation
 * @constructor
 */
const LhcZTComponent = ({ lotteryCode, style }: ILotteryRouteParams) => {

  const key = 'lottery page' + lotteryCode

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    setLotteryCode,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcZT()

  useEffect(() => {
    setLotteryCode(lotteryCode)
  }, [])

  const renderTabItem = (item: Array<PlayGroupData>, index: number) => <TouchableOpacity key={key + item[0]?.alias}
                                                                                         onPress={() => setTabIndex(index)}>
    <View key={key + item[0]?.id}
          style={[
            _styles.tab_item,
            index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
          ]}>
      <Text key={key + item[0]?.id}
            style={[
              _styles.tab_title_item_text,
              index == tabIndex ? { color: `white` } : null,
            ]}>{item[0]?.alias}</Text>
    </View>
  </TouchableOpacity>

  /**
   * 绘制tab，只有1个数据不绘制Tab
   */
  const renderTab = () => arrayLength(pageData) > 1 && <View key={key + 'tab'}
                                                             style={_styles.tab_title_container}>
    <ScrollView key={key + 'sv'}
                style={_styles.sv_container}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
      <View key={key + 'content'}
            style={_styles.tab_title_content}>
        {
          pageData?.map(renderTabItem)
        }
      </View>
    </ScrollView>
    <Icon key={key + 'tab Icon'}
          size={scale(36)}
          color={Skin1.themeColor}
          name={'angle-double-left'}/>
  </View>

  /**
   * 绘制 方格式
   * @param item
   */
  const renderERect = (item?: PlayData) => <LotteryERect key={key + 'renderERect' + item?.id}
                                                         item={item}
                                                         selectedBalls={selectedBalls}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 球
   * @param item
   */
  const renderEBall = (item?: PlayData) => <LotteryEBall key={key + 'renderEBall' + item?.id}
                                                         item={item}
                                                         selectedBalls={selectedBalls}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 正特
   * @param groupData
   */
  const renderZT1 = (groupData?: PlayGroupData) => <View key={key + 'renderZT1' + groupData?.id}
                                                         style={CommStyles.flex}>

    <View key={key + ' sub renderZT1' + groupData?.id}
          style={_styles.sub_title_container}>
      <Text key={key + ' sub renderZT1 text' + groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</Text>
    </View>

    <View key={key + ' sub2 renderZT1' + groupData?.id}
          style={_styles.ball_container}>
      {
        groupData?.plays?.map((item) => renderEBall(item))
      }
    </View>
  </View>


  /**
   * 绘制 正特
   * @param groupData
   */
  const renderZT2 = (groupData?: PlayGroupData) => <View key={key + 'renderZT2' + groupData?.id}
                                                         style={CommStyles.flex}>

    <View key={key + ' sub renderZT2' + groupData?.id}
          style={_styles.sub_title_container}>
      <Text key={key + ' sub renderZT2' +  + groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</Text>
    </View>

    <View key={key + ' sub2 renderZT2' + groupData?.id}
          style={_styles.ball_container}>
      {
        groupData?.plays?.map((item) => renderERect(item))
      }
    </View>
  </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {arrayLength(curData) > 0 && renderZT1(curData[0])}
    {arrayLength(curData) > 1 && renderZT2(curData[1])}
  </View>

  return (
    <View key={key}
          style={[CommStyles.flex, style]}>
      {renderTab()}
      {renderAllBall()}
    </View>

  )
}

const _styles = StyleSheet.create({
  content_container: {
    paddingBottom: LEFT_ITEM_HEIGHT * 6,
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
  tab_item2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
    backgroundColor: 'red'
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },


})

export default LhcZTComponent
