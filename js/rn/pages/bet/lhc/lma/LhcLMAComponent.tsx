import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcLMA from './UseLhcLMA'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import LotteryEBall, { ILotteryEBallItem } from '../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT } from '../../const/LotteryConst'
import { ILotteryRouteParams } from '../../const/ILotteryRouteParams'
import { UGStore } from '../../../../redux/store/UGStore'


/**
 * 六合彩连码
 *
 * @param navigation
 * @constructor
 */
const LhcLMAComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcLMA()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  const renderTabItem = (item?: Array<PlayGroupData>, index?: number) => <TouchableWithoutFeedback
    key={key + item[0]?.alias}
    style={CommStyles.flex}
    onPress={() => {
      UGStore.dispatch({ type: 'reset', selectedLotteryModel: {} })
      setTabIndex(index)
    }}>
    <View key={key + item[0]?.alias}
          style={[
            _styles.tab_item,
            index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
          ]}>
      <Text key={key + item[0]?.alias}
            style={[
              _styles.tab_title_item_text,
              index == tabIndex ? { color: `white` } : null,
            ]}>{item[0]?.alias}</Text>
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
        {
          playOddData?.pageData?.groupTri?.map(renderTabItem)
        }
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
  const renderEBall = (item?: PlayGroupData, ballInfo?: ILotteryEBallItem) => {

    return (
      <LotteryEBall key={key + 'renderEBall' + ballInfo?.id + ballInfo?.name}
                    item={{
                      ...item?.plays[0],
                      ...ballInfo,
                    }}
                    selectedBalls={selectedBalls}
                    ballStyle={{ flexDirection: 'column' }}
                    callback={() => addOrRemoveBall(ballInfo?.id)}/>
    )
  }

  /**
   * 绘制 连码
   * @param groupData
   */
  const renderLMA = (groupData?: PlayGroupData) =>
    <View key={key + ' renderLMA' + groupData?.id}
          style={CommStyles.flex}>

      <View key={key + ' sub renderLMA' + groupData?.id}
            style={_styles.sub_title_container}>
        <Text key={key + ' text renderLMA' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</Text>
      </View>

      <View key={key + ' ball renderLMA' + groupData?.id}
            style={_styles.ball_container}>
        {
          groupData?.exPlays.map((item, index) => renderEBall(groupData, item))
        }
      </View>
    </View>
  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {!anyEmpty(currentPageData) && renderLMA(currentPageData[0])}
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

export default LhcLMAComponent
