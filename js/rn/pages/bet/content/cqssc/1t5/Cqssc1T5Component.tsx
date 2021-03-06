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
import { BALL_CONTENT_HEIGHT, CqsscCode, GD11x5, LCode, Pk10Code } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import LotteryEBall from '../../../widget/LotteryEBall'
import { arrayLength } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'
import { UGStore } from '../../../../../redux/store/UGStore'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

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
                  ballType={{ size: scale(46) }}
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

    const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType
    const gameCode = playOddData?.code

    if (arrayLength(ball1) > 10) {//分2组显示
      if (gameType == LCode.pk10) {//有的彩种 数字和汉字是反的
        if (gameCode == CqsscCode.Q1
          || gameCode == CqsscCode.Q2
          || gameCode == CqsscCode.Q3
          || gameCode == CqsscCode.Q4
          || gameCode == CqsscCode.Q5) { //前5名只取6个
          ball1 = groupData?.plays.slice(6, arrayLength(groupData?.plays))
          ball2 = groupData?.plays.slice(0, 6)
        } else {
          ball1 = groupData?.plays.slice(4, arrayLength(groupData?.plays))
          ball2 = groupData?.plays.slice(0, 4)
        }

      } else if (gameType == LCode.xyft
        && (gameCode == CqsscCode.Q1
          || gameCode == CqsscCode.Q2
          || gameCode == CqsscCode.Q3
          || gameCode == CqsscCode.Q4
          || gameCode == CqsscCode.Q5)) {//前5名只取6个
        ball1 = groupData?.plays.slice(0, arrayLength(groupData?.plays) - 6)
        ball2 = groupData?.plays.slice(-6)

      } else if (gameType == LCode.gdkl10 || gameType == LCode.xync) {//有的彩种 取前20个
        ball1 = groupData?.plays.slice(0, 20)
        ball2 = groupData?.plays.slice(20)

      } else if (gameType == LCode.qxc && gameCode == CqsscCode.Q7) {//有的彩种 取前中间的4个
        ball1 = [...groupData?.plays.slice(0, 10), ...groupData?.plays.slice(14)]
        ball2 = groupData?.plays.slice(10, 14)

      } else if (gameType == LCode.fc3d) {
        if (gameCode == GD11x5.KD
          || gameCode == GD11x5.DD
          || gameCode == GD11x5.HS) {

        } else {
          ball1 = groupData?.plays.slice(0, arrayLength(groupData?.plays) - 4)
          ball2 = groupData?.plays.slice(-4)
        }

      } else if (gameType == LCode.gdkl10 || gameType == LCode.xync) {//有的彩种 取前20个
        ball1 = groupData?.plays.slice(0, 20)
        ball2 = groupData?.plays.slice(20)

      } else if (gameType == LCode.gd11x5 && gameCode == GD11x5.G1Z1) {

      } else if (gameType == LCode.qxc && gameCode == CqsscCode.Q7) {//有的彩种 取前中间的4个
        ball1 = [...groupData?.plays.slice(0, 10), ...groupData?.plays.slice(14)]
        ball2 = groupData?.plays.slice(10, 14)

      } else {
        ball1 = groupData?.plays.slice(0, arrayLength(groupData?.plays) - 4)
        ball2 = groupData?.plays.slice(-4)

      }

    }

    return <View key={key + 'renderAllBall' + groupData?.id + index}
                 style={CommStyles.flex}>

      <View key={key + 'renderAllBall sub' + groupData?.id + index}
            style={_styles.sub_title_container}>
        <UGText key={key + 'renderAllBall text' + groupData?.id + index}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</UGText>
      </View>
      {
        gameType == LCode.pk10 && gameCode == Pk10Code.HE //北京赛车 冠亚和
        || gameType == LCode.xyft && gameCode == Pk10Code.HE //幸好飞艇 冠亚和
          ?
          [
            <View key={key + ' sub2 renderAllBall 1' + groupData?.id + index}
                  style={_styles.rect_container}>
              {ball2?.map((item) => renderERect(groupData, item))}
            </View>,
            <View key={key + ' sub2 renderAllBall 2' + groupData?.id + index}
                  style={_styles.rect_container}>
              {ball1?.map((item) => renderEBall(groupData, item))}
            </View>,
          ]
          :
          [
            <View key={key + ' sub2 renderAllBall 1' + groupData?.id + index}
                  style={_styles.rect_container}>
              {ball1?.map((item) => renderEBall(groupData, item))}
            </View>,
            <View key={key + ' sub2 renderAllBall 2' + groupData?.id + index}
                  style={_styles.rect_container}>
              {ball2?.map((item) => renderERect(groupData, item))}
            </View>,
          ]

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
    width: scale(195),
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  ball_odds: {
    fontSize: scale(20),
  },


})

export default Cqssc1T5Component
