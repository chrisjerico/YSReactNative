import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseLhcZT from './UseLhcZT'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import LotteryEBall from '../../../widget/LotteryEBall'
import LotteryERect from '../../../widget/LotteryERect'
import { BALL_CONTENT_HEIGHT } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGStore } from '../../../../../redux/store/UGStore'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

/**
 * 六合彩 正特 正码 等等
 *
 * @param navigation
 * @constructor
 */
const LhcZTComponent = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcZT()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 单个Tab
   * @param item
   * @param index
   */
  const renderTabItem = (item: Array<PlayGroupData>, index: number) =>
    <TouchableWithoutFeedback key={key + item[0]?.alias}
                              onPress={() => {
                                UGStore.dispatch({ type: 'reset', selectedData: new Map<string, Map<string, Map<string, SelectedPlayModel>>>() })
                                setSelectedBalls([])
                                setTabIndex(index)
                              }}>
      <View key={key + item[0]?.id}
            style={[
              _styles.tab_item,
              index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
            ]}>
        <UGText key={key + item[0]?.id}
              style={[
                _styles.tab_title_item_text,
                index == tabIndex ? { color: `white` } : null,
              ]}>{item[0]?.alias}</UGText>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制tab，只有1个数据不绘制Tab
   */
  const renderTab = () => arrayLength(playOddData?.pageData?.groupTri) > 1 && <View key={key + 'tab'}
                                                                                    style={_styles.tab_title_container}>
    <ScrollView key={key + 'sv'}
                style={_styles.sv_tab_container}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
      <View key={key + 'content'}
            style={_styles.tab_title_content}>
        {playOddData?.pageData?.groupTri?.map(renderTabItem)}
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
   * @param ballInfo
   */
  const renderERect = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryERect key={key + 'renderERect' + ballInfo?.id}
                  item={ballInfo}
                  selectedBalls={selectedBalls}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 球
   * @param item
   * @param ballInfo
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryEBall key={key + 'renderEBall' + ballInfo?.id}
                  item={ballInfo}
                  selectedBalls={selectedBalls}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 正特
   * @param groupData
   */
  const renderZT1 = (groupData?: PlayGroupData) => <View key={key + 'renderZT1' + groupData?.id}
                                                         style={CommStyles.flex}>

    <View key={key + ' sub renderZT1' + groupData?.id}
          style={_styles.sub_title_container}>
      <UGText key={key + ' sub renderZT1 text' + groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</UGText>
    </View>

    <View key={key + ' sub2 renderZT1' + groupData?.id}
          style={_styles.ball_parent_container}>
      {groupData?.plays?.map((item) => renderEBall(groupData, item))}
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
      <UGText key={key + ' sub renderZT2' + +groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</UGText>
    </View>

    <View key={key + ' sub2 renderZT2' + groupData?.id}
          style={_styles.ball_parent_container}>
      {groupData?.plays?.map((item) => renderERect(groupData, item))}
    </View>
  </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {arrayLength(currentPageData) > 0 && renderZT1(currentPageData[0])}
    {arrayLength(currentPageData) > 1 && renderZT2(currentPageData[1])}
  </View>

  return (
    <ScrollView key={key}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={[_styles.sv_container, style]}>
      {renderTab()}
      {renderAllBall()}
    </ScrollView>
  )
}

const _styles = StyleSheet.create({
  sv_container: {
    flex: 1,
    height: BALL_CONTENT_HEIGHT,
  },
  sv_tab_container: {
    flex: 1,
  },
  content_container: {
    flex: 1,
    paddingBottom: scale(120),
  },
  sub_title_container: {
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(4),
    padding: scale(6),
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    paddingHorizontal: scale(1),
  },
  ball_parent_container: {
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
  tab_title_content: {
    flexDirection: 'row',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_item2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
    backgroundColor: 'red',
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },


})

export default LhcZTComponent
