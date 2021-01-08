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
import UseLhcTM from './UseLhcTM'
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
import { LHC_Tab } from '../../const/LotteryConst'

interface IRouteParams {
}

/**
 * 六合彩特码
 *
 * @param navigation
 * @constructor
 */
const LhcTMComponent = ({}: IRouteParams) => {


  // const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const {
    tabIndex,
    setTabIndex,
    dataTMA,
    setDataTMA,
    dataTMB,
    setDataTMB,
    zodiacData,
    setZodiacData,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveZodiac,
    addOrRemoveBall,
  } = UseLhcTM()

  //当前的数据是 特码A 还是 特码B
  const ballData = tabIndex == LHC_Tab.TM_A ? dataTMA : dataTMB

  /**
   * 绘制 特码A 特码B Tab
   */
  const renderTabItem = (tab?: number) => <View style={[
    _styles.tab_item,
    tabIndex == tab ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
  ]}>
    <TouchableOpacity onPress={() => setTabIndex(tab)}
                      style={_styles.tab_title_tb}>
      <Text style={[
        _styles.tab_title,
        tabIndex == tab ? { color: 'white' } : null,
      ]}>{
        tab == LHC_Tab.TM_A ?
          (dataTMA && dataTMA[0].alias) :
          (dataTMB && dataTMB[0].alias)
      }</Text>
    </TouchableOpacity>
  </View>

  /**
   * 绘制 特码A 特码B 容器
   */
  const renderTab = () => <View style={_styles.tab_container}>
    {renderTabItem(LHC_Tab.TM_B)}
    {renderTabItem(LHC_Tab.TM_A)}
  </View>

  /**
   * 绘制生肖
   */
  const renderZodiac = () => <View>
    <ScrollView showsHorizontalScrollIndicator={false}
                horizontal={true}>
      <View style={_styles.zodiac_container}>
        {
          zodiacData?.map((item, index) =>
            <TouchableOpacity key={index}
                              onPress={() => addOrRemoveZodiac(item)}>
              <View key={`${selectedZodiac?.includes(item)}`}
                    style={_styles.zodiac_item}>
                {
                  selectedZodiac?.includes(item) ?
                    <Icon size={scale(36)}
                          color={Skin1.themeColor}
                          name={'check-circle'}/> :
                    <Icon size={scale(36)}
                          name={'circle-o'}/>
                }
                <Text style={_styles.zodiac_item_text}>{item?.name}</Text>
              </View>
            </TouchableOpacity>)
        }
      </View>
    </ScrollView>
  </View>

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
   * 绘制 特码B/A
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
   * 绘制 色波B/A
   * @param groupData
   */
  const renderSB = (groupData?: PlayGroupData) => <View key={groupData?.id}
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
    {arrayLength(ballData) > 0 && renderTM(ballData[0])}
    {arrayLength(ballData) > 1 && renderLM(ballData[1])}
    {arrayLength(ballData) > 2 && renderSB(ballData[2])}
  </ScrollView>

  return (
    <View style={CommStyles.flex}>
      {renderTab()}
      {renderZodiac()}
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
  tab_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
  },
  tab_container: {
    flexDirection: 'row',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  zodiac_container: {
    flexDirection: 'row',
  },
  zodiac_item: {
    flexDirection: 'row',
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    alignItems: 'center',
  },
  zodiac_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },


})

export default LhcTMComponent