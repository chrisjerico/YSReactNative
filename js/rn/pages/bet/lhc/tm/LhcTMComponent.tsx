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

const TAB_A = 0//代表 特码A
const TAB_B = 1 //代表 特码B

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


  const [tabIndex, setTabIndex] = useState(TAB_B) //当前选中哪个tab，0 和 1

  const {
    setNextIssueData,
    setPlayOddDetailData,
    setPlayOddData,
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

  useEffect(() => {
    // ugLog('playOddData=', playOddData)
    setNextIssueData(nextIssueData)
    setPlayOddDetailData(playOddDetailData)
    setPlayOddData(playOddData)
  }, [])

  //当前的数据是 特码A 还是 特码B
  const ballData = tabIndex == TAB_A ? dataTMA : dataTMB

  /**
   * 绘制 特码A 特码B Tab
   */
  const renderTabItem = (tab?: number) => <View style={[
    _styles.tab_item,
    tabIndex == tab ? { backgroundColor: UGColor.LineColor1 } : null,
  ]}>
    <TouchableOpacity onPress={() => setTabIndex(tab)}>
      <Text style={_styles.tab_title}>{
        tab == TAB_A ?
          (dataTMA && dataTMA[0].alias) :
          (dataTMB && dataTMB[0].alias)
      }</Text>
    </TouchableOpacity>
  </View>

  /**
   * 绘制 特码A 特码B Tab
   */
  const renderTab = () => <View style={_styles.tab_container}>
    {renderTabItem(TAB_B)}
    {renderTabItem(TAB_A)}
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
   * 绘制全部的球
   */
  const renderBall = () => <View>
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        ballData?.map((groupData) => {
          return <View style={CommStyles.flex}>

            <View style={_styles.sub_title_container}>
              <Text style={_styles.sub_title_text}>{groupData?.alias}</Text>
            </View>

            <View style={_styles.ball_container}>
              {
                groupData?.plays?.map((item) =>
                  <TouchableOpacity onPress={() => addOrRemoveBall(item?.name)}>
                    <View style={[
                      _styles.ball_item,
                      {
                        backgroundColor:
                          selectedBalls?.includes(item?.name) ? `${Skin1.themeColor}66` : null,
                      },
                    ]}>
                      <LotteryBall type={BallStyles.lhc}
                                   ballNumber={item?.name}/>
                      <Text numberOfLines={1}
                            style={_styles.ball_odds}>{item.odds}</Text>
                    </View>
                  </TouchableOpacity>)
              }
            </View>

          </View>
        })
      }
    </ScrollView>
  </View>

  return (
    <View style={CommStyles.flex}>
      {renderTab()}
      {renderZodiac()}
      {renderBall()}
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
  ball_item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(2),
    paddingVertical: scale(8),
    marginVertical: scale(2),
    borderRadius: scale(10),
  },
  ball_odds: {
    width: scale(76),
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
  },
  tab_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    padding: scale(8),
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
