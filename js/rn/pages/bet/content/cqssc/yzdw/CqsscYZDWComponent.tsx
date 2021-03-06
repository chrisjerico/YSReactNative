import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseCqsscYZDW from './UseCqsscYZDW'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import LotteryEBall  from '../../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGStore } from '../../../../../redux/store/UGStore'
import { calculateSliderValue } from '../../../util/ArithUtil'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'


/**
 * X字定位
 *
 * @param navigation
 * @constructor
 */
const CqsscYZDWComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    sliderValue,
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseCqsscYZDW()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 单个TAB
   * @param item
   * @param index
   * @param tabLen 总共有多少个TAB
   */
  const renderTabItem = (item?: Array<PlayGroupData>, index?: number, tabLen?: number) =>
    <TouchableWithoutFeedback key={key + item[0]?.alias}
                              style={CommStyles.flex}
                              onPress={() => setTabIndex(index)}>
      <View key={key + item[0]?.alias}
            style={[
              _styles.tab_item,
              index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
              tabLen > 3 ? null: { width: scale(400/tabLen) },//tab 少于4个 就平均分配空间
            ]}>
        <UGText key={key + item[0]?.alias}
              style={[
                _styles.tab_title_item_text,
                index == tabIndex ? { color: `white` } : null,
              ]}>{item[0]?.alias}</UGText>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制tab
   */
  const renderTab = () => {
    const tabLen = arrayLength(playOddData?.pageData?.groupTri)//tab数量

    return <View key={key + 'tab'}
                 style={_styles.tab_title_container}>
      <ScrollView key={key + 'sv'}
                  style={_styles.sv_tab_container}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
        <View key={key + 'content'}
              style={_styles.tab_title_content}>
          {playOddData?.pageData?.groupTri?.map(
            (item, index) => renderTabItem(item, index, tabLen),
          )}
        </View>
      </ScrollView>
      {
        tabLen > 3 && <Icon size={scale(36)}
                            color={Skin1.themeColor}
                            name={'angle-double-left'}/>
      }
    </View>
  }

  /**
   * 绘制 球
   * @param item
   * @param ballInfo 手动生成的数据
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryEBall key={key + 'renderEBall' + ballInfo?.id + ballInfo?.name}
                  item={{
                    ...ballInfo,
                    odds: null,
                  }}
                  selectedBalls={selectedBalls}
                  ballType={{ size: scale(46) }}
                  ballStyle={{ flexDirection: 'column' }}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 X字定位
   * @param groupData
   * @param index
   */
  const renderYZDW = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderYZDW' + groupData?.id + ', index=' + index}
          style={CommStyles.flex}>

      {//显示赔率标题
        index == 0 && <View style={_styles.sub_big_title_container}>
          <UGText style={[
                  _styles.sub_big_title_text,
                  { color: Skin1.themeColor },
                ]}>{`赔率: ${calculateSliderValue(groupData?.exPlays[0]?.odds, sliderValue)}`}</UGText>
        </View>
      }

      {//显示赔率提醒文字
        index == 0 && !anyEmpty(groupData?.exHint) && <View style={_styles.sub_big_hint_container}>
          <UGText style={_styles.sub_big_hint_text}>{groupData?.exHint}</UGText>
        </View>
      }

      <View style={_styles.sub_title_container}>
        <UGText style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.exPlays[0]?.alias}</UGText>
      </View>

      <View style={_styles.ball_parent_container}>
        {groupData?.exPlays?.map((item, index) => renderEBall(groupData, item))}
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View style={_styles.content_container}>
    {currentPageData?.map(renderYZDW)}
  </View>

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
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
  content_container: {
    flex: 1,
    paddingBottom: scale(120),
  },
  sub_big_title_container: {
    alignItems: 'center',
    padding: scale(6),
  },
  sub_big_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    paddingHorizontal: scale(1),
  },
  sub_big_hint_container: {
    alignItems: 'center',
    paddingHorizontal: scale(4),
    paddingBottom: scale(6),
  },
  sub_big_hint_text: {
    color: UGColor.TextColor3,
    fontSize: scale(19),
    paddingHorizontal: scale(1),
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
  sv_tab_container: {
    flex: 1,
  },
  tab_title_content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    paddingVertical: scale(8),
    minWidth: scale(120),
    paddingHorizontal: scale(6),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
  },


})

export default CqsscYZDWComponent
