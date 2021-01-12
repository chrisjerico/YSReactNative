import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcTM from './UseLhcTM'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import LotteryEBall from '../../widget/LotteryEBall'
import LotteryERect from '../../widget/LotteryERect'
import { ILotteryRouteParams } from '../../const/LotteryConst'

/**
 * 六合彩特码
 *
 * @param navigation
 * @constructor
 */
const LhcTMComponent = ({ lotteryCode, style }: ILotteryRouteParams) => {


  // const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    setLotteryCode,
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
    setLotteryCode(lotteryCode)
  }, [])

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
      ]}>{!anyEmpty(pageData) && pageData[tab][0].alias}</Text>
    </TouchableOpacity>
  </View>

  /**
   * 绘制 特码A 特码B 容器
   */
  const renderTab = () => <View style={_styles.tab_container}>
    {renderTabItem(0)}
    {renderTabItem(1)}
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
            <TouchableOpacity key={`${item?.name}_${selectedZodiac?.includes(item)}`}
                              onPress={() => addOrRemoveZodiac(item)}>
              <View key={`${item?.name}_${selectedZodiac?.includes(item)}`}
                    style={_styles.zodiac_item}>
                {
                  selectedZodiac?.includes(item) ?
                    <Icon size={scale(36)}
                          color={Skin1.themeColor}
                          name={'check-circle'}/> :
                    <Icon size={scale(36)}
                          name={'circle-o'}/>
                }
                <Text key={item?.name}
                      style={_styles.zodiac_item_text}>{item?.name}</Text>
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
  const renderTM = (groupData?: PlayGroupData) => <View key={groupData?.id + groupData?.alias}
                                                        style={CommStyles.flex}>

    <View key={groupData?.alias}
          style={_styles.sub_title_container}>
      <Text key={groupData?.alias}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</Text>
    </View>

    <View style={_styles.ball_container}>
      {
        groupData?.plays?.map((item) => renderEBall(item))
      }
    </View>
  </View>


  /**
   * 绘制 连码
   * @param groupData
   */
  const renderLM = (groupData?: PlayGroupData) => <View key={groupData?.id + groupData?.alias}
                                                        style={CommStyles.flex}>

    <View key={groupData?.alias}
          style={_styles.sub_title_container}>
      <Text style={[
        _styles.sub_title_text,
        { color: Skin1.themeColor },
      ]}>{groupData?.alias}</Text>
    </View>

    <View style={_styles.ball_container}>
      {
        groupData?.plays?.map((item) => renderERect(item))
      }
    </View>
  </View>

  /**
   * 绘制 色波
   * @param groupData
   */
  const renderSB = (groupData?: PlayGroupData) => <View key={groupData?.id + groupData?.alias}
                                                        style={CommStyles.flex}>

    <View key={groupData?.alias}
          style={_styles.sub_title_container}>
      <Text style={[
        _styles.sub_title_text,
        { color: Skin1.themeColor },
      ]}>{groupData?.alias}</Text>
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
    {arrayLength(curData) > 0 && renderTM(curData[0])}
    {arrayLength(curData) > 1 && renderLM(curData[1])}
    {arrayLength(curData) > 2 && renderSB(curData[2])}
  </ScrollView>

  return (
    <View style={[CommStyles.flex, style]}>
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
