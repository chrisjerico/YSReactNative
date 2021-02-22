import { Alert, AlertButton, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseHoChiMinBL from './UseHoChiMinBL'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import LotteryEBall from '../../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT, BallType } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGStore } from '../../../../../redux/store/UGStore'
import { calculateSliderValue } from '../../../util/ArithUtil'


/**
 * X字定位
 *
 * @param navigation
 * @constructor
 */
const HoChiMinBLComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    GAME_TYPE_ARRAY,
    tabGameIndex,
    setTabGameIndex,
    sliderValue,
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseHoChiMinBL()

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
    <TouchableWithoutFeedback key={key + item[0]?.alias + index}
                              style={CommStyles.flex}
                              onPress={() => setTabIndex(index)}>
      <View key={key + item[0]?.alias + index}
            style={[
              _styles.tab_item,
              index == tabIndex ? { backgroundColor: UGColor.transparent5 } : null,
              tabLen > 3 ? null : { width: scale(400 / tabLen) },//tab 少于4个 就平均分配空间
            ]}>
        <Text style={[
          _styles.tab_title_item_text,
          index == tabIndex ? { color: UGColor.TextColor1 } : null,
        ]}>{item[0]?.plays[0]?.name}</Text>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制tab
   */
  const renderTab = () => {
    const tabLen = arrayLength(playOddData?.pageData?.groupTri)//tab数量

    return <View key={key + 'tab'}
                 style={[
                   _styles.tab_title_container,
                   { backgroundColor: `${Skin1.themeColor}bb` },
                 ]}>
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
   * 单个TAB
   * @param item
   * @param index
   * @param tabLen 总共有多少个TAB
   */
  const renderGameTypeItem = (item?: string, index?: number) =>
    <TouchableWithoutFeedback key={key + item + index}
                              onPress={() => setTabGameIndex(index)}>
      <View key={key + item + index}
            style={[
              _styles.tab_game_item,
              index == tabGameIndex ? { backgroundColor: UGColor.transparent5 } : null,
            ]}>
        <Text style={[
          _styles.tab_game_title_item_text,
          index == tabGameIndex ? { color: UGColor.TextColor1 } : null,
        ]}>{item}</Text>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制tab
   */
  const renderGameType = () => {

    return <View key={key + 'tab'}
                 style={_styles.tab_game_title_container}>
      <Icon size={scale(42)}
            color={Skin1.themeColor}
            style={_styles.tab_game_icon}
            onPress={() => {
              Alert.alert(null,
                currentPageData[0]?.plays[0]?.rule,
                [{ text: '确定' } as AlertButton])
            }}
            name={'info-circle'}/>
      <View style={[
        _styles.tab_game_item_container,
        { backgroundColor: `${Skin1.themeColor}bb` },
      ]}>
        {GAME_TYPE_ARRAY?.map(
          (item, index) => renderGameTypeItem(item, index),
        )}
      </View>
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
                  containerStyle={_styles.ball_container}
                  ballType={{ size: scale(46) }}
                  ballStyle={{ flexDirection: 'column' }}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 X字定位
   * @param groupData
   * @param index
   */
  const renderBL = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderBL' + groupData?.id + ', index=' + index}
          style={CommStyles.flex}>

      {//显示赔率标题
        index == 0 && <View style={_styles.sub_big_title_container}>
          <Text style={[
            _styles.sub_big_title_text,
            { color: Skin1.themeColor },
          ]}>{`赔率: ${calculateSliderValue(groupData?.exPlays[0]?.odds, sliderValue)}`}</Text>
        </View>
      }

      {//显示赔率提醒文字
        index == 0 && !anyEmpty(groupData?.exHint) && <View style={_styles.sub_big_hint_container}>
          <Text style={_styles.sub_big_hint_text}>{groupData?.exHint}</Text>
        </View>
      }

      <View style={_styles.sub_title_container}>
        <Text style={[
          _styles.sub_title_text,
          { color: Skin1.themeColor },
        ]}>{groupData?.exPlays[0]?.alias}</Text>
      </View>

      <View style={_styles.ball_parent_container}>
        {groupData?.exPlays.map((item, index) => renderEBall(groupData, item))}
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View style={_styles.content_container}>
    {currentPageData?.map(renderBL)}
  </View>

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={[_styles.sv_container, style]}>
      {renderTab()}
      {renderGameType()}
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
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: 'white',
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
  ball_container: {
    width: scale(78),
    alignItems: 'center',
    paddingHorizontal: scale(0),
  },
  tab_game_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
    paddingVertical: scale(4),
  },
  tab_game_icon: {
    paddingHorizontal: scale(6),
  },
  tab_game_item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  tab_game_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  tab_game_title_item_text: {
    color: 'white',
    fontSize: scale(20),
    paddingLeft: scale(6),
  },


})

export default HoChiMinBLComponent
