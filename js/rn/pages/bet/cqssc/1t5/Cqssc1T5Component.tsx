import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseCqssc1T5 from './UseCqssc1T5'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryERect from '../../widget/LotteryERect'
import { BALL_CONTENT_HEIGHT } from '../../const/LotteryConst'
import { ILotteryRouteParams } from '../../const/ILotteryRouteParams'
import LotteryEBall from '../../widget/LotteryEBall'
import { arrayLength } from '../../../../public/tools/Ext'
import { ugLog } from '../../../../public/tools/UgLog'

/**
 * 1-5球
 *
 * @param navigation
 * @constructor
 */
const Cqssc1T5Component = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    currentPageData,
  } = UseCqssc1T5()

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])

  const key = 'lottery page' + playOddData?.code


  /**
   * 绘制 球
   * @param item
   */
  const renderEBall = (item?: PlayData) => <LotteryEBall key={key + 'renderEBall' + item?.id}
                                                         item={item}
                                                         selectedBalls={selectedBalls}
                                                         containerStyle={_styles.ball_container}
                                                         ballType={{ size: scale(50) }}
                                                         oddsStyle={_styles.ball_odds}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 方格式
   * @param item
   * @param index
   */
  const renderERect = (item?: PlayData, index?: number) => <LotteryERect key={key + 'renderERect' + item?.id + index}
                                                                         item={item}
                                                                         selectedBalls={selectedBalls}
                                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 一组格子
   * @param groupData
   * @param index
   */
  const renderGroupERect = (groupData?: PlayGroupData, index?: number) => {

    let ball1 = groupData?.plays
    let ball2
    if (arrayLength(ball1) == 14) {//分2组显示
      ball1 = groupData?.plays.slice(0, 10)
      ball2 = groupData?.plays.slice(10, 14)
    }

    return <View
      key={key + 'renderAllBall' + groupData?.id + index}
      style={CommStyles.flex}>

      <View key={key + 'renderAllBall sub' + groupData?.id + index}
            style={_styles.sub_title_container}>
        <Text key={key + 'renderAllBall text' + groupData?.id + index}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</Text>
      </View>

      <View key={key + ' sub2 renderAllBall' + groupData?.id + index}
            style={_styles.rect_container}>
        { ball1?.map(renderEBall) }
        { ball2?.map(renderERect) }
      </View>

    </View>
  }

  /**
   * 绘制全部的格子
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {currentPageData()?.map(renderGroupERect)}
  </View>

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                style={[_styles.sv_container, style]}>
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
  rect_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
    flex: 1,
  },
  ball_container: {
    width: scale(189),
    paddingHorizontal: scale(28),
  },
  ball_odds: {
    fontSize: scale(20),
  },


})

export default Cqssc1T5Component
