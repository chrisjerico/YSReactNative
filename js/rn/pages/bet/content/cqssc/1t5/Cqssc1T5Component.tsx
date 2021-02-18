import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseCqssc1T5 from './UseCqssc1T5'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryERect from '../../../widget/LotteryERect'
import { BALL_CONTENT_HEIGHT, CqsscCode, LCode, Pk10Code } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import LotteryEBall from '../../../widget/LotteryEBall'
import { arrayLength } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'
import { UGStore } from '../../../../../redux/store/UGStore'

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
  } = UseCqssc1T5()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])

  const key = 'lottery page' + playOddData?.code


  /**
   * 绘制 球
   * @param item
   * @param ballInfo
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryEBall key={key + 'renderEBall' + ballInfo?.id}
                  item={ballInfo}
                  selectedBalls={selectedBalls}
                  containerStyle={_styles.ball_container}
                  ballType={{ size: scale(50) }}
                  oddsStyle={_styles.ball_odds}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 方格式
   * @param item
   * @param ballInfo
   * @param index
   */
  const renderERect = (item?: PlayGroupData, ballInfo?: PlayData, index?: number) =>
    <LotteryERect key={key + 'renderERect' + ballInfo?.id + index}
                  item={ballInfo}
                  selectedBalls={selectedBalls}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 一组格子
   * @param groupData
   * @param index
   */
  const renderGroupERect = (groupData?: PlayGroupData, index?: number) => {

    let ball1 = groupData?.plays
    let ball2: Array<PlayData>

    const gameType = UGStore.globalProps?.playOddDetailData?.lotteryLimit?.gameType
    if (gameType == LCode.pk10) {//赛车的数字和汉字是反的
      if (arrayLength(ball1) > 10) {//分2组显示
        if (playOddData?.code == CqsscCode.Q3
          || playOddData?.code == CqsscCode.Q4
          || playOddData?.code == CqsscCode.Q5) { //第 3 4 5 名只取6个
          ball1 = groupData?.plays.slice(6, arrayLength(groupData?.plays))
          ball2 = groupData?.plays.slice(0, 6)
        } else {
          ball1 = groupData?.plays.slice(4, arrayLength(groupData?.plays))
          ball2 = groupData?.plays.slice(0, 4)
        }
      }

    } else {
      if (arrayLength(ball1) > 10) {//分2组显示
        ball1 = groupData?.plays.slice(0, arrayLength(groupData?.plays) - 4)
        ball2 = groupData?.plays.slice(-4)
      }
    }

    return <View key={key + 'renderAllBall' + groupData?.id + index}
                 style={CommStyles.flex}>

      <View key={key + 'renderAllBall sub' + groupData?.id + index}
            style={_styles.sub_title_container}>
        <Text key={key + 'renderAllBall text' + groupData?.id + index}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</Text>
      </View>
      {
        gameType == LCode.pk10 && playOddData?.code == Pk10Code.HE
          ?
          <View key={key + ' sub2 renderAllBall' + groupData?.id + index}
                style={_styles.rect_container}>
            {ball2?.map((item) => renderERect(groupData, item))}
            {ball1?.map((item) => renderEBall(groupData, item))}
          </View>
          :
          <View key={key + ' sub2 renderAllBall' + groupData?.id + index}
                style={_styles.rect_container}>
            {ball1?.map((item) => renderEBall(groupData, item))}
            {ball2?.map((item) => renderERect(groupData, item))}
          </View>

      }
    </View>
  }

  /**
   * 绘制全部的格子
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {currentPageData?.map(renderGroupERect)}
  </View>

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
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
    paddingHorizontal: scale(16),
    alignItems: 'center',
  },
  ball_odds: {
    fontSize: scale(20),
  },


})

export default Cqssc1T5Component
