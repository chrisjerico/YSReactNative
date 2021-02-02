import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcTM from './UseLhcTM'
import { PlayData, PlayGroupData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import LotteryEBall from '../../widget/LotteryEBall'
import LotteryERect from '../../widget/LotteryERect'
import { BALL_CONTENT_HEIGHT, LEFT_ITEM_HEIGHT } from '../../const/LotteryConst'
import { ugLog } from '../../../../public/tools/UgLog'
import { ILotteryRouteParams } from '../../const/ILotteryRouteParams'

/**
 * 六合彩特码
 *
 * @param navigation
 * @constructor
 */
const LhcTMComponent = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveZodiac,
    addOrRemoveBall,
    currentPageData,
  } = UseLhcTM()

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 特码A 特码B Tab
   */
  const renderTabItem = (tab?: number) =>
    <View key={key + 'renderTabItem' + tab}
          style={[
            _styles.tab_item,
            tabIndex == tab ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
          ]}>
      <TouchableWithoutFeedback key={key + 'renderTabItem Text'}
                        onPress={() => setTabIndex(tab)}
                        style={_styles.tab_title_tb}>
        <Text key={key + 'renderTabItem Text'}
              style={[
                _styles.tab_title,
                tabIndex == tab ? { color: 'white' } : null,
              ]}>{!anyEmpty(playOddData?.pageData?.groupTri) && playOddData?.pageData?.groupTri[tab][0].alias}</Text>
      </TouchableWithoutFeedback>
    </View>

  /**
   * 绘制 特码A 特码B 容器
   */
  const renderTab = () => <View key={key + 'renderTab'}
                                style={_styles.tab_container}>
    {renderTabItem(0)}
    {renderTabItem(1)}
  </View>

  /**
   * 绘制 生肖
   * @param item
   * @param index
   */
  const renderZodiacItem = (item?: ZodiacNum, index?: number) => <TouchableWithoutFeedback key={key + `${item?.name}_select`}
                                                                                   onPress={() => addOrRemoveZodiac(item)}>
    <View key={key + `${item?.name}_select`}
          style={_styles.zodiac_item}>
      {
        selectedZodiac?.includes(item) ?
          <Icon key={key + `${item?.name}_select true`}
                size={scale(36)}
                color={Skin1.themeColor}
                name={'check-circle'}/> :
          <Icon key={key + `${item?.name}_select false`}
                size={scale(36)}
                name={'circle-o'}/>
      }
      <Text key={key + `${item?.name}_select name`}
            style={_styles.zodiac_item_text}>{item?.name}</Text>
    </View>
  </TouchableWithoutFeedback>

  /**
   * 绘制生肖
   */
  const renderZodiac = () => <View key={key + 'zodiac'}>
    <ScrollView key={key + 'zodiac sv'}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
      <View key={key + 'zodiac content'}
            style={_styles.zodiac_container}>
        {
          playOddData?.pageData?.zodiacNums?.map(renderZodiacItem)
        }
      </View>
    </ScrollView>
  </View>

  /**
   * 绘制 方格式
   * @param item
   * @param index
   */
  const renderERect = (item?: PlayData, index?: number) => <LotteryERect key={`${key}-LotteryEBall-${item?.exId}-${item?.id}`}
                                                                         item={item}
                                                                         selectedBalls={selectedBalls}
                                                                         callback={() => addOrRemoveBall(item?.exId)}/>

  /**
   * 绘制 球
   * @param item
   * @param index
   */
  const renderEBall = (item?: PlayData, index?: number) => <LotteryEBall key={`${key}-LotteryEBall-${item?.exId}-${item?.id}`}
                                                                         item={item}
                                                                         selectedBalls={selectedBalls}
                                                                         callback={() => addOrRemoveBall(item?.exId)}/>

  /**
   * 绘制 特码B/A
   * @param groupData
   */
  const renderTM = (groupData?: PlayGroupData) => <View key={key + 'renderTM' + groupData?.id}
                                                        style={CommStyles.flex}>
    <View key={key + 'renderTM sub' + groupData?.id}
          style={_styles.sub_title_container}>
      <Text key={key + 'renderTM sub text' + groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</Text>
    </View>

    <View key={key + 'renderTM sub 2' + groupData?.id}
          style={_styles.ball_container}>
      {
        groupData?.plays?.map(renderEBall)
      }
    </View>
  </View>


  /**
   * 绘制 连码
   * @param groupData
   */
  const renderLM = (groupData?: PlayGroupData) => <View key={key + 'renderLM' + groupData?.id}
                                                        style={CommStyles.flex}>

    <View key={key + 'renderLM sub' + groupData?.id}
          style={_styles.sub_title_container}>
      <Text key={key + 'renderLM sub text' + groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</Text>
    </View>

    <View key={key + 'renderLM sub 2' + groupData?.id}
          style={_styles.ball_container}>
      {
        groupData?.plays?.map(renderERect)
      }
    </View>
  </View>

  /**
   * 绘制 色波
   * @param groupData
   */
  const renderSB = (groupData?: PlayGroupData) => <View key={key + 'renderSB' + groupData?.id}
                                                        style={CommStyles.flex}>

    <View key={key + 'renderSB sub' + groupData?.id}
          style={_styles.sub_title_container}>
      <Text key={key + 'renderSB sub text' + groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</Text>
    </View>

    <View key={key + 'renderSB sub 2' + groupData?.id}
          style={_styles.ball_container}>
      {
        groupData?.plays?.map(renderERect)
      }
    </View>
  </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {arrayLength(currentPageData()) > 0 && renderTM(currentPageData()[0])}
    {arrayLength(currentPageData()) > 1 && renderLM(currentPageData()[1])}
    {arrayLength(currentPageData()) > 2 && renderSB(currentPageData()[2])}
  </View>

  return (
    <ScrollView key={key}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={[_styles.sv_container, style]}>
      {renderTab()}
      {renderZodiac()}
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
  tab_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
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
