import { ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseCqsscWX from './UseCqsscWX'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import LotteryEBall from '../../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGStore } from '../../../../../redux/store/UGStore'
import { calculateSliderValue } from '../../../util/ArithUtil'
import { ugLog } from '../../../../../public/tools/UgLog'
import WXTitleComponent from './WXTitleComponent'


/**
 * 五星
 *
 * @param navigation
 * @constructor
 */
const CqsscWXComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseCqsscWX()

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
   */
  const renderTabItem = (item?: Array<PlayGroupData>, index?: number) =>
    <TouchableWithoutFeedback key={key + item[0]?.alias}
                              style={CommStyles.flex}
                              onPress={() => setTabIndex(index)}>
      <View key={key + item[0]?.alias}
            style={[
              _styles.tab_item,
              index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
            ]}>
        <Text key={key + item[0]?.alias}
              style={[
                _styles.tab_title_item_text,
                index == tabIndex ? { color: `white` } : null,
              ]}>{item[0]?.enable == '1' ? item[0]?.alias : '- -'}</Text>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制tab
   */
  const renderTab = () => <View key={key + 'tab'}
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
    <Icon size={scale(36)}
          color={Skin1.themeColor}
          name={'angle-double-left'}/>
  </View>

  /**
   * 绘制 球
   * @param item
   * @param ballInfo 手动生成的数据
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryEBall key={key + 'renderEBall' + ballInfo?.id + ballInfo?.name}
                  item={ballInfo}
                  selectedBalls={selectedBalls}
                  ballType={{ size: scale(50) }}
                  ballStyle={{ flexDirection: 'column' }}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 特殊，绘制 五星玩法单式
   * @param groupData
   */
  const renderSingle = (groupData?: PlayGroupData) => <View key={key + ' renderSingle container = ' + groupData?.id}
                                                            style={CommStyles.flex}>
    <WXTitleComponent title={'赔率'}
                      odds={groupData?.plays[0]?.odds}/>
    <View style={_styles.sub_big_hint_container}>
      <Text style={_styles.sub_big_hint_text}>{'玩法提示：手动输入一个5位数号码组成一注'}</Text>
    </View>

    <TextInput style={_styles.single_input}
               editable={groupData?.enable == '1'}
               keyboardType={'numeric'}/>

    <View style={_styles.sub_big_hint_container}>
      <Text key={key + 'sub text renderSingle = ' + groupData?.id}
            style={_styles.sub_big_hint_text}>{'每一注号码之间请用逗号、空格、换行进行隔开'}</Text>
    </View>
  </View>

  /**
   * 绘制 五星
   * @param groupData
   * @param index
   */
  const renderWX = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderWX' + index + ',' + groupData?.id + groupData?.exPlays[0]?.alias}
          style={CommStyles.flex}>

      {//显示赔率标题
        index == 0 && <WXTitleComponent title={'赔率'}
                                        odds={groupData?.plays[0]?.odds}/>
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

      <View style={_styles.ball_container}>
        {groupData?.exPlays.map((item, index) => renderEBall(groupData, item))}
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View style={_styles.content_container}>
    {tabIndex == 0 ? renderSingle(currentPageData[0]) : currentPageData?.map(renderWX)}
  </View>

  return (
    <ScrollView key={key}
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
  content_container: {
    flex: 1,
    paddingBottom: scale(120),
  },
  single_input: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    borderRadius: scale(8),
    minHeight: scale(128),
    marginHorizontal: scale(6),
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
  sv_tab_container: {
    flex: 1,
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
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },


})

export default CqsscWXComponent
