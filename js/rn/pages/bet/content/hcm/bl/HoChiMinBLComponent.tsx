import {
  Alert,
  AlertButton,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
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
import { BALL_CONTENT_HEIGHT, BallType, HoChiMinSub } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { calculateSliderValue } from '../../../util/ArithUtil'
import { ILotteryBall } from '../../../../../public/components/view/LotteryBall'
import { array } from 'prop-types'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import DialogRecordComponent from '../../counter/越南彩开奖记录/DialogRecordComponent'
import { UGStore } from '../../../../../redux/store/UGStore'


/**
 * X胡志明
 *
 * @param navigation
 * @constructor
 */
const HoChiMinBLComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    inputHint,
    GAME_TYPE_ARRAY,
    ballTypeIndex,
    setBallTypeIndex,
    HcmTabOption,
    blInputNumber,
    setBlInputNumber,
    tabHochimin,
    setTabHochimin,
    sliderValue,
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    addAndRemoveBallList,
  } = UseHoChiMinBL()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 球
   * @param item
   * @param ballInfo 手动生成的数据
   * @param ballType 显示成 圆形 还是 方形
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData, ballType?: string) =>
    <LotteryEBall key={key + 'renderEBall' + ballInfo?.id + ballInfo?.name}
                  item={{
                    ...ballInfo,
                    odds: null,
                  }}
                  selectedBalls={selectedBalls}
                  containerStyle={_styles.ball_container}
                  ballType={{
                    size: scale(46),
                    type: ballType,
                    ballColor: `${Skin1.themeColor}99`,
                  } as ILotteryBall}
                  ballStyle={{ flexDirection: 'column' }}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 单个TAB
   * @param item
   * @param index
   * @param tabLen 总共有多少个TAB
   */
  const renderTabItem = (item?: Array<PlayGroupData>, index?: number, tabLen?: number) =>
    <TouchableWithoutFeedback key={key + item[0]?.alias + index}
                              style={CommStyles.flex}
                              onPress={() => {
                                setTabHochimin(GAME_TYPE_ARRAY[0])
                                setBallTypeIndex(0)
                                setTabIndex(index)
                              }}>
      <View key={key + item[0]?.alias + index}
            style={[
              _styles.tab_item,
              index == tabIndex ? { backgroundColor: UGColor.transparent5 } : null,
              tabLen > 3 ? null : { width: scale(400 / tabLen) },//tab 少于4个 就平均分配空间
            ]}>
        <UGText numberOfLines={1}
                style={[
                  _styles.tab_title_item_text,
                  index == tabIndex ? { color: UGColor.TextColor1 } : null,
                ]}>{item[0]?.plays[0]?.name}</UGText>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制tab
   */
  const renderTab = () => {
    const tabLen = arrayLength(playOddData?.pageData?.groupTri)//tab数量

    return <View style={[
      _styles.tab_title_container,
      { backgroundColor: `${Skin1.themeColor}bb` },
    ]}>
      <ScrollView style={_styles.sv_tab_container}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
        <View style={_styles.tab_title_content}>
          {
            playOddData?.pageData?.groupTri?.map(
              (item, index) => renderTabItem(item, index, tabLen),
            )
          }
        </View>
      </ScrollView>
      {
        tabLen > 3 && <Icon size={scale(36)}
                            color={'white'}
                            name={'angle-double-left'}/>
      }
    </View>
  }

  /**
   * 单个TAB
   * @param item
   * @param index
   */
  const rende2TabItem = (item?: string, index?: number) =>
    <TouchableWithoutFeedback key={key + item + index}
                              onPress={() => {
                                setBallTypeIndex(0)
                                setTabHochimin(GAME_TYPE_ARRAY[index])
                              }}>
      <View key={key + item + index}
            style={[
              _styles.tab_game_item,
              GAME_TYPE_ARRAY[index] == tabHochimin ? { backgroundColor: UGColor.transparent5 } : null,
            ]}>
        <UGText style={[
          _styles.tab_game_title_item_text,
          GAME_TYPE_ARRAY[index] == tabHochimin ? { color: UGColor.TextColor1 } : null,
        ]}>{item}</UGText>
      </View>
    </TouchableWithoutFeedback>


  /**
   * 绘制 选择号码 输入号码 快速选择
   */
  const rende2Tab = () => {
    return <View key={key + 'rende2Tab'}
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
          (item, index) => rende2TabItem(item, index),
        )}
      </View>
    </View>
  }


  /**
   * 单个球从 0 ~ 999 的类别
   * @param item
   * @param index
   */
  const render3TabItem = (item?: Array<PlayData>, index?: number) =>
    <TouchableWithoutFeedback key={key + item[0]?.alias + index}
                              style={CommStyles.flex}
                              onPress={() => setBallTypeIndex(index)}>
      <View key={key + item[0]?.alias + index}
            style={[
              _styles.ball_type_item,
              index == ballTypeIndex ? { backgroundColor: UGColor.transparent5 } : null,
            ]}>
        <UGText style={[
          _styles.ball_type_item_text,
          index == ballTypeIndex ? { color: UGColor.TextColor1 } : null,
        ]}>{item[0]?.alias}</UGText>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 单个球从 0 ~ 999 的类别
   */
  const render3Tab = () => {
    if (tabHochimin != HcmTabOption.快速选择 || arrayLength(currentPageData[0]?.allHcPlays) <= 1) return

    return <View key={key + 'render3Tab'}
                 style={[
                   _styles.tab_title_container,
                   { backgroundColor: `${Skin1.themeColor}bb` },
                 ]}>
      <ScrollView style={_styles.sv_tab_container}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
        <View style={_styles.tab_title_content}>
          {
            currentPageData[0]?.allHcPlays?.map(
              (item, index) => render3TabItem(item, index),
            )}
        </View>
      </ScrollView>
    </View>
  }

  /**
   * 特殊，绘制 输入玩法
   * @param groupData
   */
  const renderSingle = (groupData?: PlayGroupData) => <View key={key + ' renderSingle container = ' + groupData?.id}
                                                            style={CommStyles.flex}>

    <TextInput style={_styles.single_input}
               value={blInputNumber}
               multiline={true}
               editable={groupData?.enable == '1'}
               placeholder={groupData?.enable == '1' ? inputHint : '当前玩法已关闭'}
               onChangeText={(s) => setBlInputNumber(s)}
               keyboardType={'numeric'}/>

  </View>
  /**
   * 绘制 所有 大 小 栏目
   * @param plays 当前栏目的所有球
   */
  const renderRowBar = (plays: Array<PlayData>) => {
    const txtStyle = [
      _styles.bar_text,
      // { backgroundColor: `${Skin1.themeColor}55` },
    ]
    return <View style={_styles.bar_container}>
      <TouchableOpacity onPress={() => addAndRemoveBallList(plays)}>
        <UGText style={txtStyle}>{'所有'}</UGText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        addAndRemoveBallList(plays?.filter((play) => Number(play?.name) > 4), plays)
      }}>
        <UGText style={txtStyle}>{'大'}</UGText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        addAndRemoveBallList(plays?.filter((play) => Number(play?.name) < 5), plays)
      }}>
        <UGText style={txtStyle}>{'小'}</UGText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        addAndRemoveBallList(plays?.filter((play) => Number(play?.name) % 2 == 1), plays)
      }}>
        <UGText style={txtStyle}>{'奇'}</UGText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        addAndRemoveBallList(plays?.filter((play) => Number(play?.name) % 2 == 0), plays)
      }}>
        <UGText style={txtStyle}>{'偶'}</UGText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addAndRemoveBallList(null, plays)}>
        <UGText style={txtStyle}>{'移除'}</UGText>
      </TouchableOpacity>
    </View>
  }

  /**
   * 绘制 X胡志明选择球
   * @param groupData
   * @param index
   */
  const renderBL = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderBL' + groupData?.id + ', index=' + index}
          style={CommStyles.flex}>

      <View style={_styles.sub_title_container}>
        <UGText style={[
          _styles.sub_title_text,
          { color: Skin1.themeColor },
        ]}>{groupData?.exPlays[0]?.alias}</UGText>
      </View>

      <View style={_styles.ball_parent_container}>
        {
          groupData?.exPlays?.map((item, index) => renderEBall(groupData, item))
        }
      </View>

      {renderRowBar(groupData?.exPlays)}
    </View>

  /**
   * 绘制 X胡志明 所有彩种情况
   * @param groupData
   */
  const renderAllCombinations = (groupData?: PlayGroupData) => {
    if (ballTypeIndex >= arrayLength(groupData?.allHcPlays)) return

    return <View key={key + ' renderAllCombinations' + groupData?.id}
                 style={CommStyles.flex}>
      <View style={_styles.sub_title_container}>
        <UGText style={[
          _styles.sub_title_text,
          { color: Skin1.themeColor },
        ]}>{groupData?.allHcPlays[ballTypeIndex][0]?.alias}</UGText>
      </View>

      <View style={_styles.ball_parent_container}>
        {
          groupData?.allHcPlays[ballTypeIndex]?.map((item, index) => renderEBall(groupData, item, BallType.rectangle))
        }
      </View>
    </View>
  }


  /**
   * 绘制全部的球
   */
  const renderAllBall = () => {

    switch (tabHochimin) {
      case HcmTabOption.选择号码:
        return currentPageData?.map(renderBL)

      case HcmTabOption.输入号码:
        return renderSingle(currentPageData[0])

      case HcmTabOption.快速选择:
        return renderAllCombinations(currentPageData[0])

    }

    return null
  }

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={[_styles.sv_container, style]}>
      {renderTab()}
      {rende2Tab()}
      {render3Tab()}
      <View style={_styles.content_container}>
        {renderAllBall()}
      </View>
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
    fontWeight: 'bold',
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
    paddingHorizontal: scale(2),
  },
  tab_title_item_text: {
    color: 'white',
    fontSize: scale(21.5),
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
  },
  ball_type_item: {
    width: scale(133),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    paddingVertical: scale(8),
    paddingHorizontal: scale(4),
  },
  ball_type_item_text: {
    color: 'white',
    fontSize: scale(22),
  },
  single_input: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    borderRadius: scale(8),
    minHeight: scale(320),
    marginHorizontal: scale(6),
    paddingHorizontal: scale(16),
    marginVertical: scale(16),
    textAlignVertical: 'top',
  },
  bar_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: scale(16),
  },
  bar_text: {
    fontSize: scale(22),
    // color: 'white',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderRadius: scale(4),
    backgroundColor: UGColor.LineColor4,
  },


})

export default HoChiMinBLComponent
