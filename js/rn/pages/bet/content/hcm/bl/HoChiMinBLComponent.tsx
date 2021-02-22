import {
  Alert,
  AlertButton,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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


/**
 * X胡志明
 *
 * @param navigation
 * @constructor
 */
const HoChiMinBLComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    GAME_TYPE_ARRAY,
    HcmTabIndex,
    blInputNumber,
    setBlInputNumber,
    tabHcmIndex,
    setTabHcmIndex,
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
                  ballType={{
                    size: scale(46),
                    type: BallType.rectangle,
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
                                setTabHcmIndex(HcmTabIndex.SEL_NUMBER)
                                setTabIndex(index)
                              }}>
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
                              onPress={() => setTabHcmIndex(index)}>
      <View key={key + item + index}
            style={[
              _styles.tab_game_item,
              index == tabHcmIndex ? { backgroundColor: UGColor.transparent5 } : null,
            ]}>
        <Text style={[
          _styles.tab_game_title_item_text,
          index == tabHcmIndex ? { color: UGColor.TextColor1 } : null,
        ]}>{item}</Text>
      </View>
    </TouchableWithoutFeedback>



  /**
   * 绘制tab
   */
  const renderGameType = () => {

    const tabCode = currentPageData[0]?.plays[0]?.code //当前TAB是哪一个
    const titleArr = tabCode == HoChiMinSub.PIHAO4 ? GAME_TYPE_ARRAY.slice(0, 2) : GAME_TYPE_ARRAY

    return <View key={key + 'renderGameType'}
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
        {titleArr?.map(
          (item, index) => renderGameTypeItem(item, index),
        )}
      </View>
    </View>
  }

  /**
   * 特殊，绘制 五星玩法单式
   * @param groupData
   */
  const renderSingle = (groupData?: PlayGroupData) => <View key={key + ' renderSingle container = ' + groupData?.id}
                                                            style={CommStyles.flex}>

    <TextInput style={_styles.single_input}
               value={blInputNumber}
               editable={groupData?.enable == '1'}
               placeholder={groupData?.enable == '1' ? '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：15;12,10 19' : '当前玩法已关闭'}
               onChangeText={(s) => setBlInputNumber(s)}
               keyboardType={'numeric'}/>

  </View>

  /**
   * 绘制 X胡志明选择球
   * @param groupData
   * @param index
   */
  const renderBL = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderBL' + groupData?.id + ', index=' + index}
          style={CommStyles.flex}>

      <View style={_styles.sub_title_container}>
        <Text style={[
          _styles.sub_title_text,
          { color: Skin1.themeColor },
        ]}>{groupData?.exPlays[0]?.alias}</Text>
      </View>

      <View style={_styles.ball_parent_container}>
        {
          groupData?.exPlays?.map((item, index) => renderEBall(groupData, item))
        }
      </View>
    </View>

  /**
   * 绘制 X胡志明 所有彩种情况
   * @param groupData
   * @param index
   */
  const renderAllCombinations = (groupData?: PlayGroupData) =>
    <View key={key + ' renderAllCombinations' + groupData?.id}
          style={CommStyles.flex}>
      <View style={_styles.sub_title_container}>
        <Text style={[
          _styles.sub_title_text,
          { color: Skin1.themeColor },
        ]}>{groupData?.exHint}</Text>
      </View>

      <View style={_styles.ball_parent_container}>
        {
          groupData?.allHcPlays?.map((item, index) => renderEBall(groupData, item))
        }
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => {

    switch (tabHcmIndex) {
      case HcmTabIndex.SEL_NUMBER:
        return currentPageData?.map(renderBL)

      case HcmTabIndex.INPUT_NUMBER:
        return renderSingle(currentPageData[0])

      case HcmTabIndex.SEL_FAST:
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
      {renderGameType()}
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
  single_input: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    borderRadius: scale(8),
    minHeight: scale(320),
    marginHorizontal: scale(6),
    marginVertical: scale(16),
    textAlignVertical: 'top',
  },


})

export default HoChiMinBLComponent
