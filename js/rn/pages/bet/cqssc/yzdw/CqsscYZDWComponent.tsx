import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseCqsscYZDW from './UseCqsscYZDW'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import LotteryEBall, { ILotteryEBallItem } from '../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT } from '../../const/LotteryConst'
import { ILotteryRouteParams } from '../../const/ILotteryRouteParams'


/**
 * X字定位
 *
 * @param navigation
 * @constructor
 */
const CqsscYZDWComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
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
                      // ...item?.plays[0],
                      ...ballInfo,
                    }}
                    selectedBalls={selectedBalls}
                    ballType={{ size: scale(50) }}
                    ballStyle={{ flexDirection: 'column' }}
                    callback={() => addOrRemoveBall(ballInfo?.id)}/>
    )
  }

  /**
   * 绘制 X字定位
   * @param groupData
   */
  const renderYZDW = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderYZDW' + groupData?.id + groupData?.exPlays[0]?.alias}
          style={CommStyles.flex}>

      {//显示赔率标题
        !anyEmpty(groupData?.exTitle) && <View key={key + ' sub renderYZDW 2 = ' + groupData?.id}
                                               style={_styles.sub_big_title_container}>
          <Text key={key + ' text renderYZDW' + groupData?.id}
                style={[
                  _styles.sub_big_title_text,
                  { color: Skin1.themeColor },
                ]}>{groupData?.exTitle}</Text>
        </View>
      }

      {//显示赔率提醒文字
        !anyEmpty(groupData?.exHint) && <View key={key + ' sub renderYZDW 2 = ' + groupData?.id}
                                              style={_styles.sub_big_title_container}>
          <Text key={key + ' text renderYZDW' + groupData?.id}
                style={[
                  _styles.sub_big_title_text,
                  { color: Skin1.themeColor },
                ]}>{groupData?.exHint}</Text>
        </View>
      }

      <View key={key + ' sub renderYZDW 2 =' + groupData?.id}
            style={_styles.sub_title_container}>
        <Text key={key + ' text renderYZDW' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.exPlays[0]?.alias}</Text>
      </View>

      <View key={key + ' ball renderYZDW' + groupData?.id}
            style={_styles.ball_container}>
        {groupData?.exPlays.map((item, index) => renderEBall(groupData, item))}
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
    borderRadius: scale(4),
    padding: scale(6),
  },
  sub_big_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
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

export default CqsscYZDWComponent
