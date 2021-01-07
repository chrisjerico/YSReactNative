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
import { LHC_Tab } from '../../const/LotteryConst'

interface IRouteParams {
}

/**
 * 六合彩正特
 *
 * @param navigation
 * @constructor
 */
const LhcZTComponent = ({}: IRouteParams) => {

  const [curData, setCurData] = useState<Array<PlayGroupData>>(null)

  const {
    tabIndex,
    setTabIndex,
    dataZT,
    setDataZT,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcZT()

  useEffect(() => {
    !anyEmpty(dataZT) && setCurData(dataZT[tabIndex])
  }, [tabIndex, dataZT])

  /**
   * 绘制生肖
   */
  const renderTab = () => <View style={_styles.tab_title_container}>
    <ScrollView style={_styles.tab_title_sv}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
      <View style={_styles.tab_title_content}>
        {
          dataZT?.map((item, index) =>
            <TouchableOpacity style={CommStyles.flex} key={index}
                              onPress={() => setTabIndex(index)}>
              <View key={index}
                    style={[
                      _styles.tab_item,
                      index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
                    ]}>
                <Text style={[
                  _styles.tab_title_item_text,
                  index == tabIndex ? { color: `white` } : null,
                ]}>{item[0]?.alias}</Text>
              </View>
            </TouchableOpacity>)
        }
      </View>
    </ScrollView>
    <Icon size={scale(36)}
          color={Skin1.themeColor}
          name={'angle-double-left'}/>
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
   * 绘制全部的球
   */
  const renderAllBall = () => <ScrollView
    showsVerticalScrollIndicator={false}>
    {arrayLength(curData) > 0 && renderTM(curData[0])}
    {arrayLength(curData) > 1 && renderLM(curData[1])}
  </ScrollView>

  return (
    <View style={CommStyles.flex}>
      {renderTab()}
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
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  tab_title_sv: {
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

export default LhcZTComponent
